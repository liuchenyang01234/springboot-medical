package liu.medical.controller;

import liu.medical.Util.BCryptPasswordEncoder;
import liu.medical.Util.JacksonUtil;
import liu.medical.dao.user;
import liu.medical.dao.userToken;
import liu.medical.service.usertokenManager;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import liu.medical.service.userservice;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import liu.medical.dao.user;
@Controller
public class logincontroller {
    @Autowired
    userservice userservice;
    @RequestMapping(value = "/login.html")
    public String login()
    {
        return "login";
    }

    @ResponseBody
    @RequestMapping(value = "/loginhandle")
    public Object loginhandele(@RequestBody String body)
    {
        System.out.println(body.toString());
        String username = JacksonUtil.parseString(body, "username");
        String password = JacksonUtil.parseString(body, "password");
        if(StringUtils.isEmpty(username) || StringUtils.isEmpty(password)){
            return "用户密码或者为空";
        }
        //根据用户名获得user
        List<user> userList = userservice.findUser(username);
        if(userList.size() == 0){
            return "用户不存在";
        }
        user admin = userList.get(0);
        //解密匹配算法
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        //根据user的id设置token  将long转化为Int
        int userid= new Long(admin.getId()).intValue();
        Integer userId=new Integer(userid);
        //获得类型
        Integer typeId=admin.getTypeId();

        userToken userToken = usertokenManager.generateToken(userId,typeId);
        Object object=new Object();
        HashMap<String,Object> Map=new HashMap();
        Map.put("succ",1);
        Map.put("typeId",typeId);
        Map.put("token",userToken.getToken());
        return  Map;
    }
    @RequestMapping(value = "/register")
 //   public String loginhandele1(@RequestParam ("username")String username,@RequestParam ("password")String password)
    public String register()
    {
        return "register";
    }
    @PostMapping(value = "/register/create")
    @ResponseBody
    //   public String loginhandele1(@RequestParam ("username")String username,@RequestParam ("password")String password)
    public Object registercreate(@RequestBody user user)
    {

        String username = user.getNickname();
        if(username == null){
            return "账号为空";
        }
        //根据用户名获得user
        List<user> userList = userservice.findUser(username);
        if(userList.size() > 0){
            return "账号已经存在";
        }
        String rawPassword = user.getPassword();
        if(rawPassword == null || rawPassword.length() < 6){
            return  "管理员密码长度不能小于6";
        }
        //加密
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encodedPassword = encoder.encode(rawPassword);
        user.setPassword(encodedPassword);
        Date date = new Date();
       // date.getTime() ;
        user.setCreateTime(date);
       //添加数据库
        userservice.adduser(user);
        //此时没有Id  到数据库找
        List<user> userList1 = userservice.findUser(username);
        Integer Id= userList1.get(0).getId().intValue();
        //添加coolie
        userToken userToken = usertokenManager.generateToken(Id,user.getTypeId());
        HashMap<String,Object> Map=new HashMap();
        Map.put("succ",1);
        Map.put("typeId",user.getTypeId());
        Map.put("token",userToken.getToken());
        return  Map;
    }


}
