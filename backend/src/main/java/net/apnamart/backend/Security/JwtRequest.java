package net.apnamart.backend.Security;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class JwtRequest {

    private String a_email;

    private String a_pass;

    private String u_email;

    private String u_pass;

}
