package liu.medical.configure;

import org.springframework.context.annotation.Configuration;

import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebSecurityConfig implements WebMvcConfigurer {

    public void addInterceptors(InterceptorRegistry registry)
    {
        //拦截的请求   放行的请求   必须加/  否则会出各种错误
        //springboot已经做好静态资源的拦截
        //  注册拦截器到Spring Mvc机制
        InterceptorRegistration ir= registry.addInterceptor(new Patientinterceptor());
        //指定拦截匹配模式，限制拦截器拦截请求
        ir.addPathPatterns("/patient/**");
	               /* registry.addInterceptor(new loginHandlerInterceptor()).addPathPatterns("/*")
	                        .excludePathPatterns("/login.html","/","/user/login","/index");*/
    }
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // super.addViewControllers(registry);
        //浏览器发送 /atguigu 请求来到 success
        registry.addViewController("/login/**").setViewName("/login.html");
    }
}

