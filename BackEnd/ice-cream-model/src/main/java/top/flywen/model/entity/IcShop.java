package top.flywen.model.entity;

import lombok.Data;

import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Data
@Table
public class IcShop {
    @Id
    private Integer id;
    private String name;
    private Date openingHour;
    private Date closingHour;
    private String address;
}
