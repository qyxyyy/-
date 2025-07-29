package com.javaee.ch16.web.api.admin;

import com.javaee.ch16.common.response.ResultVo;
import com.javaee.ch16.service.DeptService;
import com.javaee.ch16.domain.entity.Dept;
import com.javaee.ch16.domain.dto.queryDto.DeptQueryDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import com.javaee.ch16.domain.dto.DeptDto;

import java.util.*;

/**
 * <p>
 * 部门 前端控制器
 * </p>
 *
 * @author author
 * @since 2025-05-04
 */
@RestController
@RequestMapping("/api/admin/manage/dept")
public class DeptController {
    
    @Autowired
    DeptService deptService;

    @Autowired
    HttpServletRequest request;

    /**
     * 根据id查询对象
     */
    @GetMapping("/{id}")
    public ResultVo<Dept> getById(@PathVariable Long id) {
        Dept dept = deptService.getById(id);
        return ResultVo.ok(dept);
    }

    /**
    * 新增
    */
    @PostMapping("")
    public ResultVo add(@RequestBody  DeptDto deptDto) {
        deptService.addDept(deptDto);
        return ResultVo.ok();
    }

    /**
    * 删除
    */
    @DeleteMapping("/{id}")
    public ResultVo delete(@PathVariable Long id) {
        return deptService.removeById(id)
            ? ResultVo.ok("删除成功")
            : ResultVo.fail("数据不存在,删除失败");
    }

    /**
     * 更新
     */
    @PutMapping("")
    public ResultVo update(@RequestBody DeptDto deptDto) {
        deptService.updateDept(deptDto);
        return ResultVo.ok();
    }

    /**
    * 多条件查询,分页返回查询结果
    */
    @PostMapping("query")
    public ResultVo<List> query(@RequestBody DeptQueryDto deptQueryDto) {
        return ResultVo.ok(deptService.query(deptQueryDto));
    }
}

