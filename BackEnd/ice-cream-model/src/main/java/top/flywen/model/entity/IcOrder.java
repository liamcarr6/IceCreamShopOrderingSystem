package top.flywen.model.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Table;
import java.util.Date;

@Table
@Data
public class IcOrder {
    private Integer id;
    private String orderNumber;
    private Integer userId;
    private Integer addressId;
    private String contact;
    private Integer priceId;
    private Integer iceCreamId;
    private Integer type;
    @Column(name = "delivery_id")
    private Integer deliveryId;
    private Integer payed;
    private String address;
    private Date addTime;
    private Date updateTime;
}
