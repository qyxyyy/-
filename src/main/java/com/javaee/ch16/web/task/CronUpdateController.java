package com.javaee.ch16.web.task;

import com.javaee.ch16.tools.CronUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.config.ScheduledTaskRegistrar;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.concurrent.ScheduledFuture;

@RestController
@Configuration
@EnableScheduling
public class CronUpdateController implements org.springframework.scheduling.annotation.SchedulingConfigurer {

    private ScheduledTaskRegistrar taskRegistrar;
    private ScheduledFuture<?> future;

    @Override
    public void configureTasks(ScheduledTaskRegistrar taskRegistrar) {
        this.taskRegistrar = taskRegistrar;
        // 初始任务
        if (taskRegistrar.getScheduler() == null) {
            ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();
            scheduler.initialize();
            taskRegistrar.setTaskScheduler(scheduler);
        }
    }

    public void initialTask() {
        System.out.println("初始定时任务执行了：" + LocalDateTime.now());
    }

    @PostMapping  ("/updateCron")
    public String updateCron(@RequestParam String newCron) {
        if (CronUtils.isValidCron(newCron)) {
            // 如已有定时任务，先取消
            if (future != null && !future.isDone()) {
                future.cancel(false);
            }
            CronTrigger trigger = new CronTrigger(newCron);
            // 利用注册器添加新触发条件的任务
            future = taskRegistrar.getScheduler().schedule(
                    () -> System.out.println("更新后的定时任务执行了：" + java.time.LocalDateTime.now()), trigger);
            return "Cron表达式更新成功";
        } else {
            return "无效的Cron表达式";
        }
    }
}