package com.timetablescheduling.backend.models.mainModels;

import com.timetablescheduling.backend.models.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Document
public class Filiere extends BaseEntity {
    @Indexed(unique = true)
    private String name;
    public Filiere(String name){
        this.name = name;
    }


    public static List<Filiere> createFiliere() {
        List<Filiere> filieres = new ArrayList<>();
        filieres.add(new Filiere("Mathematique"));
        filieres.add(new Filiere("Chimie"));
        filieres.add(new Filiere("Biosciences"));
        filieres.add(new Filiere("Giosciences"));
        filieres.add(new Filiere("Physique"));
        filieres.add(new Filiere("Informatique"));
        return filieres;
    }



}





