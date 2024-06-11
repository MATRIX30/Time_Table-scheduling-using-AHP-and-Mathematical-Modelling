package com.timetablescheduling.backend.models.collected_data;

import com.timetablescheduling.backend.models.modelDefinition.Course;
import com.timetablescheduling.backend.models.modelDefinition.Lecturer;
import com.timetablescheduling.backend.models.modelDefinition.StudentLevel;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class LevelLecturerAndCoursesResultParsing {
    private List<StudentLevel> studentLevels;
    private List<Course> courses;
    private List<Lecturer> lecturers;
}
