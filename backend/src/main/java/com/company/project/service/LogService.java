package com.company.project.service;
import com.company.project.core.Result;
import com.company.project.model.Log;
import com.company.project.core.Service;


/**
 * Created by CodeGenerator on 2022/04/19.
 */
public interface LogService extends Service<Log> {

    Result save(Integer token, String scene);
}
