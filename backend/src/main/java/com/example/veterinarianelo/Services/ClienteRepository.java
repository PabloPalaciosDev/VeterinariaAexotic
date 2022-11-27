package com.example.veterinarianelo.Services;

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
