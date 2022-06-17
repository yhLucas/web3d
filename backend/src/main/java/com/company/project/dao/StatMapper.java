package com.company.project.dao;

import com.company.project.core.Mapper;
import com.company.project.model.Stat;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

public interface StatMapper extends Mapper<Stat> {


    @Select("SELECT * FROM stat where user_id = #{uid} and scene = #{scene}")
    Stat selectByUidAndScene(@Param("uid") Integer uid, @Param("scene") String scene);

    @Select("SELECT COUNT(*) FROM stat where scene = #{scene}")
    Integer selectCountAllByScene(@Param("scene") String scene);

    @Select("SELECT COUNT(*) FROM stat where scene = #{scene} and pass = TRUE")
    Integer selectPassByScene(@Param("scene") String scene);
}