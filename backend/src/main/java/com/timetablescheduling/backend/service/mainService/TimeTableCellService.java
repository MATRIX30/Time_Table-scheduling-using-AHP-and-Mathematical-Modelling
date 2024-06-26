package com.timetablescheduling.backend.service.mainService;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.timetablescheduling.backend.models.mainModels.*;
import com.timetablescheduling.backend.repository.mainRepository.TimeTableCellRepository;
import com.timetablescheduling.backend.service.PDFGenaration.TimeTablePDFGeneration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Date;
import java.util.List;

@Service
public class TimeTableCellService {
    @Autowired
    private TimeTableCellRepository timeTableCellRepository;
    @Autowired
    private LecturerService lecturerService;

    public TimeTableCell save(TimeSlot timeSlot, Day day, Room room, Course course) {
        TimeTableCell timeTableCell = new TimeTableCell();
        timeTableCell.setTimeSlot(timeSlot);
        timeTableCell.setDay(day);
        timeTableCell.setRoom(room);
        timeTableCell.setCourse(course);
        timeTableCell.setFiliere(course.getFiliere());
        timeTableCell.setSemestre(course.getSemestre());
        timeTableCell.setLevel(course.getLevel());
        Iterable<Lecturer> lecturers = lecturerService.getByCourse(course.getName());
        Lecturer _lecturer = null;
        for (Lecturer lecturer : lecturers) {
            if (!lecturer.isAssistant()) _lecturer = lecturer;
        }
        timeTableCell.setLecturer(_lecturer);
        return timeTableCellRepository.save(timeTableCell);
    }

    public List<TimeTableCell> findAll() {
        return timeTableCellRepository.findAll();
    }

    public List<TimeTableCell> findByFiliere(String filiere) {
        return timeTableCellRepository.findByFiliere(filiere);
    }

    public List<TimeTableCell> findBySemestre(String semestre) {
        return timeTableCellRepository.findBySemestre(semestre);
    }
    public List<TimeTableCell> findByLevel(String level) {
        return timeTableCellRepository.findByLevel(level);
    }

    public List<TimeTableCell> findByFiliereAndSemestre(String filiere, String semestre) {
        return timeTableCellRepository.findByFiliereAndSemestre(filiere, semestre);
    }

    public List<TimeTableCell> findByFiliereAndLevel(String filiere, String level) {
       // Pageable pageable = PageRequest.of(0, 50);
        return timeTableCellRepository.findByFiliereAndLevel(filiere, level);
    }

    public List<TimeTableCell> findByLevelAndSemestre(String level, String semestre) {
        return timeTableCellRepository.findByLevelAndSemestre(level, semestre);
    }

    public List<TimeTableCell> findByFiliereAndLevelAndSemestre(String filiere, String level, String semestre) {
        return timeTableCellRepository.findByFiliereAndLevelAndSemestre(filiere, level, semestre);
    }

    public String generateTimeTable( List<TimeTableCell> timeTableCells) throws IOException {
        Date date = new Date();
        String name = "timetable-"+ date.getTime() + ".pdf";
        String dest = "./uploads/api/"+ name;
        PdfWriter writer = new PdfWriter(dest);
        PdfDocument pdfDoc = new PdfDocument(writer);
        pdfDoc.setDefaultPageSize(com.itextpdf.kernel.geom.PageSize.A4.rotate());
        com.itextpdf.layout.Document document = new com.itextpdf.layout.Document(pdfDoc);
        document.setMargins(15, 15, 15, 15);

        TimeTablePDFGeneration.generateTimeTable(document, timeTableCells);

        document.close();
        return name;
    }
}
