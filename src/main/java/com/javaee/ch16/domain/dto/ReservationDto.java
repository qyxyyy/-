package com.javaee.ch16.domain.dto;


import lombok.*;

import java.util.Date;

/**
 * <p>
 * 预约表
 * </p>
 *
 * @author author
 * @since 2025-05-13
 */
@Data
public class ReservationDto {

    private Long resId;


    private Long bookId;


    private Integer readerId;


    private Date reservationDate;


    private Integer status;


    private String remark;

}
