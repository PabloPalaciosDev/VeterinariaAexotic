package com.example.veterinarianelo.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.veterinarianelo.Models.Raza;
import com.example.veterinarianelo.Services.RazaRepository;

@RestController
public class RazaController {

    @GetMapping("/razas/all")
    public List<Raza> getRazas () {
        return new RazaRepository().getRazas();
    }

}