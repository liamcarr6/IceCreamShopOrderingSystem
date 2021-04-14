package top.flywen.dao.mapper;

import org.apache.ibatis.annotations.Param;
import tk.mybatis.mapper.common.BaseMapper;
import top.flywen.model.domain.OrderInfo;
import top.flywen.model.entity.IcOrder;

import java.util.List;


public interface OrderMapper extends BaseMapper<IcOrder> {
    List<OrderInfo> getOrderProfile(@Param("type") String type);
    IcOrder getLastOrder();
    List<OrderInfo> getSchedule(@Param("deliveryId") Integer deliveryId);
    List<OrderInfo> getOrderList(@Param("userId") Integer userId);

    void pay(@Param("orderNumber") String orderNumber);
}
