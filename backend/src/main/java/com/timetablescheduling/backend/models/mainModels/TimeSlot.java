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
public class TimeSlot extends BaseEntity {
    @Indexed(unique = true)
    private String time;

    public TimeSlot(String time) {
        this.time = time;
    }

    public TimeSlot() {

    }


    public static List<TimeSlot> createTimeSlots() {
        List<TimeSlot> timeSlots = new ArrayList<>();
        int hour = 7;
        while (hour < 21) {
            timeSlots.add(new TimeSlot(String.format("%02d:00 - %02d:00", hour, hour + 3)));
            hour += 3;
        }
        return timeSlots;
    }

}