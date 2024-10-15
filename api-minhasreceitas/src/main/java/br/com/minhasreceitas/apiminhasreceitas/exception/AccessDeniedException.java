package br.com.minhasreceitas.apiminhasreceitas.exception;

public class AccessDeniedException extends RuntimeException{

    public AccessDeniedException(String mensagem) {
        super(mensagem);
    }
}
