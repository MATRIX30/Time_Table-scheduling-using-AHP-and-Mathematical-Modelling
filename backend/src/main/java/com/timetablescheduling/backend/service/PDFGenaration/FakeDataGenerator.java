package com.timetablescheduling.backend.service.PDFGenaration;

import com.timetablescheduling.backend.models.mainModels.*;

import java.util.ArrayList;
import java.util.List;

public class FakeDataGenerator {
    public static void main(String[] args) {
        List<Day> days = Day.createWeekDays();
        List<Filiere> filieres = Filiere.createFiliere();
        List<Semestre> semestres = Semestre.createSemestre();
        List<StudentLevel> levels = StudentLevel.createLevel();
        List<TimeSlot> timeSlots = TimeSlot.createTimeSlots();
        List<Course> courses = createCourses(filieres, levels, semestres);
        List<Lecturer> lecturers = createLecturers(courses);
        List<Room> rooms = createRooms(filieres);

        List<TimeTableCell> timeTableCells = createTimeTableCells(days, filieres, semestres, levels, timeSlots, courses, lecturers, rooms);

        // Print the generated timetable cells to verify
        for (TimeTableCell cell : timeTableCells) {
            System.out.println(cell);
        }
    }

    public static List<Course> createCourses(List<Filiere> filieres, List<StudentLevel> levels, List<Semestre> semestres) {
        List<Course> courses = new ArrayList<>();
        for (Filiere filiere : filieres) {
            for (StudentLevel level : levels) {
                for (Semestre semestre : semestres) {
                    String courseName = "Course " + filiere.getName() + " " + level.getName() + " " + semestre.getName();
                    String courseCode = "C" + filiere.getName().charAt(0) + level.getName() + semestre.getName();
                    String category = "Category " + filiere.getName();
                    Course course = new Course(courseName, courseCode, category);
                    course.setFiliere(filiere);
                    course.setLevel(level);
                    course.setSemestre(semestre);
                    courses.add(course);
                }
            }
        }
        return courses;
    }

    public static List<Lecturer> createLecturers(List<Course> courses) {
        List<Lecturer> lecturers = new ArrayList<>();
        for (int i = 0; i < courses.size(); i++) {
            String lecturerName = "Lecturer " + (i + 1);
            boolean isAssistant = i % 2 == 0;
            Lecturer lecturer = new Lecturer(lecturerName, isAssistant);
            lecturer.setCourse(courses.get(i));
            lecturers.add(lecturer);
        }
        return lecturers;
    }

    public static List<Room> createRooms(List<Filiere> filieres) {
        List<Room> rooms = new ArrayList<>();
        for (int i = 0; i < filieres.size(); i++) {
            String roomName = "Room " + (i + 1);
            int capacity = 30 + (i * 10);
            String batiment = "Building " + (i + 1);
            Room room = new Room(capacity, roomName, batiment);
            room.setFiliere(filieres.get(i));
            rooms.add(room);
        }
        return rooms;
    }

    public static List<TimeTableCell> createTimeTableCells(List<Day> days, List<Filiere> filieres, List<Semestre> semestres, List<StudentLevel> levels, List<TimeSlot> timeSlots, List<Course> courses, List<Lecturer> lecturers, List<Room> rooms) {
        List<TimeTableCell> timeTableCells = new ArrayList<>();
        for (Day day : days) {
            for (TimeSlot timeSlot : timeSlots) {
                for (Semestre semestre : semestres) {
                    for (Filiere filiere : filieres) {
                        for (StudentLevel level : levels) {
                            // Create a cell only if we have enough courses, lecturers, and rooms
                            if (!courses.isEmpty() && !lecturers.isEmpty() && !rooms.isEmpty()) {
                                Course course = courses.remove(0);
                                Lecturer lecturer = lecturers.remove(0);
                                Room room = rooms.remove(0);

                                TimeTableCell cell = new TimeTableCell(timeSlot, day, room, filiere, course, semestre, lecturer, level);
                                timeTableCells.add(cell);

                                // Re-add the course, lecturer, and room back to the list to be reused
                                courses.add(course);
                                lecturers.add(lecturer);
                                rooms.add(room);
                            }
                        }
                    }
                }
            }
        }
        return timeTableCells;
    }
}
