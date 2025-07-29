package com.javaee.ch16.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.javaee.ch16.common.pagination.PageResult;
import com.javaee.ch16.domain.entity.BookCopy;
import com.javaee.ch16.domain.dto.BookCopyDto;
import com.javaee.ch16.domain.dto.queryDto.BookCopyQueryDto;
import com.javaee.ch16.domain.vo.BookCopyVo;

/**
 * <p>
 * 图书副本表 服务类
 * </p>
 *
 * @author author
 * @since 2025-05-05
 */
public interface BookCopyService extends IService<BookCopy> {
    /**
     * 添加
     */
    public void addBookCopy(BookCopyDto addDto);

    /**
     * 更新对象
     */
    public void updateBookCopy(BookCopyDto updateDto);

    /**
     * 复杂条件查询,包含分页信息
     * @param userQueryDto
     * @return
     */
    PageResult<BookCopyVo> pageQuery(BookCopyQueryDto queryDto);


    String generateBarcode();

    BookCopyVo getCopyInfoByBarcode(String barcode);
}
