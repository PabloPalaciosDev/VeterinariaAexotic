package com.example.veterinarianelo.Models;

public class Mascota {
    private String cedulacli;
    public String getCedulacli() {
        return cedulacli;
    }
    public void setCedulacli(String cedulacli) {
        this.cedulacli = cedulacli;
    }
    private int id;
    private String nombre;
    private String peso;
    private String tamano;
    private String date;
    private String genero;
    private String raza;
    private int codigoraza;
    public int getCodigoraza() {
        return codigoraza;
    }
    public void setCodigoraza(int codigoraza) {
        this.codigoraza = codigoraza;
    }
    private String foto;
    public String getFoto() {
        return foto;
    }
    public void setFoto(String foto) {
        this.foto = foto;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public String getPeso() {
        return peso;
    }
    public void setPeso(String peso) {
        this.peso = peso;
    }
    public String getTamano() {
        return tamano;
    }
    public void setTamano(String tamano) {
        this.tamano = tamano;
    }
    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }
    public String getGenero() {
        return genero;
    }
    public void setGenero(String genero) {
        this.genero = genero;
    }
    public String getRaza() {
        return raza;
    }
    public void setRaza(String raza) {
        this.raza = raza;
    } 
}
