package com.example.veterinarianelo.Models;

public class RepositorioBusqueda {
    private int codigo_mascota_repo;
    private String nombre_mascota_repo, tamano_promedio, foto, peso_promedio;
    public int getCodigo_mascota_repo() {
        return codigo_mascota_repo;
    }
    public void setCodigo_mascota_repo(int codigo_mascota_repo) {
        this.codigo_mascota_repo = codigo_mascota_repo;
    }
    public String getNombre_mascota_repo() {
        return nombre_mascota_repo;
    }
    public void setNombre_mascota_repo(String nombre_mascota_repo) {
        this.nombre_mascota_repo = nombre_mascota_repo;
    }
    public String getTamano_promedio() {
        return tamano_promedio;
    }
    public void setTamano_promedio(String tamano_promedio) {
        this.tamano_promedio = tamano_promedio;
    }
    public String getFoto() {
        return foto;
    }
    public void setFoto(String foto) {
        this.foto = foto;
    }
    public String getPeso_promedio() {
        return peso_promedio;
    }
    public void setPeso_promedio(String peso_promedio) {
        this.peso_promedio = peso_promedio;
    }
    public RepositorioBusqueda() {
    }
    public RepositorioBusqueda(int codigo_mascota_repo, String nombre_mascota_repo, String tamano_promedio, String foto,
            String peso_promedio) {
        this.codigo_mascota_repo = codigo_mascota_repo;
        this.nombre_mascota_repo = nombre_mascota_repo;
        this.tamano_promedio = tamano_promedio;
        this.foto = foto;
        this.peso_promedio = peso_promedio;
    }


    
}
