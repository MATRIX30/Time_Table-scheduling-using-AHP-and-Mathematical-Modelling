package com.timetablescheduling.backend.repository.secondRepository;

import com.timetablescheduling.backend.models.secondaryModels.AdminPreferences;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminPreferencesRepository extends MongoRepository<AdminPreferences,Integer> {

}
