package com.javaee.ch16.mapper;

import com.javaee.ch16.domain.entity.BookCategory;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * 图书分类表 Mapper 接口
 * </p>
 *
 * @author author
 * @since 2025-04-26
 */
@Mapper
public interface BookCategoryMapper extends BaseMapper<BookCategory> {

}
