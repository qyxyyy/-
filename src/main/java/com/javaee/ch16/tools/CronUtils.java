package com.javaee.ch16.tools;

import java.util.regex.Pattern;


import java.util.regex.Pattern;

import org.springframework.scheduling.support.CronTrigger;

public class CronUtils {
    public static boolean isValidCron(String cronExpression) {
        try {
            // Spring的CronTrigger支持6位表达式（秒 分 时 日 月 周）
            new CronTrigger(cronExpression);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}