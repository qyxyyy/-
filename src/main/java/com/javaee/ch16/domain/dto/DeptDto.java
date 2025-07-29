package com.javaee.ch16.domain.dto;


import lombok.*;

import java.util.Date;

/**
 * <p>
 * 部门
 * </p>
 *
 * @author author
 * @since 2025-05-04
 */
@Data
public class DeptDto {
    private Long deptId;
    private String name;
    private String manager;
    private Integer status;
}
