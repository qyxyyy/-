package com.javaee.ch16.web.task;

import com.javaee.ch16.service.task.AsyncDemoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.Future;


/**
 * Spring Boot 异步任务演示控制器
 */
@RestController
@Slf4j
public class AsyncDemoController {
    @Autowired
    private AsyncDemoService myService;
    // 无返回值异步任务（发送邮件案例）
    @GetMapping("/sendEmail")
    public String sendEmail() throws Exception {
        myService.sendEmail(); // 异步提交任务
        return "邮件发送任务执行完成";
    }
    @GetMapping("/count")
    public String count() throws Exception {
        long startTime = System.currentTimeMillis();

        Future<Integer> futureA = myService.processA();
        Future<Integer> futureB = myService.processB();

        // 阻塞等待两个异步任务结果返回
        int total = futureA.get() + futureB.get();

        long endTime = System.currentTimeMillis();
        log.info("异步任务数据统计汇总结果：{}，耗时：{}ms", total, (endTime - startTime));

        return "统计完成，耗时：" + (endTime - startTime) + " 毫秒；结果：" + total;
    }

}