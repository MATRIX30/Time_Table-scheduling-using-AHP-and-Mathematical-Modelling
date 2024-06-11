package com.timetablescheduling.backend.models.modelDefinition;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document
public class Day {
    private int id;
    private String name;

    public Day(String name) {
        this.name = name;
    }


    public static List<Day> createWeekDays() {
        List<Day> weekDays = new ArrayList<>();
        weekDays.add(new Day("Monday"));
        weekDays.add(new Day("Tuesday"));
        weekDays.add(new Day("Wednesday"));
        weekDays.add(new Day("Thursday"));
        weekDays.add(new Day("Friday"));
        weekDays.add(new Day("Saturday"));
        weekDays.add(new Day("Sunday"));
        return weekDays;
    }
}