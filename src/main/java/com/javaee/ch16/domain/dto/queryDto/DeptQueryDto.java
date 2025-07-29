package com.javaee.ch16.domain.dto.queryDto;


import lombok.*;
import com.fasterxml.jackson.annotation.JsonFormat;
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
public class DeptQueryDto {
    private String name;
    private String manager;
    private Integer status;
 }
