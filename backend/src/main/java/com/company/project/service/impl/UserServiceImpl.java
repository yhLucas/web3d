package com.company.project.service.impl;

import com.company.project.core.Result;
import com.company.project.core.ResultGenerator;
import com.company.project.dao.UserMapper;
import com.company.project.util.Token;
import com.company.project.model.User;
import com.company.project.service.UserService;
import com.company.project.core.AbstractService;
import com.company.project.util.PasswordEncode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;


/**
 * Created by CodeGenerator on 2022/04/19.
 */
@Service
@Transactional
public class UserServiceImpl extends AbstractService<User> implements UserService {
    @Resource
    private UserMapper userMapper;

    private static HashMap<Integer,User> map = new HashMap<Integer, User>();
    private static Integer count = 1;

    public Result login(String email,String password){
        User user = findBy("email",email);
        if(user==null){
            return ResultGenerator.genFailResult("用户未注册");
        }
        if(!PasswordEncode.isPasswordEnable(password,user.getPassword())){
            return ResultGenerator.genFailResult("密码错误");
        }
        map.put(count,user);
        return ResultGenerator.genSuccessResult(new Token(count++));
    }

    public Result logout(Integer token){
        try{
            map.remove(token);
            return ResultGenerator.genSuccessResult();
        }catch(Exception e){
            return ResultGenerator.genFailResult("登出失败");
        }

    }

    public static User getUser(Integer token){
        return map.get(token);
    }


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
