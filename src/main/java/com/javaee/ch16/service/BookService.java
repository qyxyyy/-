package com.javaee.ch16.service;

import com.javaee.ch16.common.pagination.PageResult;
import com.javaee.ch16.domain.entity.Book;
import com.baomidou.mybatisplus.extension.service.IService;
import com.javaee.ch16.domain.dto.BookDto;
import com.javaee.ch16.domain.dto.queryDto.BookQueryDto;
import com.javaee.ch16.domain.vo.BookIsbnVo;

import java.util.List;

/**
 * <p>
 * 图书信息表 服务类
 * </p>
 *
 * @author author
 * @since 2025-04-26
 */
public interface BookService extends IService<Book> {
    /**
     * 添加
     */
    public void addBook(BookDto addDto);

    /**
     * 更新对象
     */
    public void updateBook(BookDto updateDto);


    /**
     * 复杂条件查询,包含分页信息
     * @return
     */
    public PageResult queryBooks(BookQueryDto queryDto);

    public List<BookIsbnVo> listIsbnOptions(String q);

    public Book getBookByIsbn(String isbn);
}
