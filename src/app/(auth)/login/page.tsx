import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";

export default function Login() {
  return (
    <section className="h-screen grid justify-center items-center">
      {/* <LoginLink>Login</LoginLink> */}
      <Button
        variant="outline"
        className="w-[120px] h-[50px] text-2xl text-muted-light"
      >
        <LoginLink>Login</LoginLink>
      </Button>
    </section>
  );
}
