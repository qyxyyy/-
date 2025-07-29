package com.javaee.ch16.service;

import com.javaee.ch16.domain.entity.BookCategory;
import com.baomidou.mybatisplus.extension.service.IService;
import com.javaee.ch16.domain.dto.BookCategoryDto;

import java.util.List;

/**
 * <p>
 * 图书分类表 服务类
 * </p>
 *
 * @author author
 * @since 2025-04-26
 */
public interface BookCategoryService extends IService<BookCategory> {
    /**
     * 添加
     */
    public void addBookCategory(BookCategoryDto addDto);

    /**
     * 更新对象
     */
    public void updateBookCategory(BookCategoryDto updateDto);


    public List<BookCategory> listCategoryByStatus(int status);

}
