import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import { ReactNode } from "react";


const Layout = async ({ children }: { children: ReactNode }) => {
    const isAuthUser = await isAuthenticated();
    if (!isAuthUser) redirect("/sign-in")
    return <div className="root-layout">{children}</div>;

};
export default Layout;
