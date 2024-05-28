package com.example.Time_Table_scheduling_using_AHP_and_Mathematical_Modelling.service;


import lombok.Data;

@Data
public class Lecturer {
    private String id;
    private String name;

    public Lecturer(String id, String name) {
        this.id = id;
        this.name = name;
    }
}
