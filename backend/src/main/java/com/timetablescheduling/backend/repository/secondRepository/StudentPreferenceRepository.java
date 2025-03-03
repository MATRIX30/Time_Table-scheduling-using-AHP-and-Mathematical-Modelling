package com.timetablescheduling.backend.repository.secondRepository;

import com.timetablescheduling.backend.models.secondaryModels.StudentPreferences;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentPreferenceRepository extends MongoRepository<StudentPreferences, Integer> {
}
