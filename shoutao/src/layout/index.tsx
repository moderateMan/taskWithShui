import { Outlet } from "react-router";
import Footer from "../components/footer";
import Header from "../components/header";
import { Toaster } from "@/components/ui/toaster";

export default function Layout() {
  return (
    <div className="flex flex-col min-w-[75rem] min-h-screen w-full bg-[#F1F1F2] overflow-hidden">
      <Toaster />
      <Header />
      <div className="flex-1 max-w-[75rem] p-5 w-full mx-auto mb-10">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
