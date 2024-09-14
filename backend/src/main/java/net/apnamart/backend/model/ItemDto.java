package net.apnamart.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Blob;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ItemDto {

    private Long i_id;

    private String i_name;

    private Long i_price;

    private String i_image_path;

    private String i_type;

    private Long i_quantity;

    private String i_description;

    private Boolean i_availability;

}
