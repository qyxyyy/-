package com.javaee.ch16.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.javaee.ch16.domain.entity.BookCopy;
import com.javaee.ch16.domain.dto.queryDto.BookCopyQueryDto;
import com.javaee.ch16.domain.vo.BookCopyVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

/**
 * <p>
 * 图书副本表 Mapper 接口
 * </p>
 *
 * @author author
 * @since 2025-05-05
 */
@Mapper
public interface BookCopyMapper extends BaseMapper<BookCopy> {

    Page<BookCopyVo> pageQuery(@Param("page") Page page, @Param("query") BookCopyQueryDto queryDto);


    @Select("select bc.*, b.* from book_copy bc left join book b on bc.book_id=b.book_id where barcode = #{barcode}")
    BookCopyVo getCopyInfoByBarcode(String barcode);
}
