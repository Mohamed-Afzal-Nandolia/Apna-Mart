package net.apnamart.backend.model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubCategoryDto {

    private Long sc_id;

    private String sc_name;
}
