package com.timetablescheduling.backend.controllers.mainController;

import com.timetablescheduling.backend.errors.CustomResponseEntity;
import com.timetablescheduling.backend.models.mainModels.TimeTableCell;
import com.timetablescheduling.backend.service.mainService.TimeTableCellService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.Console;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/timetablecell")
public class TimeTableCellController {

    @Autowired
    private TimeTableCellService timeTableCellService;

    @GetMapping("/generateForAll")
    public ResponseEntity<?> generateForAll() throws IOException {
        List<TimeTableCell> timeTableCells = timeTableCellService.findAll();
        String _file = timeTableCellService.generateTimeTable(timeTableCells);
        System.out.println("http://localhost:8081/api"+_file);
        return CustomResponseEntity.fromKey("TRAITEMENT_SUCCESS", HttpStatus.OK);
    }

    @GetMapping("/generateForFiliereAndLevel/{filiere}/{level}")
    public ResponseEntity<?> generateForFiliereAndLevel(@PathVariable String filiere, @PathVariable String level) throws IOException {
        List<TimeTableCell> timeTableCells = timeTableCellService.findByFiliereAndLevel(filiere, level);
        String _file = timeTableCellService.generateTimeTable(timeTableCells);
        System.out.println("http://localhost:8081/api"+_file);
        return CustomResponseEntity.fromKey("TRAITEMENT_SUCCESS", HttpStatus.OK);
    }

    @GetMapping("/generateForFiliereLevelAndSemester/{filiere}/{level}/{semestre}")
    public ResponseEntity<?> generateForFiliereLevelAndSemester(@PathVariable String filiere, @PathVariable String level, @PathVariable String semestre) throws IOException {
        List<TimeTableCell> timeTableCells = timeTableCellService.findByFiliereAndLevelAndSemestre(filiere, level, semestre);
        System.out.println(timeTableCells);
        String _file = timeTableCellService.generateTimeTable(timeTableCells);
        System.out.println("http://localhost:8081/api/"+_file);
        return CustomResponseEntity.fromKey("TRAITEMENT_SUCCESS", HttpStatus.OK);
    }
}
