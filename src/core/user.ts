import { account, appwriteConstants, databases } from "@/lib/appwrite";
import { ID, OAuthProvider } from "appwrite";

import { create } from "zustand";

interface signUpDetails {
  email: string;
  password: string;
  name: string;
}

// const createAccountOAuth = async () => {
//   const newUser = await account.createOAuth2Session(
//     OAuthProvider.Google,
//     "http://localhost:3000/",
//     "http://localhost:3000/login"
//   );

// };

const createAccount = async ({ email, password, name }: signUpDetails) => {
  try {
    const response = await account.create(ID.unique(), email, password, name);
    const newUser = await databases.createDocument(
      appwriteConstants.db,
      appwriteConstants.user_collection,
      ID.unique(),
      {
        email,
        name,
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await account.createEmailPasswordSession(email, password);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export { createAccount, login };
