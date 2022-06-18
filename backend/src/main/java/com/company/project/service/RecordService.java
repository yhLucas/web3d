package com.company.project.service;
import com.company.project.core.Result;
import com.company.project.model.Record;
import com.company.project.core.Service;


/**
 * Created by CodeGenerator on 2022/06/17.
 */
public interface RecordService extends Service<Record> {
    Result save(Integer token, String scene);
}
