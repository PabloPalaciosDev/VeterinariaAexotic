package com.example.veterinarianelo.Controllers;

import java.util.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.veterinarianelo.Models.RepositorioBusqueda;
import com.example.veterinarianelo.Services.RepositorioBusquedaDB;

@RestController
public class RepositorioBusquedaController {
    @GetMapping("/repositorio/{tamano_promedio}")
    public List<RepositorioBusqueda> obtenerRepositorio(@PathVariable("tamano_promedio") String tamano_promedio){
        return new RepositorioBusquedaDB().obtenerRepositorio(tamano_promedio);
    }
}
