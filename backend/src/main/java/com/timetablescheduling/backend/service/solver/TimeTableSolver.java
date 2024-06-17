package com.timetablescheduling.backend.service.solver;

import java.util.ArrayList;
import java.util.List;

import com.google.ortools.sat.CpModel;
import com.google.ortools.sat.CpSolver;
import com.google.ortools.sat.CpSolverStatus;
import com.google.ortools.sat.Literal;
import com.timetablescheduling.backend.models.mainModels.Course;
import com.timetablescheduling.backend.models.mainModels.Day;
import com.timetablescheduling.backend.models.mainModels.Lecturer;
import com.timetablescheduling.backend.models.mainModels.Room;
import com.timetablescheduling.backend.models.mainModels.StudentLevel;
import com.timetablescheduling.backend.models.mainModels.TimeSlot;

public class TimeTableSolver {

	    private List<Course> allCourses;
	    private List<Day> allDays;
	    private List<TimeSlot> allTimeSlots;
	    private List<Room> allRooms;
	    private List<Lecturer> allLecturers;
		private List<StudentLevel> allStudentLevels;

		//variables and parameters
        private final Literal[][][][] courseSchedules;
	    private final Literal[][] teacherSchedules;
		private final Literal[][][] coursePerWeek;

		private final CpModel cpModel;
        private final CpSolver solver;



        public TimeTableSolver(List<Lecturer> allLecturers, List<Day> allDays, List<TimeSlot> allTimeSlots, List<Course> allCourses, List<Room> allRooms, List<StudentLevel> allStudentLevels) {
			this.allLecturers = allLecturers;
			this.allCourses = allCourses;
			this.allDays = allDays;
			this.allTimeSlots = allTimeSlots;
			this.allRooms = allRooms;
			this.allStudentLevels = allStudentLevels;
            this.courseSchedules = new Literal[allDays.size()][allTimeSlots.size()][allRooms.size()][allCourses.size()];
    	    this.teacherSchedules = new Literal[allCourses.size()][allLecturers.size()];
    		this.coursePerWeek = new Literal[allDays.size()][allTimeSlots.size()][allCourses.size()];

            this.cpModel = new CpModel();
            this.solver = new CpSolver();

        }

        private void initialiseConstraints () {
                    // [END data]


    	    //intialize the variables

    	    //initialize the course schedules
            for (int d=0; d < allDays.size(); d++) {

    	        for (int t=0; t < allTimeSlots.size(); t++) {

    				for (int c=0; c < allCourses.size(); c++) {
    					coursePerWeek[d][t][c] = cpModel.newBoolVar("coursePerWeek" + d + "d" + t + "t" + c + "c");

    					for (int l=0; l < allLecturers.size(); l++) {
    						teacherSchedules[c][l] = cpModel.newBoolVar("teacherSchedule" + c + "c" + l + "l");
    					}
    				}

    			    for (int r=0; r < allRooms.size(); r++) {	
    	        	    for (int c=0; c < allCourses.size(); c++) {
    	       		   	   	courseSchedules[d][t][r][c] = cpModel.newBoolVar("courseSchedule" + d + "d" + t + "t" + r + "r" + c + "c");
    	        	    }
    			    }

    	        }
            }

            // [END variables]

    		//constraints

    		for (int d=0; d < allDays.size(); d++) {
    			for (int t=0; t < allTimeSlots.size(); t++) {
    				// A room receives at most one course per period per day
    				for (int r=0; r < allRooms.size(); r++) {

    					List<Literal> courses = new ArrayList<>();
    					for (int c=0; c < allCourses.size(); c++) {

    							courses.add(courseSchedules[d][t][r][c]);

    						List<Literal> lecturers = new ArrayList<>();
    						for (int l=0; l < allLecturers.size(); l++) {
    								lecturers.add(teacherSchedules[c][l]);
    						}
    						this.cpModel.addExactlyOne(lecturers);
    					}

    					this.cpModel.addAtMostOne(courses);
    				}
    			}
    		}

    		// Each course is scheduled exactly once per week
    		for (int c=0; c < allCourses.size(); c++) {
    			List<Literal> courseOccurrences = new ArrayList<>();
    			for (int d=0; d < allDays.size(); d++) {
    				for (int t=0; t < allTimeSlots.size(); t++) {
    					for (int r=0; r < allRooms.size(); r++) {
    							courseOccurrences.add(courseSchedules[d][t][r][c]);
    					}
    				}
    			}
    			cpModel.addExactlyOne(courseOccurrences);
            
    		}

			// Each teacher teaches at most 10 courses
			for (int l=0; l < allLecturers.size(); l++) {
				List<Literal> teacherCourses = new ArrayList<>();
				for (int c=0; c < allCourses.size(); c++) {
						teacherCourses.add(teacherSchedules[c][l]);
				}
			}



            // [START at_most_one_shift]


        }

        public void solve () {
			System.out.println("begin initialize constraints . . .");
            initialiseConstraints();
			System.out.println("finished initialize constraints");
            // [START parameters]
            solver.getParameters().setLinearizationLevel(0);
            // Tell the solver to enumerate all solutions.
            solver.getParameters().setEnumerateAllSolutions(true);
            // [END parameters]

            // [START solution_printer]
            final int solutionLimit = 8;

            // [END solution_printer]
		VarArraySolutionPrinterWithLimit cb = new VarArraySolutionPrinterWithLimit(allCourses, allDays, allTimeSlots, allRooms, allLecturers, courseSchedules, teacherSchedules, solutionLimit);

            // Creates a solver and solves the model.
            // [START solve]
		System.out.println("solving . . .");
            CpSolverStatus status = solver.solve(this.cpModel, cb);
            System.out.println("Status: " + status);
		
            System.out.println(cb.getSolutionCount() + " solutions found.");
            // [END solve]

            // Statistics.
            // [START statistics]
            System.out.println("Statistics");
            System.out.printf("  conflicts: %d%n", solver.numConflicts());
            System.out.printf("  branches : %d%n", solver.numBranches());
            System.out.printf("  wall time: %f s%n", solver.wallTime());
            // [END statistics]


        }

    
}
