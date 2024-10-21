package br.com.minhasreceitas.apiminhasreceitas.exception;

public class CannotBeDeletedException extends RuntimeException {

    public CannotBeDeletedException(String message) {
        super(message);
    }
}
