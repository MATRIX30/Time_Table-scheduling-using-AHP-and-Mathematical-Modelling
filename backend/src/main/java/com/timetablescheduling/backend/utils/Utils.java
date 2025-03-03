package com.timetablescheduling.backend.utils;


import org.springframework.core.io.ClassPathResource;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;

public class Utils {
    public static boolean verifyImageExtension(MultipartFile multipartFile){
        return (!Objects.equals(multipartFile.getContentType(), "image/jpg") && !Objects.equals(multipartFile.getContentType(), "image/jpeg") && !Objects.equals(multipartFile.getContentType(), "image/png"));
    }
    public static Boolean verifyFileExtensionType(MultipartFile multipartFile){
        return  (!Objects.equals(multipartFile.getContentType(), "application/pdf"));
    }


}
