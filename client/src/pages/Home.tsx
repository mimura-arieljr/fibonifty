import { Toaster } from "react-hot-toast";
import { Index } from "../components/Index";

export const Home = () => (
    <div className="min-h-screen">

        <Index />

        <Toaster position="bottom-right" />

    </div>
);