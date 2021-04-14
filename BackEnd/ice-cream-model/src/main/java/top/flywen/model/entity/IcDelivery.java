package top.flywen.model.entity;

import lombok.Data;

import javax.persistence.Id;
import javax.persistence.Table;

@Table
@Data
public class IcDelivery {
    @Id
    private Integer id;
    private String workId;
    private String name;
}
