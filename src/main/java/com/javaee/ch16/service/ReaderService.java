package com.javaee.ch16.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.javaee.ch16.domain.entity.Reader;
import com.javaee.ch16.domain.dto.ReaderDto;
import com.javaee.ch16.domain.dto.queryDto.ReaderQueryDto;
import com.javaee.ch16.domain.vo.ReaderInfoVo;

import java.util.List;

/**
 * <p>
 * 读者表 服务类
 * </p>
 *
 * @author author
 * @since 2025-05-05
 */
public interface ReaderService extends IService<Reader> {
    /**
     * 添加
     */
    public void addReader(ReaderDto addDto);

    /**
     * 更新对象
     */
    public void updateReader(ReaderDto updateDto);

    /**
     * 复杂条件查询,包含分页信息
     * @param userQueryDto
     * @return
     */
    List<Reader> query(ReaderQueryDto queryDto);

    ReaderInfoVo getReaderInfoVo(String readerNumber);
}
