package com.example.veterinarianelo.Services;

import java.sql.Connection;
import java.sql.ResultSet;
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
                    result.getString("ced_clien")
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
}
