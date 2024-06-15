package com.timetablescheduling.backend.service.solver;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

import com.google.ortools.sat.CpModel;
import com.google.ortools.sat.CpSolver;
import com.google.ortools.sat.CpSolverStatus;
import com.google.ortools.sat.LinearExpr;
import com.google.ortools.sat.Literal;

public class TimeTableSolver {

    	final int numCourses = 30;
	    final int numDays = 8;
	    final int numPeriods = 7;
	    final int numRooms = 20;
	    final int numTeachers = 20;


	    final int[] allCourses = IntStream.range(0, numCourses).toArray();
	    final int[] allDays = IntStream.range(0, numDays).toArray();
	    final int[] allPeriods = IntStream.range(0, numPeriods).toArray();
	    final int[] allRooms = IntStream.range(0, numRooms).toArray();
	    final int[] allTeachers = IntStream.range(0, numTeachers).toArray();


        private final CpModel cpModel;
        private final CpSolver solver;
        private final Literal[][][][] courseSchedules;
	    private final Literal[][] teacherSchedules;
		private final Literal[][][] coursePerWeek;



        public TimeTableSolver() {
            this.cpModel = new CpModel();
            this.courseSchedules = new Literal[numDays][numPeriods][numRooms][numCourses];
    	    this.teacherSchedules = new Literal[numCourses][numTeachers];
    		this.coursePerWeek = new Literal[numDays][numPeriods][numCourses];
            this.solver = new CpSolver();
        }


        private void initialiseConstraints () {
                    // [END data]


    	    //intialize the variables

    	    //initialize the course schedules
            for (int d : allDays) {

    	        for (int p : allPeriods) {

    				for (int c : allCourses) {
    					coursePerWeek[d][p][c] = cpModel.newBoolVar("coursePerWeek" + d + "d" + p + "p" + c + "c");

    					for (int t: allTeachers) {
    						teacherSchedules[c][t] = cpModel.newBoolVar("teacherSchedule" + c + "c" + t + "t");
    					}
    				}

    			    for (int r : allRooms) {	
    	        	    for (int c : allCourses) {
    	       		   	    courseSchedules[d][p][r][c] = cpModel.newBoolVar("courseSchedule" + d + "d" + p + "p" + r + "r" + c + "c");
    	        	    }
    			    }

    	        }
            }

            // [END variables]

    		//constraints

    		for (int d : allDays) {
    			for (int p : allPeriods) {
    				// A room receives at most one course per period per day
    				for (int r : allRooms) {
    					List<Literal> courses = new ArrayList<>();
    					for (int c: allCourses) {
    						courses.add(courseSchedules[d][p][r][c]);
                        
    						List<Literal> teachers = new ArrayList<>();
    						for (int t: allTeachers) {
    							teachers.add(teacherSchedules[c][t]);
    						}
    						this.cpModel.addExactlyOne(teachers);
    					}
    					this.cpModel.addAtMostOne(courses);
    				}
    			}
    		}

    		// Each course is scheduled exactly once per week
    		for (int c : allCourses) {
    			List<Literal> courseOccurrences = new ArrayList<>();
    			for (int d : allDays) {
    				for (int p : allPeriods) {
    					for (int r : allRooms) {
    						courseOccurrences.add(courseSchedules[d][p][r][c]);
    					}
    				}
    			}
    			cpModel.addExactlyOne(courseOccurrences);
            
    		}

			// Each teacher teaches at most 10 courses
			for (int t : allTeachers) {
				List<Literal> teacherCourses = new ArrayList<>();
				for (int c : allCourses) {
					teacherCourses.add(teacherSchedules[c][t]);
				}
				cpModel.addLessOrEqual(LinearExpr.sum(teacherCourses.toArray(new Literal[0])), 10);
			}



            // [START at_most_one_shift]


        }

        public void solve () {
            initialiseConstraints();
            // [START parameters]
            solver.getParameters().setLinearizationLevel(0);
            // Tell the solver to enumerate all solutions.
            solver.getParameters().setEnumerateAllSolutions(true);
            // [END parameters]

            // [START solution_printer]
            final int solutionLimit = 8;

            // [END solution_printer]
		VarArraySolutionPrinterWithLimit cb = new VarArraySolutionPrinterWithLimit(allCourses, allDays, allPeriods, allRooms, allTeachers, courseSchedules, teacherSchedules, solutionLimit);

            // Creates a solver and solves the model.
            // [START solve]
		System.out.println("solving");
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
