package com.company.project.web;
import com.company.project.core.Result;
import com.company.project.core.ResultGenerator;
import com.company.project.model.User;
import com.company.project.service.UserService;
import com.company.project.util.Email;
import com.company.project.util.PasswordEncode;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;
import com.company.project.core.ServiceException;

/**
* Created by CodeGenerator on 2022/04/19.
*/
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Resource
    private UserService userService;

    @GetMapping("/account")
    public Result checkRepeat(@RequestParam String email){
        User user = userService.findBy("email",email);
        if(user!=null) {
            return ResultGenerator.genSuccessResult(new Email(user.getEmail()));
        }else{
            return ResultGenerator.genSuccessResult();
        }
    }

    @PostMapping("/account")
    public Result add(@RequestParam String email,
                      @RequestParam String password) {
        User user = new User();
        user.setEmail(email);
        user.setPassword(PasswordEncode.digestPassword(password));
        try {
            userService.save(user);
            return ResultGenerator.genSuccessResult();
        }catch(Exception e){
            throw new ServiceException("该邮箱已被注册，注册失败");
        }

    }

    @PostMapping("/token")
    public Result login(@RequestParam String email,
                        @RequestParam String password){
        return userService.login(email,password);
    }

    @DeleteMapping("/token")
    public Result logout(@RequestParam Integer token){
        return userService.logout(token);
    }



    @PostMapping("/delete")
    public Result delete(@RequestParam Integer id) {
        userService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/update")
    public Result update(User user) {
        userService.update(user);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/detail")
    public Result detail(@RequestParam Integer id) {
        User user = userService.findById(id);
        return ResultGenerator.genSuccessResult(user);
    }

    @PostMapping("/list")
    public Result list(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "0") Integer size) {
        PageHelper.startPage(page, size);
        List<User> list = userService.findAll();
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }
}
