package com.healthcare.ohms.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI carePlusOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("CarePlus Clinic Management System & EMR API")
                        .description("Enterprise HealthTech REST API powering CarePlus Online Healthcare Management System. Features concurrency-safe appointment booking, 7-stage referral bridge, FHIR EMR, and HIPAA audit logging.")
                        .version("v3.2")
                        .contact(new Contact().name("CarePlus Healthcare Systems").email("support@careplus.health"))
                        .license(new License().name("Proprietary Healthcare License")))
                .addSecurityItem(new SecurityRequirement().addList("BearerAuth"))
                .components(new Components()
                        .addSecuritySchemes("BearerAuth",
                                new SecurityScheme()
                                        .name("BearerAuth")
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")));
    }
}
