package com.example.veterinarianelo.Services;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Conexion {
    public Connection openDB(){
        try {
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");  
            String connectionUrl = "jdbc:sqlserver://localhost:1433;"
            + "databaseName=VeterinariaAexotic;"
            + "user=SA;"
            + "password=12345678;"
            + "trustServerCertificate=true";
            Connection con = DriverManager.getConnection(connectionUrl);
            return con;
        } catch (SQLException E) {
            System.out.println("ERROR DE CONEXION xd");
            
        }
        catch(ClassNotFoundException cnfex){
            System.out.println("error en clase conexion");
            
        }
        return null;
    }
    
}
