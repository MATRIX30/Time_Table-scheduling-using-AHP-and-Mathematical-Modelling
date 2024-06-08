package com.timetablescheduling.backend.service.constraints;

import com.google.ortools.sat.Literal;

import lombok.Getter;
import lombok.Setter;


public class Variables {

    @Getter @Setter private int numCourses;

    @Getter @Setter private int numLevels;

    @Getter @Setter private int numTeachers;

    @Getter @Setter private int numDays;

    @Getter @Setter private int numTimeSlots;

    @Getter @Setter private int numRooms;

    @Getter private Literal[][][] roomSchedules;

    @Getter private Literal[][] lecturerCourses;

    @Getter private Literal[][][] courseSchedules;

    @Getter private Literal[][] levelCourseSchedules;
    
    @Getter private Literal[][][][] teacherCourseSchedules;

    @Getter private Literal[][][][][][] timeTableVariable;


    public void initialiseVariables() {
        roomSchedules = new Literal[numRooms][numTimeSlots][numDays];
        lecturerCourses = new Literal[numTeachers][numCourses];
        courseSchedules = new Literal[numCourses][numTimeSlots][numDays];
        levelCourseSchedules = new Literal[numLevels][numCourses];
        teacherCourseSchedules = new Literal[numTeachers][numCourses][numTimeSlots][numDays];
        timeTableVariable = new Literal[numCourses][numLevels][numTeachers][numRooms][numTimeSlots][numDays];    
    }
}
