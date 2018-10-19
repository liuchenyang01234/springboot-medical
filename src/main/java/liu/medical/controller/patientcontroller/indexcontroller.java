package liu.medical.controller.patientcontroller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/patient")
public class indexcontroller {

    @RequestMapping(value = "/info")
    public String loginhandele1()
    {
        System.out.println("进来了");

        return "info";
    }
}
