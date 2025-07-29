package com.javaee.ch16.domain.dto;


import lombok.*;

import java.util.Date;

/**
 * <p>
 * 系统用户表
 * </p>
 *
 * @author author
 * @since 2025-05-01
 */
@Data
public class UserDto {
    private Long userId;
    private String username;
    private String password;
    private String email;
    private String mobilePhone;
    private String remark;
    private String avatarUrl;
    private Integer status;
}
