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
                    result.getInt("reporte_id"),
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
        }
    return null;
    }

    public int GuardarReportes(Reportes reporte){
        int resultado = 0;
        try {
            Statement stnt = _cn.createStatement();
            String query = "exec InsertarReportes '"+
            reporte.getFecha()+"', '"+
            reporte.getTitulo()+"', '"+
            reporte.getCambio()+"', '"+
            reporte.getContenido()+"'";

            resultado = stnt.executeUpdate(query);

            return resultado;
        } catch (SQLException e) {
            System.out.println("ocurrio una excepcion en reportesDB");
        }
        return resultado;
    }

    public int ActualizarReportes(Reportes reporte){
        int resultado = 0;
        try {
            Statement stnt = _cn.createStatement();
            String query = "update reportes set fecha_reporte = '"+
            reporte.getFecha()+"', titulo = '"+
            reporte.getTitulo()+"', tipo_cambio = '"+
            reporte.getCambio()+"', contenidor_reporte = '"+
            reporte.getContenido()+"' where reporte_id = "+reporte.getReporte_id();

            resultado = stnt.executeUpdate(query);

            return resultado;
        } catch (SQLException e) {
            System.out.println("ocurrio una excepcion en reportesDB");
        }
        return resultado;
    }

    public int EliminarReporte(int rid){
        int resultado = 0;
        try {
            Statement stnt = _cn.createStatement();
            String query = "Delete reportes where reporte_id = "+rid;

            return stnt.executeUpdate(query);
        } catch (SQLException e) {
            System.out.println("ocurrio una excepcion en reportesDB");
        }
        return resultado;
    }
}
