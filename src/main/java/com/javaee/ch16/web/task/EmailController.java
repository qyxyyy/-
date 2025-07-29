package com.javaee.ch16.web.task;

import cn.hutool.core.util.RandomUtil;
import com.javaee.ch16.service.task.SendEmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 *
 */
@RestController
@Slf4j
public class EmailController {
    @Autowired
    private SendEmailService emailService;

    private String receiver = "15107616339@163.com";

    @GetMapping("/sendSimpleEmail")
    public String sendSimpleEmail() {
        String luckCode = RandomUtil.randomNumbers(5);
        String content = "新运数字为:" + luckCode + ". 请不要点击:http://175.178.236.98/1.html";
        emailService.sendSimpleEmail(receiver, "纯文本邮件测试...", content);
        return "邮件已经发送到 " + receiver + "，请稍后登录邮箱查看";
    }
    @GetMapping("/sendHtmlEmail")
    public String sendHtmlEmail() {
        emailService.sendHtmlEmail(receiver, "HTML邮件", "<html><h1>这是HTML邮件</h1></html>");
        return "HTML邮件已经发送到" + receiver + "，请查收";
    }
    @GetMapping("/sendTemplateEmail")
    public String sendTemplateEmail() {
        String templateName = "emailTemplate_1";
        String code = RandomUtil.randomNumbers(6);
        emailService.sendThymeleafEmail(
                receiver,
                "使用模板发送email",
                templateName,
                Map.of("username", "孤勇者", "code", code)
        );
        return "模板邮件已发送到 " + receiver + "，请查收验证码";
    }
    // 发送HTML邮件
    @GetMapping("/sendEmailWithFile")
    public String sendEmailWithAttachment() throws Exception {

        String filepath = "D:\\ruanjiangongchen\\basepath\\微信图片_20250422113317.jpg";
        emailService.sendEmailWithAttachment(receiver, "带附件的邮件", "这是带附件的电子邮件", filepath);
        return "带附件的邮件已经发送到" + receiver + ",请稍后登录邮箱查看校验码";
    }
}
