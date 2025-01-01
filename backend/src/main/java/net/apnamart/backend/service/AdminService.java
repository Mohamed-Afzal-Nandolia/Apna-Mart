package net.apnamart.backend.service;

import net.apnamart.backend.model.AdminDto;

import java.util.List;

public interface AdminService {

    public AdminDto createAdmin(AdminDto adminDto);

    public AdminDto updateAdmin(Long id, AdminDto adminDto);

    public void deleteAdmin(Long id);

    public AdminDto getUserById(Long id);

    public List<AdminDto> getAllAdmin();

    public Boolean loginIn(AdminDto dto);

    public Integer getAmount(Long id);

    public AdminDto updateAmount(Long id, Integer amount);

    public AdminDto createAmount(Long id, Integer amount);

    public AdminDto getAdminByEmail(String email);

}
