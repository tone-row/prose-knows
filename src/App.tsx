import { TooltipProvider } from "./ui/tooltip";
import { Toaster } from "./ui/toaster";
import { TipTap } from "./components/TipTap";

export default function App() {
  return (
    <TooltipProvider>
      <div className="h-[100dvh] grid justify-center p-5">
        <TipTap />
      </div>
      <Toaster />
    </TooltipProvider>
  );
}
