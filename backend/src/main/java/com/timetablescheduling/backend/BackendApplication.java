package com.timetablescheduling.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.google.ortools.Loader;
import com.timetablescheduling.backend.service.solver.TimeTableSolver;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
        Loader.loadNativeLibraries();

        TimeTableSolver timeTableSolver = new TimeTableSolver();
        timeTableSolver.solve();
    }

}
