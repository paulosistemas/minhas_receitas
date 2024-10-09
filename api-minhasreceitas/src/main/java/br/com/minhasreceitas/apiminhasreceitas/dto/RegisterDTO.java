package br.com.minhasreceitas.apiminhasreceitas.dto;

import br.com.minhasreceitas.apiminhasreceitas.enums.UserRole;

public record RegisterDTO(String name, String email, String password, UserRole role) {
}
