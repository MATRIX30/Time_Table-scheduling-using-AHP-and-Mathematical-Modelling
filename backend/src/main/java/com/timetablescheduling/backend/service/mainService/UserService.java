package com.timetablescheduling.backend.service.mainService;

import com.timetablescheduling.backend.errors.CustomResponseEntity;
import com.timetablescheduling.backend.models.mainModels.Users;
import com.timetablescheduling.backend.repository.mainRepository.UserRepository;
import com.timetablescheduling.backend.security.JwtService;
import lombok.Data;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Data
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private final JwtService jwtService;

    public Users CreateUser(Users user){
        String encodePassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodePassword);
        userRepository.save(user);
        return user;
    }

    public AuthentificationResponse register(Users user){
        String encodePassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodePassword);
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthentificationResponse.builder()
                .users(user)
                .token(jwtToken)
                .build();
    }

    public ResponseEntity<?> authenticate(Optional<Users> user, String password){
        if (user.isEmpty())  return CustomResponseEntity.fromKey("INVALID_CREDENTIALS", HttpStatus.BAD_REQUEST);
        else if (!verifyPassword(password, user.get().getPassword()))  return CustomResponseEntity.fromKey("INVALID_CREDENTIALS", HttpStatus.BAD_REQUEST);
        var jwtToken = jwtService.generateToken(user.get());
        AuthentificationResponse response = AuthentificationResponse.builder()
                .users(user.get())
                .token(jwtToken)
                .build();
        return ResponseEntity.ok(response);
    }

    public Boolean verifyPassword(String password, String passwordHache){
        return passwordEncoder.matches(password,passwordHache);
    }

    public Boolean existsByMatricule(String matricule){
        return userRepository.existsByMatricule(matricule);
    }

    public Optional<Users> getUser(String email){
        return userRepository.findByMatricule(email);
    }


}

