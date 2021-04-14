package top.flywen.service.impl;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import top.flywen.dao.mapper.UserMapper;
import top.flywen.model.entity.IcUser;
import top.flywen.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private UserMapper userMapper;
    @Override
    public IcUser findUserByName(String name) {
        IcUser user = new IcUser();
        user.setUserName(name);
        IcUser result = userMapper.selectOne(user);
        return result;
    }

    @Override
    public IcUser login(IcUser user) {
        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken token = new UsernamePasswordToken();
        token.setUsername(user.getUserName());
        token.setPassword(user.getPassword().toCharArray());
        try{
            subject.login(token);
            user = (IcUser) SecurityUtils.getSubject().getPrincipal();
        }catch (Exception e) {
            SecurityUtils.getSubject().logout();
            user = null;
        }
        return user;
    }

    @Override
    public IcUser register(IcUser user) {
        String hashpw = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
        IcUser userByName = this.findUserByName(user.getUserName());
        if(userByName == null) {
            user.setSalt(hashpw);
            userMapper.insert(user);
            return user;
        }
        return userByName;
    }
}
