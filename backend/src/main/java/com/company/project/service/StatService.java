package com.company.project.service;
import com.company.project.core.Result;
import com.company.project.model.Stat;
import com.company.project.core.Service;


/**
 * Created by CodeGenerator on 2022/06/17.
 */
public interface StatService extends Service<Stat> {
    Result save(Integer token, String scene);
    Result update(Integer token, String scene);
    Result list(String scene);
}
