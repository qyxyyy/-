package com.javaee.ch16.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
public class VerifyCodeService {

    private static final String REDIS_KEY_PREFIX = "auth:code:";

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    // 生成5位验证码并存入Redis，过期20秒

    /**
     * 生成并返回验证码字符串
     */
    public String generateCode(String phone) {
        // 检查手机号是否为空或长度是否小于5，以确保手机号格式正确
        if (phone == null || phone.length() < 5) throw new IllegalArgumentException("手机号格式有误");

        // 生成一个5位数的随机验证码，不足5位时前面补0
        String code = String.format("%05d", new Random().nextInt(100000));

        // 构造Redis存储验证码的键名
        String key = REDIS_KEY_PREFIX + phone;

        // 将验证码存储到Redis，并设置过期时间为20秒
        redisTemplate.opsForValue().set(key, code, 20, TimeUnit.SECONDS);

        // 返回生成的验证码
        return code;
    }


    // 校验验证码
    public boolean verifyCode(String phone, String code) {
        String key = REDIS_KEY_PREFIX + phone;
        Object cachedCode = redisTemplate.opsForValue().get(key);
        return code != null && code.equals(cachedCode);
    }
}