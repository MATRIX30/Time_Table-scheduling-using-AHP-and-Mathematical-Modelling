package com.timetablescheduling.backend.service.PDFGenaration;

import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.AreaBreak;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.AreaBreakType;
import com.itextpdf.layout.properties.HorizontalAlignment;
import com.itextpdf.layout.properties.TextAlignment;
import com.timetablescheduling.backend.models.mainModels.*;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TimeTablePDFGeneration {

    private static final List<Day> DAYS = Day.createWeekDays();
    private static final List<TimeSlot> TIME_SLOTS = TimeSlot.createTimeSlots();

    public static void generateTimeTable(Document document, List<TimeTableCell> timeTableCells) throws IOException {
        PdfFont font = PdfFontFactory.createFont("Helvetica", "Cp1252");

        // Organiser les cellules du tableau des horaires par combinaison unique de semestre, filière et niveau
        Map<String, List<TimeTableCell>> groupedCells = timeTableCells.stream().collect(Collectors.groupingBy(
                cell -> cell.getSemestre().getName() + "-" + cell.getFiliere().getName() + "-" + cell.getLevel().getName()
        ));

        // Générer une page pour chaque groupe
        for (Map.Entry<String, List<TimeTableCell>> entry : groupedCells.entrySet()) {
            List<TimeTableCell> group = entry.getValue();
            if (!group.isEmpty()) {
                Semestre semestre = group.get(0).getSemestre();
                Filiere filiere = group.get(0).getFiliere();
                StudentLevel level = group.get(0).getLevel();
                addTimeTablePage(document, group, semestre, filiere, level, font);
            }
        }
    }

    public static void addTimeTablePage(Document document, List<TimeTableCell> timeTableCells, Semestre semester, Filiere filiere, StudentLevel level, PdfFont font) throws IOException {
        System.out.println(timeTableCells.size());
        document.add(new Paragraph("UNIVERSITE DE YAOUNDE 1").setFont(font).setBold().setFontSize(14).setTextAlignment(TextAlignment.CENTER));
        document.add(new Paragraph("FACULTE DES SCIENCES").setFont(font).setBold().setFontSize(12).setTextAlignment(TextAlignment.CENTER));
        document.add(new Paragraph("Division de la Programmation et du suivi des Activités Académiques").setFont(font).setFontSize(10).setTextAlignment(TextAlignment.CENTER));
        document.add(new Paragraph("EMPLOI DE TEMPS: TIME TABLE").setFont(font).setBold().setFontSize(12).setTextAlignment(TextAlignment.CENTER));
        document.add(new Paragraph()
                .setFont(font)
                .setFontSize(10)
                .setTextAlignment(TextAlignment.CENTER)
                .add("SEMESTRE " + semester.getName() + " - ANNEE ACADEMIQUE 2023-2024\n")
                .add("FILIERE " + filiere.getName() + " - ")
                .add("NIVEAU " + level.getName()));

        // Create table with dynamic number of columns based on days
        float[] columnWidths = new float[DAYS.size() + 1];
        columnWidths[0] = 1; // Première colonne pour les heures
        for (int i = 1; i < columnWidths.length; i++) {
            columnWidths[i] = 2; // Largeur des colonnes pour les jours
        }

        Table table = new Table(columnWidths);
//        table.setWidth(500);
        table.setHorizontalAlignment(HorizontalAlignment.CENTER);

        // Table headers
        table.addHeaderCell(new Cell().add(new Paragraph("Heures").setFont(font).setBold()));
        for (Day day : DAYS) {
            table.addHeaderCell(new Cell().add(new Paragraph(day.getName()).setFont(font).setBold()));
        }

        // Populate timetable cells
        for (TimeSlot timeSlot : TIME_SLOTS) {
            Cell timeCell = new Cell().add(new Paragraph(timeSlot.getTime()).setFont(font));

            // Initialize cells for each day
            List<Cell> dayCells = new ArrayList<>();
            for (int i = 0; i < DAYS.size(); i++) {
                dayCells.add(new Cell().setFont(font));
            }

            // Fill cells with corresponding time table data
            for (int i = 0; i < DAYS.size(); i++) {
                Day day = DAYS.get(i);
                List<TimeTableCell> matchingCells = findCells(timeTableCells, timeSlot.getTime(), day.getName(), semester, filiere, level);

                if (!matchingCells.isEmpty()) {
                    Paragraph content = new Paragraph();
                    for (int j = 0; j < matchingCells.size(); j++) {
                        TimeTableCell cell = matchingCells.get(j);
                        content.add(cell.getCourse().getCode() + "\n" + cell.getRoom().getName() + "\n" + cell.getLecturer().getName())
                                .setTextAlignment(TextAlignment.CENTER)
                                .setFont(font);
                        if (j < matchingCells.size() - 1) {
                            content.add("\n******************************\n")
                                    .setTextAlignment(TextAlignment.CENTER)
                                    .setFont(font);
                        }
                    }
                    dayCells.get(i).add(content);
                }
            }

            // Add time slot and day cells to table
            table.addCell(timeCell);
            for (Cell cell : dayCells) {
                table.addCell(cell);
            }
        }

        document.add(table);
        document.add(new AreaBreak(AreaBreakType.NEXT_PAGE));
    }

    private static List<TimeTableCell> findCells(List<TimeTableCell> cells, String timeSlot, String day, Semestre semester, Filiere filiere, StudentLevel level) {
        return cells.stream()
                .filter(cell -> cell.getTimeSlot().getTime().equals(timeSlot)
                        && cell.getDay().getName().equals(day)
                        && cell.getSemestre().getName().equals(semester.getName())
                        && cell.getFiliere().getName().equals(filiere.getName())
                        && cell.getLevel().getName().equals(level.getName()))
                .collect(Collectors.toList());
    }
}