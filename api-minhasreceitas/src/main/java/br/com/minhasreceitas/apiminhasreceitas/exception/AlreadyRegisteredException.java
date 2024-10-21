package br.com.minhasreceitas.apiminhasreceitas.exception;

public class AlreadyRegisteredException extends RuntimeException {

    public AlreadyRegisteredException(String message) {
        super(message);
    }
}
