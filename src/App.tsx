// ==========================================
// 🎯 WEEK 1: App.tsx - Main Application Setup
// ==========================================
// This is the root component of your React application!
// Think of this as the foundation of your house - everything starts here.
// Add this import at the top

// 📦 Import statements - bringing in the tools we need
import { Toaster } from "@/components/ui/toaster"; // For showing notifications
import { Toaster as Sonner } from "@/components/ui/sonner"; // Alternative notification system
import { TooltipProvider } from "@/components/ui/tooltip"; // For helpful hover tips
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // For data management
import { BrowserRouter, Routes, Route } from "react-router-dom"; // For navigation between pages
import Index from "./pages/Index"; // 🏠 Homepage component
import NotFound from "./pages/NotFound"; // 🚫 404 error page
import DemoCounter from "./pages/DemoCounter"; // 🎓 Instructor demo page
import LiveSession from "./pages/LiveSession"; // 🎮 Live session playground
import Week3Live from "./pages/Week3Live"; // 🎯 Week 3 interactive components playground
import Week4LiveDemo from "./components/Demos/Week4LiveDemo";
import Week5Live from "./components/Demos/Week5Live";
import Week6Live from "./components/Demos/Week6Live";
import BrokenDemo from "./pages/BrokenDemo";
import BrokenDemoSolution from "./pages/BrokenDemoSolution";
import DashboardPage from "./pages/DashboardPage";

// Create a client for managing data queries (don't worry about this yet!)
const queryClient = new QueryClient();

// 🚀 Main App Component - This wraps your entire application
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* These Toaster components handle popup notifications */}
        <Toaster />
        <Sonner />

        {/* 🧭 Router setup - manages which page to show */}
        <BrowserRouter>
          <Routes>
            {/* 🏠 Main route - shows your homepage */}
            <Route path="/" element={<Index />} />

            <Route path="/week6-live" element={<Week6Live />} />

            <Route path="/dashboard" element={<DashboardPage />} />

            {/* 🔍 Week 9: Quality Detective Challenge */}
            <Route path="/broken-demo" element={<BrokenDemo />} />
            <Route
              path="/broken-demo-solution"
              element={<BrokenDemoSolution />}
            />

            {/* ⚠️ Catch-all route - shows 404 for unknown URLs */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
