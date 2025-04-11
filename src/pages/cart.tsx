import { useState, useEffect } from "react";
import { ShoppingCart, Trash } from "lucide-react";
import { getCart, updateCartItem, removeCartItem } from "@/core/actions";
import useUserState from "@/core/useStore";
import { appwriteConstants } from "@/lib/appwrite";
import Image from "next/image";
import DeliveryForm from "@/components/Delivery/DeliveryForm";

const { image_bucket } = appwriteConstants;

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageURL: string;
  customName: string
}

interface userDeliveryDataDTO {
  phoneNumber: number;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useUserState((state) => state.user);
  const [userDeliveryData, setUserDeliveryData] = useState<userDeliveryDataDTO>();

  // Fetch cart data on component mount
  useEffect(() => {
    async function fetchCart() {
      setLoading(true);
      try {
        const cartData = await getCart(user?.id as unknown as string);

        if (cartData?.documents?.length > 0) {
          const cartItems: CartItem[] = [];

          cartData.documents.forEach((document) => {
            if (document.cartItems && document.cartItems.length > 0) {
              document.cartItems.forEach((cartItem: any) => {
                cartItems.push({
                  id: cartItem.products.$id,
                  name: cartItem.products.name,
                  price: cartItem.products.price,
                  quantity: cartItem.quantity,
                  imageURL: `https://cloud.appwrite.io/v1/storage/buckets/${image_bucket}/files/${cartItem.products.productImage}/preview?project=67ceb0870003c5fa1db4`,
                  customName: cartItem.customName
                });
              });
            }
          });

          setCart(cartItems);
        } else {
          setCart([]); // Ensure an empty array if no cart items exist
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCart([]); // Ensure the cart remains empty on error
      }
      setLoading(false);
    }

    if (user?.id) {
      fetchCart();
    }
  }, [user?.id]);

  // Handle quantity update
  const updateQuantity = async (id: string, amount: number) => {
    const item = cart.find((item) => item.id === id);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + amount);
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );

    await updateCartItem(id, newQuantity);
  };

  // Handle item removal
  const removeItem = async (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    await removeCartItem(id);
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-4xl mx-auto  p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <ShoppingCart size={24} /> Your Cart
        </h2>

        {loading ? (
          <p className="text-center text-gray-400 mt-4">Loading cart...</p>
        ) : cart.length === 0 ? (
          <p className="text-center text-gray-400 mt-4">Your cart is empty.</p>
        ) : (
          <div className="mt-6">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-4 border-b border-gray-700">
                <div className="flex items-center gap-4">
                  <Image src={item.imageURL} alt={item.name} className="w-16 h-16 rounded" width={300} height={300} />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-400">₦{item.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    className="px-3 py-1 bg-gray-700 rounded text-white"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    className="px-3 py-1 bg-gray-700 rounded text-white"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>

                <button onClick={() => removeItem(item.id)} className="text-red-400">
                  <Trash size={20} />
                </button>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className="mt-6 text-right">
            <h3 className="text-lg font-semibold">Total: ₦{total}</h3>
            <DeliveryForm total={total} user={user}  productDetails={cart}/>
          </div>
        )}
      </div>
    </div>
  );
}
