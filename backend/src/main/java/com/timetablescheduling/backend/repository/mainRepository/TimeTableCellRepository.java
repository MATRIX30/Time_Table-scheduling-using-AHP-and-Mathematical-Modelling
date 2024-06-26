package com.timetablescheduling.backend.repository.mainRepository;

import com.timetablescheduling.backend.models.mainModels.Filiere;
import com.timetablescheduling.backend.models.mainModels.TimeTableCell;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimeTableCellRepository extends MongoRepository<TimeTableCell, Integer> {

    @Query("{'filiere.name' :  ?0}")
    List<TimeTableCell> findByFiliere(String filiere);

    @Query("{'filiere.name' :  ?0, 'level.name' : ?1}")
    List<TimeTableCell> findByFiliereAndLevel(String filiere, String level);
    @Query("{'filiere.name' :  ?0, 'level.name' : ?1}")
    List<TimeTableCell> findByFiliereAndLevel(String filiere, String level, Pageable pageable);

    @Query("{'filiere.name ':  ?0, 'semestre.name' :  ?1}")
    List<TimeTableCell> findByFiliereAndSemestre(String filiere, String semestre);


    @Query("{'filiere.name' :  ?0, 'level.name' : ?1 , 'semestre.name' :  ?2}")
    List<TimeTableCell> findByFiliereAndLevelAndSemestre(String filiere, String level, String semestre);

    @Query("{'level.name' :  ?0}")
    List<TimeTableCell> findByLevel(String level);

    @Query("{'level.name' :  ?0, 'semestre.name' :  ?1}")
    List<TimeTableCell> findByLevelAndSemestre(String level, String semestre);

    @Query("{ 'semestre.name' :  ?0}")
    List<TimeTableCell> findBySemestre(String semestre);
}
