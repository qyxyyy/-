package com.javaee.ch16.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.javaee.ch16.domain.entity.UserRole;
import com.javaee.ch16.mapper.UserRoleMapper;
import com.javaee.ch16.service.UserRoleService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.apache.commons.lang3.StringUtils;

/**
 * <p>
 * 用户角色关联表 服务实现类
 * </p>
 *
 * @author author
 * @since 2025-05-20
 */
@Slf4j
@Service
@Transactional
public class UserRoleServiceImpl extends ServiceImpl<UserRoleMapper, UserRole> implements UserRoleService {

}
