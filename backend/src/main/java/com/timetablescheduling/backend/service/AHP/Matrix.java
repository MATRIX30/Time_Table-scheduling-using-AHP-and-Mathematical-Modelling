package com.timetablescheduling.backend.service.AHP;

public class Matrix {
    private Double[][] matrix;

    public Matrix(Double[][] matrix) {
        this.matrix = matrix;
    }

    public Double[][] getMatrix() {
        return matrix;
    }

    public void setMatrix(Double[][] matrix) {
        this.matrix = matrix;
    }

    public void printMatrix() {
        printLine(matrix[0].length);
        for (Double[] row : matrix) {
            System.out.print("|");
            for (Double value : row) {
                System.out.printf(" %6.8f |", value);
            }
            System.out.println();
            printLine(matrix[0].length);
        }
    }

    public void printMatrix(Double[] vector) {
        int cols = vector.length;
        printLine(cols);
        System.out.print("|");
        for (Double value : vector) {
            System.out.printf(" %6.8f |", value);
        }
        System.out.println();
        printLine(cols);
    }

    private void printLine(int cols) {
        for (int i = 0; i < cols; i++) {
            System.out.print("-------------");
        }
        System.out.println("-");
    }

    public Double[][] sum(Double[][] matrix) {
        Double[][] sum = new Double[matrix.length][matrix[0].length];
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[0].length; j++) {
                sum[i][j] = matrix[i][j] + sum[i][j];
            }
        }
        return sum;
    }

    public Double[][] multiply(Double[][] matrix) {
        Double[][] multiply = new Double[matrix.length][matrix[0].length];
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[0].length; j++) {
                for (int k = 0; k < matrix.length; k++) {
                    multiply[i][j] += matrix[i][k] * matrix[k][j];
                }
            }
        }
        return multiply;
    }

    public Double[] sumOfColumns(Double[][] matrix) {
        Double[] sum = new Double[matrix[0].length];
        for (int j = 0; j < matrix.length; j++) {
            sum[j] = 0.0;
            for (int i = 0; i < matrix[0].length; i++) {
                sum[j] += matrix[i][j];
            }
        }
        return sum;
    }

    public Double[][] normalizeMatrix(Double[][] matrix) {
        Double[][] normalized = new Double[matrix.length][matrix[0].length];
        Double[] sumColumns = sumOfColumns(matrix);
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[0].length; j++) {
                normalized[i][j] = matrix[i][j]/sumColumns[j];
            }
        }
        return normalized;
    }

    public static <T> Double[][] convertToDoubleMatrix(T[][] inputMatrix) {
        Double[][] doubleMatrix = new Double[inputMatrix.length][inputMatrix[ 0].length];
        for (int i = 0; i < inputMatrix.length; i++) {
            for (int j = 0; j < inputMatrix[i].length; j++) {
                doubleMatrix[i][j] = convertToDouble(inputMatrix[i][j]);
            }
        }

        return doubleMatrix;
    }

    private static Double convertToDouble(Object obj) {
        if (obj instanceof Double) {
            return (Double) obj;
        } else if (obj instanceof Integer) {
            return (double) (int) obj;
        } else if (obj instanceof String) {
            return convertStringToDouble((String) obj);
        } else {
            return Double.NaN;
        }
    }

    public static double convertStringToDouble(String number) {
        try {
            return Double.parseDouble(number.trim());
        } catch (NumberFormatException e) {
            if (number.contains("/")) {
                String[] parts = number.split("/");
                double numerator = Double.parseDouble(parts[0].trim());
                double denominator = Double.parseDouble(parts[1].trim());
                return numerator / denominator;
            } else {
                return Double.NaN;
            }
        }
    }
}
