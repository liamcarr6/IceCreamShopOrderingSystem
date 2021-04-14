package top.flywen.model.code;

public enum CodeEnums {

    SUCCESS(0, "operate success"),
    SYSTEM_ERR(1, "system error"),
    PARA_ERR(2, "params error"),
    USESR_EXPIRE_OUT(10010, "login expired"),
    USER_ROLE_LIMIT(1008, "permission not allowed");
    private Integer code;
    private String msg;

    CodeEnums(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
