package com.example.veterinarianelo.Controllers;

import java.util.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.veterinarianelo.Models.RepositorioBusqueda;
import com.example.veterinarianelo.Services.RepositorioBusquedaDB;

@RestController
public class RepositorioBusquedaController {
    @GetMapping("/repositorio/{tipo_animal}")
    public List<RepositorioBusqueda> obtenerRepositorio(@PathVariable("tipo_animal") String tipo_animal){
        return new RepositorioBusquedaDB().obtenerRepositorio(tipo_animal);
    }
}
