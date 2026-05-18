import React, { useState } from "react";
import {
  Globe,
  Package,
  TrendingUp,
  Users,
  Award,
  Monitor,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  ArrowLeft,
  Star,
  Briefcase,
  Lightbulb,
  ShoppingBag,
  Send,
  Menu,
  X,
} from "lucide-react";
import logo from "/MPIDCUPDATEDLOGO.png";
import { Toaster, toast } from "react-hot-toast";
import API_URL from "./config/config";
import axios from "axios";

const CarpetAccelerator = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Accelerator Form Data States
  const [formData, setFormData] = useState({
    ownerName: "",
    mobileNo: "",
    isExporting: "",
    exportCountries: "",
    district: "",
    organisationName: "",
    orgType: "",
    exportSituation: "",
    productionCapacity: "",
    employees: "",
    workingProcess: "",
    valueAddedProducts: "",
    socialMediaOrGI: "",
  });

  const [docsAvailable, setDocsAvailable] = useState([]);
  const [trainingNeeds, setTrainingNeeds] = useState([]);

  const [files, setFiles] = useState({
    aadharCard: null,
    panCard: null,
    productsImage: null,
    brochure: null,
    socialMediaImage: null,
    otherDocs: null,
  });

  // Contact Form States
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    subject: "",
    number: "",
    message: "",
  });
  const [contactLoading, setContactLoading] = useState(false);

  // Handlers for Accelerator Form
  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e, field) =>
    setFiles({ ...files, [field]: e.target.files[0] });

  const handleCheckboxChange = (e, state, setState) => {
    const { value, checked } = e.target;
    if (checked) setState([...state, value]);
    else setState(state.filter((item) => item !== value));
  };

 const handleNextStep = (e) => {
    e.preventDefault();

    // --- STEP 1 VALIDATION ---
    if (activeStep === 1) {
      // Step 1 ke mandatory fields check karo (apne hisaab se fields add/remove kar sakte ho)
      if (!formData.ownerName || !formData.mobileNo || !formData.organisationName || !formData.district) {
        toast.error("Please fill all the required fields ");
        return; // Return karne se aage ka code nahi chalega (Next step block ho jayega)
      }
      
      // Mobile number ki length check (Optional but recommended)
      if (formData.mobileNo.length < 10) {
        toast.error("Please enter a valid 10-digit mobile number.");
        return;
      }
    }

    // --- STEP 2 VALIDATION ---
    if (activeStep === 2) {
      // Step 2 ke mandatory fields
      if (!formData.orgType || !formData.productionCapacity || !formData.employees) {
        toast.error("Please fill all the required fields ");
        return;
      }
    }

    // Agar saari validations pass ho gayi, tabhi step aage badhao
    setActiveStep((prev) => Math.min(prev + 1, 3));
  };

  const handleContactChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handlePrevStep = (e) => {
    e.preventDefault();
    setActiveStep((prev) => Math.max(prev - 1, 1));
  };

  // BACKEND API CONNECTION FOR ACCELERATOR
  const submitApplication = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.loading("Submitting your application...");

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      data.append("companyDocumentsAvailable", JSON.stringify(docsAvailable));
      data.append("trainingNeeds", JSON.stringify(trainingNeeds));

      Object.keys(files).forEach((key) => {
        if (files[key]) data.append(key, files[key]);
      });

      const response = await axios.post(`${API_URL}/applications`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201 || response.status === 200) {
        toast.success("Registration Successful!", { id: toastId });
        setActiveStep(4);

        setTimeout(() => {
          const element = document.getElementById("success-section");
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 300);
      }
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Submission failed. Check backend.";
      toast.error(errMsg, { id: toastId });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // BACKEND API CONNECTION FOR CONTACT FORM
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactLoading(true);
    const toastId = toast.loading("Sending your query...");

    try {
      // 🔴 CHECK HERE: 'contactData' hi pass hona chahiye, 'formData' nahi!
      const res = await axios.post(`${API_URL}/contact`, contactData);

      if (res.data.success) {
        toast.success(res.data.message || "Query sent successfully!", {
          id: toastId,
        });
        setContactData({
          name: "",
          email: "",
          subject: "",
          number: "",
          message: "",
        });
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || "Something went wrong.";
      toast.error(errMsg, { id: toastId });
    } finally {
      setContactLoading(false);
    }
  };

  return (
    <div className="font-sans text-[#333333] bg-[#fbf9f6] min-h-screen scroll-smooth">
      {/* TOASTER COMPONENT FOR ALERTS */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* 1. Navbar */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo Section */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* MPIDC Logo */}
              <img
                src={logo}
                alt="MPIDC Logo"
                className="w-auto h-10 md:h-12 object-contain shrink-0"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-8 text-sm font-semibold text-[#333333]">
              <a
                href="#about"
                className="hover:text-[#a67c00] transition-colors"
              >
                About
              </a>
              <a
                href="#benefits"
                className="hover:text-[#a67c00] transition-colors"
              >
                Benefits
              </a>
              <a
                href="#program"
                className="hover:text-[#a67c00] transition-colors"
              >
                Program
              </a>
              <a
                href="#eligibility"
                className="hover:text-[#a67c00] transition-colors"
              >
                Eligibility
              </a>
             
            </div>

            {/* Desktop Apply Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <a
                href="#apply"
                className="bg-[#581c24] text-white px-6 py-2.5 rounded-md font-medium hover:bg-[#43151b] shadow-lg shadow-maroon/30 transition-all hover:-translate-y-0.5"
              >
                Apply Now
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-[#581c24] hover:text-[#a67c00] focus:outline-none transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-8 h-8" />
                ) : (
                  <Menu className="w-8 h-8" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full animate-fade-in">
            <div className="px-4 pt-4 pb-6 space-y-4 flex flex-col">
              <a
                href="#about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-semibold text-[#333333] hover:text-[#a67c00]"
              >
                About
              </a>
              <a
                href="#benefits"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-semibold text-[#333333] hover:text-[#a67c00]"
              >
                Benefits
              </a>
              <a
                href="#program"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-semibold text-[#333333] hover:text-[#a67c00]"
              >
                Program
              </a>
              <a
                href="#eligibility"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-semibold text-[#333333] hover:text-[#a67c00]"
              >
                Eligibility
              </a>
              <a
                href="#faq"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-semibold text-[#333333] hover:text-[#a67c00]"
              >
                FAQ
              </a>
              <div className="pt-4 mt-2 border-t border-gray-100">
                <a
                  href="#apply"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center bg-[#581c24] text-white px-6 py-3 rounded-md font-bold shadow-md hover:bg-[#43151b]"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* 2. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-black">
        {/* Rich Traditional Rug Texture */}
        <div
          className="absolute inset-0 bg-cover bg-center "
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600166898405-da9535204843?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
          }}
        ></div>

        {/* Elegant Gradient Overlay for Text Readability - Dark edges, clear center */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#581c24]/50 to-[#581c24]/90"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-[#a67c00]/30 text-[#f5ebd9] border border-[#a67c00]/60 text-sm font-semibold tracking-wider mb-6 backdrop-blur-sm shadow-lg">
            Initiative of MP Industrial Development Corporation
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-4 drop-shadow-xl">
            Carpet Accelerator
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-[#f5ebd9] mb-8 tracking-wide uppercase drop-shadow-lg">
            From Looms to Global Rooms
          </h2>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-white/95 mb-10 leading-relaxed font-medium drop-shadow-lg">
            Empowering carpet artisans, weavers, manufacturers, and
            entrepreneurs to transform traditional carpets into globally
            competitive lifestyle brands.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
            <a
              href="#apply"
              className="w-full sm:w-auto px-8 py-4 bg-[#a67c00] text-white font-bold rounded-lg hover:bg-[#8e6a00] shadow-xl shadow-[#a67c00]/40 transition-all flex items-center justify-center gap-2 hover:-translate-y-1 border border-[#a67c00]/50"
            >
              Apply Now <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#program"
              className="w-full sm:w-auto px-8 py-4 bg-black/40 text-white font-bold rounded-lg hover:bg-black/60 backdrop-blur-md border border-white/30 transition-all flex items-center justify-center"
            >
              Explore Program
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                label: "Applications Start",
                value: "Coming Soon",
                icon: <Star className="w-5 h-5 text-[#f5ebd9]" />,
              },
              {
                label: "Program Size",
                value: "30–50 Participants",
                icon: <Users className="w-5 h-5 text-[#f5ebd9]" />,
              },
              {
                label: "Program Duration",
                value: "3 Months",
                icon: <Briefcase className="w-5 h-5 text-[#f5ebd9]" />,
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-black/40 backdrop-blur-md border border-white/20 rounded-xl p-6 text-left flex items-start gap-4 shadow-xl hover:bg-black/50 transition-colors"
              >
                <div className="p-3 bg-[#a67c00]/80 rounded-lg">
                  {card.icon}
                </div>
                <div>
                  <p className="text-[#f5ebd9]/80 text-sm mb-1 font-medium">
                    {card.label}
                  </p>
                  <p className="text-white font-bold text-lg">{card.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#581c24] mb-6">
            From Local Weaves to Global Markets
          </h2>
          <div className="w-24 h-1 bg-[#a67c00] mx-auto mb-8 rounded-full"></div>
          <p className="max-w-4xl mx-auto text-lg text-gray-600 leading-relaxed">
            The Carpet Accelerator is a focused growth program designed to
            support carpet artisans, weavers, manufacturers, exporters, and
            emerging entrepreneurs. The program helps participants improve
            product design, quality, packaging, branding, digital presence,
            export readiness, and buyer connections.
          </p>
        </div>
      </section>

      {/* 4. Why Join Section */}
      <section className="py-16 bg-[#fbf9f6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "From Looms to Global Markets", icon: <Globe /> },
              {
                title: "Design Innovation with Traditional Craft",
                icon: <Lightbulb />,
              },
              { title: "Branding & Packaging Support", icon: <Package /> },
              { title: "Direct Buyer & Export Connect", icon: <TrendingUp /> },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2"
              >
                <div className="w-14 h-14 bg-[#f5ebd9] rounded-xl flex items-center justify-center text-[#a67c00] mb-6 group-hover:scale-110 group-hover:bg-[#581c24] group-hover:text-white transition-all">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#333333] leading-tight">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Benefits Section */}
      <section id="benefits" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#581c24] mb-4">
              Program Benefits
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive end-to-end support to elevate your craft.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "One-on-One Mentorship", icon: <Users /> },
              { title: "Product Design & Trends", icon: <Lightbulb /> },
              { title: "Packaging & Catalogues", icon: <Package /> },
              { title: "Export Readiness", icon: <Globe /> },
              { title: "E-commerce & Digital", icon: <Monitor /> },
              { title: "Buyer-Seller Meet", icon: <Briefcase /> },
              { title: "Excellence Awards", icon: <Award /> },
              { title: "End-to-End Support", icon: <CheckCircle /> },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-[#a67c00] hover:bg-[#fbf9f6] transition-colors cursor-pointer"
              >
                <div className="text-[#a67c00]">{benefit.icon}</div>
                <span className="font-semibold text-gray-800">
                  {benefit.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Program Journey Section */}
      <section id="program" className="py-24 bg-[#581c24] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Program Journey
            </h2>
            <p className="text-[#f5ebd9] max-w-2xl mx-auto">
              A structured 3-phase timeline to transform your business.
            </p>
          </div>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/30 before:to-transparent">
            {/* Phase 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#581c24] bg-[#a67c00] text-white font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                1
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-xl text-[#a67c00]">
                    Cluster Discovery & Selection
                  </h3>
                  <span className="text-xs font-semibold px-2 py-1 bg-white/10 rounded-md">
                    1 Month
                  </span>
                </div>
                <ul className="space-y-2 mt-4 text-[#f5ebd9] text-sm">
                  <li className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-[#a67c00]" /> Carpet
                    cluster bootcamps
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-[#a67c00]" /> Product
                    assessment
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-[#a67c00]" /> Business
                    potential evaluation
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-[#a67c00]" /> Selection
                    of 30–50 participants
                  </li>
                </ul>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#581c24] bg-[#a67c00] text-white font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                2
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-xl text-[#a67c00]">
                    Carpet Brand Acceleration
                  </h3>
                  <span className="text-xs font-semibold px-2 py-1 bg-white/10 rounded-md">
                    1 Month
                  </span>
                </div>
                <ul className="space-y-2 mt-4 text-[#f5ebd9] text-sm grid grid-cols-1 sm:grid-cols-2 gap-x-2">
                  <li className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-[#a67c00]" /> Design
                    training
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-[#a67c00]" /> Quality
                    improvement
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-[#a67c00]" /> Branding
                    & packaging
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-[#a67c00]" /> Digital
                    marketing
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-[#a67c00]" /> Export
                    documentation
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-[#a67c00]" /> Buyer
                    pitching
                  </li>
                </ul>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#581c24] bg-[#a67c00] text-white font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                3
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-xl text-[#a67c00]">
                    Carpet Conclave & Awards
                  </h3>
                  <span className="text-xs font-semibold px-2 py-1 bg-white/10 rounded-md">
                    1 month
                  </span>
                </div>
                <ul className="space-y-2 mt-4 text-[#f5ebd9] text-sm grid grid-cols-1 sm:grid-cols-2 gap-x-2">
                  <li className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-[#a67c00]" /> Product
                    exhibition
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-[#a67c00]" />{" "}
                    Buyer-seller meet
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-[#a67c00]" /> Investor
                    meetings
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-[#a67c00]" />{" "}
                    Excellence Awards
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-[#a67c00]" /> Media
                    showcase
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-[#a67c00]" /> Market
                    launch
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Eligibility Section */}
      <section id="eligibility" className="py-20 bg-[#fbf9f6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#581c24] mb-4">
              Who Can Apply?
            </h2>
            <div className="w-24 h-1 bg-[#a67c00] mx-auto rounded-full"></div>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Carpet Artisans",
              "Weavers",
              "Carpet Manufacturers",
              "Exporters",
              "SHGs",
              "Cooperatives",
              "MSMEs",
              "Emerging Carpet Brands",
              "Women-led enterprises",
            ].map((item, idx) => (
              <span
                key={idx}
                className="bg-white border border-[#a67c00]/30 text-[#581c24] px-6 py-3 rounded-full shadow-sm font-semibold hover:bg-[#a67c00] hover:text-white hover:border-[#a67c00] transition-colors cursor-pointer"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Application Section */}
      <section id="apply" className="py-24 bg-[#581c24] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Join the Accelerator Program
            </h2>
            <p className="text-[#f5ebd9]">
              Complete the application form to secure your spot in the 2026
              Accelerator.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden text-gray-800">
            {/* Step Indicators */}
            <div className="bg-[#f5ebd9] px-8 py-4 flex justify-between border-b border-gray-200">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${activeStep >= step ? "bg-[#581c24] text-white" : "bg-gray-200 text-gray-400"}`}
                  >
                    {step}
                  </div>
                  <span
                    className={`hidden sm:block text-sm font-semibold ${activeStep >= step ? "text-[#581c24]" : "text-gray-400"}`}
                  >
                    {step === 1
                      ? "Personal Info"
                      : step === 2
                        ? "Business Info"
                        : "Market & Support"}
                  </span>
                </div>
              ))}
            </div>

            <form className="p-8 md:p-12" onSubmit={submitApplication}>
              {/* Step 1: Personal & Basic Info */}
              {activeStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-2xl font-bold text-[#581c24] mb-6">
                    Step 1: Basic Information (मूल जानकारी)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Name of the Owner (मालिक का नाम){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#a67c00] outline-none"
                        placeholder="Enter owner's name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Owner's Mobile No (मालिक का मोबाइल नंबर){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="mobileNo"
                        value={formData.mobileNo}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#a67c00] outline-none"
                        placeholder="+91"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        District (जिला) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#a67c00] outline-none"
                        placeholder="Enter district"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Business Profile */}
              {activeStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-2xl font-bold text-[#581c24] mb-6">
                    Step 2: Business Profile (व्यवसाय प्रोफ़ाइल)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Name of Organisation (संगठन का नाम)
                      </label>
                      <input
                        type="text"
                        name="organisationName"
                        value={formData.organisationName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#a67c00] outline-none"
                        placeholder="Enter organisation name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Organisation Type (संगठन का प्रकार){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="orgType"
                        value={formData.orgType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#a67c00] outline-none bg-white"
                      >
                        <option value="">Select Type</option>
                        <option value="Proprietorship">Proprietorship</option>
                        <option value="Company">Company, कंपनी</option>
                        <option value="Farmer">Farmer, किसान</option>
                        <option value="SHG">
                          Self Help Group (SHG), स्वयं सहायता समूह
                        </option>
                        <option value="FPO">
                          Farmer Producer Organisation (FPO)
                        </option>
                        <option value="FPC">
                          Farmer Producer Company (FPC)
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Export Situation (निर्यात की स्थिति){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="exportSituation"
                        value={formData.exportSituation}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#a67c00] outline-none bg-white"
                      >
                        <option value="">Select Situation</option>
                        <option value="Direct">
                          Direct Export or through trader
                        </option>
                        <option value="Domestic">
                          Domestic Exporter (घरेलू निर्यातक)
                        </option>
                        <option value="Local">
                          Local Trader (स्थानीय व्यापारी)
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Production Capacity (उत्पादन क्षमता){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="productionCapacity"
                        value={formData.productionCapacity}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#a67c00] outline-none"
                        placeholder="e.g. 1000 units/month"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Number of Employees (कर्मचारियों की संख्या)
                      </label>
                      <input
                        type="number"
                        name="employees"
                        value={formData.employees}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#a67c00] outline-none"
                        placeholder="e.g. 50"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Profile of Manufacturer / Seller (Working Process){" "}
                        <br />
                        <span className="text-xs text-gray-500 font-normal">
                          निर्माता/विक्रेता का प्रोफाइल (कार्यप्रणाली)
                        </span>{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="workingProcess"
                        value={formData.workingProcess}
                        onChange={handleInputChange}
                        required
                        rows="2"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#a67c00] outline-none resize-none"
                        placeholder="Describe your working process..."
                      ></textarea>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Value-added products (if any): Please mention <br />
                        <span className="text-xs text-gray-500 font-normal">
                          (मूल्य संवर्धित उत्पाद (यदि कोई हों): कृपया उल्लेख
                          करें।)
                        </span>
                      </label>
                      <input
                        type="text"
                        name="valueAddedProducts"
                        value={formData.valueAddedProducts}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#a67c00] outline-none"
                        placeholder="Mention value-added products"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Social media page or GI tag details <br />
                        <span className="text-xs text-gray-500 font-normal">
                          (यदि आपके पास कोई सोशल मीडिया पेज है या जीआई टैग है,
                          तो उसका उल्लेख करें।)
                        </span>
                      </label>
                      <input
                        type="text"
                        name="socialMediaOrGI"
                        value={formData.socialMediaOrGI}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#a67c00] outline-none"
                        placeholder="Links or GI tag info"
                      />
                    </div>

                    {/* New Question: Export to other countries */}
                    <div className="md:col-span-2 space-y-4">
                      {/* Question 1: Export? */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Do you export to other countries?
                        </label>
                        <div className="flex gap-6">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="isExporting"
                              value="Yes"
                              onChange={handleInputChange}
                              checked={formData.isExporting === "Yes"}
                              className="w-4 h-4"
                            />{" "}
                            Yes
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="isExporting"
                              value="No"
                              onChange={handleInputChange}
                              checked={formData.isExporting === "No"}
                              className="w-4 h-4"
                            />{" "}
                            No
                          </label>
                        </div>
                      </div>

                      {/* Question 2: Country Name (Visible only if Yes) */}
                      {formData.isExporting === "Yes" && (
                        <div className="animate-fade-in">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            If Yes, please mention countries (देशों के नाम)
                          </label>
                          <input
                            type="text"
                            name="exportCountries"
                            value={formData.exportCountries}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#a67c00] outline-none"
                            placeholder="e.g., USA, Germany, UAE"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Documents & Needs */}
              {activeStep === 3 && (
                <div className="space-y-8 animate-fade-in">
                  <h3 className="text-2xl font-bold text-[#581c24] mb-6">
                    Step 3: Documents & Training Needs (दस्तावेज़ और प्रशिक्षण)
                  </h3>

                  {/* Checkboxes Section */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Company Documents available (कंपनी के दस्तावेज़ उपलब्ध
                        हैं) <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          "Registration / Gumasta etc.",
                          "GST Registration",
                          "Bank Account",
                          "Import Export Certificate (IEC)",
                          "PAN Card",
                          "Other",
                        ].map((doc) => (
                          <label
                            key={doc}
                            className="flex items-start gap-2 text-sm text-gray-700 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              value={doc}
                              onChange={(e) =>
                                handleCheckboxChange(
                                  e,
                                  docsAvailable,
                                  setDocsAvailable,
                                )
                              }
                              className="w-4 h-4 mt-0.5 text-[#581c24] focus:ring-[#a67c00] rounded"
                            />
                            <span>{doc}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Training Need Identified (प्रशिक्षण की आवश्यकता){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          "Product (Designing / Enhancement)",
                          "Process (प्रक्रिया)",
                          "Packing (पैकिंग)",
                          "Documentation (दास्तावेज़)",
                          "Marketing and Branding",
                          "Selling and Supply Chain",
                          "Market Research (Product / Intelligence)",
                          "Export Related (निर्यात संबंधी)",
                          "Other",
                        ].map((need) => (
                          <label
                            key={need}
                            className="flex items-start gap-2 text-sm text-gray-700 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              value={need}
                              onChange={(e) =>
                                handleCheckboxChange(
                                  e,
                                  trainingNeeds,
                                  setTrainingNeeds,
                                )
                              }
                              className="w-4 h-4 mt-0.5 text-[#581c24] focus:ring-[#a67c00] rounded"
                            />
                            <span>{need}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* File Uploads Section */}
                  <div className="pt-6 border-t border-gray-200">
                    <h4 className="text-lg font-bold text-[#581c24] mb-4">
                      Document Uploads (Max 10 MB each)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Aadhar card image (आधार कार्ड तस्वीर){" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="file"
                          required
                          onChange={(e) => handleFileChange(e, "aadharCard")}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#f5ebd9] file:text-[#581c24] hover:file:bg-[#e6d5bc] transition-all border border-gray-300 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Pan Card (पैन कार्ड चित्र)
                        </label>
                        <input
                          type="file"
                          onChange={(e) => handleFileChange(e, "panCard")}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#f5ebd9] file:text-[#581c24] hover:file:bg-[#e6d5bc] transition-all border border-gray-300 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Products manufactured (निर्मित उत्पाद)
                        </label>
                        <input
                          type="file"
                          onChange={(e) => handleFileChange(e, "productsImage")}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#f5ebd9] file:text-[#581c24] hover:file:bg-[#e6d5bc] transition-all border border-gray-300 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Company's brochure or catalogue
                        </label>
                        <input
                          type="file"
                          onChange={(e) => handleFileChange(e, "brochure")}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#f5ebd9] file:text-[#581c24] hover:file:bg-[#e6d5bc] transition-all border border-gray-300 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Image of Social Media Page or GI Tag
                        </label>
                        <input
                          type="file"
                          onChange={(e) =>
                            handleFileChange(e, "socialMediaImage")
                          }
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#f5ebd9] file:text-[#581c24] hover:file:bg-[#e6d5bc] transition-all border border-gray-300 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Other Above Mentioned documents (PDF)
                        </label>
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleFileChange(e, "otherDocs")}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#f5ebd9] file:text-[#581c24] hover:file:bg-[#e6d5bc] transition-all border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Navigation Controls (Hidden if successful) */}
              {activeStep < 4 && (
                <div className="mt-10 flex justify-between pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    disabled={activeStep === 1}
                    className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition-all ${activeStep === 1 ? "opacity-0 pointer-events-none" : "text-[#581c24] bg-rose-50 hover:bg-rose-100"}`}
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>

                  {activeStep < 3 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex items-center gap-2 px-8 py-3 font-semibold rounded-lg text-white bg-[#581c24] hover:bg-[#43151b] shadow-md transition-all"
                    >
                      Next <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 px-8 py-3 font-semibold rounded-lg text-white bg-[#a67c00] hover:bg-[#8e6a00] shadow-md transition-all disabled:opacity-70"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}{" "}
                      <Send className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </form>

            {/* NEW STEP 4: SUCCESS MESSAGE & WHATSAPP LINK */}
            {activeStep === 4 && (
              <div
                id="success-section"
                className="text-center py-12 animate-fade-in"
              >
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>

                <h3 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
                  Registration Successful!
                </h3>

                <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
                  Your application has been submitted successfully to the Carpet
                  Accelerator program. Please join our official WhatsApp group
                  for important updates and next steps.
                </p>

                <a
                  href="https://chat.whatsapp.com/HUKOaGdqPzj0D3zMofEEv6"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#1ebd57] transition-all shadow-lg hover:-translate-y-1"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="WhatsApp"
                    className="w-6 h-6"
                  />
                  Join WhatsApp Group
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 11. Contact Section */}
      <section className="py-20 bg-[#fbf9f6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-[#581c24] mb-6">
                Contact Us
              </h2>
              <p className="text-gray-600 mb-10">
                Have questions about the program? Reach out to our support team.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-[#a67c00] shrink-0">
                    <MapPin />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Address</h4>
                    <p className="text-gray-600 mt-1">
                      MP Industrial Development Corporation Ltd.
                      <br />
                      21, Arera Hills, Bhopal, 462011
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-[#a67c00] shrink-0">
                    <Phone />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Phone</h4>
                    <p className="text-gray-600 mt-1">
                     0755 257 7145
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-[#a67c00] shrink-0">
                    <Mail />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Email</h4>
                    <p className="text-gray-600 mt-1">
                      Export.investment@mpidc.co.in
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name" /* YEH ADD KIYA */
                      value={contactData.name} /* YEH ADD KIYA */
                      onChange={handleContactChange} /* YEH ADD KIYA */
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#a67c00] focus:border-transparent outline-none transition-all"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email" /* YEH ADD KIYA */
                      value={contactData.email} /* YEH ADD KIYA */
                      onChange={handleContactChange} /* YEH ADD KIYA */
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#a67c00] focus:border-transparent outline-none transition-all"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject" /* YEH ADD KIYA */
                    value={contactData.subject} /* YEH ADD KIYA */
                    onChange={handleContactChange} /* YEH ADD KIYA */
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#a67c00] focus:border-transparent outline-none transition-all"
                    placeholder="How can we help?"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Number
                  </label>
                  <input
                    type="text"
                    name="number" /* YEH ADD KIYA */
                    value={contactData.number} /* YEH ADD KIYA */
                    onChange={handleContactChange} /* YEH ADD KIYA */
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#a67c00] focus:border-transparent outline-none transition-all"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    name="message" /* YEH ADD KIYA */
                    value={contactData.message} /* YEH ADD KIYA */
                    onChange={handleContactChange} /* YEH ADD KIYA */
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#a67c00] focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Your message here..."
                    required
                  ></textarea>
                </div>
                <button
                  type="button"
                  onClick={handleContactSubmit}
                  disabled={contactLoading}
                  className="w-full bg-[#581c24] text-white font-bold py-4 rounded-lg hover:bg-[#43151b] transition-colors shadow-md disabled:opacity-50 flex justify-center"
                >
                  {contactLoading ? "Sending..." : "Send Query"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Footer */}
      <footer className="bg-[#1a1a1a] text-white pt-16 pb-8 border-t-4 border-[#a67c00]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <Globe className="text-[#a67c00] w-6 h-6" />
                <span className="font-bold text-xl tracking-tight text-white">
                  Carpet<span className="text-[#a67c00]">Accelerator</span>
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Empowering carpet makers to move from local looms to global
                rooms.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <a
                    href="#about"
                    className="hover:text-[#a67c00] transition-colors"
                  >
                    About Program
                  </a>
                </li>
                <li>
                  <a
                    href="#benefits"
                    className="hover:text-[#a67c00] transition-colors"
                  >
                    Benefits
                  </a>
                </li>
                <li>
                  <a
                    href="#eligibility"
                    className="hover:text-[#a67c00] transition-colors"
                  >
                    Eligibility Criteria
                  </a>
                </li>
                <li>
                  <a
                    href="#apply"
                    className="hover:text-[#a67c00] transition-colors"
                  >
                    Apply Now
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-white">
                Contact Info
              </h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#a67c00]" /> Bhopal, MP
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#a67c00]" /> 0755-2577145
                </li>
               
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Newsletter</h4>
              <p className="text-sm text-gray-400 mb-4">
                Subscribe for updates on future programs and initiatives.
              </p>
              <div className="flex bg-white/10 rounded-lg p-1 border border-white/20">
                <input
                  type="email"
                  placeholder="Email address"
                  className="bg-transparent w-full px-3 py-2 text-sm text-white outline-none"
                />
                <button className="bg-[#a67c00] text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-[#8e6a00] transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 Carpet Accelerator. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-gray-500">
              <span className="hover:text-white cursor-pointer transition-colors">
                Privacy Policy
              </span>
              <span className="hover:text-white cursor-pointer transition-colors">
                Terms of Service
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Styles Addition for smooth scrolling & animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        html { scroll-behavior: smooth; }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `,
        }}
      />
    </div>
  );
};

export default CarpetAccelerator;
