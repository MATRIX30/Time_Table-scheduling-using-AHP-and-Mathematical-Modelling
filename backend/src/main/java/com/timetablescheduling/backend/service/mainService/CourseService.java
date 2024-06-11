package com.timetablescheduling.backend.service.mainService;

import com.timetablescheduling.backend.models.mainModels.Course;
import com.timetablescheduling.backend.models.mainModels.TimeSlot;
import com.timetablescheduling.backend.repository.mainRepository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;

    public void createCourse(Course course) {
        Optional<Course> existingCourse = courseRepository.findByName(course.getName());
        if (existingCourse.isEmpty()) {
            courseRepository.save(course);
        }
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }
    public Optional<Course> getByName(String name){
        return courseRepository.findByName(name);
    }

    public Optional<Course> getCourse(int id) {
        return courseRepository.findById(id);
    }
}
