package top.flywen.model.entity;

import lombok.Data;

import javax.persistence.Id;
import javax.persistence.Table;

@Table
@Data
public class IcAddress {
    @Id
    private Integer id;
    private Integer userId;
    private String level1;
    private String level2;
    private String level3;
    private String description;
    private Double mile;
    private Integer valid;
}
