package top.flywen.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import top.flywen.model.base.Result;
import top.flywen.model.entity.IcAddress;
import top.flywen.service.AddressService;

import java.util.List;

@RestController
@RequestMapping("/address")
public class AddressController {

    @Autowired
    private AddressService addressService;
    @PostMapping("/add")
    public Result addAddress(@RequestBody IcAddress address) {
        IcAddress newAddress = addressService.addAddress(address);
        Result result = new Result(false,"failure",newAddress);
        if(newAddress != null) {
            result.setFlag(true);
            result.setMessage("success");
        }
        return result;
    }
    @GetMapping("/list")
    public Result listAddress() {
        List<IcAddress> icAddresses = addressService.listAddress();
        return new Result(true,"success",icAddresses);
    }
}
