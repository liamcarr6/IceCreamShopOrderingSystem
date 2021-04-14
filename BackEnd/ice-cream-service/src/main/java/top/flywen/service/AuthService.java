package top.flywen.service;

import org.springframework.stereotype.Service;
import top.flywen.model.entity.IcUser;

@Service
public interface AuthService {
    IcUser findUserByName(String name);
    IcUser login(IcUser user);
    IcUser register(IcUser user);
}
