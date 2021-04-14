package top.flywen.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import top.flywen.dao.mapper.UserMapper;
import top.flywen.model.entity.IcUser;
import top.flywen.service.UserService;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;
    @Override
    public List<IcUser> getAllUser() {
        List<IcUser> users = userMapper.selectAll();
        return  users;
    }

    @Override
    public Boolean judgeUser(String userName) {
        IcUser icUser = new IcUser();
        icUser.setUserName(userName);
        List<IcUser> select = userMapper.select(icUser);
        if(select != null && select.size() > 0) {
            return false;
        }
        return true;
    }
}
