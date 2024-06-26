package com.timetablescheduling.backend.repository.mainRepository;

import com.timetablescheduling.backend.models.mainModels.Users;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<Users, String> {
    boolean existsByMatricule(String matricule);
    Optional<Users> findByMatricule(String matricule);
}
