package net.apnamart.backend.controller;

import lombok.AllArgsConstructor;
import net.apnamart.backend.model.AdminDto;
import net.apnamart.backend.service.AdminService;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/")
public class AdminController {

    private AdminService adminService;


    //PUT - update admin
    @PutMapping("{id}")
    public ResponseEntity<AdminDto> updateAdmin(@PathVariable("id") Long id, @RequestBody AdminDto adminDto){
        AdminDto adminObj = adminService.updateAdmin(id, adminDto);
        return ResponseEntity.ok(adminObj);
    }

    //DELETE - delete admin
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteAdmin(@PathVariable("id") Long id){
        adminService.deleteAdmin(id);
        return ResponseEntity.ok("User Deleted Successfully!");
    }

    // GET - admin get
    @GetMapping("/{id}")
    public ResponseEntity<AdminDto> getUserById(@PathVariable("id") Long id){
        AdminDto adminDto = adminService.getUserById(id);
        return ResponseEntity.ok(adminDto);
    }

    @GetMapping
    public ResponseEntity<List<AdminDto>> getAllAdmin(){
        List<AdminDto> allAdmin = adminService.getAllAdmin();
        return ResponseEntity.ok(allAdmin);
    }

}
