package com.timetablescheduling.backend.models.mainModels;

import com.timetablescheduling.backend.models.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Document
public class Day extends BaseEntity {
    @Indexed(unique = true)
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