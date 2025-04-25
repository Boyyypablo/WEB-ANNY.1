
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import ConsultationPage from "./pages/ConsultationPage";
import MedicationsPage from "./pages/MedicationsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import HistoryPage from "./pages/HistoryPage";
import ExamDetailsPage from "./pages/ExamDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import OrdersPage from "./pages/OrdersPage";
import NotFound from "./pages/NotFound";
import CheckoutPage from "./pages/CheckoutPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/consultation" element={<ConsultationPage />} />
            <Route path="/medications" element={<MedicationsPage />} />
            <Route path="/medications/:id" element={<ProductDetailPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/history/exam/:id" element={<ExamDetailsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
