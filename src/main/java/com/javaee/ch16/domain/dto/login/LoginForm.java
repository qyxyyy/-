package com.javaee.ch16.domain.dto.login;

import lombok.Data;

@Data
public class LoginForm {
    private String username;
    private String password;
}