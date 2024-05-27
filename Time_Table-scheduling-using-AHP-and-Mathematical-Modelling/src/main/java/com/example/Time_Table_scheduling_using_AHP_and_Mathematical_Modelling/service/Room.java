package com.example.Time_Table_scheduling_using_AHP_and_Mathematical_Modelling.service;

import lombok.Data;

@Data
public class Room {
    private String id;
    private String name;

    public Room(String id, String name) {
        this.id = id;
        this.name = name;
    }
}
