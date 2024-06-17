package com.timetablescheduling.backend.controllers.mainController;

import com.timetablescheduling.backend.errors.CustomResponseEntity;
import com.timetablescheduling.backend.models.mainModels.Users;
import com.timetablescheduling.backend.service.mainService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signUp")
    public ResponseEntity<?> signIn(@RequestBody Users user) {
        if (userService.existsByMatricule(user.getMatricule())) return CustomResponseEntity.fromKey("USER_ALREADY_EXISTS", HttpStatus.BAD_REQUEST);
        return ResponseEntity.ok(userService.register(user));
    }

    @PostMapping("/signIn")
    public ResponseEntity<?> signUp(@RequestBody LoginRequest user) {
        Optional<Users> userSave = userService.getUser(user.getMatricule()); // recuperation de l'utilisateur sauvegardé en base de données
        return userService.authenticate(userSave, user.getPassword());
    }
}


