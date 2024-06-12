import React, { FormEvent, useState } from "react";

import { Navbar } from "@/components/layout";
import { Link } from "react-router-dom";
import { IoCalendarOutline } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SignInPage = () => {
  const [registerNumber, setRegisterNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signInhandler = (event: FormEvent) => {
    event.preventDefault();
    console.log(registerNumber, password);
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
          <Button type="submit" className="w-full py-4">
            Sign in
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
