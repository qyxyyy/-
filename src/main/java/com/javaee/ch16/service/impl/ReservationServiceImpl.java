package com.javaee.ch16.service.impl;

import com.javaee.ch16.common.exception.ServiceException;
import com.javaee.ch16.domain.entity.Reservation;
import com.javaee.ch16.mapper.ReservationMapper;
import com.javaee.ch16.service.ReservationService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.javaee.ch16.domain.dto.queryDto.ReservationQueryDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import com.javaee.ch16.domain.dto.ReservationDto;

import java.util.List;

/**
 * <p>
 * 预约表 服务实现类
 * </p>
 *
 * @author author
 * @since 2025-05-13
 */
@Slf4j
@Service
@Transactional
public class ReservationServiceImpl extends ServiceImpl<ReservationMapper, Reservation> implements ReservationService {
    /**
    * 添加
    */
    @Override
    public void addReservation(ReservationDto addDto) {
        Reservation reservation = new Reservation();
        // 业务逻辑

        // 将dto数据复制到${$objName}实体类}
        BeanUtils.copyProperties(addDto, reservation);
        // 设置默认字段

        // 保存对象
        if(!super.save(reservation)) {
            throw  new ServiceException("系统错误,添加操作失败!")   ;
        }
    }


    /**
    * 复杂条件查询
    */
    @Override
    public List<Reservation> query(ReservationQueryDto queryDto) {
          // 查询
        List<Reservation> list =this.lambdaQuery()
                            .list();
         return list;
    }

    /**
     * 更新
     */
    @Override
    public void updateReservation(ReservationDto updateDto) {
             Reservation reservation = new Reservation();

         // 将dto转换为实体类
         BeanUtils.copyProperties(updateDto, reservation);

         // 进行增量更新
        if(!this.updateById(reservation)){
            throw new ServiceException("系统错误,更新操作失败!");
        }
    }

}
