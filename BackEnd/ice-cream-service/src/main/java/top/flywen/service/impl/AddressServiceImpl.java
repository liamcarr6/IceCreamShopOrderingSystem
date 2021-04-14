package top.flywen.service.impl;

import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import top.flywen.dao.mapper.AddressMapper;
import top.flywen.model.entity.IcAddress;
import top.flywen.model.entity.IcUser;
import top.flywen.service.AddressService;

import java.util.List;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressMapper addressMapper;
    @Override
    public IcAddress addAddress(IcAddress address) {
        IcUser user = (IcUser) SecurityUtils.getSubject().getPrincipal();
        Integer id = user.getId();
        address.setUserId(id);
        Double miles = Math.random() * 10;
        address.setMile(miles);
        if(miles <= 5) {
            address.setValid(1);
        }else {
            address.setValid(0);
        }
        int insert = addressMapper.insert(address);
        if(insert != 1) {
            address = null;
        }
        return address;
    }

    @Override
    public List<IcAddress> listAddress() {
        IcUser user = (IcUser) SecurityUtils.getSubject().getPrincipal();
        Integer id = user.getId();
        IcAddress icAddress = new IcAddress();
        icAddress.setUserId(id);
        List<IcAddress> select = addressMapper.select(icAddress);
        return select;
    }
}
