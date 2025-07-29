package com.javaee.ch16.domain.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.io.Serializable;
import java.util.Date;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * <p>
 * 角色表
 * </p>
 *
 * @author author
 * @since 2025-05-01
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("sys_role")
public class Role {

    /**
     * 角色ID
     */
    @TableId(value = "role_id", type = IdType.AUTO)
    private Long roleId;

    /**
     * 角色代码
     */
    private String roleCode;

    /**
     * 角色名称
     */
    private String roleName;

    /**
     * 角色描述
     */
    private String description;

    /**
     * 创建时间
     */
    private Date createdTime;

    /**
     * 更新时间
     */
    private Date updatedTime;

    /**
     * 角色状态：1=启用，0=禁用
     */
    private Integer status;

    /**
     * 创建人
     */
    private String createdBy;

    /**
     * 更新人
     */
    private String updatedBy;
}
