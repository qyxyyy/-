package com.javaee.ch16.service.impl;

import com.javaee.ch16.common.exception.ServiceException;
import com.javaee.ch16.domain.entity.BorrowRecord;
import com.javaee.ch16.domain.entity.Dept;
import com.javaee.ch16.domain.entity.Reader;
import com.javaee.ch16.mapper.ReaderMapper;
import com.javaee.ch16.service.BorrowRecordService;
import com.javaee.ch16.service.DeptService;
import com.javaee.ch16.service.ReaderService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.javaee.ch16.domain.dto.queryDto.ReaderQueryDto;
import com.javaee.ch16.domain.vo.ReaderInfoVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import com.javaee.ch16.domain.dto.ReaderDto;

import java.util.List;

/**
 * <p>
 * 读者表 服务实现类
 * </p>
 *
 * @author author
 * @since 2025-05-05
 */
@Slf4j
@Service
@Transactional
public class ReaderServiceImpl extends ServiceImpl<ReaderMapper, Reader> implements ReaderService {
    @Autowired
    DeptService deptService;

    @Autowired
    BorrowRecordService borrowRecordService;
    /**
    * 添加
    */
    @Override
    public void addReader(ReaderDto addDto) {
        Reader reader = new Reader();
        // 业务逻辑

        // 将dto数据复制到${$objName}实体类}
        BeanUtils.copyProperties(addDto, reader);
        // 设置默认字段

        // 保存对象
        if(!super.save(reader)) {
            throw  new ServiceException("系统错误,添加操作失败!")   ;
        }
    }


    /**
    * 复杂条件查询
    */
    @Override
    public List<Reader> query(ReaderQueryDto queryDto) {
          // 查询
        List<Reader> list =this.lambdaQuery()
                            .list();
         return list;
    }

    @Override
    public ReaderInfoVo getReaderInfoVo(String readerNumber) {
        // 根据读者编号查询用户
        Reader reader = this.lambdaQuery().eq(Reader::getReaderNumber, readerNumber).one();
        if (reader == null){
            throw new ServiceException("读者不存在");
        }
        ReaderInfoVo readerVo = new ReaderInfoVo();
        BeanUtils.copyProperties(reader, readerVo);
        Dept dept  = deptService.lambdaQuery().select(Dept::getName).eq(Dept::getDeptId,reader.getDepartmentId()).one();
        readerVo.setDeptName(dept.getName());
        // 查询已借的图书数量
        Long borrowCount = borrowRecordService.lambdaQuery().eq(BorrowRecord::getReaderId, reader.getReaderId())
                .isNull(BorrowRecord::getReturnDate)
                .count();

        readerVo.setBorrowCount(borrowCount);
        return readerVo;
    }





    /**
     * 更新
     */
    @Override
    public void updateReader(ReaderDto updateDto) {
             Reader reader = new Reader();

         // 将dto转换为实体类
         BeanUtils.copyProperties(updateDto, reader);

         // 进行增量更新
        if(!this.updateById(reader)){
            throw new ServiceException("系统错误,更新操作失败!");
        }
    }

}
