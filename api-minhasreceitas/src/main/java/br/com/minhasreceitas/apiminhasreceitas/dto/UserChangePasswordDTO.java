package br.com.minhasreceitas.apiminhasreceitas.dto;

import lombok.Data;

@Data
public class UserChangePasswordDTO {
    private Integer id;
    private String currentPassword;
    private String newPassword;
}
