import { Client, Account, Databases, Storage} from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67ceb0870003c5fa1db4");

export const appwriteConstants = {
  db: "67cecb0300254f08e373",
  user_collection: "67d2be31002f80da4238",
  product_collection: "67d2bdad0021d771a1fe",
  cart_collection: "67d2be120006dbe6b8e4",
  image_bucket: '67d15add0018b5b49508',
  cart_items_collection: '67daa2f3003076efc9c6'
};
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client)
export { ID } from "appwrite";
