package br.com.minhasreceitas.apiminhasreceitas.dto;

import br.com.minhasreceitas.apiminhasreceitas.enums.UserRole;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
    private Integer id;
    private String name;
    private String email;
    private String password;
    private UserRole role;
}
