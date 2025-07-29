package com.javaee.ch16.web.api.admin;

import com.javaee.ch16.common.response.ResultVo;
import com.javaee.ch16.service.ReservationService;
import com.javaee.ch16.domain.entity.Reservation;
import com.javaee.ch16.domain.dto.queryDto.ReservationQueryDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import com.javaee.ch16.domain.dto.ReservationDto;
import java.util.*;
/**
 * <p>
 * 预约表 前端控制器
 * </p>
 *
 * @author author
 * @since 2025-05-13
 */
@RestController
@RequestMapping("/api/admin/reservation")
public class ReservationController {
    
    @Autowired
    ReservationService reservationService;

    @Autowired
    HttpServletRequest request;

    /**
     * 根据id查询对象
     */
    @GetMapping("/{id}")
    public ResultVo<Reservation> getById(@PathVariable Long id) {
        Reservation reservation = reservationService.getById(id);
        return ResultVo.ok(reservation);
    }

    /**
    * 新增
    */
    @PostMapping("")
    public ResultVo add(@RequestBody  ReservationDto reservationDto) {
        reservationService.addReservation(reservationDto);
        return ResultVo.ok();
    }

    /**
    * 删除
    */
    @DeleteMapping("/{id}")
    public ResultVo delete(@PathVariable Long id) {
        return reservationService.removeById(id)
            ? ResultVo.ok("删除成功")
            : ResultVo.fail("数据不存在,删除失败");
    }

    /**
     * 更新
     */
    @PutMapping("")
    public ResultVo update(@RequestBody ReservationDto reservationDto) {
        reservationService.updateReservation(reservationDto);
        return ResultVo.ok();
    }

    /**
    * 多条件查询,分页返回查询结果
    */
    @PostMapping("query")
    public ResultVo<List> query(@RequestBody ReservationQueryDto queryDto) {
        return ResultVo.ok(reservationService.query(queryDto));
    }
}

