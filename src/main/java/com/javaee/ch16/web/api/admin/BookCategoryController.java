package com.javaee.ch16.web.api.admin;


import com.javaee.ch16.common.response.ResultVo;
import com.javaee.ch16.domain.entity.BookCategory;
import com.javaee.ch16.service.BookCategoryService;
import com.javaee.ch16.domain.dto.BookCategoryDto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/api/admin/bookCategory")
public class BookCategoryController {

    @Autowired
    BookCategoryService bookCategoryService;

    /**
     * 获取指定ID的对象。
     */
    @GetMapping("/{id}")
    public ResultVo<BookCategory> get(@PathVariable long id) {
        BookCategory bookCategory = bookCategoryService.getById(id);
        return ResultVo.ok(bookCategory);
    }

    /**
     * 添加
     */
    @PostMapping("/")
    public ResultVo add(@Valid @RequestBody BookCategoryDto bookCategoryDto) {
        bookCategoryService.addBookCategory(bookCategoryDto);
        return ResultVo.ok();
    }

    /**
     * 更新
     */
    @PutMapping("/")
    public ResultVo update(@Valid @RequestBody BookCategoryDto bookCategoryDto) {
        bookCategoryService.updateBookCategory(bookCategoryDto);
        return ResultVo.ok();
    }

    /**
     * 删除指定ID
     */
    @DeleteMapping("/{id}")
    public ResultVo delete(@PathVariable @Min(value = 0, message = "不能小于0") long id) {
        return bookCategoryService.removeById(id)
                ? ResultVo.ok("删除成功")
                : ResultVo.fail("数据不存在,删除失败");
    }

    /**
     * 获取列表。
     */
    @GetMapping("/")
    public ResultVo list() {
        return ResultVo.ok(bookCategoryService.list());
    }


    @GetMapping("/listByStatus/{status}")
    public ResultVo listByStatus(@PathVariable int status) {
        return ResultVo.ok(bookCategoryService.listCategoryByStatus(status));
    }
}


