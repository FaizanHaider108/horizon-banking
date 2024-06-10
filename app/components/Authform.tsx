"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";
import CustomInput from "./CustomInput";
import { AuthformSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";
import PlaidLink from "./PlaidLink";


const Authform = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const formSchema = AuthformSchema(type)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) =>  {
    setLoading(true)
    try {
      // sign up to appwrite & create plaid Token
      
      if(type === 'sign-up'){
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,
          email: data.email,
          password: data.password
        }

        const newUser = await signUp(userData)
        setUser(newUser)
      }
      if(type === 'sign-in'){
        const response = await signIn({
          email:data.email,
          password: data.password
        })
        if(response){
          router.push("/")
        }
      }
    
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Log In" : "Sign Up"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary"/>
        </div>
       ) : ( 
        <>
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* other signup fileds */}


        {type === "sign-up" && (
          <>
          <div className="flex gap-4">
          <CustomInput control={form.control}  name="firstName" placeholder={"Enter your first name"} label={"First Name"} />
          <CustomInput control={form.control}  name="lastName" placeholder={"Enter your Last name"} label={"Last Name"} />
          </div>
           <CustomInput control={form.control}  name="address1" placeholder={"Enter your Address"} label={"Address"} />
           <CustomInput control={form.control}  name="city" placeholder={"Enter your City"} label={"City"} />

          <div className="flex gap-4">
          <CustomInput control={form.control}  name="state" placeholder={"Example : NY"} label={"State"} />
          <CustomInput control={form.control}  name="postalCode" placeholder={"Example: 11101"} label={"Postal Code"} />
          </div>
          <div className="flex gap-4">
           <CustomInput control={form.control}  name="dateOfBirth" placeholder={"YYYY-MM-00"} label={"Date of Birth"} />
           <CustomInput control={form.control}  name="ssn" placeholder={"Example:1234"} label={"SSN"} />
          </div>
          </>
        )}



        {/* input fields */}
       <CustomInput control={form.control}  name="email" placeholder={"Enter your Email"} label={"Email"} />
       <CustomInput control={form.control} name="password" placeholder={"Enter your Password"} label={"Password"}/>

       <div className="flex flex-col gap-4">
        
       <Button type="submit" className="form-btn" disabled={loading}>
          {
            loading ? (
              <>
              <Loader2 size={20} className="animate-spin"/> &nbsp;Loading...
              </>
            ) : ( type === "sign-in" ? 'Sign in' : "Sign up" )
          }
        </Button>

       </div>
      </form>
    </Form>
    <footer className="flex justify-center gap-1">
        <p className="text-14 font-normal text-gray-800">
            {type === "sign-in" ? "Don't have an account?" : "Already have an account?"}
        </p>
        <Link 
        className="form-link"
        href={type === "sign-in" ? "/sign-up": "/sign-in"}>
        {type === "sign-in" ? "Sign up": "Sign in"}
        </Link>
    </footer>
        </>
     )}
    </section>
  );
};

export default Authform;
