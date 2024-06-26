package com.timetablescheduling.backend.configurations;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.mongo.MongoProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory;

@Configuration
@EnableMongoAuditing
public class MongoDbConfig {


    // To use ++ BD

//    @Primary
//    @Bean(name = "primaryMongoTemplate")
//    public MongoTemplate primaryMongoTemplate(@Qualifier("primaryMongoProperties") MongoProperties mongoProperties) {
//        MongoClient mongoClient = MongoClients.create(mongoProperties.getUri());
//        return new MongoTemplate(new SimpleMongoClientDatabaseFactory(mongoClient, mongoProperties.getDatabase()));
//    }

}
