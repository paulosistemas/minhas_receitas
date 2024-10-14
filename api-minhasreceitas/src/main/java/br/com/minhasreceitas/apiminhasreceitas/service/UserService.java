package br.com.minhasreceitas.apiminhasreceitas.service;

import br.com.minhasreceitas.apiminhasreceitas.dto.RegisterDTO;
import br.com.minhasreceitas.apiminhasreceitas.dto.UserChangePasswordDTO;
import br.com.minhasreceitas.apiminhasreceitas.model.User;
import br.com.minhasreceitas.apiminhasreceitas.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
public class UserService {

    @Autowired
    private JavaMailSender mailSender;

    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final int PASSWORD_LENGTH = 10;
    private static final SecureRandom random = new SecureRandom();

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public User register(RegisterDTO data) {
        if (userRepository.findByEmail(data.email()) != null) {
            return null;
        }
        String encodedPassword = passwordEncoder.encode(data.password());
        User newUser = new User(data.name(), data.email(), encodedPassword, data.role());
        userRepository.save(newUser);
        return newUser;
    }

    private void validateUser(Integer id) {
        User userLogged = getLoggedUser();
        if(!userLogged.getId().equals(id)){
            throw new RuntimeException("Acesso negado.");
        }
    }

    public User findById(Integer id) {
        validateUser(id);
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found") );
    }

    public User getLoggedUser() {
        String emailLoggedUser = SecurityContextHolder.getContext().getAuthentication().getName();
        return (User) userRepository.findByEmail(emailLoggedUser);
    }

    public User editUser(User newUser, Integer id) {
        validateUser(id);
        User oldUser = findById(id);
        oldUser.setName(newUser.getName());
        oldUser.setEmail(newUser.getEmail());
        return userRepository.save(oldUser);
    }

    public void changePassword(UserChangePasswordDTO userChangePasswordDTO) {
        validateUser(userChangePasswordDTO.getId());
        User userLogged = getLoggedUser();
        if(!passwordEncoder.matches(
                userChangePasswordDTO.getCurrentPassword(),
                userLogged.getPassword())) {
            throw new RuntimeException("Senha antiga incorreta");
        }
        userLogged.setPassword(passwordEncoder.encode(userChangePasswordDTO.getNewPassword()));
        userRepository.save(userLogged);
    }

    public void recoverPassword(String email) {
        if(!userRepository.existsByEmail(email)){
            throw new RuntimeException("Email não cadastrado");
        }
        generateNewPasswordAndSendEmail(email);
    }

    private void generateNewPasswordAndSendEmail(String email) {
        String newPassword = randomString();
        User user = userRepository.findUserByEmail(email);
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        sendEmail(email, newPassword);
    }

    private void sendEmail(String email, String newPassword) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Nova Senha Gerada");
        message.setText("Sua nova senha é: " + newPassword + ". Por favor, altere sua senha após o login.");
        mailSender.send(message);
    }

    private String randomString() {
        StringBuilder randomString = new StringBuilder(PASSWORD_LENGTH);
        for (int i = 0; i < PASSWORD_LENGTH; i++) {
            randomString.append(CHARACTERS.charAt(random.nextInt(CHARACTERS.length())));
        }
        return randomString.toString();}

}
