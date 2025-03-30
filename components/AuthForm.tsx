"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from 'sonner';
import { z } from "zod";
import FormField from "./FormField";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
type FormType = "sign-in" | "sign-up";
const authFormSchema = (mode: FormType) => z.object({
    name: mode === "sign-up" ? z.string().min(2) : z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(8).max(50),

})
const AuthForm = ({ mode }: { mode: FormType }) => {
    const router = useRouter()
    const formSchema = authFormSchema(mode);
    const isSignIn: boolean = mode === "sign-in";
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (mode === "sign-in") {

                console.log("Sign In", values);
                toast.success("Logged in successfully!")
                router.push("/")
            }
            else {
                console.log("Sign Up", values);
                toast.success("Account created successfully!, please log in")
                router.push("/sign-in")
            }


        } catch (error) {
            console.log("Error", error);
            toast.error("Something went wrong, please try again")

        }
        // Perform sign-in or sign-up action here
    }
    return <div className="card-border lg:min-w-[30.0375rem]">
        <div className="flex flex-col gap-6 items-center card px-10 py-16">
            <div className="flex flex-row justify-center items-center gap-2">
                <Image src="logo.svg" alt="logo" height={32} width={32} />
                <h2 className="text-primary-100">RayenAI</h2>
            </div>
            <h3 className="text-xl lg:text-3xl">Practice job interviews with AI</h3>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-4 space-y-6 form">
                    {!isSignIn && (
                        <FormField
                            control={form.control}
                            name="name"
                            label="Name"
                            placeholder="Your Name"
                            type="text"
                        />
                    )}

                    <FormField
                        control={form.control}
                        name="email"
                        label="Email"
                        placeholder="Your email address"
                        type="email"
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                    />

                    <Button className="btn" type="submit">
                        {isSignIn ? "Sign In" : "Create an Account"}
                    </Button>
                </form>
            </Form>
            <p className="text-center">
                {isSignIn ? "No account yet?" : "Have an account already?"}
                <Link
                    href={!isSignIn ? "/sign-in" : "/sign-up"}
                    className="font-bold text-user-primary ml-1"
                >
                    {!isSignIn ? "Sign In" : "Sign Up"}
                </Link>
            </p>
        </div>
    </div>;
};

export default AuthForm;
