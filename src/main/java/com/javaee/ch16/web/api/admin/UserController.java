package com.javaee.ch16.web.api.admin;

import com.javaee.ch16.common.response.ResultVo;
import com.javaee.ch16.service.UserService;
import com.javaee.ch16.domain.entity.User;
import com.javaee.ch16.domain.dto.UserDto;
import com.javaee.ch16.domain.dto.queryDto.UserQueryDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * <p>
 * 系统用户表 前端控制器
 * </p>
 *
 * @author author
 * @since 2025-05-01
 */
@RestController
@RequestMapping("/api/admin/manage/user")
public class UserController {
    
    @Autowired
    UserService userService;

    @Autowired
    HttpServletRequest request;

    /**
     * 根据id查询对象
     */
    @GetMapping("/{id}")
    public ResultVo<User> getById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResultVo.ok(user);
    }

    /**
    * 新增
    */
    @PostMapping("")
    public ResultVo add(@RequestBody UserDto userDto) {
        userService.addUser(userDto);
        return ResultVo.ok();
    }

    /**
    * 删除
    */
    @DeleteMapping("/{id}")
    public ResultVo delete(@PathVariable Long id) {
        return userService.removeUserById(id)
                ? ResultVo.ok("删除成功")
                : ResultVo.fail("数据不存在,删除失败");
    }

    /**
     * 更新
     */
    @PutMapping("")
    public ResultVo update(@RequestBody UserDto userDto) {
        userService.updateUser(userDto);
        return ResultVo.ok();
    }

    /**
    * 多条件查询,分页返回查询结果
    */
    @PostMapping("query")
    public ResultVo pageQuery(@RequestBody UserQueryDto userQueryDto) {
        return ResultVo.ok(userService.query(userQueryDto));
    }

}

