package com.javaee.ch16.web.api.admin;

import com.javaee.ch16.common.response.ResultVo;
import com.javaee.ch16.service.ReaderService;
import com.javaee.ch16.domain.entity.Reader;
import com.javaee.ch16.domain.dto.queryDto.ReaderQueryDto;
import com.javaee.ch16.domain.vo.ReaderInfoVo;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import com.javaee.ch16.domain.dto.ReaderDto;
import java.util.*;
/**
 * <p>
 * 读者表 前端控制器
 * </p>
 *
 * @author author
 * @since 2025-05-05
 */
@RestController
@RequestMapping("/api/admin/reader")
public class ReaderController {
    
    @Autowired
    ReaderService readerService;

     /**
     * 根据id查询对象
     */
    @GetMapping("/{id}")
    public ResultVo<Reader> getById(@PathVariable Long id) {
        Reader reader = readerService.getById(id);
        return ResultVo.ok(reader);
    }

    /**
    * 新增
    */
    @PostMapping("")
    public ResultVo add(@RequestBody  ReaderDto readerDto) {
        readerService.addReader(readerDto);
        return ResultVo.ok();
    }

    /**
    * 删除
    */
    @DeleteMapping("/{id}")
    public ResultVo delete(@PathVariable Long id) {
        return readerService.removeById(id)
            ? ResultVo.ok("删除成功")
            : ResultVo.fail("数据不存在,删除失败");
    }

    /**
     * 更新
     */
    @PutMapping("")
    public ResultVo update(@RequestBody ReaderDto readerDto) {
        readerService.updateReader(readerDto);
        return ResultVo.ok();
    }

    /**
    * 多条件查询,分页返回查询结果
    */
    @PostMapping("query")
    public ResultVo<List> query(@RequestBody ReaderQueryDto readerQueryDto) {
        return ResultVo.ok(readerService.query(readerQueryDto));
    }

    @GetMapping("/readerInfo/{readerNumber}")
    public ResultVo<ReaderInfoVo> getReaderInfoVo(@PathVariable String readerNumber) {
        return ResultVo.ok(readerService.getReaderInfoVo(readerNumber));
    }
}

