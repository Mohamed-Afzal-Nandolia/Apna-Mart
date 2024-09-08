package net.apnamart.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private Long u_id;

    private String u_name;

    private String u_email;

    private String u_pass;

    private String u_address;

}