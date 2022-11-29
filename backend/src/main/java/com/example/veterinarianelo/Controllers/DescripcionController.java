package com.example.veterinarianelo.Controllers;
import java.util.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.veterinarianelo.Models.Descripcion;
import com.example.veterinarianelo.Services.DescripcionDB;

@RestController
public class DescripcionController {
    @GetMapping("/descripcion/get")
    public List<Descripcion> ObtenerDescripcion(){
        return new DescripcionDB().obtenerDescripcion();
    }
}
