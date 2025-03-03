package com.timetablescheduling.backend.service.solver;

import java.util.ArrayList;
import java.util.List;

import com.google.ortools.sat.CpModel;
import com.google.ortools.sat.CpSolver;
import com.google.ortools.sat.CpSolverStatus;
import com.google.ortools.sat.DoubleLinearExpr;
import com.google.ortools.sat.LinearExpr;
import com.google.ortools.sat.LinearExprBuilder;
import com.google.ortools.sat.Literal;
import com.timetablescheduling.backend.models.mainModels.Course;
import com.timetablescheduling.backend.models.mainModels.Day;
import com.timetablescheduling.backend.models.mainModels.Lecturer;
import com.timetablescheduling.backend.models.mainModels.Room;
import com.timetablescheduling.backend.models.mainModels.StudentLevel;
import com.timetablescheduling.backend.models.mainModels.TimeSlot;
import com.timetablescheduling.backend.repository.mainRepository.TimeTableCellRepository;
import com.timetablescheduling.backend.service.mainService.LecturerService;
import com.timetablescheduling.backend.service.mainService.TimeTableService;
import com.timetablescheduling.backend.service.secondaryService.Results.AdminAndLecturerPreferenceResult;
import com.timetablescheduling.backend.service.secondaryService.Results.StudentPreferenceResult;

public class TimeTableSolver {

	    private List<Course> allCourses;
	    private List<Day> allDays;
	    private List<TimeSlot> allTimeSlots;
	    private List<Room> allRooms;
	    private List<Lecturer> allLecturers;

		//variables and parameters
        private final Literal[][][][] courseSchedules;
	    private final Literal[][] teacherSchedules;
		private final Literal[][][] coursePerWeek;

		private final CpModel cpModel;
        private final CpSolver solver;
		private final AdminAndLecturerPreferenceResult adminAndLectuererCriteriaWeights;
		private final StudentPreferenceResult studentCriteriaWeights;
		private final AdminAndLecturerPreferenceResult averageAdminAndLecturerPreferences;
		private final StudentPreferenceResult averageStudentPreferences;

	private  final TimeTableService timeTableService;
    private final TimeTableCellRepository timeTableCellRepository;
    private final LecturerService lecturerService;

        public TimeTableSolver(
			
		TimeTableService timeTableService,
		TimeTableCellRepository timeTableCellRepository,
		LecturerService lecturerService,
		
			List<StudentLevel> allStudentLevels,	
			List<Lecturer> allLecturers,
			List<Day> allDays,
			List<TimeSlot> allTimeSlots,
			List<Course> allCourses,
			List<Room> allRooms,
			AdminAndLecturerPreferenceResult adminAndLecturerPreferenceResult,
			StudentPreferenceResult studentPreferenceResult,
			AdminAndLecturerPreferenceResult averageAdminAndLecturerPreferences,
			StudentPreferenceResult averageStudentPreferences
			) {

				this.allLecturers = allLecturers;
				this.allCourses = allCourses;
				this.allDays = allDays;
				this.allTimeSlots = allTimeSlots;
				this.allRooms = allRooms;
	            this.courseSchedules = new Literal[allDays.size()][allTimeSlots.size()][allRooms.size()][allCourses.size()];
	    	    this.teacherSchedules = new Literal[allCourses.size()][allLecturers.size()];
	    		this.coursePerWeek = new Literal[allDays.size()][allTimeSlots.size()][allCourses.size()];
				this.adminAndLectuererCriteriaWeights = adminAndLecturerPreferenceResult;
				this.studentCriteriaWeights = studentPreferenceResult;
				this.averageAdminAndLecturerPreferences = averageAdminAndLecturerPreferences;
				this.averageStudentPreferences = averageStudentPreferences;

				this.timeTableCellRepository = timeTableCellRepository;
				this.timeTableService = timeTableService;
				this.lecturerService = lecturerService;
	            this.cpModel = new CpModel();
	            this.solver = new CpSolver();

        }

        private void initialiseConstraints () {


    	    //intialize the variables


    	    //initialize the course schedules
			System.out.println("Starting ...");
            for (int d=0; d < allDays.size(); d++) {

    	        for (int t=0; t < allTimeSlots.size(); t++) {

    				for (int c=0; c < allCourses.size(); c++) {
    					coursePerWeek[d][t][c] = cpModel.newBoolVar("coursePerWeek" + d + "d" + t + "t" + c + "c");

    					for (int l=0; l < allLecturers.size(); l++) {
							if (allLecturers.get(l).getCourse().getFiliere().getName().equals(allCourses.get(c).getFiliere().getName())) {
    							teacherSchedules[c][l] = cpModel.newBoolVar("teacherSchedule" + c + "c" + l + "l");
							}
    					}
    				}
					List<Literal> variables = new ArrayList<Literal>();
					List<Double> coefficients = new ArrayList<Double>();	
    			    for (int r=0; r < allRooms.size(); r++) {	
    	        	    for (int c=0; c < allCourses.size(); c++) {
    	       		   	   	courseSchedules[d][t][r][c] = cpModel.newBoolVar("courseSchedule" + d + "d" + t + "t" + r + "r" + c + "c");

							String timeString = allTimeSlots.get(t).getTime().split(":")[0];
							double time = Double.parseDouble(timeString);
						
							variables.add(courseSchedules[d][t][r][c]);
							if (time < 13) {
								coefficients.add((this.adminAndLectuererCriteriaWeights.getCourseOnMorning() * this.averageAdminAndLecturerPreferences.getCourseOnMorning()) *
								( this.studentCriteriaWeights.getCourseOnMorning() * this.averageStudentPreferences.getCourseOnMorning()));
							}
							else {
								coefficients.add((this.averageAdminAndLecturerPreferences.getCourseOnEvening() * this.adminAndLectuererCriteriaWeights.getCourseOnEvening()) *
								( this.averageStudentPreferences.getCourseOnEvening() * this.studentCriteriaWeights.getCourseOnEvening()));
							}

    	        	    }
    			    }

					Literal[] vars = new Literal[variables.size()];
					double[] coefs = new double[coefficients.size()];
					for (int i=0; i < vars.length; ++i) {
						vars[i] = variables.get(i);
						coefs[i] = coefficients.get(i);
					}

					coefficients = null;
					variables = null;

					DoubleLinearExpr expression = new DoubleLinearExpr(vars, coefs,0);

					System.out.println("Begin optimization function definition. . .");
					cpModel.maximize(expression);
					System.out.println("End optimization funcion definition");

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
								if (allLecturers.get(l).getCourse().getFiliere().getName().equals(allCourses.get(c).getFiliere().getName())) {
	    							lecturers.add(teacherSchedules[c][l]);
								}
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
				LinearExprBuilder builder = LinearExpr.newBuilder();
				for (int c=0; c < allCourses.size(); c++) {
					if (allLecturers.get(l).getCourse().getFiliere().getName().equals(allCourses.get(c).getFiliere().getName())) {
						teacherCourses.add(teacherSchedules[c][l]);
						builder.add(teacherSchedules[c][l]);
					}

				}

				cpModel.addLinearConstraint(builder.build(), 0, 8);

			}



            // [START at_most_one_shift]


        }

        public void solve () {
			System.out.println("begin initialize constraints . . .");
            initialiseConstraints();
			System.out.println("finished initialize constraints");
            // [START parameters]
            solver.getParameters().setLinearizationLevel(0);
			solver.getParameters().setLogSearchProgress(true);
            // Tell the solver to enumerate all solutions.
            solver.getParameters().setEnumerateAllSolutions(true);
            // [END parameters]

            // [START solution_printer]
            final int solutionLimit = 1;

            // [END solution_printer]
		VarArraySolutionPrinterWithLimit cb = new VarArraySolutionPrinterWithLimit(timeTableService, timeTableCellRepository, lecturerService, allCourses, allDays, allTimeSlots, allRooms, allLecturers, courseSchedules, teacherSchedules, solutionLimit);

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
