package com.javaee.ch16.domain.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.util.Date;

import lombok.*;
import com.baomidou.mybatisplus.annotation.TableName;

/**
 * <p>
 * 图书分类表
 * </p>
 *
 * @author author
 * @since 2025-04-26
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("book_category")
public class BookCategory {

    /**
     * 图书分类ID
     */
    @TableId(value = "category_id", type = IdType.AUTO)
    private Long categoryId;

    /**
     * 图书分类名称
     */
    private String categoryName;

    /**
     * 分类状态：1=启用，0=禁用
     */
    private Integer status;

    /**
     * 创建时间
     */
    private Date createdTime;

    /**
     * 更新时间
     */
    private Date updatedTime;

    /**
     * 创建人
     */
    private String createdBy;

    /**
     * 更新人
     */
    private String updatedBy;

    private String description;
}
