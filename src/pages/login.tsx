import { createAccount, login } from "@/core/user";
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/router";

const SignUpForm = ({ toggleForm }: { toggleForm: () => void }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createAccount({ email, password, name });
      toast({
        title: "Account Created",
        description: "Congratulations 🎉",
      });
      router.push("/");
    } catch (error: any) {
      toast({
        title: "Account Creation Failed",
        description: error.message,
      });
    }
  };

  return (
    <div className="w-full max-w-md rounded-lg p-6 shadow-lg">
      <h2 className="mb-4 text-center text-2xl font-semibold text-white">
        Create an Account
      </h2>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-white">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
          Sign Up
        </button>
      </form>

      <p className="mt-4 text-center text-gray-400">
        Already have an account?{" "}
        <button onClick={toggleForm} className="text-blue-500 hover:underline">
          Log in
        </button>
      </p>
    </div>
  );
};

const LoginForm = ({ toggleForm }: { toggleForm: () => void }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login({email, password})
      toast({
        title: "Logged In",
        description: "Welcome back!",
      });
      router.push("/");
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message,
      });
    }
  };

  return (
    <div className="w-full max-w-md rounded-lg p-6 shadow-lg">
      <h2 className="mb-4 text-center text-2xl font-semibold text-white">Log In</h2>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
          Log In
        </button>
      </form>

      <p className="mt-4 text-center text-gray-400">
        Don't have an account?{" "}
        <button onClick={toggleForm} className="text-blue-500 hover:underline">
          Sign Up
        </button>
      </p>
    </div>
  );
};

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      {isSignUp ? <SignUpForm toggleForm={() => setIsSignUp(false)} /> : <LoginForm toggleForm={() => setIsSignUp(true)} />}
    </div>
  );
};

export default AuthPage;
