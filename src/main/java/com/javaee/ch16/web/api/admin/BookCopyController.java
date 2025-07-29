package com.javaee.ch16.web.api.admin;

import com.javaee.ch16.common.pagination.PageResult;
import com.javaee.ch16.common.response.ResultVo;
import com.javaee.ch16.domain.entity.BookCopy;
import com.javaee.ch16.service.BookCopyService;
import com.javaee.ch16.domain.dto.BookCopyDto;
import com.javaee.ch16.domain.dto.queryDto.BookCopyQueryDto;
import com.javaee.ch16.domain.vo.BookCopyVo;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * <p>
 * 图书副本表 前端控制器
 * </p>
 *
 * @author author
 * @since 2025-05-05
 */
@RestController
@RequestMapping("/api/admin/bookcopy")
public class BookCopyController {
    
    @Autowired
    BookCopyService bookCopyService;

    /**
     * 根据id查询对象
     */
    @GetMapping("/{id}")
    public ResultVo<BookCopy> getById(@PathVariable Long id) {
        BookCopy bookCopy = bookCopyService.getById(id);
        return ResultVo.ok(bookCopy);
    }

    /**
    * 新增
    */
    @PostMapping("")
    public ResultVo add(@RequestBody BookCopyDto bookCopyDto) {
        bookCopyService.addBookCopy(bookCopyDto);
        return ResultVo.ok();
    }

    /**
    * 删除
    */
    @DeleteMapping("/{id}")
    public ResultVo delete(@PathVariable Long id) {
        return bookCopyService.removeById(id)
            ? ResultVo.ok("删除成功")
            : ResultVo.fail("数据不存在,删除失败");
    }

    /**
     * 更新
     */
    @PutMapping("")
    public ResultVo update(@RequestBody BookCopyDto bookCopyDto) {
        bookCopyService.updateBookCopy(bookCopyDto);
        return ResultVo.ok();
    }

    /**
    * 多条件查询,分页返回查询结果
    */
    @PostMapping("query")
    public ResultVo<PageResult> query(@RequestBody BookCopyQueryDto queryDto) {
        return ResultVo.ok(bookCopyService.pageQuery(queryDto));
    }

    @GetMapping("/genBarCode")
    public ResultVo<String> generateBarcode() {
        return ResultVo.ok(bookCopyService.generateBarcode());
    }



    @GetMapping("/copyInfo/{barcode}")
    public ResultVo<BookCopyVo> getCopyInfo(@PathVariable String barcode) {
        BookCopyVo bookCopyVo = bookCopyService.getCopyInfoByBarcode(barcode);
        return ResultVo.ok(bookCopyVo);
    }
}

