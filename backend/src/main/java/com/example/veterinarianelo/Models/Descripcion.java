package com.example.veterinarianelo.Models;

import java.util.List;

public class Descripcion {
    private String nombre_miembro,foto,bio,cargo;

    
    public Descripcion(String nombre_miembro, String foto, String bio, String cargo) {
        this.nombre_miembro = nombre_miembro;
        this.foto = foto;
        this.bio = bio;
        this.cargo = cargo;
    }

    public Descripcion() {
    }

    public String getNombre_miembro() {
        return nombre_miembro;
    }

    public void setNombre_miembro(String nombre_miembro) {
        this.nombre_miembro = nombre_miembro;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }
    
}
