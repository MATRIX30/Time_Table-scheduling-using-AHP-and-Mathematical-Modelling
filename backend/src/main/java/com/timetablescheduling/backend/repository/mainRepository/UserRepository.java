package com.timetablescheduling.backend.repository.mainRepository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.timetablescheduling.backend.models.mainModels.Users;

@Repository
public interface UserRepository extends MongoRepository<Users, Integer> {
    boolean existsByMatricule(String matricule);
    Optional<Users> findByMatricule(String matricule);
}
