package com.timetablescheduling.backend.service.AHP;

public class Main {
    public static void main(String[] args) {
        Object[][] pairwiseMatrix = {
                {1, 3, 2, 7},
                {"1/3", 1, 5, 3},
                {"1/2","1/5", 1, 3},
                {"1/7", "1/3", "1/3", 1}
        };
        Matrix matrix = new Matrix(Matrix.convertToDoubleMatrix(pairwiseMatrix));
        AHP ahp = AHP.getInstance(matrix);
        ahp.computeAHP();
    }
}