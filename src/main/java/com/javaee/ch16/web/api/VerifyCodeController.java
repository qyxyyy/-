package com.javaee.ch16.web.api;

import com.javaee.ch16.common.response.ResultVo;
import com.javaee.ch16.service.VerifyCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/verify-code")
public class VerifyCodeController {

    @Autowired
    private VerifyCodeService verifyCodeService;

    // 生成验证码
    @PostMapping("/generate")
    public ResultVo generate(@RequestBody Map<String, String> phoneMap) {
        String phone = phoneMap.get("phone");
        String code = verifyCodeService.generateCode(phone);
        // 生产环境不要返回code给前端，演示用
        return ResultVo.ok("验证码已发送（测试环境直接返回）: " + code);
    }

    // 校验验证码
    @PostMapping("/check")
    public ResultVo check(@RequestBody Map<String, String> map) {
        String phone = map.get("phone");
        String code = map.get("code");
        boolean success = verifyCodeService.verifyCode(phone, code);
        return success ? ResultVo.ok("校验成功") : ResultVo.fail("校验失败");
    }
}