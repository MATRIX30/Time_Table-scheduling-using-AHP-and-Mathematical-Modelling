package com.timetablescheduling.backend.models;

import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import java.util.Date;

@Data
@MappedSuperclass
public class BaseEntity {

    /*
        All about model of data should be implements in the repository package.
        If you have a new things to manage, please create his model class
     */

    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date createdAt = new Date();

    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date updateAt;

    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date deleteAt;

    private boolean isDelete = false;
}
