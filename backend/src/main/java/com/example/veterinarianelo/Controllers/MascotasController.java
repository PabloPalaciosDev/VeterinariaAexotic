package com.example.veterinarianelo.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.veterinarianelo.Models.Mascotas;
import com.example.veterinarianelo.Services.MascotasDB;

import java.util.*;

@RestController
public class MascotasController {

    @GetMapping("/mascotas/all")
    public List<Mascotas> ObtenerMascotas() {
        return new MascotasDB().obtenerMascotas();
    }
}
