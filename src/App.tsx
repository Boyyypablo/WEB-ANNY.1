
import React, { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { FullPageSpinner } from "./components/ui/loading-spinner";

// Lazily load components
const Layout = lazy(() => import("./components/Layout"));
const Index = lazy(() => import("./pages/Index"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const ConsultationPage = lazy(() => import("./pages/ConsultationPage"));
const MedicationsPage = lazy(() => import("./pages/MedicationsPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const HistoryPage = lazy(() => import("./pages/HistoryPage"));
const ExamDetailsPage = lazy(() => import("./pages/ExamDetailsPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const OrdersPage = lazy(() => import("./pages/OrdersPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const DoctorsPage = lazy(() => import("./pages/DoctorsPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));
const PromotionsPage = lazy(() => import("./pages/PromotionsPage"));
const SymptomsPage = lazy(() => import("./pages/SymptomsPage"));
const HealthDevicesPage = lazy(() => import("./pages/HealthDevicesPage"));
const PrescriptionScannerPage = lazy(() => import("./pages/PrescriptionScannerPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const SymptomDiaryPage = lazy(() => import("./pages/SymptomDiaryPage"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Suspense fallback={<FullPageSpinner />}>
              <Routes>
                <Route path="/auth" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/" element={<Index />} />
                <Route element={
                  <Suspense fallback={<FullPageSpinner />}>
                    <PrivateRoute>
                      <Layout />
                    </PrivateRoute>
                  </Suspense>
                }>
                  <Route path="/home" element={<Index />} />
                  <Route path="/consultation" element={<ConsultationPage />} />
                  <Route path="/medications" element={<MedicationsPage />} />
                  <Route path="/medications/:id" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
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
                  <Route path="/symptom-diary" element={<SymptomDiaryPage />} />
                  <Route path="/health-devices" element={<HealthDevicesPage />} />
                  <Route path="/prescription-scanner" element={<PrescriptionScannerPage />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
