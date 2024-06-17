package com.timetablescheduling.backend.controllers.mainController;

import lombok.Data;

@Data
public class LoginRequest {
    private String matricule;
    private String password;
}
