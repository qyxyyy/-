package com.javaee.ch16.web.api.admin;

import com.javaee.ch16.common.response.ResultVo;
import com.javaee.ch16.service.BorrowRecordService;
import com.javaee.ch16.domain.entity.BorrowRecord;
import com.javaee.ch16.domain.dto.queryDto.BorrowRecordQueryDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import com.javaee.ch16.domain.dto.BorrowRecordDto;

/**
 * <p>
 * 借阅记录表 前端控制器
 * </p>
 *
 * @author author
 * @since 2025-05-13
 */
@RestController
@RequestMapping("/api/admin/borrowRecord")
public class BorrowRecordController {
    
    @Autowired
    BorrowRecordService borrowRecordService;

    @Autowired
    HttpServletRequest request;

    /**
     * 根据id查询对象
     */
    @GetMapping("/{id}")
    public ResultVo<BorrowRecord> getById(@PathVariable Long id) {
        BorrowRecord borrowRecord = borrowRecordService.getById(id);
        return ResultVo.ok(borrowRecord);
    }

    /**
    * 新增
    */
    @PostMapping("")
    public ResultVo add(@RequestBody  BorrowRecordDto borrowRecordDto) {
        borrowRecordService.addBorrowRecord(borrowRecordDto);
        return ResultVo.ok();
    }

    /**
    * 删除
    */
    @DeleteMapping("/{id}")
    public ResultVo delete(@PathVariable Long id) {
        return borrowRecordService.removeById(id)
            ? ResultVo.ok("删除成功")
            : ResultVo.fail("数据不存在,删除失败");
    }

    /**
     * 更新
     */
    @PutMapping("")
    public ResultVo update(@RequestBody BorrowRecordDto borrowRecordDto) {
        borrowRecordService.updateBorrowRecord(borrowRecordDto);
        return ResultVo.ok();
    }

    /**
    * 多条件查询,分页返回查询结果
    */
    @PostMapping("query")
    public ResultVo query(@RequestBody BorrowRecordQueryDto borrowRecordQueryDto) {
        return ResultVo.ok(borrowRecordService.query(borrowRecordQueryDto));
    }
}

