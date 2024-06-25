import React, { FormEvent, useState } from "react";
import { URL_SERVER } from "@/constants/constants";

import { Navbar } from "@/components/layout";
import { Link, redirect, useNavigate } from "react-router-dom";
import { IoCalendarOutline } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SignInPage = () => {
  const [registerNumber, setRegisterNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const signInhandler = async (event: FormEvent) => {
    event.preventDefault();

    const userCredentials = {
      matricule: registerNumber,
      password: password,
    };

    setIsLoading(true);

    try {
      const response = await fetch(URL_SERVER + "/api/user/signIn", {
        method: "POST",
        body: JSON.stringify(userCredentials),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.Message) {
        setError(data.Message.en);
      }

      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.users));

      setIsLoading(false);
      navigate("/generating");
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Navbar />
      <div className="flex flex-col items-center py-5 md:py-12 lg:py-20">
        <div>
          <Link to="/" className="flex items-center justify-center space-x-2">
            <IoCalendarOutline size={26} />
            <span className="text-lg md:text-xl lg:text-2xl">Scheduling</span>
          </Link>
          <p className="text-sm md:text-md lg:text-lg text-gray-400 text-center">
            Sign in to scheduling and continous to work
          </p>
        </div>
        <form
          onSubmit={signInhandler}
          className="w-1/4 space-y-3 py-5 md:py-8 lg:py-12"
        >
          {error && (
            <div className="border py-3 border-gray-300 bg-red-300 rounded-lg text-center">
              <h1 className="text-sm md:text-md lg:text-lg text-gray-600">
                {error}
              </h1>
            </div>
          )}

          <Input
            type="text"
            placeholder="registration number"
            className="h-12"
            onChange={(event) => setRegisterNumber(event.target.value)}
          />
          <Input
            type="password"
            placeholder="password"
            className="h-12"
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            type="submit"
            className={`w-full py-4 ${isLoading && "bg-gray-500"}`}
            disabled={isLoading}
          >
            {isLoading ? "Checking..." : "Sign In"}
          </Button>
          <p className="text-sm md:text-md lg:text-lg text-gray-600 text-center">
            Do not have an account yet ?{" "}
            <Link to="/sign-up" className="text-black underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </React.Fragment>
  );
};

export default SignInPage;
