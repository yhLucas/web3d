package com.company.project.service.impl;

import com.company.project.core.AbstractService;
import com.company.project.core.Result;
import com.company.project.core.ResultGenerator;
import com.company.project.dao.LogMapper;
import com.company.project.model.Log;
import com.company.project.model.User;
import com.company.project.service.LogService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;


/**
 * Created by CodeGenerator on 2022/04/19.
 */
@Service
@Transactional
public class LogServiceImpl extends AbstractService<Log> implements LogService {
    @Resource
    private LogMapper logMapper;

    @Override
    public Result save(Integer token, String scene){
        User user = UserServiceImpl.getUser(token);
        Log log = new Log(user.getUserId(),scene);
        logMapper.insert(log);
        return ResultGenerator.genSuccessResult();
    }

    @Override
    public void deleteById(Integer id) {
        logMapper.deleteByPrimaryKey(id);
    }

    @Override
    public void update(Log log){
        logMapper.updateByPrimaryKey(log);
    }

    @Override
    public Log findById(Integer id){
        return logMapper.selectByPrimaryKey(id);
    }

    @Override
    public List<Log> findAll(){
        return logMapper.selectAll();
    }
}
