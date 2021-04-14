package top.flywen.model.domain;

import lombok.Data;

@Data
public class OrderInfo {
    private Integer id;
    private String name;
    private String orderNumber;
    private String address;
    private String contact;
    private Double price;
    private String size;
    private Integer type;
    private Integer count;
    private Integer payed;
}
