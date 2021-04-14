package top.flywen.service;

import top.flywen.model.entity.IcAddress;

import java.util.List;

public interface AddressService {
    IcAddress addAddress(IcAddress address);

    List<IcAddress> listAddress();
}
