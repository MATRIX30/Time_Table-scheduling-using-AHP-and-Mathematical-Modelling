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

    @Getter private Literal[][][][] courseSchedules;

    @Getter private Literal[][][][] levelCourseSchedules;
    
    @Getter private Literal[][][][] teacherCourseSchedules;


    public void initialiseVariables() {
        courseSchedules = new Literal[numCourses][numDays][numTimeSlots][numRooms];
        levelCourseSchedules = new Literal[numLevels][numCourses][numTimeSlots][numDays];
        teacherCourseSchedules = new Literal[numTeachers][numCourses][numTimeSlots][numDays];
    }
}
