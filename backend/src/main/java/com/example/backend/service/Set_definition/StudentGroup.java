package com.example.Time_Table_scheduling_using_AHP_and_Mathematical_Modelling.service;

import lombok.Data;

@Data
public class StudentGroup {
    private String id;
    private String name;

    public StudentGroup(String id, String name) {
        this.id = id;
        this.name = name;
    }
}