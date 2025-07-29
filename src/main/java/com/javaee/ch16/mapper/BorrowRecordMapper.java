package com.javaee.ch16.mapper;

import com.javaee.ch16.domain.entity.BorrowRecord;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * 借阅记录表 Mapper 接口
 * </p>
 *
 * @author author
 * @since 2025-05-13
 */
@Mapper
public interface BorrowRecordMapper extends BaseMapper<BorrowRecord> {

}
