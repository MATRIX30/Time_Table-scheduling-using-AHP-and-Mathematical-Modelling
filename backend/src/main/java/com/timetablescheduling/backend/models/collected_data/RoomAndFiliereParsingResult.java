package com.timetablescheduling.backend.models.collected_data;

import com.timetablescheduling.backend.models.modelDefinition.Filiere;
import com.timetablescheduling.backend.models.modelDefinition.Room;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class RoomAndFiliereParsingResult {
    private List<Filiere> filieres;
    private List<Room> rooms;
}
