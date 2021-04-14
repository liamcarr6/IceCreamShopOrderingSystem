package top.flywen.config.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.shiro.web.filter.authz.PermissionsAuthorizationFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import top.flywen.model.base.Result;
import top.flywen.model.code.CodeEnums;

import javax.servlet.ServletOutputStream;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AjaxAuthorizationFilter extends PermissionsAuthorizationFilter {
    @Override
    protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws IOException {
        HttpServletResponse response1= (HttpServletResponse) response;
        ServletOutputStream outputStream = response.getOutputStream();
        Result result=new Result();
        try{

            result.setFlag(false);
            result.setMessage(CodeEnums.USER_ROLE_LIMIT.getMsg());
            result.setCode(CodeEnums.USER_ROLE_LIMIT.getCode());
            ObjectMapper objectMapper = new ObjectMapper();
            byte[] bytes = objectMapper.writeValueAsString(result).getBytes();
            response.setCharacterEncoding("utf-8");
            response.setContentType("application/json");
            outputStream.write(bytes);
        }catch (Exception e){

        }finally {
            if(null!=outputStream){
                outputStream.flush();
                outputStream.close();
            }
        }
        return false;
    }
    @Bean
    public FilterRegistrationBean registration(AjaxAuthorizationFilter filter) {
        FilterRegistrationBean registration = new FilterRegistrationBean(filter);
        registration.setEnabled(false);
        return registration;
    }
}
