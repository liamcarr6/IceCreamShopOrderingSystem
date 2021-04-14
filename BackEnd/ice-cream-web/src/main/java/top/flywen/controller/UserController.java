package top.flywen.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import top.flywen.model.base.Result;
import top.flywen.model.entity.IcUser;
import top.flywen.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;
    @GetMapping("/list")
    public List<IcUser> getAllUser() {
        List<IcUser> allUser = userService.getAllUser();
        return allUser;
    }
    @GetMapping("/judge")
    public Result judge(@RequestParam("userName") String userName) {
        Boolean aBoolean = userService.judgeUser(userName);
        return  new Result(aBoolean,"success", userName);
    }
}
