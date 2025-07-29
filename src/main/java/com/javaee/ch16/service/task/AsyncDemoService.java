package com.javaee.ch16.service.task;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;

import java.util.concurrent.Future;

/**
 * 演示 Spring 异步业务处理的服务类。
 */
@Service
@Slf4j
public class AsyncDemoService {


    /**
     * 模拟无返回值的异步邮件发送任务
     */
    // @Async
    public void sendEmail() throws Exception {
        String threadName = Thread.currentThread().getName();
        log.info("调用发送邮件业务方法... 当前线程: {}", threadName);

        long startTime = System.currentTimeMillis();
        Thread.sleep(8000);  // 模拟耗时8秒
        long endTime = System.currentTimeMillis();

        log.info("邮件业务执行完成，耗时：{} ms，线程: {}", (endTime - startTime), threadName);
    }

    /**
     * 模拟有返回值的异步统计A任务
     */
    @Async("taskExecutor")
    public Future<Integer> processA() throws InterruptedException {
        String threadName = Thread.currentThread().getName();
        log.info("开始分析并统计业务A数据... 当前线程: {}", threadName);

        long startTime = System.currentTimeMillis();
        Thread.sleep(4000);  // 模拟耗时4秒

        int count = 123456;  // 假设结果
        long endTime = System.currentTimeMillis();

        log.info("业务A数据统计完成，耗时：{} ms，线程: {}", (endTime - startTime), threadName);
        return new AsyncResult<>(count);
    }

    @Async
    public Future<Integer> processB() throws InterruptedException {
        String threadName = Thread.currentThread().getName();
        log.info("开始分析并统计业务B数据... 当前线程: {}", threadName);

        long startTime = System.currentTimeMillis();
        Thread.sleep(5000);  // 模拟耗时5秒

        int count = 654321; // 假设结果
        long endTime = System.currentTimeMillis();

        log.info("业务B数据统计完成，耗时：{} ms，线程: {}", (endTime - startTime), threadName);
        return new AsyncResult<>(count);
    }
}