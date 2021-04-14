package top.flywen.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import top.flywen.dao.mapper.DeliveryMapper;
import top.flywen.model.entity.IcDelivery;
import top.flywen.service.DeliveryService;

import java.util.List;

@Service
public class DeliveryServiceImpl implements DeliveryService {

    @Autowired
    private DeliveryMapper deliveryMapper;
    @Override
    public List<IcDelivery> getAllDelivery() {
        List<IcDelivery> deliveries = deliveryMapper.selectAll();
        return  deliveries;
    }
}
