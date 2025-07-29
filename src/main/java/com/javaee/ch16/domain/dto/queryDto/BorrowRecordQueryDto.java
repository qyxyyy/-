package com.javaee.ch16.domain.dto.queryDto;


import com.javaee.ch16.common.pagination.BasePageReq;
import lombok.*;

/**
 * <p>
 * 借阅记录表
 * </p>
 *
 * @author author
 * @since 2025-05-13
 */
@Data
public class BorrowRecordQueryDto extends BasePageReq {
    String  bookName;
    String  readerName;
    String copyBarcode;
    String readerNumber;
 }
