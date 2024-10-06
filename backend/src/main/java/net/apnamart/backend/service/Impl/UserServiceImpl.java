package net.apnamart.backend.service.Impl;

import lombok.AllArgsConstructor;
import net.apnamart.backend.entity.User;
import net.apnamart.backend.exception.ResourceNotFoundException;
import net.apnamart.backend.model.UserDto;
import net.apnamart.backend.repository.UserRepository;
import net.apnamart.backend.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    public UserRepository userRepository;
    @Override
    public UserDto createUser(UserDto userDto) {
        ModelMapper modelMapper = new ModelMapper();
        BCryptPasswordEncoder bCrypt = new BCryptPasswordEncoder();//encoding the password
        String encryptedPassword = bCrypt.encode(userDto.getU_pass());
        User user = modelMapper.map(userDto, User.class);
        user.setU_pass(encryptedPassword);//saving the password

        User savedUser = userRepository.save(user);

        return modelMapper.map(savedUser, UserDto.class);
    }

    @Override
    public UserDto updateUser(Long id, UserDto updateUser) {
        ModelMapper modelMapper = new ModelMapper();

        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User Does not exists with id: " + id));
        user.setU_email(updateUser.getU_email());
        user.setU_pass(updateUser.getU_pass());

        User updatedUser = userRepository.save(user);
        return modelMapper.map(updatedUser, UserDto.class);
    }

    @Override
    public void deleteUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User Does not exists with id: " + id));
        userRepository.deleteById(id);
    }

    @Override
    public UserDto getUserById(Long id) {
        ModelMapper modelMapper = new ModelMapper();
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User Does not exists with id: " + id));
        return modelMapper.map(user, UserDto.class);
    }

    @Override
    public List<UserDto> getAllUsers() {
        ModelMapper modelMapper = new ModelMapper();
        List<User> users = userRepository.findAll();
        return users.stream().map((user) -> modelMapper.map(user, UserDto.class)).collect(Collectors.toList());
    }

    @Override
    public Boolean loginIn(UserDto userdto) {
        BCryptPasswordEncoder bCrypt = new BCryptPasswordEncoder();

        User user = userRepository.findByEmail(userdto.getU_email());
        if(user != null && bCrypt.matches(userdto.getU_pass(), user.getU_pass())){
            return true;
        }
        return false;
    }
}
