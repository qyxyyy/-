package com.javaee.ch16.service;

import com.javaee.ch16.common.pagination.PageResult;
import com.javaee.ch16.domain.entity.BorrowRecord;
import com.baomidou.mybatisplus.extension.service.IService;
import com.javaee.ch16.domain.dto.BorrowRecordDto;
import com.javaee.ch16.domain.dto.queryDto.BorrowRecordQueryDto;

/**
 * <p>
 * 借阅记录表 服务类
 * </p>
 *
 * @author author
 * @since 2025-05-13
 */
public interface BorrowRecordService extends IService<BorrowRecord> {
    /**
     * 添加
     */
    public void addBorrowRecord(BorrowRecordDto addDto);

    /**
     * 更新对象
     */
    public void updateBorrowRecord(BorrowRecordDto updateDto);

    /**
     * 复杂条件查询,包含分页信息
     * @param userQueryDto
     * @return
     */
    PageResult<BorrowRecord> query(BorrowRecordQueryDto queryDto);
}
