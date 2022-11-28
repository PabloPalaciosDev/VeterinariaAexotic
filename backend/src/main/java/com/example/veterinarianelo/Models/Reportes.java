package com.example.veterinarianelo.Models;

public class Reportes {
    private int reporte_id;
    private String fecha, titulo, cambio, contenido;

    public Reportes(){
    }

    public Reportes(int reporte_id, String fecha, String titulo, String cambio, String contenido) {
        this.reporte_id = reporte_id;
        this.fecha = fecha;
        this.titulo = titulo;
        this.cambio = cambio;
        this.contenido = contenido;
    }

    public int getReporte_id() {
        return reporte_id;
    }

    public void setReporte_id(int reporte_id) {
        this.reporte_id = reporte_id;
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
