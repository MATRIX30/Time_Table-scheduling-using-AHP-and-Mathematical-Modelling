package com.timetablescheduling.backend.service.AHP;

public final class AHP {
    private static AHP instance = null;
    private Matrix matrix;
    private AHP() {}
    public static AHP getInstance() {
        if (instance == null) {
            instance = new AHP();
        }
        return instance;
    }
    private AHP(Matrix matrix) {
        this.matrix = matrix;
    }
    public static AHP getInstance(Matrix matrix) {
        if (instance == null) {
            instance = new AHP(matrix);
        }
        return instance;
    }
    private final Double[] RI = {0.0, 0.0, 0.58, 0.9, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49, 1.51};

    Double[] calculateCriteriaWeights(){
        Double[][] normalizedMatrix = matrix.normalizeMatrix(matrix.getMatrix());
        Double[] criteriaWeights = new Double[matrix.getMatrix().length];
        for (int i = 0; i < matrix.getMatrix().length; i++) {
            Double sum = 0.0;
            for (int j = 0; j < matrix.getMatrix().length; j++) {
                sum += normalizedMatrix[i][j];
            }
            criteriaWeights[i] = sum / normalizedMatrix.length;
        }
        return criteriaWeights;
    }

    Double[] calculateCriteriaWeightedSum(Double[] criteriaWeights){
        Double[][] originalMatrix = matrix.getMatrix();
        Double[] criteriaWeightedSum = new Double[originalMatrix.length];
        for (int i = 0; i < originalMatrix.length; i++) {
            criteriaWeightedSum[i]= 0.0;
            for (int j = 0; j < originalMatrix.length; j++) {
                criteriaWeightedSum[i] += originalMatrix[i][j]*criteriaWeights[j];
            }
        }
        return criteriaWeightedSum;
    }
    Double[] calculateLambdaI(Double[] criteriaWeights, Double[]criteriaWeightedSum){
        int n = criteriaWeights.length;
        Double[] lambdaI = new Double[n];
        for (int i = 0; i < n; i++) {
            lambdaI[i] = criteriaWeightedSum[i] / criteriaWeights[i];
        }
        return lambdaI;
    }

    Double calculateLambdaMax(Double[] lambdaI){
        int n = lambdaI.length;
        Double lambdaMax = 0.0;
        for (Double aDouble : lambdaI) {
            lambdaMax += aDouble;
        }
        return lambdaMax/n;
    }

    public Double[] calculateConsistency(Double[] criteriaWeights, Double[] criteriaWeightedSum, Double lambdaMax) {
        int n = matrix.getMatrix().length;
        Double CI = (lambdaMax - n) / (n - 1);
        Double CR = CI / RI[n - 1];
        return new Double[]{CI, CR};
    }

    public void computeAHP() {
        Double[] criteriaWeights = calculateCriteriaWeights();
        Double[] criteriaWeightedSum = calculateCriteriaWeightedSum(criteriaWeights);
        Double[] lambdaI = calculateLambdaI(criteriaWeights, criteriaWeightedSum);
        Double lambdaMax = calculateLambdaMax(lambdaI);
        Double[] consistency = calculateConsistency(criteriaWeights, criteriaWeightedSum, lambdaMax);
        Double CI = consistency[0];
        Double CR = consistency[1];

        System.out.println("\n================ Calculate weighted Criteria ================\n");
        System.out.println("Normalized matrix: ");
        new Matrix(matrix.normalizeMatrix(matrix.getMatrix())).printMatrix();
        System.out.println("\nCriteria Weight: ");
        matrix.printMatrix(criteriaWeights);
        System.out.println("\n================ Check for consistency ================\n");
        System.out.println("Criteria weighted sum: ");
        matrix.printMatrix(criteriaWeightedSum);

        System.out.println("\nLambda_i: ");
        matrix.printMatrix(lambdaI);
        System.out.println("\nLambda_max: " + lambdaMax);
        System.out.println("Consistency Index (CI): " + CI);
        System.out.println("Consistency Ratio (CR): " + CR);
    }

}
