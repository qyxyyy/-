package com.javaee.ch16.domain.dto.queryDto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
public class RoleQueryDto {
    private String roleCode;
    private String roleName;
    private Integer status;
}
