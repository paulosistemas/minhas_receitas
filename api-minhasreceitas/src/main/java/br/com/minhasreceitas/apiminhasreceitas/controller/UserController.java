package br.com.minhasreceitas.apiminhasreceitas.controller;

import br.com.minhasreceitas.apiminhasreceitas.dto.RegisterDTO;
import br.com.minhasreceitas.apiminhasreceitas.dto.UserChangePasswordDTO;
import br.com.minhasreceitas.apiminhasreceitas.dto.UserDetailsDTO;
import br.com.minhasreceitas.apiminhasreceitas.dto.UserRecoverDTO;
import br.com.minhasreceitas.apiminhasreceitas.model.User;
import br.com.minhasreceitas.apiminhasreceitas.service.UserService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping("/{id}")
    public ResponseEntity<UserDetailsDTO> getUser(@PathVariable @Valid Integer id) {
        UserDetailsDTO userDetailsDTO = modelMapper.map(userService.getOne(id), UserDetailsDTO.class);
        return ResponseEntity.ok(userDetailsDTO);
    }

    @PutMapping("edit/{id}")
    public ResponseEntity<UserDetailsDTO> editUser(@PathVariable @Valid Integer id, @RequestBody @Valid UserDetailsDTO userDetailsDTO) {
        User user = userService.update(modelMapper.map(userDetailsDTO, User.class), id);
        return ResponseEntity.ok(modelMapper.map(user, UserDetailsDTO.class));
    }

    @PostMapping("/change-password")
    public ResponseEntity<Void> changePassword(@RequestBody @Valid UserChangePasswordDTO userChangePasswordDTO) {
        userService.changePassword(userChangePasswordDTO);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody @Valid RegisterDTO data) {
        if(userService.register(data) == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/recover-password")
    public ResponseEntity<Void> recoverPassword(@RequestBody @Valid UserRecoverDTO userRecoverDTO) {
        userService.recoverPassword(userRecoverDTO.email());
        return ResponseEntity.ok().build();
    }
}
