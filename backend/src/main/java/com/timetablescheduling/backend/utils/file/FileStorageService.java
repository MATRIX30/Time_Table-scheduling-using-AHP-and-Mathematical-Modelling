package com.timetablescheduling.backend.utils.file;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.stream.Stream;


public interface FileStorageService {
    void init();
    String save(String locationName, MultipartFile file) throws IOException;
    Resource load(String filename);
    void deleteAll();
    Stream<Path> loadAll();
}
