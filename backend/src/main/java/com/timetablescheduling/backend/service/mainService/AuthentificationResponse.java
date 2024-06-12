package com.timetablescheduling.backend.service.mainService;

import com.timetablescheduling.backend.models.mainModels.Users;
import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class AuthentificationResponse {
    private Users users;
    private String token;
}
