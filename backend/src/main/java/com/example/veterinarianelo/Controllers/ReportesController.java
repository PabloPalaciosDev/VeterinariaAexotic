package com.example.veterinarianelo.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.veterinarianelo.Models.Reportes;
import com.example.veterinarianelo.Services.ReportesDB;

@RestController
public class ReportesController {
    @GetMapping("reportes/all")
    public List<Reportes> ObtenerReportes(){
        return new ReportesDB().ObtenerReportes();
    }

    @PostMapping("reportes")
    public int InsertarReportes(@RequestBody Reportes reporte){
        return new ReportesDB().GuardarReportes(reporte);
    }

    @PutMapping("reportes")
    public int UpdateReportes(@RequestBody Reportes reporte){
        return new ReportesDB().ActualizarReportes(reporte);
    }

    @DeleteMapping("reportes/{reporte_id}")
    public int Delete(@PathVariable("reporte_id") int rid){
        return new ReportesDB().EliminarReporte(rid);
    }
}
