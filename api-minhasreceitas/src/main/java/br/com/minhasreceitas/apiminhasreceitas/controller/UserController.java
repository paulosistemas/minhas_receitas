package br.com.minhasreceitas.apiminhasreceitas.controller;

import br.com.minhasreceitas.apiminhasreceitas.dto.UserDTO;
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
    public ResponseEntity<UserDTO> getUser(@PathVariable @Valid Integer id) {
        UserDTO userDTO = modelMapper.map(userService.findById(id), UserDTO.class);
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping("edit/{id}")
    public ResponseEntity<UserDTO> editUser(@PathVariable @Valid Integer id, @RequestBody @Valid UserDTO userDTO) {
        User user = userService.editUser(modelMapper.map(userDTO, User.class), id);
        return ResponseEntity.ok(modelMapper.map(user, UserDTO.class));
    }
}
