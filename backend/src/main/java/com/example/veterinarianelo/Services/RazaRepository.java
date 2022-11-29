package com.example.veterinarianelo.Services;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.example.veterinarianelo.Models.Raza;

public class RazaRepository {
    

    public List<Raza> getRazas () {
        String sql = "select codigo_raza, nombre_raza, nombre_animal from Raza as r JOIN Animal as a ON r.codigo_animal = a.codigo_animal";
        List<Raza> lista = new ArrayList<>();

        try (
            Statement statement = new Conexion().openDB().createStatement();
            ResultSet resultSet = statement.executeQuery(sql);
        ) {
            while (resultSet.next()) {
                Raza raza = new Raza();
                crearRaza(resultSet, raza);
                lista.add(raza);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return lista;
    }


    private void crearRaza (ResultSet resultSet, Raza raza) throws SQLException {
        raza.setCodigo(resultSet.getInt(1));
        raza.setRaza(resultSet.getString(2));
        raza.setAnimal(resultSet.getString(3));
    }

}
