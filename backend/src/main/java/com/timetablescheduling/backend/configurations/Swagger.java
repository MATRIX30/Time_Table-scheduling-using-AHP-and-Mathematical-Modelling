package com.timetablescheduling.backend.configurations;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
    info = @Info(
            contact = @Contact(
                    name = "Dave CHEDJOUN",
                    email = "davechedjoun@gmail.com"
    ),
            title = " Documentation for Time table scheduling project",
            description = "All routes to resources of the api with their description",
            version = "1.0"
),
        servers = {
            @Server(
                    description = "local env",
                    url = "http://localhost:8081/"
            ),
            @Server(
                    description = "prod env",
                    url = ""
            )
        }
)
//@SecurityRequirement(
//        name = "bearerAuth"
//)
//@SecurityScheme(
//        name = "bearerAuth",
//        type = SecuritySchemeType.HTTP,
//        scheme = "bearer",
//        bearerFormat = "JWT"
//)
public class Swagger {


}
