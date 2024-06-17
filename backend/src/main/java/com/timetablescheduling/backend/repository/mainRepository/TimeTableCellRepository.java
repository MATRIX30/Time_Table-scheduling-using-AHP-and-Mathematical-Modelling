package com.timetablescheduling.backend.repository.mainRepository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.timetablescheduling.backend.models.mainModels.TimeTableCell;

@Repository
public interface TimeTableCellRepository extends MongoRepository<TimeTableCell, Integer> {
}
