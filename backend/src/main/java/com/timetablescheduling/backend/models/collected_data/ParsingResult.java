package com.timetablescheduling.backend.models.collected_data;

import com.timetablescheduling.backend.models.mainModels.*;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ParsingResult {
    private List<Course> courses;
    private List<Lecturer> lecturers;
    private List<Room> rooms;
}
