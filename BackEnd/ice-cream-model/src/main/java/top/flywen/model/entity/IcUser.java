package top.flywen.model.entity;

import lombok.Data;

import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Table
public class IcUser {
    @Id
    private Integer id;
    private String userTel;
    private String userName;
    private String password;
    private Integer isAdmin;
    private String salt;
}
