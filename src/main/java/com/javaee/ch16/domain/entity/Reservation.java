package com.javaee.ch16.domain.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import java.util.Date;
import lombok.*;
import com.baomidou.mybatisplus.annotation.TableName;

/**
 * <p>
 * 预约表
 * </p>
 *
 * @author author
 * @since 2025-05-13
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {

    @TableId(value = "res_id", type = IdType.AUTO)
    private Long resId;

    /**
     * 图书ID
     */
    private Long bookId;

    /**
     * 读者ID
     */
    private Integer readerId;

    /**
     * 预约日期
     */
    private Date reservationDate;

    /**
     * 预约状态：1=待处理，2=已完成，3=已取消,4-超期作废
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
     * 备注
     */
    private String remark;

    /**
     * 创建人
     */
    private String createdBy;

    /**
     * 更新人
     */
    private String updatedBy;
}
