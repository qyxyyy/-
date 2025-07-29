package com.javaee.ch16.common.exception;


import com.javaee.ch16.common.response.GlobalCodeEnum;
import com.javaee.ch16.common.response.ResultVo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.BindException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.stream.Collectors;

/**
 * description: 全局异常处理类，包含Service异常处理、参数校验异常、Http方法异常和通用异常处理方法
 *
 * @author: hevean
 * @date: 2022/04/05
 */
@Slf4j
// @ControllerAdvice
// @RestController
@RestControllerAdvice
public class GlobalExceptionHandler {
    /**
     * 通用的服务层异常处理
     */
    @ExceptionHandler(ServiceException.class)
    public ResultVo handleServiceException(ServiceException e) {
        log.error("业务层异常:" + e.toString() + "_" + e.getMessage(), e);
        // 返回Service层异常信息
        return ResultVo.systemException(GlobalCodeEnum.SERVICE_ERROR, e.getMessage());
    }

    /**
     * 处理参数校验不合法异常1
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResultVo handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        // e.printStackTrace();
        // log.error("参数校验失败:" + e.toString() + "_" + e.getMessage(), e);
        // 获取参数错误提示信息,包含多个错误信息
        List<String> errorMessage = e.getBindingResult().getFieldErrors().stream()
                .map(s -> s.getField() + ":" + s.getDefaultMessage()).collect(Collectors.toList());
        return ResultVo.systemException(GlobalCodeEnum.FAIL_9997, errorMessage);
    }

    /**
     * 处理参数校验不合法异常2
     */
    @ExceptionHandler(BindException.class)
    public ResultVo handleBindExceptionException(BindException e) {
        log.error("参数校验异常:" + e.toString() + "_" + e.getMessage(), e);

        // 获取参数错误提示信息
        List<String> errorMessage = e.getBindingResult().getFieldErrors().stream()
                .map(s ->  s.getField()+ ":"+ s.getDefaultMessage())
                .collect(Collectors.toList());
        return ResultVo.systemException(GlobalCodeEnum.FAIL_9997, errorMessage);
    }


    /**
     * 处理接口请求方法不合法异常
     */
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResultVo handleMethodNotSupportExceptionException(HttpRequestMethodNotSupportedException e) {
        // log.error("Method方法异常:" + e.toString() + "_" + e.getMessage(), e);

        // 获取参数错误提示信息
        String errorMessage = "此接口不支持" + e.getMethod();
        return ResultVo.systemException(GlobalCodeEnum.FAIL_9996, errorMessage);
    }

    /**
     * 处理权限不足异常
     */
    @ExceptionHandler(AccessDeniedException.class)
    public ResultVo handleAccessDeniedException(Exception e) {
        log.error(e.toString() + "_" + e.getMessage(), e);
        return ResultVo.systemException(GlobalCodeEnum.UNAUTHORIZED, e.getMessage());
    }
    // 处理非法参数异常
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResultVo handleMethodArgumentTypeMismatchExceptionException(IllegalArgumentException e) {
        log.error("非法参数错误:"+ e.getClass().getName() + "_"+e.getMessage());
        return ResultVo.systemException(GlobalCodeEnum.FAIL_9998,  e.getMessage());
    }

    /**
     * 处理其他所有的系统异常
     */
    @ExceptionHandler(Exception.class)
    public ResultVo handleDefaultException(Exception e) {
        e.printStackTrace();
        log.error("系统错误:"+ e.getClass().getName() + "_"+e.getMessage());
        return ResultVo.systemException(GlobalCodeEnum.INTERNAL_SERVER_ERROR, e.getMessage());
    }
}
