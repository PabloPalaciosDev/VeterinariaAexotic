package com.example.veterinarianelo.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.veterinarianelo.Models.Mascota;
import com.example.veterinarianelo.Services.MascotaRepository;

@RestController
public class MascotaController {
    
    @GetMapping("/mascotas/cliente/{cedula}")
    public List<Mascota> getMasctasByClient (@PathVariable String cedula) {
        return new MascotaRepository().getMascotasIdClient(cedula);
    }

}
