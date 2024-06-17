package com.timetablescheduling.backend.models.collected_data;

import com.timetablescheduling.backend.models.mainModels.*;
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

        ParsingResult parsingResult = dataParsing.getLevelLecturerAndCourses();

        System.out.println("\n================ Room ================\n");
        for (Room room : parsingResult.getRooms()) {
            System.out.println(room);
        }


        System.out.println("\n================ Filière ================\n");
        for (Filiere filiere : Filiere.createFiliere()) {
            System.out.println(filiere);
        }

        System.out.println("\n================ Level ================\n");
        for (StudentLevel level : StudentLevel.createLevel()) {
            System.out.println(level);
        }

        System.out.println("\n================ Semester ================\n");
        for (Semestre semestre : Semestre.createSemestre()) {
            System.out.println(semestre);
        }

        System.out.println("\n================ Day ================\n");
        for (Day day : Day.createWeekDays()) {
            System.out.println(day);
        }

        System.out.println("\n================ Timeslots ================\n");
        for (TimeSlot timeSlot : TimeSlot.createTimeSlots()) {
            System.out.println(timeSlot);
        }

        System.out.println("\n================ Lecturer ================\n");

        for (Lecturer lecturer : parsingResult.getLecturers()){
            System.out.println(lecturer);
        }

        System.out.println("\n================ Courses ================\n");
        for (Course course: parsingResult.getCourses()) {
            System.out.println(course);
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
