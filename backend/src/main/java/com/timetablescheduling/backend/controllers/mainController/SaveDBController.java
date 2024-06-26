package com.timetablescheduling.backend.controllers.mainController;


import com.timetablescheduling.backend.errors.CustomResponseEntity;
import com.timetablescheduling.backend.models.collected_data.DataParsing;
import com.timetablescheduling.backend.models.collected_data.ParsingResult;
import com.timetablescheduling.backend.models.mainModels.Course;
import com.timetablescheduling.backend.models.mainModels.Lecturer;
import com.timetablescheduling.backend.models.mainModels.Room;
import com.timetablescheduling.backend.service.mainService.*;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileNotFoundException;

import static com.timetablescheduling.backend.models.collected_data.Main.toJsonObject;

@RestController
@RequestMapping("/data")
public class SaveDBController {
    @Autowired
    private CourseService courseService;
    @Autowired
    private DayService dayService;
    @Autowired
    private FiliereService filiereService;
    @Autowired
    private LecturerService lecturerService;
    @Autowired
    private RoomService roomService;
    @Autowired
    private SemestreService semestreService;
    @Autowired
    private StudentLevelService studentLevelService;
    @Autowired
    private TimeslotService timeslotService;


    @GetMapping("/save")
    public ResponseEntity<?> save() throws FileNotFoundException {
        try {
            String fileRoomPath = "src/main/java/com/timetablescheduling/backend/models/collected_data/school-rooms.json";
            String fileCoursePath = "src/main/java/com/timetablescheduling/backend/models/collected_data/school-subjects.json";
            JSONObject dataRoom = toJsonObject(fileRoomPath);
            JSONObject dataCourse = toJsonObject(fileCoursePath);

            DataParsing dataParsing = new DataParsing();
            dataParsing.setDataRoom(dataRoom);
            dataParsing.setDataCourse(dataCourse);

            ParsingResult parsingResult = dataParsing.getLevelLecturerAndCourses();
            System.out.println("parsingResult done 👌");
            dayService.createDay();
            System.out.println("day created 👌");
            timeslotService.createTimeSlot();
            System.out.println("Timeslots created 👌");
            filiereService.createFiliere();
            System.out.println("filieres created done 👌");
            semestreService.createSemestre();
            System.out.println("Semestres created done 👌");
            studentLevelService.createStudentLevel();
            System.out.println("Student Level created done 👌");
            for (Course course : parsingResult.getCourses()) {
                if (filiereService.isPresent(course.getFiliere().getName()) &&
                        semestreService.isPresent(course.getSemestre().getName()) &&
                        studentLevelService.isPresent(course.getLevel().getName())) {
                    course.setFiliere(filiereService.getByName(course.getFiliere().getName()).get());
                    course.setSemestre(semestreService.getByName(course.getSemestre().getName()).get());
                    course.setLevel(studentLevelService.getByName(course.getLevel().getName()).get());
                    courseService.createCourse(course);
                }
            }
            System.out.println("Course created done 👌");
            for (Lecturer lecturer : parsingResult.getLecturers()) {
                System.out.println(lecturer);
                if (courseService.isPresent(lecturer.getCourse().getName())) {
                    lecturer.setCourse(courseService.getByName(lecturer.getCourse().getName()).get());
                    lecturerService.create(lecturer);
                }
            }
            System.out.println("Lecturer created done 👌");
            for (Room room : parsingResult.getRooms()) {
                if (filiereService.isPresent(room.getFiliere().getName())) {
                    room.setFiliere(filiereService.getByName(room.getFiliere().getName()).get());
                    roomService.create(room);
                }
            }
            System.out.println("Room created done 👌");
            return CustomResponseEntity.fromKey("TRAITEMENT_SUCCESS", HttpStatusCode.valueOf(200));
        }catch (Exception e){
            e.printStackTrace();
            return CustomResponseEntity.fromKey("ERREUR_TRAITEMENT_REQUETE", HttpStatusCode.valueOf(500));
        }
    }


}
