import React from "react";
import Image from "next/image";
import Logo from "@/../public/logo1.jpg";
import { MdOutlineAccountCircle } from "react-icons/md";
import { CiShoppingCart } from "react-icons/ci";
import Link from "next/link";
import useUserState from "@/core/useStore";

const Navbar = () => {
  const user = useUserState((state) => state.user);
  const logout = useUserState((state) => state.logout);

  console.log(user);
  return (
    <div className="flex justify-between items-center m-10">
      <Link href="/">
        <div className="flex items-center gap-4 cursor-pointer">
          <Image
            src={Logo}
            width={50}
            height={50}
            alt="Graced couture Logo"
            className="rounded-full"
          />
          <p className="hidden md:block">Graced Couture</p>
        </div>
      </Link>

      <div className="flex items-center gap-2 md:gap-10">
        {!user && (
          <Link href="/login">
            <div className="flex hover:bg-blue-300 hover:duration-500  text-lg gap-1 cursor-pointer p-3 rounded-md">
              <MdOutlineAccountCircle size={30} />{" "}
              <p className="hidden md:block">Account</p>
            </div>
          </Link>
        )}
        <Link href="/cart">
          <div className="flex hover:bg-blue-300 hover:duration-500 text-lg gap-1 cursor-pointer p-3 rounded-md">
            <CiShoppingCart size={30} /> <p className="hidden md:block">Cart</p>
          </div>
        </Link>
        {user && (
          <button
            className=" outline-none p-3 bg-red-500 text-white border-none cursor-pointer rounded-xl"
            onClick={async () => {
              await logout();
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
