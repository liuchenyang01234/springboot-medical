package liu.medical.configure;

import java.text.ParseException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Date;

public class hello {
    public static void main(String[] args) throws ParseException {
         SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        Date now = new Date();
        String time = sdf.format(now);
        System.out.println(time);
       // ParsePosition pos = new ParsePosition(0);
        //Date date=sdf.parse(time);
       // System.out.println(date);
     //   java.sql.Date dateTime = new java.sql.Date(now);//sql类型


    }
}
