package com.timetablescheduling.backend.repository.mainRepository;

import com.timetablescheduling.backend.models.mainModels.SuperUsers;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<SuperUsers, String> {
    boolean existsByMatricule(String matricule);
    Optional<SuperUsers> findByMatricule(String matricule);
}
