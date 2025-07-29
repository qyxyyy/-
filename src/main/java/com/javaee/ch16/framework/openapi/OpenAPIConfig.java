package com.javaee.ch16.framework.openapi;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


/**
 * @Description swagger 3.0配置文件，用于生成api接口文档
 * Swagger3原始文档访问地址:http://localhost:8080/swagger-ui/
 **/

@Configuration
public class OpenAPIConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                       .title("你的API标题")
                                .description("你的API描述")

        .version("1.0.0"));
    }
}