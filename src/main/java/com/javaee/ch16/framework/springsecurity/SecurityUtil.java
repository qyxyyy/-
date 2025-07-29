package com.javaee.ch16.framework.springsecurity;//package com.javaee.ch16.framework.springsecurity;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

/**
* 安全工具类，安全地获取与设置当前登录用户（兼容未登录、匿名、类型错误等各种情况）。
* 推荐所有项目使用本工具方法以避免安全漏洞与异常。
*/
@Slf4j // 推荐lombok或手工加静态logger
public class SecurityUtil {

    /** 获取当前已认证用户的详细信息 */
    public static Optional<UserDetailsImpl> getUserInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()
                || authentication instanceof AnonymousAuthenticationToken) {
            return Optional.empty();
        }
        Object principal = authentication.getPrincipal();
        if (principal instanceof UserDetailsImpl) {
            return Optional.of((UserDetailsImpl) principal);
        }
        return Optional.empty();
    }

    /** 安全更新会话上下文的用户信息，仅在用户信息更新场景调用 */
    public static void setUserInfo(UserDetailsImpl user) {
        if (user == null) {
            SecurityContextHolder.clearContext();
            return;
        }
        UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
        Authentication original = SecurityContextHolder.getContext().getAuthentication();
        if (original != null) {
            token.setDetails(original.getDetails());
        }
        SecurityContextHolder.getContext().setAuthentication(token);
    }

    /** JPA审计场景，获取当前操作用户名，异常时返回"system" */
    public static Optional<String> getCurrentAuditor() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()
                    || authentication instanceof AnonymousAuthenticationToken) {
                return Optional.of("system");
            }
            Object principal = authentication.getPrincipal();
            if (principal instanceof UserDetails) {
                return Optional.ofNullable(((UserDetails) principal).getUsername());
            }
            if (principal instanceof String) {
                return Optional.of((String) principal);
            }
            return Optional.of("system");
        } catch (Exception ex) {
            log.error("getCurrentAuditor error: ", ex);
            return Optional.of("system");
        }
    }
}