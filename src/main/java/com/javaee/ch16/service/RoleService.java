package com.javaee.ch16.service;

import com.javaee.ch16.domain.entity.Role;
import com.baomidou.mybatisplus.extension.service.IService;
import com.javaee.ch16.domain.dto.RoleDto;
import com.javaee.ch16.domain.dto.queryDto.RoleQueryDto;

import java.util.List;

/**
 * <p>
 * 角色表 服务类
 * </p>
 *
 * @author author
 * @since 2025-05-01
 */
public interface RoleService extends IService<Role> {
    /**
     * 添加
     */
    public void addRole(RoleDto addDto);


    public Role updateRole(RoleDto updateDto);

    public List<Role> listByStatus(int status);

    List<Role> query(RoleQueryDto queryDto);

    Role getRoleById(Long roleId);

    boolean removeRoleById(Long roleId);
}
