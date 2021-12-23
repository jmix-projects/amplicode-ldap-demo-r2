package com.amplicode.ldapdemo;


import com.amplicode.ldapdemo.user.AdminUserInitializer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;

@SpringBootApplication
@ConfigurationPropertiesScan
public class AmplicodeLdapDemoR2 {

    public static void main(String[] args) {
        SpringApplication.run(AmplicodeLdapDemoR2.class, args);
    }

    @EventListener(ContextRefreshedEvent.class)
    public void onContextRefresh(ContextRefreshedEvent event) {
        event.getApplicationContext().getBean(AdminUserInitializer.class).initialize();
    }
}
