package net.apnamart.backend.Security;

import net.apnamart.backend.entity.Admin;
import net.apnamart.backend.repository.AdminRepository;
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

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private JwtHelper helper;

    @Autowired
    private AppConfig appConfig;

    private Logger logger = LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/login")
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