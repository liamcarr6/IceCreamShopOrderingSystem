package top.flywen.controller;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import top.flywen.model.base.Result;
import top.flywen.model.entity.IcUser;
import top.flywen.service.AuthService;

@RestController
@RequestMapping("/private")
public class PrivateController {
    @Autowired
    private AuthService authService;
    @PostMapping("/login")
    public Result login(@RequestBody IcUser user) {
        IcUser login = authService.login(user);
        Result result = new Result(false,"login failure",user);
        if(login != null) {
            result = new Result(true,"login success", login);
        }
        return result;
    }
    @PostMapping("/register")
    public Result register(@RequestBody IcUser user) {
        IcUser register = authService.register(user);
        Result result = new Result(false,"register failure", register);
        if(register != null) {
            result = new Result(true, "register success", register);
        }
        return result;
    }
    @GetMapping("/logout")
    public Result logout() {
        Subject subject = SecurityUtils.getSubject();
        subject.logout();
        return new Result(true,"success",null);
    }
}
