package com.javaee.ch16.service.task;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import java.io.File;
import java.util.Map;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

/**
 * @Classname SendEmailService
 * @Description TODO
 * @Date 2019-3-12 9:04
 * @Created by CrazyStone
 */
@Service
@Slf4j
public class SendEmailService {
    @Autowired
    private TemplateEngine templateEngine;
    @Autowired
    private JavaMailSenderImpl mailSender;

    @Value("${spring.mail.username}")
    private String from;
    /**
     * 发送纯文本邮件
     * @param to       收件人地址
     * @param subject  邮件标题
     * @param text     邮件内容
     */
    @Async
    public void sendSimpleEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        try {
            mailSender.send(message);
            log.info("纯文本邮件发送成功，收件人: {}", to);
        } catch (MailException e) {
            log.error("纯文本邮件发送失败，收件人: {}", to, e);
        }
    }

    /**
     * 发送HTML模板邮件
     */
    @Async
    public void sendHtmlEmail(String to, String subject, String htmlContent) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true); // 第二个参数设为true表示为HTML

            mailSender.send(message);
            log.info("HTML邮件发送成功 to: {}", to);
        } catch (MessagingException e) {
            log.error("HTML邮件发送失败 to: {}", to, e);
            throw new RuntimeException("邮件发送失败", e);
        }
    }
        /**
         * 使用Thymeleaf模板发送邮件
         */
        @Async("taskExecutor")
        public void sendThymeleafEmail(String to, String subject, String templateName, Map<String, Object> variables) {
            if (templateEngine == null) {
                throw new IllegalStateException("Thymeleaf模板引擎未配置");
            }
            Context context = new Context();
            context.setVariables(variables);
            String htmlContent = templateEngine.process(templateName, context);

            sendHtmlEmail(to, subject, htmlContent);
        }
    public void sendEmailWithAttachment(String to, String subject, String text, String filePath) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, false);

            File file = new File(filePath);
            helper.addAttachment(file.getName(), file);

            mailSender.send(message);
            log.info("带附件邮件发送成功 to: {}", to);
        } catch (MessagingException e) {
            log.error("带附件邮件发送失败 to: {}", to, e);
            throw new RuntimeException("邮件发送失败", e);
        }
    }
    }