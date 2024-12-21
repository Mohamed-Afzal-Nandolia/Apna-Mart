package net.apnamart.backend.Security;

import net.apnamart.backend.entity.Admin;
import net.apnamart.backend.repository.AdminRepository;
import net.apnamart.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AppConfig {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private UserRepository userRepository;

    @Bean
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String a_name) throws UsernameNotFoundException {
                Admin admin = adminRepository.findByA_name(a_name);
                net.apnamart.backend.entity.User user = userRepository.findByU_name(a_name);
                if (admin == null && user == null) {
                    throw new UsernameNotFoundException("User or Admin not found");
                }
                if (admin == null){
                    return User.withUsername(user.getU_name())
                            .password(user.getU_pass())
                            .build();
                }
                return User.withUsername(admin.getA_name())
                        .password(admin.getA_pass())
                        .build();
            }
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
