package com.javaee.ch16.domain.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.util.Date;
import lombok.*;
import com.baomidou.mybatisplus.annotation.TableName;

/**
 * <p>
 * 图书副本表
 * </p>
 *
 * @author author
 * @since 2025-05-05
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("book_copy")
public class BookCopy {

    /**
     * 副本ID
     */
    @TableId(value = "copy_id", type = IdType.AUTO)
    private Long copyId;

    /**
     * 图书ID
     */
    private Long bookId;

    /**
     * 条形码
     */
    private String barcode;

    /**
     * 存放位置
     */
    private String location;

    /**
     * 副本状态：1=在库，0=借出
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
}
