package com.javaee.ch16.domain.vo;

import com.javaee.ch16.domain.entity.BookCopy;
import lombok.Data;

@Data
public class BookCopyVo extends BookCopy {

    /**
     * 借阅者
     */
    private String borrower;
    /**
     * 图书名称
     */
    private String title;
    /**
     * 图书ISBN
     */
    private String isbn;

    // 作者
    private  String author;

    // 出版社
    private String publisher;
}
