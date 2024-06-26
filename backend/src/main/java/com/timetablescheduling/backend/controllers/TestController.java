package com.timetablescheduling.backend.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.timetablescheduling.backend.errors.CustomResponseEntity;
import com.timetablescheduling.backend.service.TestService;
import com.timetablescheduling.backend.utils.Utils;
import com.timetablescheduling.backend.utils.file.FileStorageImpl;


@RestController
public class TestController {
    /*
        All about endpoints connection should be implements in the controller package.
        If you have a new things to manage, please create his controller class
     */
    @Autowired
    FileStorageImpl fileStorage;

    @Autowired TestService testService;
    @GetMapping("/hello")
    public String hello() {
        return "Hello World";
    }

    @PostMapping("/Addfile")
    public ResponseEntity<?> addFile(@RequestParam("file") MultipartFile file) throws IOException {
        if (Utils.verifyImageExtension(file)){
            return CustomResponseEntity.fromKey("TYPE_IMAGE_NON_PRIS_EN_CHARGE", HttpStatus.BAD_REQUEST);
        }
        String _file =fileStorage.save("photo",file);
        System.out.println("http://localhost:8081/api"+_file);
        return CustomResponseEntity.fromKey("TRAITEMENT_SUCCESS", HttpStatus.OK);
    }

    @PostMapping("/generate-timetable")
    public ResponseEntity<?> postMethodName() {
        
        testService.generateTimeTable();

        return CustomResponseEntity.fromKey("TRAITEMENT_SUCCESS", HttpStatus.OK);
    }
    
}
