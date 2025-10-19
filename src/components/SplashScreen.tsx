import { LoaderCircle } from "lucide-react";
import { Activity } from "react";
import logo from "../assets/images/logo.svg";

interface SplashScreenProps {
  isLoading: boolean;
}

const SplashScreen = ({ isLoading }: SplashScreenProps) => (
  <Activity mode={isLoading ? "visible" : "hidden"}>
    <div className="bg-neutral-900 flex flex-col gap-16 h-screen justify-center items-center">
      <img src={logo} alt="waiter logo" />
      <LoaderCircle className="text-neutral-600 animate-spin" size={32} />
    </div>
  </Activity>
);

export default SplashScreen;
