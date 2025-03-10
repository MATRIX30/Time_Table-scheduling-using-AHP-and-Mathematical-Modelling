package com.timetablescheduling.backend.models.collected_data;

import com.timetablescheduling.backend.models.mainModels.*;
import lombok.Data;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
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
   private Filiere returnExistingFiliere(String nomFiliere){
       for (Filiere existingFiliere : existingFilieres) {
           if (existingFiliere.getName().equals(nomFiliere)) {
               return existingFiliere;
           }
       }
       return null ;
   }

    private StudentLevel returnExistingLevel(String nomLevel) {
        for (StudentLevel existingLevel : existingLevel) {
            if (existingLevel.getName().equals(nomLevel)) {
                return existingLevel;
            }
        }
        return null;
    }

    private Semestre returnExistingSemester(String nomSemestre) {
        for (Semestre existingSemester : existingSemestre) {
            if (existingSemester.getName().equals(nomSemestre)) {
                return existingSemester;
            }
        }
        return null;
    }


    public List<Room> getRoom() {
        List<Room> rooms = new ArrayList<>();
        JSONObject filiereObj = dataRoom.getJSONObject("facultes").getJSONObject("sciences").getJSONObject("filiere");
        for (String nomFiliere : filiereObj.keySet()) {
            Filiere filiere = returnExistingFiliere(nomFiliere);
            JSONArray roomArray = filiereObj.getJSONArray(nomFiliere);
            for (int i = 0; i < roomArray.length(); i++) {
                JSONObject salleObj = roomArray.getJSONObject(i);
                if (!Objects.equals(salleObj.getString("capacite"), "") && !Objects.equals(salleObj.getString("num"), "")  && !Objects.equals(salleObj.getString("batiment"), "")) {
                    Room room = new Room(Integer.parseInt(salleObj.getString("capacite")), salleObj.getString("num"), salleObj.getString("batiment"));
                    room.setFiliere(filiere);
                    rooms.add(room);
                }
            }
        }

        return rooms;
    }

    public ParsingResult getLevelLecturerAndCourses() {
        List<Lecturer> lecturersToReturn = new ArrayList<>();
        List<Course> coursesToReturn = new ArrayList<>();
        List<Room> roomsToReturn = getRoom();
        // Récupération of filiere object
        JSONObject filiereObj = dataCourse.getJSONObject("facultes").getJSONObject("sciences").getJSONObject("filiere");

        for (String nomFiliere : filiereObj.keySet()) {
            Filiere filiere = returnExistingFiliere(nomFiliere);
            // Récupération of levels objects
            JSONObject niveauObj = filiereObj.getJSONObject(nomFiliere).getJSONObject("niveau");
            // In the filieres objects we take the levels objects to work on it
            for (String niveau : niveauObj.keySet()) {
                JSONObject semestreObj = niveauObj.getJSONObject(niveau);
                // Recuperation of existing object level
                StudentLevel level = returnExistingLevel(niveau);
                // In the levels objects we take semesters objects to work on it
                for (String semestre : semestreObj.keySet()) {
                    // Recuperation of semester object
                    Semestre semestre1 = returnExistingSemester(semestre);
                    // In the semesters objects we take subjects objects to work on it
                    JSONArray subjectsArray = semestreObj.getJSONObject(semestre).getJSONArray("subjects");
                    for (int i = 0; i < subjectsArray.length(); i++) {
                        // Logic for add a course
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
                        Lecturer lecturer = new Lecturer(lecturerName, false);
                        Lecturer assistant = new Lecturer(assistantName, true);
                        Course course = new Course(name, code, category);
                        course.setCredit(credit);
                        // add the course for lecturer
                        lecturer.setCourse(course);
                        assistant.setCourse(course);

                        // add the filiere, the level and the semester for the course
                        course.setLevel(level);
                        course.setFiliere(filiere);
                        course.setSemestre(semestre1);

                        // setReturn value
                        lecturersToReturn.add(lecturer);
                        lecturersToReturn.add(assistant);
                        coursesToReturn.add(course);
                    }
                }
            }
        }


        return ParsingResult.builder()
                .lecturers(lecturersToReturn)
                .courses(coursesToReturn)
                .rooms(roomsToReturn)
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



