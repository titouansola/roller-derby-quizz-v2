import { MongoClient } from "mongodb";

const connectionUrl = process.env.MONGODB_CONNECTION_URL;
if (!connectionUrl) throw new Error("No connection URL provided");

export const db = new MongoClient(connectionUrl).db();
