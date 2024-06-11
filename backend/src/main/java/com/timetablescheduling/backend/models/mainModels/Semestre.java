package com.timetablescheduling.backend.models.mainModels;

import com.timetablescheduling.backend.models.BaseEntity;
import lombok.Data;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document
public class Semestre extends BaseEntity {
    @Indexed(unique = true)
    private String name;

    public Semestre(String name) {
        this.name = name;
    }

    public static List<Semestre> createSemestre() {
        List<Semestre> semestres = new ArrayList<>();
        semestres.add(new Semestre("s1"));
        semestres.add(new Semestre("s2"));
        return semestres;
    }
}
