package com.timetablescheduling.backend.models.mainModels;

import com.timetablescheduling.backend.models.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Data
@Document
public class Room extends BaseEntity {
    private String name;
    private Integer capacity;
    private String batiment;
    private Filiere filiere;

    public Room(Integer capacity, String name, String batiment ) {
        this.name = name;
        this.capacity = capacity;
        this.batiment = batiment;
    }


}
