package top.flywen.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import okhttp3.*;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import scala.util.parsing.json.JSON;
import top.flywen.model.base.Result;
import top.flywen.model.domain.HorsePay;
import top.flywen.model.entity.IcUser;
import top.flywen.service.OrderService;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/money")
public class MoneyController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/pay")
    public Result pay(
            @RequestParam("orderNumber") String orderNumber,
            @RequestParam("date") String date,
            @RequestParam("time") String time,
            @RequestParam("price") String price
            ) {
        HorsePay horsePay = new HorsePay();
        horsePay.setDate(date);
        horsePay.setTime(time);
        horsePay.setStoreID("ice-cream-id");
        IcUser principal = (IcUser) SecurityUtils.getSubject().getPrincipal();
        horsePay.setCustomerID("ice-cream-customer-" + principal.getId());
        horsePay.setTimeZone("GMT");
        horsePay.setTransactionAmount(price);
        horsePay.setCurrencyCode("GBP");
        this.doPost("http://homepages.cs.ncl.ac.uk/daniel.nesbitt/CSC8019/HorsePay/HorsePay.php", horsePay, orderNumber);
        return new Result(true,"success",null);
    }
    public String doPost(String url, HorsePay horsePay, String orderNumber) {
        OkHttpClient okHttpClient  = new OkHttpClient.Builder()
                .connectTimeout(10, TimeUnit.SECONDS)
                .writeTimeout(10,TimeUnit.SECONDS)
                .readTimeout(20, TimeUnit.SECONDS)
                .build();

        ObjectMapper objectMapper = new ObjectMapper();
        String json = null;
        try {
            json = objectMapper.writeValueAsString(horsePay);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            json = "";
        }
        RequestBody requestBody = FormBody.create(MediaType.parse("application/json; charset=utf-8")
                , json);

        Request request = new Request.Builder()
                .url(url)//请求的url
                .post(requestBody)
                .build();

        Call call = okHttpClient.newCall(request);
        call.enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                System.out.println("connection failure");
            }
            @Override
            public void onResponse(Call call, Response response) throws IOException {
                String string = response.body().string();
                if(string.indexOf("payment successful") != -1) {
                    orderService.payOrder(orderNumber);
                    System.out.println(response.body().string());
                }
            }
        });
        return "success";
    }
}
