package com.timetablescheduling.backend.models.modelDefinition;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document
public class Filiere {
    private int id;
    private String name;
    private List<Room> rooms;
    private List<Course> courses;
    public Filiere(String name){
        this.name = name;
    }

    public Filiere() {

    }

    public static List<Filiere> createFiliere() {
        List<Filiere> filieres = new ArrayList<>();
        filieres.add(new Filiere("Mathematique"));
        filieres.add(new Filiere("Chimie"));
        filieres.add(new Filiere("Biosciences"));
        filieres.add(new Filiere("Giosciences"));
        filieres.add(new Filiere("Physique"));
        return filieres;
    }



}





