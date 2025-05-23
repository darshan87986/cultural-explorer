
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LoginForm } from "@/components/forms/AuthForms";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container py-12 flex-1">
        <div className="max-w-md mx-auto">
          <LoginForm />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default LoginPage;
