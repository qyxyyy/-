package com.javaee.ch16.service.impl;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.javaee.ch16.common.exception.ServiceException;
import com.javaee.ch16.common.pagination.PageResult;
import com.javaee.ch16.domain.entity.BookCopy;
import com.javaee.ch16.mapper.BookCopyMapper;
import com.javaee.ch16.service.BookCopyService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.javaee.ch16.domain.dto.queryDto.BookCopyQueryDto;
import com.javaee.ch16.domain.vo.BookCopyVo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import com.javaee.ch16.domain.dto.BookCopyDto;

import java.text.SimpleDateFormat;
import java.util.Random;

/**
 * <p>
 * 图书副本表 服务实现类
 * </p>
 *
 * @author author
 * @since 2025-05-05
 */
@Slf4j
@Service
@Transactional
public class BookCopyServiceImpl extends ServiceImpl<BookCopyMapper, BookCopy> implements BookCopyService {
    /**
     * 添加
     */
    @Override
    public void addBookCopy(BookCopyDto addDto) {
        BookCopy bookCopy = new BookCopy();
        // 业务逻辑

        // 将dto数据复制到${$objName}实体类}
        BeanUtils.copyProperties(addDto, bookCopy);
        // 设置默认字段

        // 保存对象
        if (!super.save(bookCopy)) {
            throw new ServiceException("系统错误,添加操作失败!");
        }
    }


    /**
     * 复杂条件查询
     */
    @Override
    public PageResult<BookCopyVo> pageQuery(BookCopyQueryDto queryDto) {
        // 查询
        Page result = baseMapper.pageQuery(queryDto.convetToPage(), queryDto);
        return PageResult.fromPage(result);
    }

    @Override
    public String generateBarcode() {
        long now = System.currentTimeMillis();
        System.out.println(now);
        String timeStr = new SimpleDateFormat("yyMMddHHmmss").format(new java.util.Date(now));
        Random random = new Random();
        int randNum = random.nextInt(100);

        String barcode = "CP"+timeStr+ String.format("%03d", randNum);
        return barcode;
    }

    @Override
    public BookCopyVo getCopyInfoByBarcode(String barcode) {
        // 查询图书副本详细信息
        BookCopyVo bookCopy = baseMapper.getCopyInfoByBarcode(barcode);
        return bookCopy;
    }


    /**
     * 更新
     */
    @Override
    public void updateBookCopy(BookCopyDto updateDto) {
        BookCopy bookCopy = new BookCopy();

        // 将dto转换为实体类
        BeanUtils.copyProperties(updateDto, bookCopy);

        // 进行增量更新
        if (!this.updateById(bookCopy)) {
            throw new ServiceException("系统错误,更新操作失败!");
        }
    }

}
