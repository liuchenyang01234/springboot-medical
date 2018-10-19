package liu.medical.configure;
import liu.medical.dao.userToken;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;
import liu.medical.service.usertokenManager;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Configuration
public class Patientinterceptor implements HandlerInterceptor {
    //在方法执行前
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
       // String token=request.getHeader("token");
        String cookief=request.getHeader("cookie");
        Cookie[] cookies=request.getCookies();
        String token="";
       for(Cookie cookie:cookies)
       {
           if(cookie.getName().equals("token"))
               token=cookie.getValue();
       }
        Map<String, userToken> map=usertokenManager.getmap();
        Integer type_id=usertokenManager.gettype_Id(token);
        System.out.println("type_id==null "+type_id==null);
       /*if(type_id==null)
            return false;*/
        System.out.println("type_id==null "+type_id==null);
       // type_id=usertokenManager.getUserId(token);
        //String type_id=request.getHeader("type_id");
        System.out.println();
        System.out.println("token   "+token+"   type_id   "+type_id);
        System.out.println("token   "+token+"   type_id   "+type_id);
        if(token!=null&&type_id.compareTo(1)==0)
        {
            System.out.println("验证成功");
            return true;
        }
        else
        {
            System.out.println("请登录");
            request.setAttribute("msg","请登陆");
            //配置拦截器  返回到login界面
            request.getRequestDispatcher("/login.html").forward(request,response);
            return false;
        }

    }
}
