package com.javaee.ch16.framework.springsecurity;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.javaee.ch16.common.response.GlobalCodeEnum;
import com.javaee.ch16.common.response.ResultVo;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import java.io.IOException;

// @Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {
    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException ex)
            throws IOException, ServletException {

        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);
        // Map<String, Object> result = new HashMap<>();
        // result.put("code", 403);
        // result.put("message", "权限不足");
        // result.put("data", null);

        ResultVo resultVo = ResultVo.build(GlobalCodeEnum.FORBIDDEN, "权限不足");

        // 你可以用自己的	ResultVo对象
        response.getWriter().write(objectMapper.writeValueAsString(resultVo));
    }
}