package com.timetablescheduling.backend.service.constraints;

import java.util.ArrayList;
import java.util.List;

public class Constraints {
    // All the constraints are method and will be added to the resolver

    // Defining of sets waiting all the real sets and parameters

    List<Object> students = new ArrayList<>();
    List<Object> lecturers = new ArrayList<>();
    List<Object> rooms = new ArrayList<>();
    List<Object> timeslots = new ArrayList<>();
    List<Object> filieres = new ArrayList<>();
    List<Object> semesters = new ArrayList<>();
    List<Object> days = new ArrayList<>();
    List<Object> courses = new ArrayList<>();


    Integer nbStudentForLevel;
    Integer roomSize;
    Integer maxNbCourseGiveByLecturer;

    boolean decisionVariable; // waiting for writing decision variable


    // 4. A teacher has a maximum number of course

    boolean nbCourseForLecturer(){
        int sum = 0;
        for (Object course : courses) {
            for (Object lecturer: lecturers) {
                if (decisionVariable) sum += 1;
            }
        }
        return sum > maxNbCourseGiveByLecturer;
    }


    // 5. All the courses have to be programmed

    boolean isCourseAllProgrammed(){
        int sum = 0;
        for (Object course : courses) {
            for (Object day: days) {
                for (Object time: timeslots) {
                    if (!decisionVariable) sum += 1;
                }
            }
        }
        return sum > maxNbCourseGiveByLecturer;
    }


    // 6. Respect Room capacity


    boolean isCourseCapacityRespected(){
        boolean sum = false;
        for (Object course : courses) {
            for (Object day: days) {
                for (Object time: timeslots) {
                    if (decisionVariable){
                        sum = (roomSize == nbStudentForLevel);
                    }
                }
            }
        }
        return  sum;
    }



}
