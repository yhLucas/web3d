package com.company.project.model;

import java.util.Date;
import javax.persistence.*;

public class Record {
    @Id
    @Column(name = "record_id")
    private Integer recordId;

    @Column(name = "user_id")
    private Integer userId;

    private String scene;

    private Date time;

    public Record(){

    }

    public Record(Integer userId, String scene){
        this.userId = userId;
        this.scene = scene;
        this.time = new Date(System.currentTimeMillis());
    }

    /**
     * @return record_id
     */
    public Integer getRecordId() {
        return recordId;
    }

    /**
     * @param recordId
     */
    public void setRecordId(Integer recordId) {
        this.recordId = recordId;
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