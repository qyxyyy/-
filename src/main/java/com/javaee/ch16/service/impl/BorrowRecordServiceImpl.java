package com.javaee.ch16.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.javaee.ch16.common.exception.ServiceException;
import com.javaee.ch16.common.pagination.PageResult;
import com.javaee.ch16.domain.entity.BorrowRecord;
import com.javaee.ch16.domain.entity.BorrowRecordView;
import com.javaee.ch16.mapper.BorrowRecordMapper;
import com.javaee.ch16.mapper.BorrowRecordViewMapper;
import com.javaee.ch16.service.BorrowRecordService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.javaee.ch16.domain.dto.queryDto.BorrowRecordQueryDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.apache.commons.lang3.StringUtils;
import com.javaee.ch16.domain.dto.BorrowRecordDto;

/**
 * <p>
 * 借阅记录表 服务实现类
 * </p>
 *
 * @author author
 * @since 2025-05-13
 */
@Slf4j
@Service
@Transactional
public class BorrowRecordServiceImpl extends ServiceImpl<BorrowRecordMapper, BorrowRecord> implements BorrowRecordService {
    @Autowired
    BorrowRecordViewMapper borrowRecordViewMapper;
    /**
    * 添加
    */
    @Override
    public void addBorrowRecord(BorrowRecordDto addDto) {
        BorrowRecord borrowRecord = new BorrowRecord();
        // 业务逻辑

        // 将dto数据复制到${$objName}实体类}
        BeanUtils.copyProperties(addDto, borrowRecord);
        // 设置默认字段

        // 保存对象
        if(!super.save(borrowRecord)) {
            throw  new ServiceException("系统错误,添加操作失败!")   ;
        }
    }


    /**
    * 复杂条件查询
    */
    @Override
    public PageResult<BorrowRecord> query(BorrowRecordQueryDto queryDto) {
          // 查询
        QueryWrapper<BorrowRecordView> queryWrapper = new QueryWrapper<>();
        queryWrapper.like(StringUtils.isNotBlank(queryDto.getBookName()), "book_name", queryDto.getBookName())
                .like(StringUtils.isNotBlank(queryDto.getReaderName()), "reader_name", queryDto.getReaderName())
                .like(StringUtils.isNotBlank(queryDto.getCopyBarcode()), "copy_barcode", queryDto.getCopyBarcode())
                .like(StringUtils.isNotBlank(queryDto.getReaderNumber()), "reader_number", queryDto.getReaderNumber());
        Page<BorrowRecordView> result = borrowRecordViewMapper.selectPage(queryDto.convetToPage(), queryWrapper);

         return PageResult.fromPage(result);
    }

    /**
     * 更新
     */
    @Override
    public void updateBorrowRecord(BorrowRecordDto updateDto) {
             BorrowRecord borrowRecord = new BorrowRecord();

         // 将dto转换为实体类
         BeanUtils.copyProperties(updateDto, borrowRecord);

         // 进行增量更新
        if(!this.updateById(borrowRecord)){
            throw new ServiceException("系统错误,更新操作失败!");
        }
    }

}
