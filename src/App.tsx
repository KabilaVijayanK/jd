import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage, TermsPage } from './pages/LegalPages';

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.replace('#', ''));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ScrollManager />
        <div className="min-h-screen flex flex-col bg-white text-[#263445]">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/about-us/" element={<AboutPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/" element={<ProductsPage />} />
            <Route path="/products/:categoryId/:slug/" element={<ProductDetailPage />} />
            <Route path="/facilities" element={<FacilitiesPage />} />
            <Route path="/facilities/" element={<FacilitiesPage />} />
            <Route path="/industries" element={<IndustriesPage />} />
            <Route path="/industries/" element={<IndustriesPage />} />
            <Route path="/contact-us" element={<ContactPage />} />
            <Route path="/contact-us/" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/privacy-policy/" element={<PrivacyPolicyPage />} />
            <Route path="/terms-and-conditions" element={<TermsPage />} />
            <Route path="/terms-and-conditions/" element={<TermsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </MotionConfig>
  );
}
