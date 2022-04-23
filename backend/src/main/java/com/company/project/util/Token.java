package com.company.project.util;

import javax.persistence.*;

public class Token {
    private Integer token;

    public Token(Integer token){
        this.token = token;
    }

    public Integer getToken() {
        return token;
    }

    public void setToken(Integer token) {
        this.token = token;
    }
}
