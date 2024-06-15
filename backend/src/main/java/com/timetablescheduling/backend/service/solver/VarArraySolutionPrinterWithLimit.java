package com.timetablescheduling.backend.service.solver;


import com.google.ortools.sat.CpSolverSolutionCallback;
import com.google.ortools.sat.Literal;

class VarArraySolutionPrinterWithLimit extends CpSolverSolutionCallback {

	        public VarArraySolutionPrinterWithLimit(
	            int[] allCourses, int[] allDays, int[] allPeriods, int[] allRooms, int[] allTeachers, Literal[][][][] schedules, Literal[][] teacherSchedules, int limit) {
	            solutionCount = 0;
				this.teacherSchedules = teacherSchedules;
	            this.allCourses = allCourses;
	            this.allDays = allDays;
	            this.allPeriods = allPeriods;
	            this.schedules = schedules;
	            solutionLimit = limit;
                this.allRooms = allRooms;
                this.allTeachers = allTeachers;
	          }

          	@Override
          	public void onSolutionCallback() {
	          	  System.out.printf("Solution #%d:%n", solutionCount);

	          	  for (int d : allDays) {
	          	    System.out.printf("Day %d%n", d);
	          	    for (int p : allPeriods) {

					    for	 (int r : allRooms) {
		       	      		boolean isWorking = false;
		       	      		for (int c : allCourses) {
		       	      		  if (booleanValue(schedules[d][p][r][c])) {
		       	      		    isWorking = true;
		       	      		    System.out.printf("  course %d scheduled at day %d at period %d in room %d%n", c, d, p, r);
		       	      		  }
		       	      		}
		       	      		if (!isWorking) {
		       	      		  // System.out.printf("  course %d not scheduled at on period %d%n", d, p);
		       	      		}
				    	}

	     	    	}

	          	}

				for (int c : allCourses) {
					for (int t : allTeachers) {
						if (booleanValue(teacherSchedules[c][t])) {
							System.out.printf("  teacher %d scheduled to teach course %d%n", t, c);
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
          	private final int[] allCourses;
          	private final int[] allDays;
          	private final int[] allPeriods;
          	private final Literal[][][][] schedules;
			private final Literal[][] teacherSchedules;
          	private final int solutionLimit;
            private final int[] allRooms;
            private final int[] allTeachers;
        }

