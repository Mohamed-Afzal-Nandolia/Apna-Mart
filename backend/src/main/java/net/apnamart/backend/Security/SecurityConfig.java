package net.apnamart.backend.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {
    @Autowired
    private JwtAuthenticationEntryPoint point;

    @Autowired
    private JwtAuthenticationFilter filter;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf(csrf -> csrf.disable())
                .authorizeRequests()
                .requestMatchers("/test").authenticated()
                .requestMatchers("/api/sms/send", "/api/item/by-category/*", "/api/item/by-subcategory/*",//"/category/*","/category/sub-category/*",
                        "/api/item/filter", "/api/item/filter-items/*",
                        "/api/amount/*", "/api/test-email","/api/user/*","/auth/*",
                        "/auth/admin/*", "/auth/user/*", "/api/item/all-items",
                        "/images/*", "/api/item/*").permitAll() // dont need authentication
                //auth/login in future should be use to directly login without explicitly login via credentials
                .anyRequest().authenticated()
                .and().exceptionHandling(ex -> ex.authenticationEntryPoint(point))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }


}
