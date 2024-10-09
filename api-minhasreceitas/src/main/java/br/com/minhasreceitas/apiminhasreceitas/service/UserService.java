package br.com.minhasreceitas.apiminhasreceitas.service;

import br.com.minhasreceitas.apiminhasreceitas.dto.RegisterDTO;
import br.com.minhasreceitas.apiminhasreceitas.model.User;
import br.com.minhasreceitas.apiminhasreceitas.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User register(RegisterDTO data) {
        if (userRepository.findByEmail(data.email()) != null) {
            return null;
        }
        String encodedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.name(), data.email(), encodedPassword, data.role());
        userRepository.save(newUser);
        return newUser;
    }

    public User findById(Integer id) {
        User userLogged = getLoggedUser();
        if(!userLogged.getId().equals(id)){
            throw new RuntimeException("Acesso negado.");
        }
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found") );
    }

    public User getLoggedUser() {
        String emailLoggedUser = SecurityContextHolder.getContext().getAuthentication().getName();
        return (User) userRepository.findByEmail(emailLoggedUser);
    }

    public User editUser(User newUser, Integer id) {
        User oldUser = findById(id);
        oldUser.setName(newUser.getName());
        oldUser.setEmail(newUser.getEmail());
        return userRepository.save(oldUser);
    }
}
