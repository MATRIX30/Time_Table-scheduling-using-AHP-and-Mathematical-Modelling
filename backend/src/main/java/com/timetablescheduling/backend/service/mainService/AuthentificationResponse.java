package com.timetablescheduling.backend.service.mainService;

import com.timetablescheduling.backend.models.mainModels.SuperUsers;
import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class AuthentificationResponse {
    private SuperUsers users;
    private String token;
}
