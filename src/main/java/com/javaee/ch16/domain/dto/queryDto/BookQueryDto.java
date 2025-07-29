package com.javaee.ch16.domain.dto.queryDto;


import com.javaee.ch16.common.pagination.BasePageReq;
import lombok.Data;

@Data
public class BookQueryDto extends BasePageReq {
    private String title;
    private String author;
    private String isbn;
    private String publisher;
    private Integer yearFrom;
    private Integer yearTo;
    private Long categoryId;
    private Integer status;
}
