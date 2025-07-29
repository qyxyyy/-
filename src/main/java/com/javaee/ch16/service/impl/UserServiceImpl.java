package com.javaee.ch16.service.impl;

import com.javaee.ch16.common.exception.ServiceException;
import com.javaee.ch16.domain.entity.User;
import com.javaee.ch16.mapper.UserMapper;
import com.javaee.ch16.service.UserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.javaee.ch16.domain.dto.UserDto;
import com.javaee.ch16.domain.dto.queryDto.UserQueryDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.BeanUtils;
import org.apache.commons.lang3.StringUtils;

import java.util.List;

/**
 * <p>
 * 系统用户表 服务实现类
 * </p>
 *
 * @author author
 * @since 2025-05-01
 */
@Service // 标记为 Service 组件
@Transactional // 启用事务管理
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

     @Autowired
    RedisTemplate redisTemplate;
    // 添加用户
    @Override
    public void addUser(UserDto addDto) {
        User user = new User();
        // 将 DTO 数据复制到实体类
        BeanUtils.copyProperties(addDto, user);
        // 设置默认密码（此处演示为简单拼接，实际开发请改为加密）
        user.setPassword(user.getPassword() + "133");
        // 保存对象
        if (!this.save(user)) {
            throw new ServiceException("系统错误,添加操作失败!");
        }
    }

    // 复杂条件查询
    @Override
    public List<User> query(UserQueryDto queryDto) {
        List<User> result = this.lambdaQuery()
                // 用户名模糊查询（非空时生效）
                .like(StringUtils.isNotBlank(queryDto.getUsername()), User::getUsername, queryDto.getUsername())
                // 邮箱模糊查询
                .like(StringUtils.isNotBlank(queryDto.getEmail()), User::getEmail, queryDto.getEmail())
                // 手机号模糊查询
                .like(StringUtils.isNotBlank(queryDto.getMobilePhone()), User::getMobilePhone, queryDto.getMobilePhone())
                // 状态等值查询
                .eq(queryDto.getStatus() != null, User::getStatus, queryDto.getStatus())
                // 按创建时间倒序
                .orderByDesc(User::getCreatedTime)
                .list();

        // 返回查询结果
        return result;
    }

    @Override
    public User getUserById(Long userId) {
        // 从redis缓存查询对象
        Object object  = redisTemplate.opsForValue().get("user:" + userId);
        if (object != null) {
            // 缓存命中，直接返回
            return (User) object;
        } else {
            // 缓存未命中，查询数据库
            User user = super.getById(userId);
            // 将查询结果放入缓存
            redisTemplate.opsForValue().set("user:" + userId, user);
            return user;
        }
    }

    @Override
    public boolean removeUserById(Long userId) {
        // 删除数据库记录
        if (super.removeById(userId)==true){
            // 删除缓存
            redisTemplate.delete("user:" + userId);
            return true;
        }else {
            return false;
        }
    }

    // 更新用户
    @Override
    public void updateUser(UserDto updateDto) {
        User user = new User();
        // DTO 转实体
        BeanUtils.copyProperties(updateDto, user);
        // 根据 ID 更新
        if (super.updateById(user)) {
            // 更新成功, 更新缓存
            redisTemplate.opsForValue().set("user:" + updateDto.getUserId(), user);
        }else {
            throw new ServiceException("系统错误,更新操作失败!");
        }
    }

    @Override
    public User findByUsername(String username) {
        User user = this.lambdaQuery()
                .eq(User::getUsername, username)
                .one();
        if (user == null)
            throw new UsernameNotFoundException("用户不存在");
       return user;
    }
}