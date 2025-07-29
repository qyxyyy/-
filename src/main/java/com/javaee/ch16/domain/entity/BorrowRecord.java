package com.javaee.ch16.domain.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.math.BigDecimal;
import java.util.Date;
import lombok.*;
import com.baomidou.mybatisplus.annotation.TableName;

/**
 * <p>
 * 借阅记录表
 * </p>
 *
 * @author author
 * @since 2025-05-13
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("borrow_record")
public class BorrowRecord {

    /**
     * 借阅记录ID
     */
    @TableId(value = "record_id", type = IdType.AUTO)
    private Long recordId;

    /**
     * 图书副本ID
     */
    private Long copyId;

    /**
     * 读者ID
     */
    private Long readerId;

    /**
     * 借阅日期
     */
    private Date borrowDate;

    /**
     * 应还日期
     */
    private Date dueDate;

    /**
     * 实际还书日期
     */
    private Date returnDate;

    /**
     * 逾期天数
     */
    private Integer overdueDays;

    /**
     * 借阅状态：1=借出中，0=已还
     */
    private Integer status;

    /**
     * 是否逾期
     */
    private Integer isOverdue;

    /**
     * 罚款金额
     */
    private BigDecimal fine;

    /**
     * 备注
     */
    private String remark;

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
}
