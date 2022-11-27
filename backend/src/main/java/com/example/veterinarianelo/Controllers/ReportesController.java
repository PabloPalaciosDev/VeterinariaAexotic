package com.example.veterinarianelo.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.veterinarianelo.Models.Reportes;
import com.example.veterinarianelo.Services.ReportesDB;

@RestController
public class ReportesController {
    @GetMapping("reportes/all")
    public List<Reportes> ObtenerReportes(){
        return new ReportesDB().ObtenerReportes();
    }
}
