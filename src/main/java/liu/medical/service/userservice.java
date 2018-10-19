package liu.medical.service;


import liu.medical.dao.user;
import liu.medical.dao.userExample;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import liu.medical.mapper.userMapper;

import java.util.List;

@Service
public class userservice {
    @Autowired
    userMapper userMapper;
    public List<user> findUser(String username)
    {
        userExample Example=new userExample();
        Example.or().andNicknameEqualTo(username);
        return userMapper.selectByExample(Example);
    }
    public List<user> findAll(String username)
    {
        userExample Example=new userExample();
        return userMapper.selectByExample(Example);
    }
    public void adduser(user user)
    {
        userMapper.insert(user);
    }


}
