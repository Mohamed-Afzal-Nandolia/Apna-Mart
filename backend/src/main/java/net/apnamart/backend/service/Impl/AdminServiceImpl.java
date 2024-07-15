package net.apnamart.backend.service.Impl;

import lombok.AllArgsConstructor;
import net.apnamart.backend.entity.Admin;
import net.apnamart.backend.exception.ResourceNotFoundException;
import net.apnamart.backend.model.AdminDto;
import net.apnamart.backend.repository.AdminRepository;
import net.apnamart.backend.service.AdminService;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AdminServiceImpl implements AdminService {

    private AdminRepository adminRepository;
    @Override
    public AdminDto createAdmin(AdminDto adminDto) {
        ModelMapper modelMapper = new ModelMapper();
        BCryptPasswordEncoder bCrypt = new BCryptPasswordEncoder();//encoding the password
        String encryptedPassword = bCrypt.encode(adminDto.getA_pass());
        Admin admin = modelMapper.map(adminDto, Admin.class);
        admin.setA_pass(encryptedPassword);//saving the password

        Admin savedAdmin = adminRepository.save(admin);
        return modelMapper.map(admin, AdminDto.class);
    }

    @Override
    public AdminDto updateAdmin(Long id, AdminDto updateAdmin) {
        ModelMapper modelMapper = new ModelMapper();

        Admin admin = adminRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Admin Does not exists with id: " + id));
        admin.setA_email(updateAdmin.getA_email());
        admin.setA_pass(updateAdmin.getA_pass());

        Admin updatedAdmin = adminRepository.save(admin);
        return modelMapper.map(updatedAdmin, AdminDto.class);
    }

    @Override
    public void deleteAdmin(Long id) {
        Admin admin = adminRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Admin Does not exists with id: " + id));
        adminRepository.deleteById(id);
    }

    @Override
    public AdminDto getUserById(Long id) {
        ModelMapper modelMapper = new ModelMapper();
        Admin admin = adminRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Admin Does not exists with id: " + id));
        return modelMapper.map(admin, AdminDto.class);
    }

    @Override
    public List<AdminDto> getAllAdmin() {
        ModelMapper modelMapper = new ModelMapper();
        List<Admin> admins = adminRepository.findAll();
        return admins.stream().map((admin) -> modelMapper.map(admin, AdminDto.class)).collect(Collectors.toList());
    }

    @Override
    public Boolean loginIn(AdminDto dto) {
        BCryptPasswordEncoder bCrypt = new BCryptPasswordEncoder();

        Admin admin = adminRepository.findByEmail(dto.getA_email());
        if(admin != null && bCrypt.matches(dto.getA_pass(), admin.getA_pass())){
            return true;
        }
        return false;
    }
}
