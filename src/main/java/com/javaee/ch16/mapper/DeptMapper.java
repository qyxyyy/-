package com.javaee.ch16.mapper;

import com.javaee.ch16.domain.entity.Dept;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * 部门 Mapper 接口
 * </p>
 *
 * @author author
 * @since 2025-05-04
 */
@Mapper
public interface DeptMapper extends BaseMapper<Dept> {

}
