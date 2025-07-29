package com.javaee.ch16.service.impl;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.javaee.ch16.common.exception.ServiceException;
import com.javaee.ch16.common.pagination.PageResult;
import com.javaee.ch16.domain.entity.Book;
import com.javaee.ch16.mapper.BookMapper;
import com.javaee.ch16.service.BookService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.javaee.ch16.domain.dto.BookDto;
import com.javaee.ch16.domain.dto.queryDto.BookQueryDto;
import com.javaee.ch16.domain.vo.BookIsbnVo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.BeanUtils;
import org.apache.commons.lang3.StringUtils;

import java.util.List;
import java.util.stream.Collectors;

/**
 * <p>
 * 图书信息表 服务实现类
 * </p>
 *
 * @author author
 * @since 2025-04-26
 */
@Service
@Transactional
public class BookServiceImpl extends ServiceImpl<BookMapper, Book> implements BookService {
    /**
     * 添加
     */
    @Override
    public void addBook(BookDto addDto) {
        Book book = new Book();
        // 业务逻辑

        // 将dto数据复制到${$objName}实体类}
        BeanUtils.copyProperties(addDto, book);
        // 设置默认字段

        // 保存对象
        if (!this.save(book)) {
            throw new ServiceException("系统错误,图书添加失败!");
        }
    }


    /**
     * 复杂条件查询
     */
    @Override
    public PageResult queryBooks(BookQueryDto queryDto) {

        Page<Book> result = this.lambdaQuery()
                .like(StringUtils.isNotBlank(queryDto.getTitle()), Book::getTitle, queryDto.getTitle())
                .like(StringUtils.isNotBlank(queryDto.getAuthor()), Book::getAuthor, queryDto.getAuthor())
                .eq(StringUtils.isNotBlank(queryDto.getIsbn()), Book::getIsbn, queryDto
                        .getIsbn())
                .like(StringUtils.isNotBlank(queryDto.getPublisher()), Book::getPublisher, queryDto
                        .getPublisher())
                // 优化时间范围查询条件
                .ge(queryDto.getYearFrom() != null, Book::getPublicationYear, queryDto.getYearFrom())
                .le(queryDto.getYearTo() != null, Book::getPublicationYear, queryDto.getYearTo())

                .eq(queryDto.getCategoryId() != null, Book::getCategoryId, queryDto.getCategoryId())
                .eq(queryDto.getStatus() != null, Book::getStatus, queryDto.getStatus())
                .orderByDesc(Book::getCreatedTime)
                .page(queryDto.convetToPage());

        return PageResult.fromPage(result);
    }

    /**
     * 更新
     */
    @Override
    public void updateBook(BookDto updateDto) {
        Book book = new Book();

        // 将dto转换为实体类
        BeanUtils.copyProperties(updateDto, book);

        // 进行增量更新
        if (!this.updateById(book)) {
            throw new ServiceException("系统错误,图书更新失败!");
        }
    }


    @Override
    public List<BookIsbnVo> listIsbnOptions(String q) {
        // isbn 下拉模糊查，不允许超过10位，limit 10
        return  this.lambdaQuery().select(Book::getIsbn, Book::getTitle)
                .likeRight(Book::getIsbn, q)
                .last("limit 10")
                        .list().stream()
                .map(b -> new BookIsbnVo(b.getIsbn(), b.getTitle()))
                .collect(Collectors.toList());

    }

    @Override
    public Book getBookByIsbn(String isbn) {
        // isbn 查询, 只获取一条记录
        return this.lambdaQuery().eq(Book::getIsbn, isbn).one();
    }

}
