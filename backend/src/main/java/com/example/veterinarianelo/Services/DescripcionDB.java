package com.example.veterinarianelo.Services;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import com.example.veterinarianelo.Models.Descripcion;

public class DescripcionDB {
    Connection _cn;

    public DescripcionDB(){
        _cn = new Conexion().openDB();
    }
    
    public List<Descripcion> obtenerDescripcion(){
        try {
            Statement stnt = _cn.createStatement();
            String query = "select * from descripcion_proyecto";
            
            List <Descripcion> descripciones = new ArrayList<>();

            ResultSet result = stnt.executeQuery(query);

            while(result.next()){
                Descripcion descripcion = new Descripcion(
                    result.getString("nombre_miembro"),
                    result.getString("foto"),
                    result.getString("bio"),
                    result.getString("cargo")
                    
                );
                descripciones.add(descripcion);
            }
            result.close();
            stnt.close();
            return descripciones;
            
        } catch (SQLException e) {
            System.out.println("ocurrio una excepcion en descripcionDB");
        }

        return null;
    }
}
