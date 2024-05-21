import { Outlet } from "react-router";
import Footer from "../components/footer";
import Header from "../components/header";
import { Toaster } from "@/components/ui/toaster";
import Modal from "@/components/modal";
import { useShowDisclaimerStore } from "@/store/layout";

export default function Layout() {
  const { showDisclaimer, setShowDisclaimer } = useShowDisclaimerStore();
  return (
    <div className="flex flex-col min-w-[75rem] min-h-screen w-full bg-[#F1F1F2] overflow-hidden">
      <Toaster />
      <Header />
      <div className="flex-1 max-w-[75rem] p-5 w-full mx-auto mb-10">
        <Outlet />
      </div>
      <Modal
        open={!showDisclaimer}
        title="Disclaimer"
        onClose={() => setShowDisclaimer(true)}
        onOk={() => setShowDisclaimer(true)}
      >
        <p className="indent-4 text-sm">
          The information provided is intended to be used solely for user
          convenience in distinguishing between various options and making
          informed choices based on their assessment of the context and personal
          preferences. It is essential to reference safety guidelines and seek
          professional advice regarding Personal Protective Equipment (PPE).
        </p>
        <p className="indent-4 text-sm">
          Declared protection level guides are based on controlled laboratory
          conditions utilizing global standards and proprietary test methods
          developed in-house, providing combined protection level comparisons
          for SW gloves. However, these comparisons may not entirely reflect
          real-world application scenarios or conditions due to subjective
          variations.
        </p>
        <p className="indent-4 text-sm">
          SW Sustainability Solutions (SWSS) does not exert control over
          end-user applications. We strongly advise end-users to ask a SWSS
          representative for personalized professional advice. It is important
          to note that SWSS does not guarantee the prevention of any damage or
          accidents resulting from applying PPE without proper consultation on
          specific safety practices. Users are encouraged to exercise caution
          and adhere to industry best practices for optimal safety outcomes.
        </p>
      </Modal>
      <Footer />
    </div>
  );
}
