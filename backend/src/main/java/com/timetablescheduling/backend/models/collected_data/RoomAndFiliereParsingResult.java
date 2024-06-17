package com.timetablescheduling.backend.models.collected_data;

import com.timetablescheduling.backend.models.mainModels.Room;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class RoomAndFiliereParsingResult {
    private List<Room> rooms;
}
