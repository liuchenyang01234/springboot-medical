package liu.medical.service;

import liu.medical.Util.CharUtil;
import liu.medical.dao.userToken;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

public class usertokenManager {
    //用token 存user
    private static Map<String, userToken> tokenMap = new HashMap<>();

    public static Map<String, userToken> getmap() {
        return tokenMap;
    }
    public static Integer getUserId(String token) {
        userToken userToken = tokenMap.get(token);
        if(userToken == null){
            return null;
        }
        //判断是否失效
        if(userToken.getExpireTime().isBefore(LocalDateTime.now())){
            tokenMap.remove(token);
            return null;
        }
        return userToken.getUserId();
    }
    public static Integer gettype_Id(String token) {
        userToken userToken = tokenMap.get(token);
        if(userToken == null){
            return null;
        }
        return userToken.getType_id();
    }

    public static userToken generateToken(Integer id,Integer type_id){
        userToken userToken = null;
        //随机生成token
        String token = CharUtil.getRandomString(32);
        while (tokenMap.containsKey(token)) {
            token = CharUtil.getRandomString(32);
        }
        //设置失效时间
        LocalDateTime update = LocalDateTime.now();
        LocalDateTime expire = update.plusDays(1);
        userToken = new userToken();
        userToken.setToken(token);
        userToken.setType_id(type_id);
        userToken.setUpdateTime(update);
        userToken.setExpireTime(expire);
        userToken.setUserId(id);
        tokenMap.put(token, userToken);
        return userToken;
    }
}
