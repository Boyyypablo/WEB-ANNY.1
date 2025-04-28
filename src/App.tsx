import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import AuthPage from "./pages/AuthPage";
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
import DoctorsPage from "./pages/DoctorsPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import FavoritesPage from "./pages/FavoritesPage";
import PromotionsPage from "./pages/PromotionsPage";
import SymptomsPage from "./pages/SymptomsPage";
import HealthDevicesPage from "./pages/HealthDevicesPage";
import PrescriptionScannerPage from "./pages/PrescriptionScannerPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/auth" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/" element={<Index />} />
              <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
                <Route path="/home" element={<Index />} />
                <Route path="/consultation" element={<ConsultationPage />} />
                <Route path="/medications" element={<MedicationsPage />} />
                <Route path="/medications/:id" element={<ProductDetailPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/history/exam/:id" element={<ExamDetailsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/doctors" element={<DoctorsPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogPostPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/promotions" element={<PromotionsPage />} />
                <Route path="/symptoms" element={<SymptomsPage />} />
                <Route path="/health-devices" element={<HealthDevicesPage />} />
                <Route path="/prescription-scanner" element={<PrescriptionScannerPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
