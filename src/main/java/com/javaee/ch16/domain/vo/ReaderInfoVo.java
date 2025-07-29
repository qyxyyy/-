package com.javaee.ch16.domain.vo;

import com.javaee.ch16.domain.entity.Reader;
import lombok.Data;

// isbn下拉专用VO
@Data
public class ReaderInfoVo extends Reader {
    private String deptName;
    Long borrowCount;
}