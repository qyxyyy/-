package com.javaee.ch16.service.impl;

import com.javaee.ch16.common.exception.ServiceException;
import com.javaee.ch16.domain.entity.BookCategory;
import com.javaee.ch16.mapper.BookCategoryMapper;
import com.javaee.ch16.service.BookCategoryService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.javaee.ch16.domain.dto.BookCategoryDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.BeanUtils;

import java.util.List;

/**
 * <p>
 * 图书分类表 服务实现类
 * </p>
 *
 * @author author
 * @since 2025-04-26
 */
@Service
@Transactional
public class BookCategoryServiceImpl extends ServiceImpl<BookCategoryMapper, BookCategory> implements BookCategoryService {
    /**
     * 添加
     */
    @Override
    public void addBookCategory(BookCategoryDto addDto) {
        BookCategory bookCategory = new BookCategory();
        // 业务逻辑

        // 将dto数据复制到${$objName}实体类}
        BeanUtils.copyProperties(addDto, bookCategory);
        // 设置默认字段

        // 保存对象
        if (!super.save(bookCategory)) {
            throw new ServiceException("系统错误,添加操作失败!");
        }
    }


    /**
     * 更新
     */
    @Override
    public void updateBookCategory(BookCategoryDto updateDto) {
        BookCategory bookCategory = new BookCategory();

        // 将dto转换为实体类
        BeanUtils.copyProperties(updateDto, bookCategory);

        if (!super.updateById(bookCategory)) {
            throw new ServiceException("系统错误,更新操作失败!");
        }
    }

    // 查询分类
    @Override
    public List<BookCategory> listCategoryByStatus(int status) {
        return this.lambdaQuery().eq(BookCategory::getStatus, status).list();
    }
}
