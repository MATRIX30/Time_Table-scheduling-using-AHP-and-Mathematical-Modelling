package com.timetablescheduling.backend.repository.secondRepository;

import com.timetablescheduling.backend.models.secondaryModels.LecturerPreference;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LecturerPreferenceRepository extends MongoRepository<LecturerPreference, Integer> {

}
