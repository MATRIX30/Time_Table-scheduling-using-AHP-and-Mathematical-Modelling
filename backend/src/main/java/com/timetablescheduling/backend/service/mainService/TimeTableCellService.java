package com.timetablescheduling.backend.service.mainService;

import com.timetablescheduling.backend.models.mainModels.*;
import com.timetablescheduling.backend.repository.mainRepository.TimeTableCellRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
