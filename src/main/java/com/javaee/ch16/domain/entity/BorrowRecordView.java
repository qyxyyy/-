package com.javaee.ch16.domain.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import java.math.BigDecimal;
import java.util.Date;
import lombok.*;
import com.baomidou.mybatisplus.annotation.TableName;

/**
 * <p>
 * VIEW
 * </p>
 *
 * @author author
 * @since 2025-05-14
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("borrow_record_view")
public class BorrowRecordView {

    /**
     * 借阅记录ID
     */
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
     * 是否逾期
     */
    private Boolean isOverdue;

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

    /**
     * 书名
     */
    private String bookName;

    private String isbn;

    /**
     * 作者
     */
    private String author;

    /**
     * 图书的唯一标识符
     */
    private Long bookId;

    /**
     * 副本状态：1=在库，0=借出, 2=遗失
     */
    private Integer copyStatus;

    /**
     * 读者姓名
     */
    private String readerName;
    private String copyBarcode;
    private String readerNumber;
}
