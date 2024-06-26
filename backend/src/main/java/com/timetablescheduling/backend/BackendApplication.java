package com.timetablescheduling.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.google.ortools.Loader;
import com.timetablescheduling.backend.utils.file.FileStorageImpl;

import jakarta.annotation.Resource;

@SpringBootApplication
@EnableAsync
public class BackendApplication implements CommandLineRunner {

    @Resource
    FileStorageImpl storageService;

    public static void main(String[] args) {
        Loader.loadNativeLibraries();   
        SpringApplication.run(BackendApplication.class, args);
    }
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("*")
                        .allowedMethods("*")
                        .allowedHeaders("*");
            }
        };
    }

    @Override
    public void run(String... arg) throws Exception {
        storageService.init();
    }
}
