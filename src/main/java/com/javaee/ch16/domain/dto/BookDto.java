package com.javaee.ch16.domain.dto;


import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.NotBlank;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookDto{

    private Long bookId;

    // 书名，必须非空
    @NotBlank(message = "书名不能为空")
    private String title;

    // 作者，必须非空
    @NotBlank(message = "作者不能为空")
    private String author;

    // 书号，必须符合 ISBN 格式
    // @Pattern(regexp = "^\\d{3}-\\d{1}-\\d{3}-\\d{5}-\\d{1}$", message = "书号格式不正确")
    private String isbn;

    // 出版社，必须非空
    @NotBlank(message = "出版社不能为空")
    private String publisher;

    // 出版年份，必须在合理范围内
    @Min(value = 1900, message = "出版年份不能小于1900")
    private Integer publicationYear;


    private Integer totalCopies;

    private Integer availableCopies;

    // 图书类别，必须非空
    @NotNull(message = "图书类别不能为空")
    private Long categoryId;

    // 图书语言，必须非空
    @NotBlank(message = "图书语言不能为空")
    @Size(min = 2, max = 50, message = "图书语言长度必须在2到50之间")
    private String language;

    // 馆藏地址，必须非空
    @NotBlank(message = "馆藏地址不能为空")
    private String location;

    // 状态，默认为1
    @NotNull(message = "状态不能为空")
    private Integer status = 1;

    // 描述，可以为空
    @Size(max = 500, message = "描述长度不能超过500")
    private String description;

    private String coverUrl;
    private String attachmentUrl;
}
