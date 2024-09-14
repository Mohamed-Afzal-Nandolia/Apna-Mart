package net.apnamart.backend.service;

import net.apnamart.backend.model.AdminDto;
import net.apnamart.backend.model.UserDto;

import java.util.List;

public interface UserService {

    public UserDto createUser(UserDto userDto);

    public UserDto updateUser(Long id, UserDto userDto);

    public void deleteUser(Long id);

    public UserDto getUserById(Long id);

    public List<UserDto> getAllUsers();

    public Boolean loginIn(UserDto dto);

}
