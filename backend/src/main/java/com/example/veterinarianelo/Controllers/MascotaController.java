package com.example.veterinarianelo.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.service.annotation.DeleteExchange;

import com.example.veterinarianelo.Models.Mascota;
import com.example.veterinarianelo.Services.MascotaRepository;

@RestController
public class MascotaController {
    
    @GetMapping("/mascotas/cliente/{cedula}")
    public List<Mascota> getMasctasByClient (@PathVariable String cedula) {
        return new MascotaRepository().getMascotasIdClient(cedula);
    }

    @PostMapping("/mascota/add")
    public Mascota addMascota (@RequestBody Mascota mascota) {
        new MascotaRepository().agregarMascota(mascota);
        return mascota;
    }

    @GetMapping("/mascota/{petcode}")
    public Mascota getMascotaById (@PathVariable int petcode) {
        return new MascotaRepository().getMascotaById(petcode);
    }

    @PutMapping("/mascota/update/")
    public Mascota updateMascota (@RequestBody Mascota mascota) {
        new MascotaRepository().updateMascota(mascota);
        return mascota;
    }

    @DeleteMapping("/mascota/borrar/{id}")
    public int borrarMascota (@PathVariable int id) {
        new MascotaRepository().deleteMascota(id);
        return id;
    }

}
