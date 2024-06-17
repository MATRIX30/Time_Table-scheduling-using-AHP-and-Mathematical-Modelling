package com.timetablescheduling.backend.service.solver;


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
	          }

          	@Override
          	public void onSolutionCallback() {
	          	  System.out.printf("Solution #%d:%n", solutionCount);

	          	  for (int d=0; d < allDays.size(); d++){
	          	    System.out.printf("Day %d%n", d);
	          	    for (int t=0; t < allTimeSlots.size(); t++) {

					    for	 (int r=0; r < allRooms.size(); r++) {
		       	      		boolean isWorking = false;
		       	      		for (int c=0; c < allCourses.size(); c++){
		       	      		  if (booleanValue(schedules[d][t][r][c])) {
		       	      		    isWorking = true;
		       	      		    System.out.printf("  %s scheduled at day %s at time %s in room %s%n", allCourses.get(c).getName(), allDays.get(d).getName(), allTimeSlots.get(t).getTime(), allRooms.get(r).getName());
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
        }

