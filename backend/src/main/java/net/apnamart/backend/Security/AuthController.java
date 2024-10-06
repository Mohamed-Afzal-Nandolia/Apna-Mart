package net.apnamart.backend.Security;

import net.apnamart.backend.entity.Admin;
import net.apnamart.backend.model.AdminDto;
import net.apnamart.backend.model.UserDto;
import net.apnamart.backend.repository.AdminRepository;
import net.apnamart.backend.repository.UserRepository;
import net.apnamart.backend.service.AdminService;
import net.apnamart.backend.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.security.Principal;

@CrossOrigin("*")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private JwtHelper helper;

    @Autowired
    private AppConfig appConfig;

    @Autowired
    private AdminService adminService;

    @Autowired
    private UserService userService;

    private Logger logger = LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/admin/login")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request) {

        this.doAuthenticate(request.getA_email(), request.getA_pass());

        Admin admin = adminRepository.findByEmail(request.getA_email());

        UserDetails user = User.builder().username(admin.getA_name()).password(admin.getA_pass()).build();
        new InMemoryUserDetailsManager(user);
//        UserDetails userDetails = userDetailsService.loadUserByUsername(admin.getA_name());
        String token = this.helper.generateToken(user);

        JwtResponse response = JwtResponse.builder()
                .JwtToken(token)
                .a_name(user.getUsername()).build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //POST - create admin
    @PostMapping("/admin/signup")
    public ResponseEntity<AdminDto> createAdmin(@RequestBody AdminDto adminDto){
        AdminDto savedAdmin = adminService.createAdmin(adminDto);
        return new ResponseEntity<>(savedAdmin, HttpStatus.CREATED);
    }

    private void doAuthenticate(String a_email, String a_pass) {

        BCryptPasswordEncoder bCrypt = new BCryptPasswordEncoder();
        Admin admin = adminRepository.findByEmail(a_email);
        if(admin != null && bCrypt.matches(a_pass, admin.getA_pass())){
            System.out.println("INSIDE DOAUTHENTICATION LINE NUMBER 66");
        }
        else{
            throw new BadCredentialsException(" Invalid Username or Password  !!");
        }

    }

    //POST - create admin
    @PostMapping("/user/signup")
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto){
        UserDto savedUser = userService.createUser(userDto);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

//    @PostMapping("/user/login")
//    public ResponseEntity<UserDto> loginIn(@RequestBody UserDto userDto){
//        if(userService.loginIn(userDto)){
//            return ResponseEntity.ok(userDto);
//        }
//        return new ResponseEntity<>(userDto, HttpStatus.NOT_FOUND);
//
//    }

    @PostMapping("/user/login")
    public ResponseEntity<JwtResponse> loginIn(@RequestBody JwtRequest request) {

        // Authenticate the user (assuming you have an authentication method)
        this.doAuthenticate(request.getU_email(), request.getU_pass());

        // Fetch the user from the database using email
        net.apnamart.backend.entity.User user = userRepository.findByEmail(request.getU_email());

        // Build UserDetails object for JWT
        UserDetails userDetails = User.builder()
                .username(user.getU_name())
                .password(user.getU_pass())
                .build();

        // Generate JWT token
        String token = this.helper.generateToken(userDetails);

        // Create a JwtResponse object with the name and token
        JwtResponse response = JwtResponse.builder()
                .JwtToken(token)
                .u_name(user.getU_name())
                .build();

        // Return the response
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    /*
     @PostMapping("/admin/login")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request) {

        this.doAuthenticate(request.getA_email(), request.getA_pass());

        Admin admin = adminRepository.findByEmail(request.getA_email());

        UserDetails user = User.builder().username(admin.getA_name()).password(admin.getA_pass()).build();
        new InMemoryUserDetailsManager(user);
//        UserDetails userDetails = userDetailsService.loadUserByUsername(admin.getA_name());
        String token = this.helper.generateToken(user);

        JwtResponse response = JwtResponse.builder()
                .JwtToken(token)
                .a_name(user.getUsername()).build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }*/

    //Principal represents the current user
    @GetMapping("/home/current-user")
    public String getLoggedInUser(Principal principal){
        return principal.getName();
    }

    @ExceptionHandler(BadCredentialsException.class)
    public String exceptionHandler() {
        return "Credentials Invalid !!";
    }


    @GetMapping("/home")
    public String getLoggedInUser(){
        return "HELLO";
    }

}