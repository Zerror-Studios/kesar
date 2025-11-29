import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import SmoothScroller from "@/components/smoothScroll/SmoothScroller";
import "@/styles/globals.css";
import "@/styles/components/common/navbar.css";
import "@/styles/components/common/footer.css";
import "@/styles/components/home.css";
import "@/styles/components/about.css";
import "@/styles/components/product.css";
import "@/styles/components/productDetail.css";
import "@/styles/components/contact.css";
import "@/styles/components/gallery.css";
import "@/styles/components/investor.css";
import Layout from "@/components/layout/Layout";
import { Toaster } from "react-hot-toast";


export default function App({ Component, pageProps }) {
  return <>
    <SmoothScroller />
    <Navbar />
    <Layout>
      <Component {...pageProps} />
      <Footer />
    </Layout>
    <Toaster />
  </>;
}
