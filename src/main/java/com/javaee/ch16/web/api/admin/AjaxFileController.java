package com.javaee.ch16.web.api.admin;

import com.javaee.ch16.common.response.ResultVo;
import com.javaee.ch16.common.fileupload.Attachment;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Map;
import java.util.UUID;

/**
 * 处理文件上传的控制器类
 * <p>
 * 该类负责处理通过AJAX方式上传的文件，包括文件的上传和删除操作它使用了Spring框架的RestController注解，使其成为一个处理HTTP请求的控制器
 */
@RestController
@Slf4j
@RequestMapping("/api/admin/file")
public class AjaxFileController {

    /**
     * 文件上传的基础路径
     * <p>
     * 该变量从应用的配置属性中注入，用于指定文件上传的目录路径
     */
    @Value("${file.upload.basePath}")
    private String basePath;

    /**
     * 通过AJAX进行文件上传的方法
     * <p>
     * 该方法处理文件上传请求，接收一个MultipartFile类型的文件对象作为参数它首先检查并创建上传目录，然后生成一个唯一的文件名以避免文件重复，
     * 最后将文件保存到服务器上指定的目录中
     *
     * @param file 要上传的文件，类型为MultipartFile
     * @return ResultVo 返回一个包含上传文件信息的ResultVo对象
     * @throws IOException 如果文件保存过程中发生IO异常
     */
    @PostMapping("/upload")
    public ResultVo ajaxFileUpload(MultipartFile file) throws IOException {
        // 目录操作
        File savePath = new File(this.basePath);
        if (!savePath.exists()) {
            savePath.mkdirs(); // 递归创建缺失目录
        }

        // 文件名生成
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();

        // 权限校验
        if (!savePath.canWrite()) {
            throw new IOException("上传目录没有写权限");
        }

        // 持久化存储
        file.transferTo(new File(savePath, filename));

        // 响应构造
        return ResultVo.ok(
                Attachment.builder()
                        .filename(filename)
                        .fileUrl("/"+filename)
                        .fileType(file.getContentType())
                        .fileSize(file.getSize())
                        .build()
        );
    }

    /**
     * 删除指定文件名的文件
     * <p>
     * 该方法处理删除文件的请求，接收一个文件名作为路径变量，根据该文件名找到并删除对应的文件
     *
     * @param fileName 要删除的文件名
     * @return ResultVo 返回一个表示删除结果的ResultVo对象
     * @throws IOException 如果文件删除过程中发生IO异常
     */
    @DeleteMapping("/delete")
    public ResultVo deleteFile(@RequestBody Map<String, String> map)  {
        String fileName = map.get("fileName");
        try {
            // 根据文件名创建文件对象
            File file = new File(this.basePath + "/" + fileName);
            // 删除文件
            file.delete();
            return ResultVo.ok();
        }catch (Exception e){
            e.printStackTrace();
            log.error("文件删除失败，文件名: {}", fileName);
            return ResultVo.fail();
        }
    }

}
