package com.example.veterinarianelo.Services;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.example.veterinarianelo.Models.Reportes;

public class ReportesDB {
    Connection _cn;

    public ReportesDB(){
        _cn = new Conexion().openDB();
    }

    public List<Reportes> ObtenerReportes(){
        try{
            Statement stnt = _cn.createStatement();
            String query = "select * from reportes order by fecha_reporte";

            List<Reportes> reportes = new ArrayList<>();

            ResultSet result = stnt.executeQuery(query);

            while(result.next()){
                Reportes reporte = new Reportes(
                    result.getString("fecha_reporte"),
                    result.getString("titulo"),
                    result.getString("tipo_cambio"),
                    result.getString("contenidor_reporte")
                );

                reportes.add(reporte);
            }
            result.close();
            stnt.close();
            return reportes;
        } catch(SQLException e){
            System.out.println("ocurrio una excepcion en reportesDB");
            int x = 1;
        }
    return null;
    }
}
