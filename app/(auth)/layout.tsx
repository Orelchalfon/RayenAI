import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import { ReactNode } from "react";


const AuthLayout = async ({ children }: { children: ReactNode }) => {
    const isAuthUser = await isAuthenticated();
    if (isAuthUser) redirect("/")
    return <div className="auth-layout"
    >{children}</div>;
};

export default AuthLayout;
