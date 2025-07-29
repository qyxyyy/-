package com.javaee.ch16.service.impl;

import com.javaee.ch16.service.BorrowRecordService;
import com.javaee.ch16.domain.dto.queryDto.BorrowRecordQueryDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


@SpringBootTest
class BorrowRecordServiceImplTest {

    @Autowired
    BorrowRecordService borrowRecordService;
    @Test
    void query() {
        BorrowRecordQueryDto queryDto = new BorrowRecordQueryDto();
        borrowRecordService.query(queryDto);
    }


    @Test
    public void password(){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        System.out.printf(encoder.encode("123456")+"===end");
    }
}