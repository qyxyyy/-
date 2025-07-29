package com.javaee.ch16.redis;


import com.javaee.ch16.domain.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.*;
import java.util.concurrent.TimeUnit;

@SpringBootTest
public class RedisTemplateTest {

    @Autowired
    private RedisTemplate redisTemplate;

    @Test
    public void testWriteStr() {
        // 设置用户ID为1001的姓名为"abc"，有效期为10分钟
        redisTemplate.opsForValue().set("user:1001:name", "abc", 10, TimeUnit.MINUTES);
        
        // 获取用户ID为1001的姓名
        String name = (String) redisTemplate.opsForValue().get("user:1001:name");
    }
    @Test
    public void testWriteMap() {
        Map<String, Object> userMap = new HashMap<>();
        userMap.put("name", "李四");
        userMap.put("age", 22);
        redisTemplate.opsForHash().putAll("user:1002", userMap);
        Object age = redisTemplate.opsForHash().get("user:1002", "age");
    }

    @Test
    public void testWriteSet() {
        redisTemplate.opsForSet().add("article:likes", "user1", "user2");
        Set<Object> likes = redisTemplate.opsForSet().members("article:likes");
    }


    @Test
    public void test() throws Exception {
        redisTemplate.opsForValue().set("student:1", "张三");
        System.out.println(redisTemplate.opsForValue().get("student:1"));
    }


    @Test
    public void testWriteObj() {
        User user = User.builder()
                .username("admin")
                .email("admin@zsc.edu.cn")
                .password("123456").build();
        redisTemplate.opsForValue().set("user:1001", user, 50, TimeUnit.SECONDS);

        // 获取用户ID为1001的姓名
        User user1 = (User) redisTemplate.opsForValue().get("user:1001");
        System.out.println(user1);
    }

    @Test
    public void testWriteZet() {
        redisTemplate.opsForZSet().add("score:rank", "Tom", 500);
        redisTemplate.opsForZSet().add("score:rank", "Jack", 400);
        redisTemplate.opsForZSet().add("score:rank", "Mike", 600);
        Set<Object> ranks = redisTemplate.opsForZSet().reverseRange("score:rank", 0, 2);

        for (Object rank : ranks) {
            System.out.println(rank);
        }
    }

    @Test
    public void testWriteZet2() {
        // 批量添加评论（高效插入多条数据）
        List<String> newComments = Arrays.asList("精彩内容！",
                "很有见解",
                "支持作者",
                "提出的解决方案很有参考价值！",         // 解决方案认可
                "希望能多分享一些实操经验～",
                "路过支持，已转发给同事！",
                "很有见解的观点，引发了新的思考✨"    );
        redisTemplate.opsForList().leftPushAll("news:comments", newComments);

        List<Object> comments = redisTemplate.opsForList().range("news:comments", 0, 4);
        for (Object comment : comments) {
            System.out.println(comment);
        }
    }
}
