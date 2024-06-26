package com.timetablescheduling.backend.service.PDFGenaration;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.timetablescheduling.backend.models.mainModels.*;
import com.timetablescheduling.backend.service.mainService.LecturerService;

import java.io.IOException;
import java.util.Date;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        Date date = new Date();
        String name = "timetable-"+ date.getTime() + ".pdf";
        String dest = "./uploads/api/"+ name;
        PdfWriter writer = new PdfWriter(dest);
        PdfDocument pdfDoc = new PdfDocument(writer);
        pdfDoc.setDefaultPageSize(com.itextpdf.kernel.geom.PageSize.A4.rotate());
        Document document = new Document(pdfDoc);
        document.setMargins(20, 20, 20, 20);


        List<TimeTableCell> timeTableCells = FakeDataGenerator.createTimeTableCells(
                Day.createWeekDays(),
                Filiere.createFiliere(),
                Semestre.createSemestre(),
                StudentLevel.createLevel(),
                TimeSlot.createTimeSlots(),
                FakeDataGenerator.createCourses(Filiere.createFiliere(), StudentLevel.createLevel(), Semestre.createSemestre()),
                FakeDataGenerator.createLecturers(FakeDataGenerator.createCourses(Filiere.createFiliere(), StudentLevel.createLevel(), Semestre.createSemestre())),
                FakeDataGenerator.createRooms(Filiere.createFiliere())
        ); // Implement this method to fetch data
        TimeTablePDFGeneration.generateTimeTable(document, timeTableCells);

        document.close();
    }
}
