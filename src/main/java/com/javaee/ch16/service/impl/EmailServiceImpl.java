package com.javaee.ch16.service.impl;

import com.javaee.ch16.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {
    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Override
    public void sendPasswordResetEmail(String to, String newPassword) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(to);
        message.setSubject("密码重置通知");
        message.setText("您的新密码是: " + newPassword + "\n请登录后及时修改密码。");
        mailSender.send(message);
    }
} 