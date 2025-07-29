package com.javaee.ch16.domain.dto;


import lombok.Data;

/**
 * <p>
 * 读者表
 * </p>
 *
 * @author author
 * @since 2025-05-05
 */
@Data
public class ReaderDto {

    private Long readerId;

    private String readerNumber;

    private String name;

    private String gradeMajor;

    private String gender;

    private String avatarUrl;

    private Integer type;

    private Integer borrowLimit;

    private String email;

    private String phone;


    private Integer departmentId;


    private Integer status;


    private String remark;

    private Long deptId;

}
