package top.flywen.service;

import top.flywen.model.entity.IcUser;

import java.util.List;

public interface UserService {
    List<IcUser> getAllUser();

    Boolean judgeUser(String userName);
}
