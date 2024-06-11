package com.timetablescheduling.backend.models.collected_data;

import com.timetablescheduling.backend.models.modelDefinition.*;
import lombok.Data;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Data
public class DataParsing {

   private JSONObject dataRoom;
   private JSONObject dataCourse;
   List<Filiere> existingFilieres = Filiere.createFiliere();
   List<StudentLevel> existingLevel = StudentLevel.createLevel();
   List<Semestre> existingSemestre = Semestre.createSemestre();


   private boolean filiereExists(String nomFiliere) {
        for (Filiere existingFiliere : existingFilieres) {
            if (existingFiliere.getName().equals(nomFiliere)) {
                return true;
            }
        }
        return false;
   }

    private boolean levelExist(String nomFiliere) {
        for (Filiere existingFiliere : existingFilieres) {
            if (existingFiliere.getName().equals(nomFiliere)) {
                return true;
            }
        }
        return false;
    }

    private boolean semesterExist(String nomFiliere) {
        for (Filiere existingFiliere : existingFilieres) {
            if (existingFiliere.getName().equals(nomFiliere)) {
                return true;
            }
        }
        return false;
    }


    public RoomAndFiliereParsingResult getRoomAndFiliere() {
        List<Room> rooms = new ArrayList<>();
        JSONObject filiereObj = dataRoom.getJSONObject("facultes").getJSONObject("sciences").getJSONObject("filiere");

        for (String nomFiliere : filiereObj.keySet()) {
            Filiere filiere = new Filiere(nomFiliere);
            if (filiereExists(nomFiliere)) {
                existingFilieres.add(filiere);
            }
            JSONArray roomArray = filiereObj.getJSONArray(nomFiliere);

            for (int i = 0; i < roomArray.length(); i++) {
                JSONObject salleObj = roomArray.getJSONObject(i);
                if (!Objects.equals(salleObj.getString("capacite"), "") && !Objects.equals(salleObj.getString("num"), "")  && !Objects.equals(salleObj.getString("batiment"), "")) {
                    Room room = new Room(Integer.parseInt(salleObj.getString("capacite")), salleObj.getString("num"), salleObj.getString("batiment"));
                    rooms.add(room);
                    filiere.setRooms(rooms);
                }
            }
        }

        return RoomAndFiliereParsingResult.builder()
                .filieres(existingFilieres)
                .rooms(rooms)
                .build();
    }

    public LevelLecturerAndCoursesResultParsing getLevelLecturerAndCourses() {
        List<Lecturer> lecturers = new ArrayList<>();
        List<Course> courses = new ArrayList<>();

        JSONObject filiereObj = dataCourse.getJSONObject("facultes").getJSONObject("sciences").getJSONObject("filiere");

        for (String nomFiliere : filiereObj.keySet()) {
            Filiere filiere = new Filiere(nomFiliere);
            if (filiereExists(nomFiliere)) {
                existingFilieres.add(filiere);
            }
            JSONObject niveauObj = filiereObj.getJSONObject(nomFiliere).getJSONObject("niveau");
            for (String niveau : niveauObj.keySet()) {
                JSONObject semestreObj = niveauObj.getJSONObject(niveau);
                StudentLevel level = new StudentLevel(niveau);
                if (levelExist(niveau)) {
                    existingLevel.add(level);
                }
                for (String semestre : semestreObj.keySet()) {
                    JSONArray subjectsArray = semestreObj.getJSONObject(semestre).getJSONArray("subjects");
                    Semestre semestre1 = new Semestre(semestre);
                    if (semesterExist(semestre)) {
                        existingSemestre.add(semestre1);
                    }
                    for (int i = 0; i < subjectsArray.length(); i++) {
                        String name, category;
                        int credit;
                        JSONArray lecturersArray = new JSONArray(), assistantLecturersArray = new JSONArray();
                        JSONObject subjectObj = subjectsArray.getJSONObject(i);
                        if (subjectObj.isEmpty()) continue;
                        String code = subjectObj.getString("code");
                        if (!(subjectObj.get("name") instanceof String) || !subjectObj.has("credit")) name = code +" - course" ;
                        else {
                            name = subjectObj.getString("name").isEmpty() ? code +" - course" : subjectObj.getString("name");
                        }
                        if (!subjectObj.has("credit")) credit = 0;
                        else credit = subjectObj.getInt("credit");
                        if (!subjectObj.has("category")) category = "";
                        else category = subjectObj.getString("category");
                        if (!subjectObj.has("Assistant lecturer")) {
                            assistantLecturersArray.put("");
                            assistantLecturersArray.put("");
                        }
                        else assistantLecturersArray = subjectObj.getJSONArray("Assitant lecturer");
                        if (!subjectObj.has("Course Lecturer")) {
                            assistantLecturersArray.put("");
                            assistantLecturersArray.put("");
                        }
                        else lecturersArray = subjectObj.getJSONArray("Course Lecturer");

                        String lecturerName = (getFullName(JSONArrayToArray(lecturersArray))).isEmpty() ? "Lecturer - " + code : getFullName(JSONArrayToArray(lecturersArray));
                        String assistantName = (getFullName(JSONArrayToArray(assistantLecturersArray))).isEmpty() ? "AssistantLecturer -" + code : getFullName(JSONArrayToArray(assistantLecturersArray));
                        lecturers.add(new Lecturer(lecturerName, false));
                        lecturers.add(new Lecturer(assistantName, true));
                        Course course = new Course(name, code, category);
                        course.setCredit(credit);
                        course.setLecturer(lecturers);
                        courses.add(course);
                    }
                }
            }
        }

        return LevelLecturerAndCoursesResultParsing.builder()
                .lecturers(lecturers)
                .courses(courses)
                .build();
    }

    public String getFullName(String[] nameArray){
        String fullName = "";
        if (nameArray.length > 0 && !nameArray[0].isEmpty()) {
            fullName += nameArray[0];
        }

        if (nameArray.length > 1 && !nameArray[1].isEmpty()) {
            if (!fullName.isEmpty()) {
                fullName += " ";
            }
            fullName += nameArray[1];
        }
        return fullName;
    }
    public String[] JSONArrayToArray(JSONArray jsonArray){
        String[] array = new String[jsonArray.length()];
        for (int i = 0; i < jsonArray.length(); i++) {
            array[i] = jsonArray.getString(i);
        }
        return array;
    }
}



