package net.apnamart.backend.Security;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class JwtResponse {

    private String JwtToken;

    private String a_name;
}
