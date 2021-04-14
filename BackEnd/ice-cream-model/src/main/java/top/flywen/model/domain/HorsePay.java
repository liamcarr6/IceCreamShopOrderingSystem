package top.flywen.model.domain;

import lombok.Data;

@Data
public class HorsePay {
    private String storeID;
    private String customerID;
    private String date;
    private String time;
    private String timeZone;
    private String transactionAmount;
    private String currencyCode;
}
