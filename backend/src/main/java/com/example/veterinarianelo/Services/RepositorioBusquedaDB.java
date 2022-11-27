package com.example.veterinarianelo.Services;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.example.veterinarianelo.Models.RepositorioBusqueda;

public class RepositorioBusquedaDB {
    Connection _cn;

    public RepositorioBusquedaDB(){
        _cn = new Conexion().openDB();
    }

    public List<RepositorioBusqueda> obtenerRepositorio(String tamano_promedio){
        try {
            Statement stnt = _cn.createStatement();
            String query = "select * from Repositorio_Mascotas_Exoticas where tamano_promedio = '"+tamano_promedio+"'";

            List<RepositorioBusqueda> mascotas_repo = new ArrayList<>();

            ResultSet result = stnt.executeQuery(query);

            while(result.next()){
                RepositorioBusqueda mascota_repo = new RepositorioBusqueda(
                    result.getInt("codigo_mascota_repo"),
                    result.getString("nombre_mascota_repo"),
                    result.getString("tamano_promedio"),
                    result.getString("foto"),
                    result.getString("peso_promedio")
                );
                mascotas_repo.add(mascota_repo);
            }
            result.close();
            stnt.close();
            return mascotas_repo;

        } catch (SQLException e) {
            System.out.println("ocurrio una excepcion en RepositorioBusquedaDB");
            int x = 1;
        }
        return null;
    }

}