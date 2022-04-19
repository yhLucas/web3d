package com.company.project.service.impl;

import com.company.project.dao.UserMapper;
import com.company.project.model.Log;
import com.company.project.model.User;
import com.company.project.service.UserService;
import com.company.project.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;


/**
 * Created by CodeGenerator on 2022/04/19.
 */
@Service
@Transactional
public class UserServiceImpl extends AbstractService<User> implements UserService {
    @Resource
    private UserMapper userMapper;

    @Override
    public void save(User user){
        userMapper.insert(user);
    }

    @Override
    public void deleteById(Integer id) {
        userMapper.deleteByPrimaryKey(id);
    }

    @Override
    public void update(User user){
        userMapper.updateByPrimaryKey(user);
    }

    @Override
    public User findById(Integer id){
        return userMapper.selectByPrimaryKey(id);
    }

    @Override
    public List<User> findAll(){
        return userMapper.selectAll();
    }
}
