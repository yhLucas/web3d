package com.company.project.web;
import com.company.project.core.Result;
import com.company.project.core.ResultGenerator;
import com.company.project.model.Record;
import com.company.project.model.Stat;
import com.company.project.service.RecordService;
import com.company.project.service.StatService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
* Created by CodeGenerator on 2022/06/17.
*/
@RestController
@RequestMapping("/api")
public class InfoController {

    @Resource
    private StatService statService;
    @Resource
    private RecordService recordService;

    //  进入游戏
    @PostMapping("/record")
    public Result add(@RequestParam Integer token,
                      @RequestParam String scene) {
        recordService.save(token, scene);
        statService.save(token, scene);
        return ResultGenerator.genSuccessResult();
    }

    //  第一次通关
    @PostMapping("/stat")
    public Result update(@RequestParam Integer token,
                         @RequestParam String scene) {
        statService.update(token, scene);
        return ResultGenerator.genSuccessResult();
    }
    
    //  查询过关率
    @GetMapping("/stat/all")
    public Result list(@RequestParam String scene) {
        return ResultGenerator.genSuccessResult(statService.list(scene));
    }
}
