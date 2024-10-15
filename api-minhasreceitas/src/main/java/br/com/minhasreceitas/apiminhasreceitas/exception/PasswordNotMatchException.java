package br.com.minhasreceitas.apiminhasreceitas.exception;

public class PasswordNotMatchException extends RuntimeException{

    public PasswordNotMatchException(String mensagem) {
        super(mensagem);
    }
}
