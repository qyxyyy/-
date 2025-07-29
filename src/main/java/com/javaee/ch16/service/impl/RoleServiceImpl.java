package com.javaee.ch16.service.impl;

import com.javaee.ch16.common.exception.ServiceException;
import com.javaee.ch16.domain.entity.Role;
import com.javaee.ch16.mapper.RoleMapper;
import com.javaee.ch16.service.RoleService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.javaee.ch16.domain.dto.RoleDto;
import com.javaee.ch16.domain.dto.queryDto.RoleQueryDto;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.BeanUtils;
import org.apache.commons.lang3.StringUtils;

import java.util.List;

/**
 * <p>
 * 角色表 服务实现类
 * </p>
 *
 * @author author
 * @since 2025-05-01
 */
@Service
@Transactional
public class RoleServiceImpl extends ServiceImpl<RoleMapper, Role> implements RoleService {
    /**
     * 添加
     */
    @Override
    public void addRole(RoleDto addDto) {
        Role role = new Role();
        BeanUtils.copyProperties(addDto, role);
        // 保存对象
        if (!super.save(role)) {
            throw new ServiceException("系统错误,添加操作失败!");
        }
    }

    @Override
    public List<Role> listByStatus(int status) {
        return this.lambdaQuery().eq(Role::getStatus, status).list();
    }


    @Override
    public List<Role> query(RoleQueryDto queryDto) {

        return this.lambdaQuery()
                // 补充查询条件
                .like(StringUtils.isNotBlank(queryDto.getRoleName()), Role::getRoleName, queryDto
                        .getRoleName())
                .like(StringUtils.isNotBlank(queryDto.getRoleCode()), Role::getRoleCode, queryDto
                        .getRoleCode())
                .eq(queryDto.getStatus() != null, Role::getStatus, queryDto.getStatus())
                .orderByDesc(Role::getCreatedTime).list();
    }


    /**
     * 更新
     */
    @Override
    @CachePut(cacheNames = "role", key = "#result.roleId")
    public Role updateRole(RoleDto updateDto) {
        Role role = new Role();
        // 将dto转换为实体类
        BeanUtils.copyProperties(updateDto, role);
        if (!super.updateById(role)) {
            throw new ServiceException("系统错误,更新操作失败!");
        }
        return super.getById(role.getRoleId());
    }


    @Override
    @Cacheable(cacheNames = "role", key = "#roleId", unless = "#result == null")
    public Role getRoleById(Long roleId) {
        return super.getById(roleId);
    }

    @Override
    @CacheEvict(cacheNames = "role", key = "#roleId")
    public boolean removeRoleById(Long roleId) {
        return super.removeById(roleId);
    }
}
