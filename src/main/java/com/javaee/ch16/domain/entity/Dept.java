package com.javaee.ch16.domain.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.util.Date;
import lombok.*;
import com.baomidou.mybatisplus.annotation.TableName;

/**
 * <p>
 * 部门
 * </p>
 *
 * @author author
 * @since 2025-05-04
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("sys_dept")
public class Dept {

    @TableId(value = "dept_id", type = IdType.AUTO)
    private Long deptId;

    /**
     * 名称
     */
    private String name;

    /**
     * 负责人
     */
    private String manager;

    /**
     * 部门状态：1=启用，0=禁用
     */
    private Integer status;

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
