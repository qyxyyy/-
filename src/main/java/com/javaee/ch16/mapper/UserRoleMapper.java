package com.javaee.ch16.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.javaee.ch16.domain.entity.UserRole;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * 用户角色关联表 Mapper 接口
 * </p>
 *
 * @author author
 * @since 2025-05-20
 */
@Mapper
public interface UserRoleMapper extends BaseMapper<UserRole> {

}
