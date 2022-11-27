package com.example.veterinarianelo.Models;

public class Reportes {
    private String fecha, titulo, cambio, contenido;

    public Reportes(){
    }

    public Reportes(String fecha, String titulo, String cambio, String contenido) {
        this.fecha = fecha;
        this.titulo = titulo;
        this.cambio = cambio;
        this.contenido = contenido;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getCambio() {
        return cambio;
    }

    public void setCambio(String cambio) {
        this.cambio = cambio;
    }

    public String getContenido() {
        return contenido;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }
}
