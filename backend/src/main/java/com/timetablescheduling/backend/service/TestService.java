package com.timetablescheduling.backend.service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

import org.springframework.stereotype.Service;

import com.timetablescheduling.backend.models.mainModels.Course;
import com.timetablescheduling.backend.models.mainModels.Day;
import com.timetablescheduling.backend.models.mainModels.Lecturer;
import com.timetablescheduling.backend.models.mainModels.Room;
import com.timetablescheduling.backend.models.mainModels.StudentLevel;
import com.timetablescheduling.backend.models.mainModels.TimeSlot;
import com.timetablescheduling.backend.repository.mainRepository.CourseRepository;
import com.timetablescheduling.backend.repository.mainRepository.DayRepository;
import com.timetablescheduling.backend.repository.mainRepository.LecturerRepository;
import com.timetablescheduling.backend.repository.mainRepository.RoomRepository;
import com.timetablescheduling.backend.repository.mainRepository.TimeSlotsRepository;
import com.timetablescheduling.backend.repository.mainRepository.TimeTableCellRepository;
import com.timetablescheduling.backend.service.AHP.PreferenceCompute;
import com.timetablescheduling.backend.service.mainService.LecturerService;
import com.timetablescheduling.backend.service.mainService.StudentLevelService;
import com.timetablescheduling.backend.service.mainService.TimeTableService;
import com.timetablescheduling.backend.service.secondaryService.AdminPreferenceService;
import com.timetablescheduling.backend.service.secondaryService.StudentPreferenceService;
import com.timetablescheduling.backend.service.secondaryService.Results.AdminAndLecturerPreferenceResult;
import com.timetablescheduling.backend.service.secondaryService.Results.StudentPreferenceResult;
import com.timetablescheduling.backend.service.solver.TimeTableSolver;

@Service
public class TestService {

    /*
         All the business logic of the system should be implements in the service package.
         If you have a new service, create a class for that.
     */
    private final RoomRepository roomRepository;
    private final CourseRepository courseRepository;
    private final LecturerRepository lecturerRepository;
    private final TimeSlotsRepository timeSlotsRepository;
    private final DayRepository dayRepository;
    private final LecturerService lecturerService;  
    private final AdminPreferenceService adminPreferenceService;
    private final StudentPreferenceService studentPreferenceService;
    private final TimeTableService timeTableService;
    private final TimeTableCellRepository  timeTableCellRepository;
    private final StudentLevelService studentLevelService;
    
    public TestService(CourseRepository courseRepository,
    StudentLevelService studentLevelService,
            LecturerService lecturerService,
            TimeTableCellRepository timeTableCellRepository,
            TimeTableService timeTableService,
            LecturerRepository lecturerRepository,
            TimeSlotsRepository timeSlotsRepository,
            RoomRepository roomRepository,
            DayRepository dayRepository,
            StudentPreferenceService studentPreferenceService,
            AdminPreferenceService adminPreferenceService
        ) {

        this.studentLevelService = studentLevelService;
        this.studentPreferenceService = studentPreferenceService;
        this.adminPreferenceService = adminPreferenceService;
        this.roomRepository = roomRepository;
        this.lecturerService = lecturerService;
        this.timeSlotsRepository = timeSlotsRepository;
        this.lecturerRepository = lecturerRepository;
        this.courseRepository = courseRepository;
        this.dayRepository =dayRepository;
        this.timeTableService = timeTableService;
        this.timeTableCellRepository = timeTableCellRepository;
    }

    public CompletableFuture<Void> generateTimeTable() {
        return CompletableFuture.runAsync( () -> {

            Double[] adminWeights = PreferenceCompute.weightForLecturerPreferences();
            Double[] studentWeights = PreferenceCompute.weightForStudentPreferences();

            AdminAndLecturerPreferenceResult adminAndLecturerPreferenceResult = AdminAndLecturerPreferenceResult.builder()
                .courseOnEvening(adminWeights[0])
                .courseOnMorning(adminWeights[1])
                .havingDaysOff(adminWeights[2])
                .preferredNumberOfHour(adminWeights[3])
                .build();
            
            StudentPreferenceResult studentPreferenceResult = StudentPreferenceResult.builder()
                .courseOnMorning(studentWeights[0])
                .courseOnEvening(studentWeights[1])
                .haveDayOff(studentWeights[2])
                .build();

            AdminAndLecturerPreferenceResult adminAndLecturerPreferences = adminPreferenceService.averageForAdminPreference();
            StudentPreferenceResult studentPreferences = studentPreferenceService.averageForStudentPreference();

            List<Course> allCourses = courseRepository.findAll();
            List<Room> allRooms = roomRepository.findAll();
            List<Lecturer> allLecturers = lecturerRepository.findAll();
            List<TimeSlot> allTimeSlots = timeSlotsRepository.findAll();
            List<Day> allDays = dayRepository.findAll();
            List<StudentLevel> allStudentLevels = studentLevelService.getAll();

            TimeTableSolver solver = new TimeTableSolver(timeTableService, timeTableCellRepository, lecturerService, allStudentLevels, allLecturers,
                allDays,
                allTimeSlots,
                allCourses,
                allRooms,
                adminAndLecturerPreferenceResult,
                studentPreferenceResult,
                adminAndLecturerPreferences,
                studentPreferences
                );

            solver.solve();

            return;
        });
    }
}
