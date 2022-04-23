package com.company.project.web;
import com.company.project.core.Result;
import com.company.project.core.ResultGenerator;
import com.company.project.model.Log;
import com.company.project.service.LogService;
import com.company.project.service.impl.UserServiceImpl;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.web.bind.annotation.*;
import tk.mybatis.mapper.entity.Condition;

import javax.annotation.Resource;
import java.util.List;

/**
* Created by CodeGenerator on 2022/04/19.
*/
@RestController
@RequestMapping("/api/scene")
public class LogController {
    @Resource
    private LogService logService;

    @PostMapping("/history")
    public Result add(@RequestParam Integer token,
                      @RequestParam String scene) {
        return logService.save(token,scene);
    }

    @GetMapping("/history")
    public Result getLogs(@RequestParam Integer token){
        int uid = UserServiceImpl.getUser(token).getUserId();

        Condition condition = new Condition(Log.class);
        condition.createCriteria().andCondition("user_id",uid);
        List<Log> list = logService.findByCondition(condition);

        return ResultGenerator.genSuccessResult(list);
    }


    @PostMapping("/delete")
    public Result delete(@RequestParam Integer id) {
        logService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/update")
    public Result update(Log log) {
        logService.update(log);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/detail")
    public Result detail(@RequestParam Integer id) {
        Log log = logService.findById(id);
        return ResultGenerator.genSuccessResult(log);
    }

    @PostMapping("/list")
    public Result list(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "0") Integer size) {
        PageHelper.startPage(page, size);
        List<Log> list = logService.findAll();
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }
}
