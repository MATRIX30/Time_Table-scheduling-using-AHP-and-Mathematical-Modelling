package com.example.Time_Table_scheduling_using_AHP_and_Mathematical_Modelling.service;

import lombok.Data;

@Data
public class Course {
    private String id;
    private String title;

    public Course(String id, String title) {
        this.id = id;
        this.title = title;
    }
}