package top.flywen.model.domain;

import lombok.Data;
import top.flywen.model.entity.IcDelivery;

import java.util.List;
@Data
public class DeliveryInfo extends IcDelivery {
    private List<OrderInfo> lists;
}
