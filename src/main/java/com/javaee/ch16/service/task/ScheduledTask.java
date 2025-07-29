package com.javaee.ch16.service.task;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;

@Service
public class ScheduledTask {

    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    // 每5秒触发一次任务
    // 每5秒触发一次任务
   // @Scheduled(fixedRate = 5000)
    //public void fixedRateTask() {
      // System.out.println("固定频率任务：" + dateFormat.format(new Date()));
   //}
    /*@Scheduled(fixedDelay = 3000)
    public void fixedDelayTask() throws InterruptedException {
        Thread.sleep(3000);
        System.out.println("固定延迟任务：" + dateFormat.format(new Date()));
    }*/
    @Scheduled(cron = "10 * * * * ?")
    public void scheduledTaskMethod() {
        System.out.println("定时任务执行了：" + dateFormat.format(new Date()));
        // 此处可编写如数据备份、自动更新等业务逻辑
    }
}