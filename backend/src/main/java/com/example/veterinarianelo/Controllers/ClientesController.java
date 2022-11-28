package com.example.veterinarianelo.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.veterinarianelo.Models.Cliente;
import com.example.veterinarianelo.Services.ClienteRepository;

@RestController
public class ClientesController {
    
    @GetMapping("/cliente/session/{email}/{pass}")
    public Cliente getUsers (@PathVariable String email, @PathVariable String pass) {

        return new ClienteRepository().getSessionCliente(email, pass);
    }

    @PostMapping("/cliente/register")
    public Cliente registerUser(@RequestBody Cliente cliente) {
        new ClienteRepository().registerCliente(cliente);
        return cliente;
    }
}
