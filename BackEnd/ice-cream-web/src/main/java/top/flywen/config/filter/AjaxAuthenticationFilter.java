package top.flywen.config.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import top.flywen.model.base.Result;
import top.flywen.model.code.CodeEnums;

import javax.servlet.ServletOutputStream;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

public class AjaxAuthenticationFilter extends FormAuthenticationFilter {
    @Override
    protected boolean onAccessDenied(ServletRequest servletRequest, ServletResponse servletResponse) throws Exception {
        HttpServletResponse response= (HttpServletResponse) servletResponse;
        ServletOutputStream writer = response.getOutputStream();
        Result result=new Result();
        try{
            result.setFlag(false);
            result.setMessage(CodeEnums.USESR_EXPIRE_OUT.getMsg());
            result.setCode(CodeEnums.USESR_EXPIRE_OUT.getCode());
            ObjectMapper objectMapper = new ObjectMapper();
            byte[] bytes = objectMapper.writeValueAsString(result).getBytes();
            response.setCharacterEncoding("utf-8");
            response.setContentType("application/json");
            writer.write(bytes);
        }catch (Exception e){
        }finally {
            if(null!=writer){
                writer.flush();
                writer.close();
            }
        }
        return false;
    }

    @Bean
    public FilterRegistrationBean registration(AjaxAuthenticationFilter filter) {
        FilterRegistrationBean registration = new FilterRegistrationBean(filter);
        registration.setEnabled(false);
        return registration;
    }
}
