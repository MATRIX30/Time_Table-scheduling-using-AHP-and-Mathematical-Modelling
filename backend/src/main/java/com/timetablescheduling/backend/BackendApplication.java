package com.timetablescheduling.backend;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.google.ortools.Loader;
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
import com.timetablescheduling.backend.repository.mainRepository.StudentLevelRepository;
import com.timetablescheduling.backend.repository.mainRepository.TimeSlotsRepository;
import com.timetablescheduling.backend.service.solver.TimeTableSolver;

import jakarta.annotation.PostConstruct;

@SpringBootApplication
public class BackendApplication {
=======
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.google.ortools.Loader;
import com.timetablescheduling.backend.utils.file.FileStorageImpl;

import jakarta.annotation.Resource;

@SpringBootApplication
@EnableAsync
public class BackendApplication implements CommandLineRunner {

    @Resource
    FileStorageImpl storageService;


    @Autowired private CourseRepository courseRepository;
    @Autowired private LecturerRepository lecturerRepository;
    @Autowired private RoomRepository roomRepository;
    @Autowired private TimeSlotsRepository timeSlotsRepository;
    @Autowired private DayRepository dayRepository;
    @Autowired private StudentLevelRepository studentLevelRepository;

    public static void main(String[] args) {
        Loader.loadNativeLibraries();   
        SpringApplication.run(BackendApplication.class, args);
    }
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("*")
                        .allowedMethods("*")
                        .allowedHeaders("*");
            }
        };
    }


    @PostConstruct
    public void solveTimeTable() {
        Loader.loadNativeLibraries();
        List<Course> allCourses = courseRepository.findAll();
        List<Room> allRooms = roomRepository.findAll();
        List<Day> allDays = dayRepository.findAll();
        List<TimeSlot> allTimeSlots = timeSlotsRepository.findAll();
        List<Lecturer> allLecturers = lecturerRepository.findAll();
        List<StudentLevel> allStudentLevels = studentLevelRepository.findAll();

        TimeTableSolver timeTableSolver = new TimeTableSolver(allLecturers, allDays, allTimeSlots, allCourses, allRooms, allStudentLevels);
        timeTableSolver.solve();

    }

=======
    @Override
    public void run(String... arg) throws Exception {
        storageService.init();
    }

}
