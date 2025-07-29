package com.javaee.ch16.web.api.admin;


import com.javaee.ch16.common.pagination.PageResult;
import com.javaee.ch16.common.response.ResultVo;
import com.javaee.ch16.domain.entity.Book;
import com.javaee.ch16.service.BookService;
import com.javaee.ch16.domain.dto.BookDto;
import com.javaee.ch16.domain.dto.queryDto.BookQueryDto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Validated
@RestController
@RequestMapping("/api/admin/book")
public class BookController {

    @Autowired
    BookService bookService;

    /**
     * 获取指定ID的书籍信息。
     */
    @GetMapping("/{id}")
    public ResultVo<Book> get(@PathVariable long id) {
        Book book = bookService.getById(id);
        return ResultVo.ok(book);
    }

    /**
     * 添加新书籍。
     */
    @PostMapping("/")
    public ResultVo add(@Valid @RequestBody BookDto bookDto) {
        bookService.addBook(bookDto);
        return ResultVo.ok();
    }

    /**
     * 更新书籍信息。
     */
    @PutMapping("/")
    public ResultVo update(@Valid @RequestBody BookDto bookDto) {
        bookService.updateBook(bookDto);
        return ResultVo.ok();
    }

    /**
     * 删除指定ID的书籍。
     */
    @DeleteMapping("/{id}")
    public ResultVo delete(@PathVariable @Min(value = 0, message = "不能小于0") long id) {
        return bookService.removeById(id)
                ? ResultVo.ok("删除成功")
                : ResultVo.fail("数据不存在,删除失败");
    }

    @PostMapping("/query")
    public ResultVo<PageResult> query(@RequestBody BookQueryDto queryDto) {
        return ResultVo.ok(bookService.queryBooks(queryDto));
    }


    // ISBN模糊下拉，限制q长度<=10，最多10条
    @PostMapping("/isbn/options")
    public ResultVo isbnOptions(@RequestBody Map<String, String> map) {
        String q = map.get("q");

        if (q == null || q.trim().length() == 0 || q.trim().length() > 16) {
            return ResultVo.ok();
        }
        return ResultVo.ok(bookService.listIsbnOptions(q.trim()));
    }


    // 通过完整ISBN获取图书详细信息
    @GetMapping("/isbn/{isbn}")
    public ResultVo<Book> isbnDetail(@PathVariable String isbn) {
        return ResultVo.ok( bookService.getBookByIsbn(isbn));
    }
}


