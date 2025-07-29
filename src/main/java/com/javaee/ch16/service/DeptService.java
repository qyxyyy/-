package com.javaee.ch16.service;

import com.javaee.ch16.domain.entity.Dept;
import com.baomidou.mybatisplus.extension.service.IService;
import com.javaee.ch16.domain.dto.DeptDto;
import com.javaee.ch16.domain.dto.queryDto.DeptQueryDto;

import java.util.List;

/**
 * <p>
 * 部门 服务类
 * </p>
 *
 * @author author
 * @since 2025-05-04
 */
public interface DeptService extends IService<Dept> {
    /**
     * 添加
     */
    public void addDept(DeptDto addDto);

    /**
     * 更新对象
     */
    public void updateDept(DeptDto updateDto);

    /**
     * 复杂条件查询,包含分页信息
     * @param userQueryDto
     * @return
     */
    List<Dept> query(DeptQueryDto queryDto);
}
