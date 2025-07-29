package com.javaee.ch16;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@SpringBootApplication
@EnableCaching
@EnableAsync
@EnableScheduling
public class Ch16Application {
    public static void main(String[] args) {
        SpringApplication.run(com.javaee.ch16.Ch16Application.class, args);
    }

}
