package com.javaee.ch16.domain.dto;


import lombok.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * <p>
 * 借阅记录表
 * </p>
 *
 * @author author
 * @since 2025-05-13
 */
@Data
public class BorrowRecordDto {
    private Long readerId;
    private List<Long> bookList;
}
