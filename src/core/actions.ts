import { databases, appwriteConstants, storage } from "@/lib/appwrite";
import { ID, Query } from "appwrite";

const {
  product_collection,
  db,
  image_bucket,
  cart_collection,
  cart_items_collection,
} = appwriteConstants;

export const getProducts = async () => {
  const products = await databases.listDocuments(db, product_collection);
  const getImageLink = async (imageId: string) => {
    return await storage.getFile(image_bucket, imageId);
  };
  const parsedProducts = products.documents.map((product) => {
    return {
      id: product.$id,
      name: product.name,
      price: product.price,
      description: product.description,
      customizable: product.customizable,
      imageURL: `https://cloud.appwrite.io/v1/storage/buckets/${image_bucket}/files/${product.productImage}/preview?project=67ceb0870003c5fa1db4`,
    };
  });
  return parsedProducts;
};

export const getProduct = async (productId: string) => {
  const productDetails = await databases.getDocument(
    db,
    product_collection,
    productId
  );
  return productDetails;
};

export const addToCart = async (
  userId: string,
  productId: string,
  quantity: number = 1,
  customName?: string
) => {
  try {
    // Step 1: Get the user's cart
    const cartQuery = await databases.listDocuments(db, cart_collection, [
      Query.equal("users_cart", userId),
    ]);

    let cartId;
    if (cartQuery.documents.length === 0) {
      const newCart = await databases.createDocument(
        db,
        cart_collection,
        ID.unique(),
        {
          users_cart: userId,
        }
      );
      cartId = newCart.$id;
    } else {
      cartId = cartQuery.documents[0].$id;
    }

    const existingCartItem = await databases.listDocuments(
      db,
      cart_items_collection,
      [Query.equal("cart_id", cartId), Query.equal("products", productId)]
    );

    if (existingCartItem.documents.length > 0) {
      const cartItemId = existingCartItem.documents[0].$id;
      const newQuantity = existingCartItem.documents[0].quantity + quantity;

      await databases.updateDocument(db, cart_items_collection, cartItemId, {
        quantity: newQuantity,
      });
    } else {
      await databases.createDocument(db, cart_items_collection, productId, {
        cart_id: cartId,
        products: productId,
        quantity,
        customName
      });
    }

    console.log("Item added to cart successfully!");
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

export const getCart = async (userId: string) => {
  const cart = await databases.listDocuments(db, cart_collection, [
    Query.equal("users_cart", userId),
  ]);
  return cart;
};

export async function updateCartItem(itemId: string, newQuantity: number) {
  try {
    await databases.updateDocument(db, cart_items_collection, itemId, {
      quantity: newQuantity,
    });
  } catch (error) {
    console.error("Error updating cart item:", error);
  }
}

// Remove item from cart
export async function removeCartItem(itemId: string) {
  try {
    await databases.deleteDocument(db, cart_items_collection, itemId);
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
}
export const deleteAllItemsInCart = async (userId: string) => {
  try {
    console.log(
      "Deleting"
    )
    const cartItems = await databases.listDocuments(db, cart_items_collection, [
      Query.equal("cart_id", userId),
    ]);
    cartItems.documents.forEach(async (element) => {
      await databases.deleteDocument(db, cart_items_collection, element.$id);
    });
  } catch (error) {
    console.log(error);
  }
};
