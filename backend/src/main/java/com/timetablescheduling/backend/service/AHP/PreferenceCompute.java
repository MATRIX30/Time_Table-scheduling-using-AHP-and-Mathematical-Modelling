package com.timetablescheduling.backend.service.AHP;

public class PreferenceCompute {

    private static final AHP ahp = AHP.getInstance();
    private static final Object[][] pairwiseMatrixForLecturer = {
            {1, 7, 3, 9},
            {"1/7", 1, 2, 4},
            {"1/3","1/2", 1, 3},
            {"1/9", "1/4", "1/3", 1}
    };

    private static final Object[][] pairwiseMatrixForStudents = {
            {1, 3, 7},
            {"1/3", 1, 5},
            {"1/7","1/5", 1},
    };

    static Double[] weightForLecturerPreferences (){
        Matrix matrix = new Matrix(Matrix.convertToDoubleMatrix(pairwiseMatrixForLecturer));
        ahp.setMatrix(matrix);
        Double[] criteriaWeight = ahp.calculateCriteriaWeights();
        matrix.printMatrix(criteriaWeight);
        return criteriaWeight;
    }

    static Double[] weightForStudentPreferences (){
        Matrix matrix = new Matrix(Matrix.convertToDoubleMatrix(pairwiseMatrixForStudents));
        ahp.setMatrix(matrix);
        Double[] criteriaWeight = ahp.calculateCriteriaWeights();
        matrix.printMatrix(criteriaWeight);
        return criteriaWeight;
    }

}
