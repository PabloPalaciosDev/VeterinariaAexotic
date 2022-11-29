package com.example.veterinarianelo.Services;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import com.example.veterinarianelo.Models.Mascota;

public class MascotaRepository {
                                // 1
    private String codigo = "codigo_mascota,";
                                // 2-1        3-2    4-3     5-4       6-5        7-6       8-7       9-8
    private String campos = "nombre_mascota, peso, tamano, fecha_nac, genero, nombre_raza, foto, cedula_cliente";

    public void agregarMascota (Mascota mascota) {
        String sql = "INSERT INTO Mascotas_Exoticas_Cliente (nombre_mascota, peso, tamano, fecha_nac, genero, foto, cedula_cliente, codigo_raza) VALUES (?,?,?,?,?,?,?,?)";
        try (
            PreparedStatement preparedStatement = new Conexion().openDB().prepareStatement(sql);
        ) {
            preparedStatement.setString(1, mascota.getNombre());
            preparedStatement.setString(2, mascota.getPeso());
            preparedStatement.setString(3, mascota.getTamano());
            preparedStatement.setString(4, mascota.getDate());
            preparedStatement.setString(5, mascota.getGenero());
            preparedStatement.setString(6, mascota.getFoto());
            preparedStatement.setString(7, mascota.getCedulacli());
            preparedStatement.setInt(8, mascota.getCodigoraza());
            preparedStatement.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Mascota getMascotaById (int petcode) {
        String sql = "SELECT "+codigo+campos+" FROM Mascotas_Exoticas_Cliente AS m JOIN Raza AS r ON m.codigo_raza = r.codigo_raza WHERE codigo_mascota = "+petcode+"";
        Mascota mascota = new Mascota();
        try (
            Statement statement = new Conexion().openDB().createStatement();
            ResultSet resultSet = statement.executeQuery(sql);
        ) {
            while (resultSet.next()) {
                createMascota(mascota, resultSet);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return mascota;
    }

    public List<Mascota> getMascotasIdClient (String cedula) {
        List<Mascota> lista = new ArrayList<>();
        String sql = "SELECT "+codigo+campos+" FROM Mascotas_Exoticas_Cliente AS m JOIN Raza AS r ON m.codigo_raza = r.codigo_raza WHERE cedula_cliente = '"+cedula+"'";
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

    public void updateMascota (Mascota mascota) {
        String sql = "update Mascotas_Exoticas_Cliente set nombre_mascota = ?, peso = ?, tamano = ?, fecha_nac = ?, genero = ?, codigo_raza = ? WHERE codigo_mascota = ?";
        try (
            PreparedStatement preparedStatement = new Conexion().openDB().prepareStatement(sql);
        ) {
            preparedStatement.setString(1, mascota.getNombre());
            preparedStatement.setString(2, mascota.getPeso());
            preparedStatement.setString(3, mascota.getTamano());
            preparedStatement.setString(4, mascota.getDate());
            preparedStatement.setString(5, mascota.getGenero());
            preparedStatement.setInt(6, mascota.getCodigoraza());
            preparedStatement.setInt(7, mascota.getId());
            preparedStatement.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }   

    public void deleteMascota (int id) {
        String sql = "DELETE FROM Mascotas_Exoticas_Cliente WHERE codigo_mascota = ?";
        try (
            PreparedStatement preparedStatement = new Conexion().openDB().prepareStatement(sql)
        ) {
            preparedStatement.setInt(1, id);
            preparedStatement.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
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
        mascota.setCedulacli(resultSet.getString(9));
    }
}
