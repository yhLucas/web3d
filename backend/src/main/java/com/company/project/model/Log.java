package com.company.project.model;

import java.util.Date;
import javax.persistence.*;

public class Log {
    @Id
    @Column(name = "log_id")
    private Integer logId;

    @Column(name = "user_id")
    private Integer userId;

    private String scene;

    private Date time;

    public Log(Integer userId,String scene){
        this.userId = userId;
        this.scene = scene;
        this.time = new Date(System.currentTimeMillis());
    }

    /**
     * @return log_id
     */
    public Integer getLogId() {
        return logId;
    }

    /**
     * @param logId
     */
    public void setLogId(Integer logId) {
        this.logId = logId;
    }

    /**
     * @return user_id
     */
    public Integer getUserId() {
        return userId;
    }

    /**
     * @param userId
     */
    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    /**
     * @return scene
     */
    public String getScene() {
        return scene;
    }

    /**
     * @param scene
     */
    public void setScene(String scene) {
        this.scene = scene;
    }

    /**
     * @return time
     */
    public Date getTime() {
        return time;
    }

    /**
     * @param time
     */
    public void setTime(Date time) {
        this.time = time;
    }
}