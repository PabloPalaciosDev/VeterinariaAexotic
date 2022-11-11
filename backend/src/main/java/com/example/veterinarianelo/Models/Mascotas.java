package com.example.veterinarianelo.Models;

import java.util.List;

public class Mascotas {
    private int cod_masc,cod_raza;
    private float peso;
    private String nom_masc,tamaño,genero,ced_clien;

    public Mascotas(int cod_masc, int cod_raza, float peso, String nom_masc, String tamaño, String genero,
            String ced_clien) {
        this.cod_masc = cod_masc;
        this.cod_raza = cod_raza;
        this.peso = peso;
        this.nom_masc = nom_masc;
        this.tamaño = tamaño;
        this.genero = genero;
        this.ced_clien = ced_clien;
    }


    public Mascotas() {
    }

    
    public int getCod_masc() {
        return cod_masc;
    }
    public void setCod_masc(int cod_masc) {
        this.cod_masc = cod_masc;
    }
    public int getCod_raza() {
        return cod_raza;
    }
    public void setCod_raza(int cod_raza) {
        this.cod_raza = cod_raza;
    }
    public float getPeso() {
        return peso;
    }
    public void setPeso(float peso) {
        this.peso = peso;
    }
    public String getNom_masc() {
        return nom_masc;
    }
    public void setNom_masc(String nom_masc) {
        this.nom_masc = nom_masc;
    }
    public String getTamaño() {
        return tamaño;
    }
    public void setTamaño(String tamaño) {
        this.tamaño = tamaño;
    }
    public String getGenero() {
        return genero;
    }
    public void setGenero(String genero) {
        this.genero = genero;
    }
    public String getCed_clien() {
        return ced_clien;
    }
    public void setCed_clien(String ced_clien) {
        this.ced_clien = ced_clien;
    }


    public void add(List<Mascotas> mascota) {
    }

    
}
