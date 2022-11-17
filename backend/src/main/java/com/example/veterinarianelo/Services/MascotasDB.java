package com.example.veterinarianelo.Services;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import com.example.veterinarianelo.Models.Mascotas;


public class MascotasDB {
    Connection _cn;

    public MascotasDB(){
        _cn = new Conexion().openDB();
    }

    public List<Mascotas> obtenerMascotas(){

        try {
            Statement stnt = _cn.createStatement();
            String query = "select * from Mascota";

            List<Mascotas> mascotas = new ArrayList<>();

            ResultSet result = stnt.executeQuery(query);

            while(result.next()){
                Mascotas mascota = new Mascotas(
                    result.getInt("cod_masc"),
                    result.getInt("cod_raza"),
                    result.getFloat("peso"),
                    result.getString("nom_masc"),
                    result.getString("tamaño"),
                    result.getString("genero"),
                    result.getString("ced_clien"),
                    result.getString("fecha_nac")
                );

                mascotas.add(mascota);

            }
            result.close();
            stnt.close();
            return mascotas;
        } catch (Exception e) {
            System.out.println("ocurrio una excepcion en mascotasDB");
            int x = 1;
        }
        return null;
    }

    public int InsertarMascotas(Mascotas mascota){
        int resultado = 0;
        try {
            Statement stm = _cn.createStatement();
            String query = "INSERT INTO Mascota (cod_raza,peso,nom_masc,tamaño,genero,ced_clien,fecha_nac)" 
            + "values("+mascota.getCod_raza()+","+mascota.getPeso()+",'"+mascota.getNom_masc()+"','"+
            mascota.getTamaño()+"','"+
            mascota.getGenero()+"','"+mascota.getCed_clien()+"','"+mascota.getFecha_nac()+"')";

            resultado = stm.executeUpdate(query);
            return resultado;
        } catch (SQLException e) {
            int x =1;
        }
        return resultado;
    }

    public int ActualizarMascotas(Mascotas mascota){
        int resultado = 0;
        try {
            Statement stm = _cn.createStatement();
            String query = "UPDATE Mascota"+
            " SET peso = "+mascota.getPeso()+
            ", nom_masc = '"+mascota.getNom_masc()+
            "', tamaño = '"+mascota.getTamaño()+
            "', genero = '"+mascota.getGenero()+
            "', ced_clien = '"+mascota.getCed_clien()+
            "', fecha_nac = '"+mascota.getFecha_nac()+
            "' WHERE cod_masc = "+mascota.getCod_masc()+""; 

            resultado = stm.executeUpdate(query);
            return resultado;
        } catch (SQLException e) {
            int x =1;
        }
        return resultado;
    }

    public int EliminarMascotas(int cod_masc){
        int resultado = 0;
        try {
            Statement stmt = _cn.createStatement();
            String query = "DELETE FROM Mascota WHERE cod_masc = "+cod_masc+"";

            return stmt.executeUpdate(query);
        } catch (SQLException e) {
            int x = 1;
        }
        return resultado;
    }
}
