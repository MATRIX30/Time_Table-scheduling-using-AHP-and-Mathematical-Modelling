package com.timetablescheduling.backend.controllers;

import com.timetablescheduling.backend.errors.CustomResponseEntity;
import com.timetablescheduling.backend.utils.Utils;
import com.timetablescheduling.backend.utils.file.FileStorageImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class TestController {
    @Autowired
    FileStorageImpl fileStorage;

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
}
