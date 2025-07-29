package com.javaee.ch16.domain.dto.queryDto;


import com.javaee.ch16.common.pagination.BasePageReq;
import lombok.*;
import java.util.*;

/**
 * <p>
 * 图书副本表
 * </p>
 *
 * @author author
 * @since 2025-05-05
 */
@Data
public class BookCopyQueryDto extends BasePageReq {
    private String barcode;
    private String location;
    private String bookName;
    private Integer status;
}
