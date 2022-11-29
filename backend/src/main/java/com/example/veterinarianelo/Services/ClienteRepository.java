package com.example.veterinarianelo.Services;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.example.veterinarianelo.Models.Cliente;

public class ClienteRepository {

    public List<Cliente> getClientesByIds (String email, String cedula) {
        List<Cliente> lista = new ArrayList<>();
        String sql = "SELECT * FROM Cliente WHERE correo_cliente = '"+email+"' OR cedula_cliente = '"+cedula+"'";
        try (
            Statement statement = new Conexion().openDB().createStatement();
            ResultSet resultSet = statement.executeQuery(sql);
        ) {
            while (resultSet.next()) {
                Cliente cliente = new Cliente();
                createCliente(cliente, resultSet, false);
                lista.add(cliente);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return lista;
    }

    public Cliente getSessionCliente (String email, String pass) {
        Cliente cliente = new Cliente();
        String sql = "SELECT * FROM Cliente WHERE correo_cliente = '"+email+"' AND contrasena = '"+pass+"'";

        try (
            Statement statement = new Conexion().openDB().createStatement();
            ResultSet resultSet = statement.executeQuery(sql);
        ) {
            while (resultSet.next()) {
                createCliente(cliente, resultSet, true);
            }
        } catch (Exception e) {
            System.out.println("¡==== NO SE REALIZO LA CONSULTA CORRECTAMENTE, VERIFICA ====!");
            e.printStackTrace();
        }
        return cliente;
    }

    public void updateClient(Cliente cliente) {
        String sql = "UPDATE Cliente SET nombre_cliente = ?, apellido_cliente = ? WHERE cedula_cliente = ?";
        try (
            PreparedStatement preparedStatement = new Conexion().openDB().prepareStatement(sql);
        ) {
            preparedStatement.setString(1, cliente.getNombre());
            preparedStatement.setString(2, cliente.getApellido());
            preparedStatement.setString(3, cliente.getCedula());
            preparedStatement.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void registerCliente (Cliente cliente) {
        String sql = "INSERT INTO Cliente VALUES (?, ?, ?, ?, ?, ?, ?, ?)";        
        try (
            PreparedStatement pStatement = new Conexion().openDB().prepareStatement(sql);
        ) {
            pStatement.setString(1, cliente.getCedula());
            pStatement.setString(2, cliente.getNombre());
            pStatement.setString(3, cliente.getApellido());
            pStatement.setString(4, cliente.getDireccion());
            pStatement.setString(5, cliente.getEmail());
            pStatement.setString(6, cliente.getPass());
            pStatement.setString(7, cliente.getFoto());
            pStatement.setString(8, cliente.getAbout());
            pStatement.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    private void createCliente(Cliente cliente, ResultSet resultSet, boolean pass) throws SQLException {
        cliente.setCedula(resultSet.getString(1));
        cliente.setNombre(resultSet.getString(2));
        cliente.setApellido(resultSet.getString(3));
        cliente.setDireccion(resultSet.getString(4));
        cliente.setEmail(resultSet.getString(5));
        if(pass) cliente.setPass(resultSet.getString(6));
        cliente.setFoto(resultSet.getString(7));
        cliente.setAbout(resultSet.getString(8));
    }
}
