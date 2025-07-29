package com.javaee.ch16.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Data;

// isbn下拉专用VO
@Data
@AllArgsConstructor
public class BookIsbnVo {
    private String isbn;  
    private String title;  
}  