package br.com.minhasreceitas.apiminhasreceitas.config;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@AllArgsConstructor
public class RestErrorMessage {
    private HttpStatus status;
    private String message;
}
