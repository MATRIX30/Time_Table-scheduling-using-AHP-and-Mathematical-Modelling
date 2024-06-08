package com.timetablescheduling.backend.utils.file;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;
import java.util.stream.Stream;

@Service
public class FileStorageImpl implements FileStorageService{
    private final Path root = Paths.get("./uploads/api/");
    @Override
    public void init() {
        if (!Files.exists(root)) {
            try {
                Files.createDirectories(root);
                System.out.println("Upload directory created: " + root);
            } catch (Exception e) {
                throw new RuntimeException("Failed to initialize upload directory!", e);
            }
        } else {
            System.out.println("Upload directory already exists: " + root);
        }
    }

    @Override
    public String save(String locationName, MultipartFile file) throws IOException {
        Path locationPath = this.root.resolve(locationName);
        if (!Files.exists(locationPath)) {
            Files.createDirectories(locationPath);
        }
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Le fichier est null ou vide.");
        }
        try {
            Files.copy(file.getInputStream(), locationPath.resolve(Objects.requireNonNull(file.getOriginalFilename())), StandardCopyOption.REPLACE_EXISTING);
            return  "/"+locationName+"/"+file.getOriginalFilename();
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public Resource load(String filename) {
        try {
            Path file = root.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @Override
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(root.toFile());
    }

    @Override
    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.root, 1).filter(path -> !path.equals(this.root)).map(this.root::relativize);
        } catch (IOException e) {
            throw new RuntimeException("Could not load the files!");
        }
    }
}
