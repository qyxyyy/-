package com.javaee.ch16.service.impl;

import com.javaee.ch16.common.exception.ServiceException;
import com.javaee.ch16.domain.entity.Dept;
import com.javaee.ch16.mapper.DeptMapper;
import com.javaee.ch16.service.DeptService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.javaee.ch16.domain.dto.DeptDto;
import com.javaee.ch16.domain.dto.queryDto.DeptQueryDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;

import java.util.List;

/**
 * <p>
 * 部门 服务实现类
 * </p>
 *
 * @author author
 * @since 2025-05-04
 */
@Slf4j
@Service
@Transactional
public class DeptServiceImpl extends ServiceImpl<DeptMapper, Dept> implements DeptService {
    /**
    * 添加
    */
    @Override
    public void addDept(DeptDto addDto) {
        Dept dept = new Dept();
        // 业务逻辑

        // 将dto数据复制到${$objName}实体类}
        BeanUtils.copyProperties(addDto, dept);
        // 设置默认字段

        // 保存对象
        if(!super.save(dept)) {
            throw  new ServiceException("系统错误,添加操作失败!")   ;
        }
    }


    /**
    * 复杂条件查询
    */
    @Override
    public List<Dept> query(DeptQueryDto queryDto) {
          // 查询
        List<Dept> list =this.lambdaQuery()
                            .list();
         return list;
    }

    /**
     * 更新
     */
    @Override
    public void updateDept(DeptDto updateDto) {
             Dept dept = new Dept();

         // 将dto转换为实体类
         BeanUtils.copyProperties(updateDto, dept);

         // 进行增量更新
        if(!this.updateById(dept)){
            throw new ServiceException("系统错误,更新操作失败!");
        }
    }

}
