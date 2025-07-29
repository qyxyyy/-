package com.javaee.ch16.domain.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import java.util.Date;
import lombok.*;
import com.baomidou.mybatisplus.annotation.TableName;

/**
 * <p>
 * 读者表
 * </p>
 *
 * @author author
 * @since 2025-05-05
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Reader {

    @TableId(value = "reader_id", type = IdType.AUTO)
    private Long readerId;

    /**
     * 学号/工号
     */
    private String readerNumber;

    /**
     * 读者姓名
     */
    private String name;

    /**
     * 年级专业
     */
    private String gradeMajor;

    /**
     * 性别，M-男，F-女
     */
    private String gender;

    /**
     * 读者相片
     */
    private String avatarUrl;

    /**
     * 读者类型：1=学生，2=职工
     */
    private Integer type;

    /**
     * 借书额度
     */
    private Integer borrowLimit;

    /**
     * 邮箱地址
     */
    private String email;

    /**
     * 联系电话
     */
    private String phone;

    /**
     * 所属部门ID
     */
    private Integer departmentId;

    /**
     * 读者状态：1=活跃,0=禁用
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

    /**
     * 备注
     */
    private String remark;

    /**
     * 关联的用户ID
     */
    private Long userId;
}
