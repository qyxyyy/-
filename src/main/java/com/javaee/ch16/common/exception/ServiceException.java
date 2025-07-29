package com.javaee.ch16.common.exception;


/**
 * description: 封装服务层的异常基类
 */
// @Getter
public class ServiceException extends  RuntimeException {

    public ServiceException(String message) {
        super(message);
    }
}
