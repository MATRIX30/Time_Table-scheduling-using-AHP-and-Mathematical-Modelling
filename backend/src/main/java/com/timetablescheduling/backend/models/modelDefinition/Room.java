package com.timetablescheduling.backend.models.modelDefinition;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Room {
    private int id;
    private String name;
    private Integer capacity;
    private String batiment;

    public Room(Integer capacity, String name, String batiment ) {
        this.name = name;
        this.capacity = capacity;
        this.batiment = batiment;
    }


}
