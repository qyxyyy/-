package com.javaee.ch16.service.task;

import com.javaee.ch16.tools.CronUtils;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

//@Component
@Component
public class CustomCronTask {
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    @Scheduled(cron = "${custom.cron}") // 也可以从配置文件中读取，这里设置默认值
    public void executeTask() {
        System.out.println("定时任务执行了：" + dateFormat.format(new Date()));
    }
}