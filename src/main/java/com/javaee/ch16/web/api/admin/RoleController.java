package com.javaee.ch16.web.api.admin;

import com.javaee.ch16.common.response.ResultVo;
import com.javaee.ch16.service.RoleService;
import com.javaee.ch16.domain.entity.Role;
import com.javaee.ch16.domain.dto.RoleDto;
import com.javaee.ch16.domain.dto.queryDto.RoleQueryDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * <p>
 * 角色表 前端控制器
 * </p>
 *
 * @author author
 * @since 2025-05-01
 */
@RestController
@RequestMapping("/api/admin/manage/role")
public class RoleController {

    @Autowired
    RoleService roleService;

    @Autowired
    HttpServletRequest request;

    /**
     * 根据id查询对象
     */
    @GetMapping("/{id}")
    public ResultVo<Role> getById(@PathVariable Long id) {
        Role role = roleService.getRoleById(id);
        return ResultVo.ok(role);
    }

    /**
     * 新增
     */
    @PostMapping("")
    public ResultVo add(@RequestBody RoleDto roleDto) {
        roleService.addRole(roleDto);
        return ResultVo.ok();
    }

    /**
     * 删除
     */
    @DeleteMapping("/{id}")
    public ResultVo delete(@PathVariable Long id) {
        return roleService.removeRoleById(id) ? ResultVo.ok("删除成功") : ResultVo.fail("数据不存在,删除失败");
    }

    /**
     * 更新
     */
    @PutMapping("")
    public ResultVo update(@RequestBody RoleDto roleUpdateDto) {
        roleService.updateRole(roleUpdateDto);
        return ResultVo.ok();
    }

    @GetMapping("/listByStatus/{status}")
    public ResultVo listByStatus(@PathVariable int status) {
        return ResultVo.ok(roleService.listByStatus(status));
    }

    /**
     * 获取列表。
     */
    @PostMapping("/query")
    public ResultVo query(@RequestBody RoleQueryDto roleQueryDto) {
        return ResultVo.ok(roleService.query(roleQueryDto));
    }
}

