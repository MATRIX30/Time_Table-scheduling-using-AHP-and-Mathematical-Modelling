package com.timetablescheduling.backend.models;

import java.util.Date;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document
@Data
public abstract class BaseEntity {

    /*
        All about model of data should be implements in the repository package.
        If you have a new things to manage, please create his model class
     */
    @Id
    private String id;

    @CreatedDate
    private Date createdAt = new Date();

    @CreatedDate
    private Date updateAt;


    @CreatedDate
    private Date deleteAt;

    private boolean isDelete = false;
}
