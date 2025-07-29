package com.javaee.ch16.framework.redis;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.cache.RedisCacheWriter;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.time.Duration;
import java.time.temporal.ChronoUnit;

@Configuration
public class RedisConfig {

    // 从application.properties中注入Redis缓存的存活时间
    @Value("${redis.cache.time-to-live}")
    private Long timeToLive;

    /**
     * 配置RedisTemplate以使用自定义的序列化方式
     * @param factory Redis连接工厂
     * @return 配置好的RedisTemplate实例
     */
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(factory);

        // 统一用GenericJackson2JsonRedisSerializer
        GenericJackson2JsonRedisSerializer serializer = new GenericJackson2JsonRedisSerializer();
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(serializer);
        redisTemplate.setHashKeySerializer(new StringRedisSerializer());
        redisTemplate.setHashValueSerializer(serializer);

        return redisTemplate;
    }

    /**
     * 配置RedisCacheManager以管理缓存
     * @param redisTemplate Redis模板，用于缓存操作
     * @return 配置好的RedisCacheManager实例
     */
    @Bean
    public RedisCacheManager redisCacheManager(RedisTemplate<String, Object> redisTemplate) {
        RedisCacheConfiguration redisCacheConfiguration = RedisCacheConfiguration.defaultCacheConfig().entryTtl(Duration.ofSeconds(timeToLive)).serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(redisTemplate.getValueSerializer()));

        // 推荐builder方式
        return RedisCacheManager.builder(redisTemplate.getConnectionFactory()).cacheDefaults(redisCacheConfiguration).build();
    }
}
