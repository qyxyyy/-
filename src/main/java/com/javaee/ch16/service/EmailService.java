package com.javaee.ch16.service;

public interface EmailService {
    void sendPasswordResetEmail(String to, String newPassword);
} 