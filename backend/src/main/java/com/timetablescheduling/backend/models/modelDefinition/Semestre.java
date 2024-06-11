package com.timetablescheduling.backend.models.modelDefinition;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document
public class Semestre {
    private int id;
    private String name;

    public Semestre(String name) {
        this.name = name;
    }

    public static List<Semestre> createSemestre() {
        List<Semestre> semestres = new ArrayList<>();
        semestres.add(new Semestre("S1"));
        semestres.add(new Semestre("S2"));
        return semestres;
    }
}
