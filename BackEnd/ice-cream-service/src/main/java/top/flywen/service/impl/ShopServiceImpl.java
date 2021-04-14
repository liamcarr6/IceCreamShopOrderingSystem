package top.flywen.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import top.flywen.dao.mapper.ShopMapper;
import top.flywen.model.entity.IcShop;
import top.flywen.service.ShopService;

@Service
public class ShopServiceImpl implements ShopService {
    @Autowired
    private ShopMapper shopMapper;
    @Override
    public IcShop getShopInfo() {
        IcShop icShop = shopMapper.selectByPrimaryKey(Integer.valueOf(1));
        return icShop;
    }
}
