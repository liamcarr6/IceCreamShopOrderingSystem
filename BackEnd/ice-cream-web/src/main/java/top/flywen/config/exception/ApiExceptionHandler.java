package top.flywen.config.exception;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import top.flywen.model.base.Result;
import top.flywen.model.code.CodeEnums;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(value = Exception.class)
    public Result errorHandle(Throwable ee) {
        Exception e = (Exception) ee;
        Result result = new Result();
        if (e instanceof ApiException) {
            ApiException ae = (ApiException)e;
            result.setFlag(false);
            result.setCode(ae.getCode());
            result.setMessage(ae.getMessage());
            result.setData(ae.getData());
            return result;
        }
        result.setCode(CodeEnums.SYSTEM_ERR.getCode());
        result.setMessage(CodeEnums.SYSTEM_ERR.getMsg());
        result.setFlag(false);
        return result;
    }
}
