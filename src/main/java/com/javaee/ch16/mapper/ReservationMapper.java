package com.javaee.ch16.mapper;

import com.javaee.ch16.domain.entity.Reservation;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * 预约表 Mapper 接口
 * </p>
 *
 * @author author
 * @since 2025-05-13
 */
@Mapper
public interface ReservationMapper extends BaseMapper<Reservation> {

}
