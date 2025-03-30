import { ChildrenFCProps } from "@/next-env";


const AuthLayout: ChildrenFCProps = ({ children }) => {
    return <div className="auth-layout"
    >{children}</div>;
};

export default AuthLayout;
