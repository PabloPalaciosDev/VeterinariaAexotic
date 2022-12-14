package com.example.veterinarianelo.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.veterinarianelo.Models.Cliente;
import com.example.veterinarianelo.Services.ClienteRepository;

@RestController
public class ClientesController {
    
    @GetMapping("/cliente/session/{email}/{pass}")
    public Cliente getClienteSession (@PathVariable String email, @PathVariable String pass) {

        return new ClienteRepository().getSessionCliente(email, pass);
    }

    @GetMapping("/clientes/{email}/{cedula}")
    public List<Cliente> getClientes (@PathVariable String email, @PathVariable String cedula) {
        return new ClienteRepository().getClientesByIds(email, cedula);
    }

    @PostMapping("/cliente/register")
    public Cliente registerUser(@RequestBody Cliente cliente) {
        new ClienteRepository().registerCliente(cliente);
        return cliente;
    }

    @PutMapping("/cliente/update/")
    public Cliente updateCliente (@RequestBody Cliente cliente) {
        new ClienteRepository().updateClient(cliente);
        return cliente;
    }
}
