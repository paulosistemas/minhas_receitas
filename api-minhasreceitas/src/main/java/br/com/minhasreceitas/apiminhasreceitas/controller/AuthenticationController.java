package br.com.minhasreceitas.apiminhasreceitas.controller;

import br.com.minhasreceitas.apiminhasreceitas.config.TokenService;
import br.com.minhasreceitas.apiminhasreceitas.dto.AuthenticationDTO;
import br.com.minhasreceitas.apiminhasreceitas.dto.LoginResponseDTO;
import br.com.minhasreceitas.apiminhasreceitas.exception.InvalidCredentialsException;
import br.com.minhasreceitas.apiminhasreceitas.model.User;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data) {
        try {
            var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
            var auth = authenticationManager.authenticate(usernamePassword);
            var token = tokenService.generateToken((User) auth.getPrincipal());
            return ResponseEntity.ok(new LoginResponseDTO(((User) auth.getPrincipal()).getName(), token));
        } catch (Exception e) {
            throw new InvalidCredentialsException("Senha ou email inválidos");
        }
    }
}