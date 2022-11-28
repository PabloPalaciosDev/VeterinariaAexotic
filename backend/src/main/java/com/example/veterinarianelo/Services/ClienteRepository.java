package com.example.veterinarianelo.Services;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.example.veterinarianelo.Models.Cliente;

public class ClienteRepository {

    public Cliente getSessionCliente (String email, String pass) {
        Cliente cliente = new Cliente();
        String sql = "SELECT * FROM Cliente WHERE correo_cliente = '"+email+"' AND contrasena = '"+pass+"'";
        try (
            Statement statement = new Conexion().openDB().createStatement();
            ResultSet resultSet = statement.executeQuery(sql);
        ) {
            createCliente(cliente, resultSet);
        } catch (Exception e) {
            System.out.println("¡==== NO SE REALIZO LA CONSULTA CORRECTAMENTE, VERIFICA ====!");
        }
        return cliente;
    }

    public void registerCliente (Cliente cliente) {
        String sql = "INSERT INTO Cliente VALUES (?, ?, ?, ?, ?, ?)";        
        try (
            PreparedStatement pStatement = new Conexion().openDB().prepareStatement(sql);
        ) {
            pStatement.setString(1, cliente.getCedula());
            pStatement.setString(2, cliente.getNombre());
            pStatement.setString(3, cliente.getApellido());
            pStatement.setString(4, cliente.getDireccion());
            pStatement.setString(5, cliente.getEmail());
            pStatement.setString(6, cliente.getPass());
            pStatement.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    private void createCliente(Cliente cliente, ResultSet resultSet) throws SQLException {
        while (resultSet.next()) {
            cliente.setCedula(resultSet.getString(1));
            cliente.setNombre(resultSet.getString(2));
            cliente.setApellido(resultSet.getString(3));
            cliente.setDireccion(resultSet.getString(4));
            cliente.setEmail(resultSet.getString(5));
            cliente.setPass(resultSet.getString(6));
        }
    }
}
