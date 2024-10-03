import SignInForm from "@/components/SignIn";
import SignUpForm from "@/components/SignUp";

function AuthPage() {
  return (
    <div className="flex flex-col md:flex-row md:self-center w-full md:items-center md:justify-between gap-8 mt-8 mb-8 px-4">
      <div className="flex-1  text-black p-6  ">
        <h2 className="text-3xl font-bold text-center mb-4">Sign Up</h2>
        <SignUpForm />
      </div>

      <div className="flex-1  text-black p-6mt-8 md:mt-0">
        <h2 className="text-3xl font-bold text-center mb-4">Sign In</h2>
        <SignInForm />
      </div>
    </div>
  );
}

export default AuthPage;
