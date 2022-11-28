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
            + "user=sa;"
            + "password=KKdeperro123;"
            + "trustServerCertificate=true";
            Connection con = DriverManager.getConnection(connectionUrl);
            return con;
        } catch (SQLException e) {
            System.out.println("==== ERROR DE CONEXION ====");
            e.printStackTrace();
        }
        catch(ClassNotFoundException cnfex){
            System.out.println("==== ERROR EN LA CLASE DE CONEXION ====");
            cnfex.printStackTrace();
        }
        return null;
    }
    
}
