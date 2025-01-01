package net.apnamart.backend.controller;

import lombok.AllArgsConstructor;
import net.apnamart.backend.exception.AmountExceedsIntegerValueException;
import net.apnamart.backend.model.AdminDto;
import net.apnamart.backend.service.AdminService;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/admin/details")
    public ResponseEntity<AdminDto> getAdminByEmail(@RequestParam("email") String email) {
        AdminDto adminDto = adminService.getAdminByEmail(email);
        return ResponseEntity.ok(adminDto);
    }


    @GetMapping("/amount/{id}")
    public ResponseEntity<Integer> getAmount(@PathVariable("id") Long id){
        Integer amount = adminService.getAmount(id);
        return ResponseEntity.ok(amount);
    }

    @PutMapping("/amount/update/{id}")
    public ResponseEntity<AdminDto> updateAmount(@PathVariable("id") Long id, @RequestBody String amount){
        try {
            Integer parsedAmount = Integer.parseInt(amount);
            AdminDto adminDto = adminService.updateAmount(id, parsedAmount);
            return ResponseEntity.ok(adminDto);
        } catch (NumberFormatException e) {
            throw new AmountExceedsIntegerValueException("The amount exceeds the integer allowable value");
        }
    }

    @PostMapping("/amount/create/{id}")
    public ResponseEntity<AdminDto> createAmount(@PathVariable Long id, @RequestBody String amount) {
        try {
            Integer parsedAmount = Integer.parseInt(amount);
            AdminDto adminDto = adminService.createAmount(id, parsedAmount);
            return ResponseEntity.ok(adminDto);
        } catch (NumberFormatException e) {
            throw new AmountExceedsIntegerValueException("The amount exceeds the integer allowable value");
        }
    }

}
