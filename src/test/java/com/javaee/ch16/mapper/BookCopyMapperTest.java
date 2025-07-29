package com.javaee.ch16.mapper;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.javaee.ch16.domain.dto.queryDto.BookCopyQueryDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
class BookCopyMapperTest {
@Autowired
BookCopyMapper bookCopyMapper;

    @Test
    void pageBookCopy() {

        BookCopyQueryDto queryDto = new BookCopyQueryDto();
        Page page =bookCopyMapper.pageQuery(new Page(1,10), queryDto);
        System.out.println();
    }
}