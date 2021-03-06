package com.company.project.service;
import com.company.project.core.Result;
import com.company.project.model.User;
import com.company.project.core.Service;


/**
 * Created by CodeGenerator on 2022/04/19.
 */
public interface UserService extends Service<User> {

    Result login(String email, String password);

    Result logout(Integer token);

}
