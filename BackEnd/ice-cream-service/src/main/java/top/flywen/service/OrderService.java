package top.flywen.service;

import top.flywen.model.domain.DeliveryInfo;
import top.flywen.model.domain.OrderInfo;
import top.flywen.model.entity.IcOrder;

import java.util.List;

public interface OrderService {
    IcOrder addOrder(IcOrder order);
    List<OrderInfo> getOrderProfile(String type);
    IcOrder getLastOrder();

    List<DeliveryInfo> getSchedule();

    List<OrderInfo> listByUserId();

    void payOrder(String orderNumber);
}
