package com.javaee.ch16.domain.dto.queryDto;


import lombok.Data;

@Data
public class UserQueryDto {
    private String username;
    private String email;
    private String mobilePhone;
    private Integer status;
}
