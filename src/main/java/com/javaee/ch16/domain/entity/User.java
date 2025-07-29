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
 * 系统用户表
 * </p>
 *
 * @author author
 * @since 2025-05-01
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("sys_user")
public class User implements Serializable {

    /**
     * 用户ID
     */
    @TableId(value = "user_id", type = IdType.AUTO)
    private Long userId;

    /**
     * 用户名
     */
    private String username;

    private String password;

    /**
     * 邮箱地址
     */
    private String email;

    /**
     * 手机号
     */
    private String mobilePhone;

    /**
     * 备注
     */
    private String remark;

    /**
     * 用户头像
     */
    private String avatarUrl;

    /**
     * 用户状态：1=启用，0=禁用
     */
    private Integer status;

    /**
     * 上次登录IP
     */
    private String lastLoginIp;

    /**
     * 上一次登录时间
     */
    private Date lastLoginTime;

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

    String name;
    Long deptId;
}
