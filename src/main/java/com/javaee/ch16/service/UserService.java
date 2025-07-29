package com.javaee.ch16.service;

import com.javaee.ch16.domain.entity.User;
import com.baomidou.mybatisplus.extension.service.IService;
import com.javaee.ch16.domain.dto.UserDto;
import com.javaee.ch16.domain.dto.queryDto.UserQueryDto;

import java.util.List;

/**
 * <p>
 * 系统用户表 服务类
 * </p>
 *
 * @author author
 * @since 2025-05-01
 */
public interface UserService extends IService<User> {
    // 添加用户
    void addUser(UserDto addDto);

    // 更新用户
    void updateUser(UserDto updateDto);

    // 复杂条件查询，包含分页信息
    List<User> query(UserQueryDto queryDto);

    User getUserById(Long userId);

    boolean removeUserById(Long userId);

    User findByUsername(String username);
}