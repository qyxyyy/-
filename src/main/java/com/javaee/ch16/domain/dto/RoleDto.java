package com.javaee.ch16.domain.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * <p>
 * 角色表
 * </p>
 *
 * @author author
 * @since 2025-05-01
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoleDto {
    private Long roleId;
    private String roleCode;
    private String roleName;
    private String description;
    private Integer status;
}
