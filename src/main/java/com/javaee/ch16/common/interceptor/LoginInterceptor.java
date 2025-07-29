package com.javaee.ch16.common.interceptor;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.javaee.ch16.common.response.GlobalCodeEnum;
import com.javaee.ch16.common.response.ResultVo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;




/**
 * 描述: 用户登录拦截器
 */
@Component
public class LoginInterceptor implements HandlerInterceptor {

    private static final ObjectMapper objectMapper = new ObjectMapper();
    @Autowired
    HttpSession session;

    Logger logger = LoggerFactory.getLogger(LoginInterceptor.class);

    /**
     * 在请求到达Controller控制器之前 通过拦截器执行一段代码
     * 如果方法返回true,继续执行后续操作
     * 如果返回false，执行中断请求处理，请求不会发送到Controller
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        logger.info("拦截器1 在控制器执行之前执行");

        Object user =  session.getAttribute("LoginUser");
        if (user == null){
            ResultVo resultVo = ResultVo.systemException(GlobalCodeEnum.UNAUTHORIZED, "没有访问权限");
            response.setContentType("application/json;charset=UTF-8");
            objectMapper.writeValue(response.getWriter(), resultVo);
            return false;
        }
        return true;
    }

    // /**
    //  * 控制器之后，跳转前
    //  */
    // @Override
    // public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView)
    //         throws Exception {
    //     logger.info("拦截器1 在控制器执行之后执行");
    // }
    //
    // /**
    //  * 跳转之后执行
    //  */
    // @Override
    // public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
    //         throws Exception {
    //     logger.info("拦截器1 最后执行");
    // }
}
