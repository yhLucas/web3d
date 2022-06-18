package com.company.project.service.impl;

import com.company.project.core.Result;
import com.company.project.core.ResultGenerator;
import com.company.project.dao.RecordMapper;
import com.company.project.model.Record;
import com.company.project.model.User;
import com.company.project.service.RecordService;
import com.company.project.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by CodeGenerator on 2022/06/17.
 */
@Service
@Transactional
public class RecordServiceImpl extends AbstractService<Record> implements RecordService {
    @Resource
    private RecordMapper recordMapper;

    @Override
    public Result save(Integer token, String scene){
        User user = UserServiceImpl.getUser(token);
        System.out.println(scene);
        Record record = new Record(user.getUserId(), scene);
        recordMapper.insert(record);
        return ResultGenerator.genSuccessResult();
    }
}
