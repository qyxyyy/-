package com.javaee.ch16.domain.dto.queryDto;


import lombok.*;
import java.util.*;

/**
 * <p>
 * 读者表
 * </p>
 *
 * @author author
 * @since 2025-05-05
 */
@Data
public class ReaderQueryDto{

    private String readerNumber;
 
    private String name;
 
    private String gradeMajor;
 
    private String gender;
 
    private String avatarUrl;
 

    private String email;
 
    private String phone;

    private String remark;
 

}
