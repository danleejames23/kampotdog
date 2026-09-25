import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/NavBar/Navbar";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import Contact from "./Components/Contact/Contact";
import Blogs from "./Components/Blogs/Blogs";
import BlogArticle from "./Components/Blogs/BlogArticle";
import ThePack from "./Components/ThePack/ThePack";
import DogDetail from "./Components/ThePack/DogDetail";
import Donate from "./Components/Donate/Donate";
import VetDebt from "./Components/Pages/VetDebt";
import Donations from "./Components/Pages/Donations";
import AdoptSponsor from "./Components/Pages/AdoptSponsor";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import "./scrapbook.css";
import "./App.css";
import "./scrapbook-overrides.css";
import "./mobile.css";

const Layout = ({ children }) => (
  <>
    <Navbar title="KDS" />
    {children}
    <Footer title="KDS" />
    <ScrollToTop />
  </>
);

const routeSeo = {
  '/': {
    title: 'Kampot Dog Sanctuary | Rescue, Care, Adoption & Sponsorship',
    description: 'Kampot Dog Sanctuary rescues and rehabilitates vulnerable dogs in Cambodia. Visit, adopt, sponsor, or donate to help us give every dog a safe future.',
  },
  '/contact': {
    title: 'Contact | Kampot Dog Sanctuary',
    description: 'Contact Kampot Dog Sanctuary to visit, volunteer, adopt, sponsor, or support rescue work in Kampot, Cambodia.',
  },
  '/the-pack': {
    title: 'Meet The Pack | Kampot Dog Sanctuary',
    description: 'Meet the dogs at Kampot Dog Sanctuary, read their profiles, and sponsor dogs in need of food, vet care, and shelter.',
  },
  '/donate': {
    title: 'Donate | Kampot Dog Sanctuary',
    description: 'Donate to Kampot Dog Sanctuary and directly support food, medication, rescue equipment, and veterinary treatment for the dogs.',
  },
  '/donations': {
    title: 'Ways To Give | Kampot Dog Sanctuary',
    description: 'Choose how to donate to Kampot Dog Sanctuary and see exactly where your money goes to help the dogs every day.',
  },
  '/adopt-sponsor': {
    title: 'Adopt & Sponsor | Kampot Dog Sanctuary',
    description: 'Adopt or sponsor dogs from Kampot Dog Sanctuary and help provide long-term love, safety, and care.',
  },
  '/blogs': {
    title: 'Stories & Updates | Kampot Dog Sanctuary',
    description: 'Read rescue stories, sanctuary updates, and dog profiles from Kampot Dog Sanctuary.',
  },
  '/vet-debt': {
    title: 'Vet Debt Support | Kampot Dog Sanctuary',
    description: 'Help Kampot Dog Sanctuary clear urgent veterinary debt and keep life-saving care available to rescued dogs.',
  },
};

const setMeta = (selector, content, attribute = 'name') => {
  let tag = document.head.querySelector(`meta[${attribute}="${selector}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, selector);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

const SeoManager = () => {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    const base = routeSeo[pathname] || {
      title: 'Kampot Dog Sanctuary',
      description: 'Kampot Dog Sanctuary rescues and cares for vulnerable dogs in Cambodia.',
    };

    document.title = base.title;

    setMeta('description', base.description, 'name');
    setMeta('robots', 'index,follow', 'name');
    setMeta('og:title', base.title, 'property');
    setMeta('og:description', base.description, 'property');
    setMeta('og:type', 'website', 'property');
    setMeta('og:url', `${window.location.origin}${pathname}`, 'property');
    setMeta('twitter:card', 'summary_large_image', 'name');
    setMeta('twitter:title', base.title, 'name');
    setMeta('twitter:description', base.description, 'name');

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${window.location.origin}${pathname}`);
  }, [location.pathname]);

  return null;
};

const App = () => {
  return (
    <Router>
      <SeoManager />
      <Routes>
        <Route 
          path="/" 
          element={
            <Layout>
              <Home />
            </Layout>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <Layout>
              <Contact />
            </Layout>
          } 
        />
        <Route 
          path="/the-pack" 
          element={
            <Layout>
              <ThePack />
            </Layout>
          } 
        />
        <Route 
          path="/the-pack/:id" 
          element={
            <Layout>
              <DogDetail />
            </Layout>
          } 
        />
        <Route 
          path="/donate" 
          element={
            <Layout>
              <Donate />
            </Layout>
          } 
        />
        <Route 
          path="/vet-debt" 
          element={
            <Layout>
              <VetDebt />
            </Layout>
          } 
        />
        <Route 
          path="/donations" 
          element={
            <Layout>
              <Donations />
            </Layout>
          } 
        />
        <Route 
          path="/adopt-sponsor" 
          element={
            <Layout>
              <AdoptSponsor />
            </Layout>
          } 
        />
        <Route 
          path="/blogs" 
          element={
            <Layout>
              <Blogs />
            </Layout>
          } 
        />
        <Route 
          path="/blogs/:id" 
          element={
            <Layout>
              <BlogArticle />
            </Layout>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
