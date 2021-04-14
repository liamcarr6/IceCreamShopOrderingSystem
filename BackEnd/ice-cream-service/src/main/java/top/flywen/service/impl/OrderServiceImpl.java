package top.flywen.service.impl;

import org.apache.commons.lang3.time.DateUtils;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import top.flywen.dao.mapper.OrderMapper;
import top.flywen.model.domain.DeliveryInfo;
import top.flywen.model.domain.OrderInfo;
import top.flywen.model.entity.IcDelivery;
import top.flywen.model.entity.IcOrder;
import top.flywen.model.entity.IcShop;
import top.flywen.model.entity.IcUser;
import top.flywen.service.DeliveryService;
import top.flywen.service.OrderService;
import top.flywen.service.ShopService;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderMapper orderMapper;
    @Autowired
    private DeliveryService deliveryService;
    @Autowired
    private ShopService shopService;
    @Override
    public IcOrder addOrder(IcOrder order) {
        IcOrder lastOrder = orderMapper.getLastOrder();
        if(lastOrder != null) {
            Integer tmp = (lastOrder.getDeliveryId() + 1) % 3;
            tmp = tmp == 0 ? 3 : tmp;
            order.setDeliveryId(tmp);
        } else {
            order.setDeliveryId(1);
        }
        int insert = orderMapper.insert(order);
        if(insert != 1) {
            return  null;
        }
        return order;
    }

    @Override
    public List<OrderInfo> getOrderProfile(String type) {
        List<OrderInfo> orderProfile = orderMapper.getOrderProfile(type);
        return  orderProfile;
    }

    @Override
    public IcOrder getLastOrder() {
        IcOrder lastOrder = orderMapper.getLastOrder();
        return lastOrder;
    }

    @Override
    public List<DeliveryInfo> getSchedule() {
        Boolean aBoolean = this.timeIsValid();
        System.out.println(aBoolean);
        List<IcDelivery> allDelivery = deliveryService.getAllDelivery();
        List<DeliveryInfo> lists = new ArrayList<>();
        for (IcDelivery delivery : allDelivery) {
            DeliveryInfo deliveryInfo = new DeliveryInfo();
            deliveryInfo.setId(delivery.getId());
            deliveryInfo.setName(delivery.getName());
            deliveryInfo.setWorkId(delivery.getWorkId());
            Integer deliveryId = delivery.getId();
            List<OrderInfo> schedule = orderMapper.getSchedule(deliveryId);
            deliveryInfo.setLists(schedule);
            lists.add(deliveryInfo);
        }
        return lists;
    }

    @Override
    public List<OrderInfo> listByUserId() {
        IcUser principal = (IcUser) SecurityUtils.getSubject().getPrincipal();
        Integer userId = principal.getId();
        List<OrderInfo> orderList = orderMapper.getOrderList(userId);
        return orderList;
    }

    @Override
    public void payOrder(String orderNumber) {
        orderMapper.pay(orderNumber);
    }

    public Boolean timeIsValid() {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("HH:mm:ss");
        String nowStr = simpleDateFormat.format(new Date());
        Date now = null;
        try {
            now = simpleDateFormat.parse(nowStr);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        IcShop shopInfo = shopService.getShopInfo();
        Date closingHour = shopInfo.getClosingHour();
        Date openingHour = shopInfo.getOpeningHour();
        if(now.getTime() >= openingHour.getTime() && now.getTime() <= closingHour.getTime()) {
            return  true;
        }
        return false;
    }
}
