package com.javaee.ch16.framework.springsecurity;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.javaee.ch16.common.response.GlobalCodeEnum;
import com.javaee.ch16.common.response.ResultVo;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;

// @Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
            throws IOException, ServletException {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401
        // Map<String, Object> result = new HashMap<>();
        // result.put("code", 401);
        // result.put("message", "未登录或登录已过期");
        // result.put("data", null);

        ResultVo resultVo = ResultVo.build(GlobalCodeEnum.UNAUTHORIZED, "未登录或登录已过期");

        // 你可以用自己的	ResultVo对象
        response.getWriter().write(objectMapper.writeValueAsString(resultVo));
    }
}