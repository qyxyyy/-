package com.javaee.ch16.common.interceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {


    @Autowired
    LoginInterceptor loginIntercept;

    /**
     * 注册拦截器
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
       // registry.addInterceptor(pageAccessInterceptor)
       //         .addPathPatterns("/**")
       //         .excludePathPatterns("/","/assets/**","/site/**");
//        registry.addInterceptor(loginIntercept)
//                .addPathPatterns("/api/book/**")
//                .addPathPatterns("/book/**");

        // registry.addInterceptor(testInterceptor)
        //         .addPathPatterns("/login")
        // .addPathPatterns("/admin/**");

    }
}
