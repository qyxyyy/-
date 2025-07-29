package com.javaee.ch16.domain.dto;


import lombok.Data;

/**
 * <p>
 * 图书副本表
 * </p>
 *
 * @author author
 * @since 2025-05-05
 */
@Data
public class BookCopyDto {
    private Long copyId;

    private Long bookId;

    private String barcode;

    private String location;

    private Integer status;
}
