package com.javaee.ch16.domain.dto;


import lombok.*;

import java.util.Date;

/**
 * <p>
 * 图书分类表
 * </p>
 *
 * @author author
 * @since 2025-04-26
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookCategoryDto {

    private Long categoryId;
    private String categoryName;
    private Integer status;
    private String description;
}
