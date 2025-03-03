package com.timetablescheduling.backend.service.solver;



import java.util.ArrayList;

import java.util.List;

import com.google.ortools.sat.CpSolverSolutionCallback;
import com.google.ortools.sat.Literal;
import com.timetablescheduling.backend.models.mainModels.Course;
import com.timetablescheduling.backend.models.mainModels.Day;
import com.timetablescheduling.backend.models.mainModels.Lecturer;
import com.timetablescheduling.backend.models.mainModels.Room;
import com.timetablescheduling.backend.models.mainModels.TimeSlot;


class VarArraySolutionPrinterWithLimit extends CpSolverSolutionCallback {

	        public VarArraySolutionPrinterWithLimit(
=======
import com.timetablescheduling.backend.models.mainModels.TimeTableCell;
import com.timetablescheduling.backend.models.mainModels.Timetable;
import com.timetablescheduling.backend.repository.mainRepository.TimeTableCellRepository;
import com.timetablescheduling.backend.service.mainService.LecturerService;
import com.timetablescheduling.backend.service.mainService.TimeTableService;

class VarArraySolutionPrinterWithLimit extends CpSolverSolutionCallback {

	private  final TimeTableService timeTableService;
    private final TimeTableCellRepository timeTableCellRepository;
    private final LecturerService lecturerService;


	        public VarArraySolutionPrinterWithLimit(
				TimeTableService timeTableService,
				TimeTableCellRepository timeTableCellRepository,
				LecturerService lecturerService,

	            List<Course> allCourses, List<Day> allDays, List<TimeSlot> allTimeSlots, List<Room> allRooms, List<Lecturer> allLecturers, Literal[][][][] schedules, Literal[][] teacherSchedules, int limit) {
	            solutionCount = 0;
				this.teacherSchedules = teacherSchedules;
	            this.allCourses = allCourses;
	            this.allDays = allDays;
	            this.allTimeSlots = allTimeSlots;
	            this.schedules = schedules;
	            solutionLimit = limit;
                this.allRooms = allRooms;
                this.allLecturer = allLecturers;

				this.timeTableCellRepository = timeTableCellRepository;
				this.timeTableService = timeTableService;
				this.lecturerService = lecturerService;

	          }

          	@Override
          	public void onSolutionCallback() {

	          	  System.out.printf("Solution #%d:%n", solutionCount);

	          	  for (int d=0; d < allDays.size(); d++){
	          	    System.out.printf("Day %d%n", d);


				Timetable timetable = new Timetable();
				timetable.setTimetableCells(new ArrayList<TimeTableCell>());
	          	  System.out.printf("Solution #%d:%n", solutionCount);

	          	  for (int d=0; d < allDays.size(); d++){
	          	    System.out.printf(" %s%n", allDays.get(d).getName());

	          	    for (int t=0; t < allTimeSlots.size(); t++) {

					    for	 (int r=0; r < allRooms.size(); r++) {
		       	      		boolean isWorking = false;
		       	      		for (int c=0; c < allCourses.size(); c++){
		       	      		  if (booleanValue(schedules[d][t][r][c])) {
		       	      		    isWorking = true;
		       	      		    System.out.printf("  %s scheduled at day %s at time %s in room %s%n", allCourses.get(c).getName(), allDays.get(d).getName(), allTimeSlots.get(t).getTime(), allRooms.get(r).getName());


								//System.out.println("saving cell . . .");

								TimeTableCell cell = save(allTimeSlots.get(t), allDays.get(d), allRooms.get(r), allCourses.get(c));
								timetable.getTimetableCells().add(cell);
								System.out.println("Saved done");

		       	      		  }
		       	      		}
		       	      		if (!isWorking) {
		       	      		  // System.out.printf("  course %d not scheduled at on period %d%n", d, p);
		       	      		}
				    	}

	     	    	}

	          	}

				for (int c = 0; c < allCourses.size(); c++) {
					for (int l = 0; l < allLecturer.size(); l++) {
						if (booleanValue(teacherSchedules[c][l])) {

				System.out.println("Saving the whole time table . . .");
				timeTableService.save(timetable);
				System.out.println("Save completed");

				for (int c = 0; c < allCourses.size(); c++) {
					for (int l = 0; l < allLecturer.size(); l++) {
						if (allLecturer.get(l).getCourse().getFiliere().getName().equals(allCourses.get(c).getFiliere().getName()) && booleanValue(teacherSchedules[c][l])) {

							System.out.printf("   %s scheduled to teach course %s%n", allLecturer.get(l).getName(), allCourses.get(c).getName());
						}
						else {
							//System.out.printf("  teacher %d not scheduled to teach course %d%n", t, c);
						}
					}
				}

	          	solutionCount++;
	          	if (solutionCount >= solutionLimit) {
	          	  System.out.printf("Stop search after %d solutions%n", solutionLimit);
	          	  stopSearch();
	          	}
          	}

          	public int getSolutionCount() {
          	  return solutionCount;
          	}


          	private int solutionCount;
          	private final List<Course> allCourses;
          	private final List<Day> allDays;
          	private final List<TimeSlot> allTimeSlots;
          	private final Literal[][][][] schedules;
			private final Literal[][] teacherSchedules;
          	private final int solutionLimit;
            private final List<Room> allRooms;
            private final List<Lecturer> allLecturer;

    private TimeTableCell save(TimeSlot timeSlot, Day day, Room room, Course course) {
        TimeTableCell timeTableCell = new TimeTableCell();
        timeTableCell.setTimeSlot(timeSlot);
        timeTableCell.setDay(day);
        timeTableCell.setRoom(room);
        timeTableCell.setCourse(course);
        timeTableCell.setFiliere(course.getFiliere());
        timeTableCell.setSemestre(course.getSemestre());
        timeTableCell.setLevel(course.getLevel());
        Iterable<Lecturer> lecturers = lecturerService.getByCourseCode(course.getCode());
        Lecturer _lecturer = new Lecturer("default", false);
        for (Lecturer lecturer : lecturers) {
            if (!lecturer.isAssistant()) _lecturer = lecturer;
        }
        timeTableCell.setLecturer(_lecturer);
        return timeTableCellRepository.save(timeTableCell);

    }

     	private int solutionCount;
     	private final List<Course> allCourses;
     	private final List<Day> allDays;
     	private final List<TimeSlot> allTimeSlots;
     	private final Literal[][][][] schedules;
		private final Literal[][] teacherSchedules;
     	private final int solutionLimit;
       private final List<Room> allRooms;
       private final List<Lecturer> allLecturer;

        }

