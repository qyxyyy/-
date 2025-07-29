package com.javaee.ch16.web.api;

import com.javaee.ch16.common.response.GlobalCodeEnum;
import com.javaee.ch16.common.response.ResultVo;
import com.javaee.ch16.domain.dto.login.LoginForm;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.rememberme.PersistentTokenBasedRememberMeServices;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

// 认证控制器
@RestController
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PersistentTokenBasedRememberMeServices rememberMeServices;

    @PostMapping("/api/login")
    public ResultVo<?> login(@RequestBody LoginForm form, HttpServletRequest request, HttpServletResponse response) {
        try {
            // 执行认证
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(form.getUsername(), form.getPassword()));
            SecurityContext securityContext = SecurityContextHolder.getContext();
            // 认证成功，存储到 SecurityContext
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // 在认证成功后，登录成功后应创建新 Session 以防止 Session 固定攻击
            // 1. 先失效session
            HttpSession oldSession = request.getSession(false);
            if (oldSession != null) oldSession.invalidate();
            // 2. 获取新Session
            HttpSession session = request.getSession(true);

            // 关键：写入Session
            request.getSession().setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, securityContext);
            // 获取用户信息
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            // 手动调用RememberMe逻辑，仅当记住我被勾选时
            if (request.getParameter("rememberMe") != null && request.getParameter("rememberMe").equals("true")) {
                rememberMeServices.loginSuccess(request, response, authentication);
            }

            // 返回成功响应（可包含 Token）
            return ResultVo.ok(userDetails);
        } catch (BadCredentialsException e) {
            return ResultVo.build(GlobalCodeEnum.LOGIN_ERROR);
        } catch (DisabledException e) {
            return ResultVo.build(GlobalCodeEnum.USER_DISABLED);
        } catch (AuthenticationException e) {
            return ResultVo.build(GlobalCodeEnum.AUTH_ERROR, e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    @PostMapping("/api/logout")
    public ResultVo<?> logout(HttpServletRequest request, HttpServletResponse response) {
        // 让Spring Security的SecurityContext失效
        SecurityContextHolder.clearContext();
        // 让Session失效
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        // 可选：删除JSESSIONID Cookie（对SPA用户体验好一点）
        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        // 删除 remember-me Cookie
        rememberMeServices.logout(request, response, null);
        return ResultVo.ok("注销成功");
    }
}