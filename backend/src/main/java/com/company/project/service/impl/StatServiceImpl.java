package com.company.project.service.impl;

import com.company.project.core.Result;
import com.company.project.core.ResultGenerator;
import com.company.project.dao.StatMapper;
import com.company.project.model.Record;
import com.company.project.model.Stat;
import com.company.project.model.User;
import com.company.project.service.StatService;
import com.company.project.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by CodeGenerator on 2022/06/17.
 */
@Service
@Transactional
public class StatServiceImpl extends AbstractService<Stat> implements StatService {
    @Resource
    private StatMapper statMapper;

    @Override
    public Result save(Integer token, String scene){
        User user = UserServiceImpl.getUser(token);
        Stat stat = new Stat(user.getUserId(), scene);
        statMapper.insert(stat);
        return ResultGenerator.genSuccessResult();
    }

    @Override
    public Result update(Integer token, String scene){
        User user = UserServiceImpl.getUser(token);
        //  获取对应的Stat
        int uid = user.getUserId();
        Stat stat = statMapper.selectByUidAndScene(user.getUserId(), scene);
        statMapper.delete(stat);
        Stat newStat = new Stat();
        newStat.setPass(true);
        newStat.setScene(scene);
        newStat.setUserId(uid);
        statMapper.insert(newStat);
        return ResultGenerator.genSuccessResult();
    }

    @Override
    public Result list(String scene){
        int total = statMapper.selectCountAllByScene(scene);
        int pass = statMapper.selectPassByScene(scene);
        String msg = "有" + total + "人玩过这个场景，其中" + pass + "人通关。";
        return ResultGenerator.genSuccessResult(msg);
    }
}
