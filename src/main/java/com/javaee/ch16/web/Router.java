package com.javaee.ch16.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class Router {
    @GetMapping("/admin/{dir}/{filename}")
    public String admin(@PathVariable String dir,@PathVariable String filename) {
        return  "/admin/"+dir+"/"+ filename;
    }

    @GetMapping("/admin/index")
    public String adminIndex( ) {
        return  "/admin/index";
    }

    @GetMapping("/reader/{filename}")
    public String reader(@PathVariable String filename) {
        return  "/reader/"+ filename;
    }
    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

    @GetMapping("/reset-password")
    public String resetPassword(){
        return "resetPassword";
    }

    @GetMapping("/verifyCode")
    public String verifyCode( ) {
        return "/verify/verifyCode";
    }
}


