package com.company.project.web;
import com.company.project.core.Result;
import com.company.project.core.ResultGenerator;
import com.company.project.model.Stat;
import com.company.project.service.StatService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
* Created by CodeGenerator on 2022/06/17.
*/
@RestController
@RequestMapping("/api/stat")
public class StatController {
    @Resource
    private StatService statService;

    //  第一次进入场景
    @PostMapping("/add")
    public Result add(@RequestParam Integer token,
                      @RequestParam String scene) {
        statService.save(token, scene);
        return ResultGenerator.genSuccessResult();
    }

    //  第一次通关
    @PostMapping("/update")
    public Result update(@RequestParam Integer token,
                         @RequestParam String scene) {
        statService.update(token, scene);
        return ResultGenerator.genSuccessResult();
    }

    //  查询过关率
    @PostMapping("/list")
    public Result list(@RequestParam String scene) {
        return ResultGenerator.genSuccessResult(statService.list(scene));
    }
}