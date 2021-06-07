import { MongoClient } from "mongodb";

const client = new MongoClient(`mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PW}@indicouganhou.ewhv6.mongodb.net/engfor?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });

export default client;