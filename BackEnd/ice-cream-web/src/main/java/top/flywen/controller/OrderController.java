package top.flywen.controller;

import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import top.flywen.model.base.Result;
import top.flywen.model.domain.DeliveryInfo;
import top.flywen.model.domain.OrderInfo;
import top.flywen.model.entity.IcOrder;
import top.flywen.model.entity.IcUser;
import top.flywen.service.OrderService;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/ice-cream")
    public Result order(@RequestBody IcOrder order) {
        IcUser user = (IcUser) SecurityUtils.getSubject().getPrincipal();
        order.setOrderNumber(String.valueOf(new Date().getTime()));
        order.setUserId(user.getId());
        order.setPayed(0);
        IcOrder newOrder = orderService.addOrder(order);
        Result result = new Result(false,"order failure",order);
        if(newOrder != null) {
            result = new Result(true,"order success", newOrder);
        }
        return result;
    }

    @GetMapping("/profile")
    public Result profile(@RequestParam("type") String type) {
        List<OrderInfo> orderProfile = orderService.getOrderProfile(type);
        return  new Result(true,"success",orderProfile);
    }

    @GetMapping("/schedule")
    public Result schedule() {
        List<DeliveryInfo> schedule = orderService.getSchedule();
        return new Result(true,"success",schedule);
    }
    @GetMapping("/list")
    public Result list() {
        List<OrderInfo> orderInfos = orderService.listByUserId();
        return  new Result(true,"success",orderInfos);
    }
}
