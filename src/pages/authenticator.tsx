import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function withAuth(Component: React.ComponentType<any>) {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();
    const token = Cookies.get("token");

    useEffect(() => {
      if (!token) {
        router.push("/login");
      }
    }, [token, router]);

    return token && <Component {...props} />;
  };
}
