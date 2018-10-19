package liu.medical.dao;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class userToken {
    private Integer userId;
    private String token;
    private Integer type_id;
    private LocalDateTime expireTime;
    private LocalDateTime updateTime;

}
