package com.example.veterinarianelo.Services;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import com.example.veterinarianelo.Models.Mascota;

public class MascotaRepository {
                                   //    1               2           3      4        5         6        7         8
    private String camposResult = "codigo_mascota, nombre_mascota, peso, tamano, fecha_nac, genero, nombre_raza, foto";

    public List<Mascota> getMascotasIdClient (String cedula) {
        List<Mascota> lista = new ArrayList<>();
        String sql = "SELECT "+camposResult+" FROM Mascotas_Exoticas_Cliente AS m JOIN Raza AS r ON m.codigo_raza = r.codigo_raza WHERE cedula_cliente = '"+cedula+"'";
        try (
            Statement statement = new Conexion().openDB().createStatement();
            ResultSet resultSet = statement.executeQuery(sql);
        ) {
            while (resultSet.next()) {
                Mascota mascota = new Mascota();
                createMascota(mascota, resultSet);
                lista.add(mascota);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return lista;
    }

    private void createMascota (Mascota mascota, ResultSet resultSet) throws SQLException {
        mascota.setId(resultSet.getInt(1));
        mascota.setNombre(resultSet.getString(2));
        mascota.setPeso(resultSet.getString(3));
        mascota.setTamano(resultSet.getString(4));
        mascota.setDate(resultSet.getString(5));
        mascota.setGenero(resultSet.getString(6));
        mascota.setRaza(resultSet.getString(7));
        mascota.setFoto(resultSet.getString(8));
    }
}
