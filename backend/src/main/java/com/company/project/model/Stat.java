package com.company.project.model;

import javax.persistence.*;
import java.util.Date;

public class Stat {
    @Id
    @Column(name = "stat_id")
    private Integer statId;

    @Column(name = "user_id")
    private Integer userId;

    private String scene;

    private Boolean pass;

    public Stat(){
    }

    public Stat(Integer userId, String scene){
        this.userId = userId;
        this.scene = scene;
        this.pass = false;
    }

    /**
     * @return stat_id
     */
    public Integer getStatId() {
        return statId;
    }

    /**
     * @param statId
     */
    public void setStatId(Integer statId) {
        this.statId = statId;
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
     * @return pass
     */
    public Boolean getPass() {
        return pass;
    }

    /**
     * @param pass
     */
    public void setPass(Boolean pass) {
        this.pass = pass;
    }
}