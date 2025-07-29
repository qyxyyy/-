package com.javaee.ch16.service;

import com.javaee.ch16.domain.entity.Reservation;
import com.baomidou.mybatisplus.extension.service.IService;
import com.javaee.ch16.domain.dto.ReservationDto;
import com.javaee.ch16.domain.dto.queryDto.ReservationQueryDto;

import java.util.List;

/**
 * <p>
 * 预约表 服务类
 * </p>
 *
 * @author author
 * @since 2025-05-13
 */
public interface ReservationService extends IService<Reservation> {
    /**
     * 添加
     */
    public void addReservation(ReservationDto addDto);

    /**
     * 更新对象
     */
    public void updateReservation(ReservationDto updateDto);

    /**
     * 复杂条件查询,包含分页信息
     * @param userQueryDto
     * @return
     */
    List<Reservation> query(ReservationQueryDto queryDto);
}
