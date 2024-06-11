package com.timetablescheduling.backend.models;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import java.util.Date;

@Data
public class BaseEntity {

    /*
        All about model of data should be implements in the repository package.
        If you have a new things to manage, please create his model class
     */

    @CreatedDate
    private Date createdAt = new Date();

    @CreatedDate
    private Date updateAt;


    @CreatedDate
    private Date deleteAt;

    private boolean isDelete = false;
}
