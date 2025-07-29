package com.javaee.ch16.mapper;

import com.javaee.ch16.domain.entity.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * 系统用户表 Mapper 接口
 * </p>
 *
 * @author author
 * @since 2025-05-01
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {

}
