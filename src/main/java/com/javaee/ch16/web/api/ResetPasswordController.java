package com.javaee.ch16.web.api;

import com.javaee.ch16.common.response.ResultVo;
import com.javaee.ch16.domain.dto.ResetPasswordDto;
import com.javaee.ch16.domain.entity.User;
import com.javaee.ch16.service.EmailService;
import com.javaee.ch16.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

@RestController
public class ResetPasswordController {

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/api/reset-password")
    public ResultVo<?> resetPassword(@RequestBody ResetPasswordDto resetPasswordDto) {
        try {
            // 1. 验证用户名是否存在
            User user = userService.findByUsername(resetPasswordDto.getUsername());
            if (user == null) {
                return ResultVo.fail("用户名不存在");
            }

            // 2. 生成新密码并更新
            String newPassword = generateRandomPassword();
            user.setPassword(passwordEncoder.encode(newPassword));
            userService.updateById(user);

            // 3. 发送邮件
            emailService.sendPasswordResetEmail(resetPasswordDto.getEmail(), newPassword);
            return ResultVo.ok();
            
        } catch (Exception e) {
            return ResultVo.fail("重置密码失败，请稍后重试");
        }
    }

    private String generateRandomPassword() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 8; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }
        return sb.toString();
    }
} 