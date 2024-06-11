package com.timetablescheduling.backend.models.collected_data;

import com.timetablescheduling.backend.models.modelDefinition.*;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;

import java.io.FileInputStream;
import java.io.FileNotFoundException;

public class Main {
    public static void main(String[] args) throws FileNotFoundException {
        String fileRoomPath = "src/main/java/com/timetablescheduling/backend/models/collected_data/school-rooms.json";
        String fileCoursePath = "src/main/java/com/timetablescheduling/backend/models/collected_data/school-subjects.json";
        JSONObject dataRoom = toJsonObject(fileRoomPath);
        JSONObject dataCourse = toJsonObject(fileCoursePath);

        DataParsing dataParsing = new DataParsing();
        dataParsing.setDataRoom(dataRoom);
        dataParsing.setDataCourse(dataCourse);

        RoomAndFiliereParsingResult roomAndFiliereResult = dataParsing.getRoomAndFiliere();
        LevelLecturerAndCoursesResultParsing levelLecturerAndCoursesResult = dataParsing.getLevelLecturerAndCourses();

        System.out.println("\n================ Room ================\n");
        for (Room room : roomAndFiliereResult.getRooms()) {
            System.out.println(room.getName());
        }


        System.out.println("\n================ Semester ================\n");
        for (Filiere filiere : Filiere.createFiliere()) {
            System.out.println(filiere.getName());
        }

        System.out.println("\n================ Semester ================\n");
        for (Semestre semestre : Semestre.createSemestre()) {
            System.out.println(semestre.getName());
        }

        System.out.println("\n================ Day ================\n");
        for (Day day : Day.createWeekDays()) {
            System.out.println(day.getName());
        }

        System.out.println("\n================ Timeslots ================\n");
        for (TimeSlot timeSlot : TimeSlot.createTimeSlots()) {
            System.out.println(timeSlot.getTime());
        }

        System.out.println("\n================ Lecturer ================\n");

        for (Lecturer lecturer : levelLecturerAndCoursesResult.getLecturers()){
            System.out.println(lecturer.getName());
        }

        System.out.println("\n================ Courses ================\n");
        for (Course course: levelLecturerAndCoursesResult.getCourses()) {
            System.out.println(course.getName());
        }

    }

    public static JSONObject toJsonObject(String path) throws JSONException, FileNotFoundException {
        JSONObject data = null;
        FileInputStream fis = new FileInputStream(path);
        JSONTokener tokener = new JSONTokener(fis);
        data = new JSONObject(tokener);
        return data;
    }
}
