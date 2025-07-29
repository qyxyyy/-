package com.javaee.ch16.framework.springsecurity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenBasedRememberMeServices;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;

import javax.sql.DataSource;


// 自定义登录页面
@Configuration
public class SecurityConfig {
    @Autowired
    private MyUserDetailsService userDetailsService;
    @Autowired
    private DataSource dataSource;

    // 1. 定义白名单路径数组
    private static final String[] WHITE_LIST = {"/assets/**", "/site/**", "/views/login/**", "/tools/**", "/login",
            "/api/logout", "/api/login" ,
            // 一定要放开前端登录请求的接口！
    };

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        // 白名单放行
                        .requestMatchers("/**").permitAll()
                        // 读者接口（查书、查自己借阅）仅USER
                        .requestMatchers("/api/reader/**").hasRole("READER")
                        // 管理员管理接口（如管理其他管理员）仅SUPER_ADMIN
                        .requestMatchers("/api/admin/manage/**").hasRole("SUPER_ADMIN")
                        // 其它 admin 下的可以根据实际需求细分（都给ADMIN/SUPER_ADMIN先）
                        .requestMatchers("/api/admin/**").hasAnyRole("ADMIN", "SUPER_ADMIN")
                        // 其它所有需要登录即可，具体可以再细分
                        .anyRequest().authenticated())
                .exceptionHandling(ex -> ex
                        .accessDeniedHandler(new CustomAccessDeniedHandler())  // 统一处理权限不足，配置403处理器
                        .authenticationEntryPoint(new CustomAuthenticationEntryPoint())  // <== 配置401处理器
                );
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public PersistentTokenRepository persistentTokenRepository() {
        JdbcTokenRepositoryImpl repo = new JdbcTokenRepositoryImpl();
        repo.setDataSource(dataSource); // 换成你实际的数据源实例
        repo.setCreateTableOnStartup(false);  // 开发环境临时开启
        return repo;
    }

    @Bean
    public PersistentTokenBasedRememberMeServices rememberMeServices() {
        PersistentTokenBasedRememberMeServices services =
                new PersistentTokenBasedRememberMeServices(
                        "your-strong-remember-me-key", // 必须与 http.rememberMe().key() 一致
                        userDetailsService,
                        persistentTokenRepository()
                );
        // 配置 RememberMeServices
        services.setParameter("rememberMe"); // 对应 LoginForm 中的字段名
        services.setTokenValiditySeconds(86400 * 7); // 24小时有效期
        services.setUseSecureCookie(false); // 仅在 HTTPS 下传输
        services.setCookieName("remember-me");
        services.setAlwaysRemember(false); // 仅在用户明确选择时生效
        return services;
    }
}