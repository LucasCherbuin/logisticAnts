package com.maven.db;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import org.bson.Document;

public class mongo {
    
    public static void main(String[] args) {
        MongoClient client = MongoClients.create("MONGODB_CLIENT");

        MongoDatabase db = client.getDatabase("MONGODB");

        MongoCollection<org.bson.Document> collection = db.getCollection("COLLECTION_NAME");

        Document sampleDoc = new Document("_id", 1).append("name", "John Doe").append("email", "john.doe@example.com");

        collection.insertOne(sampleDoc);
    }
}
