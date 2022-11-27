package com.example.veterinarianelo.Controllers;

import java.util.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.veterinarianelo.Models.RepositorioBusqueda;
import com.example.veterinarianelo.Services.RepositorioBusquedaDB;

@RestController
public class RepositorioBusquedaController {
    @GetMapping("/repositorio/all")
    public List<RepositorioBusqueda> obtenerRepositorio(){
        return new RepositorioBusquedaDB().obtenerRepositorio();
    }
}
