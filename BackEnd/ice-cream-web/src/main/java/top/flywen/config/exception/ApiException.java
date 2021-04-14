package top.flywen.config.exception;

import top.flywen.model.code.CodeEnums;

public class ApiException extends RuntimeException {
    private static final long serialVersionUID = -6854892225341656629L;
    private Integer code;
    private String errMsg;
    private Object data;

    public ApiException(Integer code, String errMsg) {
        super(errMsg);
        this.code = code;
        this.errMsg = errMsg;
    }

    public ApiException(Integer code, String errMsg, Object data) {
        super(errMsg);
        this.code = code;
        this.errMsg = errMsg;
        this.data = data;
    }

    public ApiException(CodeEnums codeEnums) {
        super(codeEnums.getMsg());
        this.code = codeEnums.getCode();
        this.errMsg = codeEnums.getMsg();
    }

    public ApiException(CodeEnums codeEnums, Object data) {
        super(codeEnums.getMsg());
        this.code = codeEnums.getCode();
        this.errMsg = codeEnums.getMsg();
        this.data = data;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getErrMsg() {
        return errMsg;
    }

    public void setErrMsg(String errMsg) {
        this.errMsg = errMsg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
