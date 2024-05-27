package com.example.Time_Table_scheduling_using_AHP_and_Mathematical_Modelling.service;

import lombok.Data;

@Data
public class TimeSlot {
    private String id;
    private String time;

    public TimeSlot(String id, String time) {
        this.id = id;
        this.time = time;
    }
}