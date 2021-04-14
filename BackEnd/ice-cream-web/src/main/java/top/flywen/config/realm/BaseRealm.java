package top.flywen.config.realm;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;
import top.flywen.model.entity.IcUser;
import top.flywen.service.AuthService;

public class BaseRealm extends AuthorizingRealm {

    private static final String USER_INFO  = "user_info";
    @Autowired
    private AuthService authService;

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        UsernamePasswordToken usernamePasswordToken = (UsernamePasswordToken) authenticationToken;
        String username = usernamePasswordToken.getUsername();
        IcUser user = null;
        user = authService.findUserByName(username);
        if(user == null) {
            throw new UnknownAccountException();
        }
        ByteSource bytes = ByteSource.Util.bytes(user.getSalt());
        SimpleAuthenticationInfo simpleAuthenticationInfo = new SimpleAuthenticationInfo(user,user.getSalt(),bytes,getName());
        SecurityUtils.getSubject().getSession().setAttribute(USER_INFO, user);
        return simpleAuthenticationInfo;
    }

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        return null;
    }
}
