package com.javaee.ch16.framework.springsecurity;//package com.javaee.ch16.framework.springsecurity;

import com.javaee.ch16.common.exception.ServiceException;
import com.javaee.ch16.domain.entity.Dept;
import com.javaee.ch16.domain.entity.Role;
import com.javaee.ch16.domain.entity.User;
import com.javaee.ch16.domain.entity.UserRole;
import com.javaee.ch16.service.DeptService;
import com.javaee.ch16.service.RoleService;
import com.javaee.ch16.service.UserRoleService;
import com.javaee.ch16.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private UserRoleService userRoleService;

    @Autowired
    private DeptService deptService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 1. 查找用户
        User user = userService.findByUsername(username);

        // 2. 查询用户角色
        UserRole ur = userRoleService.lambdaQuery().eq(UserRole::getUserId, user.getUserId()).one();
        if (ur == null) throw new ServiceException("用户还没分配角色");
        Role role =roleService.lambdaQuery().eq(Role::getRoleId, ur.getRoleId()).one();
        if (role == null) throw new ServiceException("用户角色不存在");
        // 3. 查询部门
        Dept dept = deptService.lambdaQuery().eq(Dept::getDeptId, user.getDeptId()).one();

        // 4. 返回UserDetails对象
        return UserDetailsImpl.builder()
                .username(user.getUsername())
                .name(user.getName())
                .password(user.getPassword())
                .dept(dept)
                .enableState(user.getStatus()==1)
                .id(user.getUserId())
                .role(role)
                .build();
    }
}