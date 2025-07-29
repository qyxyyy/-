package com.javaee.ch16.common.fileupload;

import lombok.Builder;
import lombok.Data;

/**
 * 文件上传实体类
 */
@Data
@Builder
public class Attachment {

    /**
     * 文件名称
     */
    private String filename;

    /**
     * 文件对应的URL地址
     */
    private String fileUrl;

    /**
     * 文件类型
     */
    private String fileType;

    /**
     * 文件大小，单位为字节
     */
    private Long fileSize;

}
