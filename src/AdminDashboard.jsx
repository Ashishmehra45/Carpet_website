import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, FileText, Settings, LogOut, 
  Search, Bell, Eye, Download, CheckCircle, XCircle, 
  MapPin, Phone, Mail, Building, Briefcase, FileCheck, 
  TrendingUp, Calendar, ChevronLeft, Filter
} from 'lucide-react';

// Dummy data representing exactly what we mapped in the MongoDB Schema
const dummyApplications = [
  {
    _id: "APP-2026-001",
    createdAt: "2026-05-18",
    status: "Pending",
    ownerName: "Ramesh Ansari",
    mobileNo: "+91-9876543210",
    district: "Bhadohi",
    organisationName: "Ansari Carpet Weavers",
    orgType: "Self Help Group (SHG)",
    exportSituation: "Local Trader",
    productionCapacity: "500 sq ft / month",
    employees: 15,
    workingProcess: "Hand-knotted traditional Persian designs using pure wool and natural dyes. We source raw material locally and weave in our village setup.",
    valueAddedProducts: "Silk-infused rugs, custom size carpets",
    socialMediaOrGI: "GI Tag: Bhadohi Carpets, Insta: @ansariweavers",
    companyDocumentsAvailable: ["Registration / Gumasta etc.", "Bank Account", "PAN Card"],
    trainingNeeds: ["Product (Designing / Enhancement)", "Export Related", "Marketing and Branding"],
    files: {
      aadharCard: "aadhar-123.pdf",
      panCard: "pan-123.pdf",
      productsImage: "products-123.jpg",
      brochure: "brochure-123.pdf",
      socialMediaImage: "gi-tag-123.jpg",
      otherDocs: "other-123.pdf"
    }
  },
  {
    _id: "APP-2026-002",
    createdAt: "2026-05-17",
    status: "Approved",
    ownerName: "Sunita Devi",
    mobileNo: "+91-9123456780",
    district: "Mirzapur",
    organisationName: "Mirzapur Loom FPC",
    orgType: "Farmer Producer Company (FPC)",
    exportSituation: "Domestic Exporter",
    productionCapacity: "2000 sq ft / month",
    employees: 45,
    workingProcess: "Large scale manufacturing of tufted carpets. Working with 45 women weavers across 3 villages.",
    valueAddedProducts: "Cotton Dhurries, Jute mats",
    socialMediaOrGI: "Facebook: MirzapurLoom",
    companyDocumentsAvailable: ["GST Registration", "Import Export Certificate (IEC)", "Bank Account"],
    trainingNeeds: ["Selling and Supply Chain", "Process (प्रक्रिया)", "Packing (पैकिंग)"],
    files: {
      aadharCard: "aadhar-456.pdf",
      panCard: null,
      productsImage: "products-456.jpg",
      brochure: null,
      socialMediaImage: null,
      otherDocs: null
    }
  }
];

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApp, setSelectedApp] = useState(null); // Controls the detail modal

  // Filter logic for search bar
  const filteredApps = dummyApplications.filter(app => 
    app.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    app.organisationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#f3f4f6] font-sans text-gray-800">
      
      {/* 1. Sidebar */}
      <aside className="w-64 bg-[#1a1a1a] text-white flex flex-col hidden md:flex">
        <div className="h-20 flex items-center px-6 border-b border-gray-800">
          <span className="font-bold text-xl tracking-tight text-white">Carpet<span className="text-[#a67c00]">Admin</span></span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-[#581c24] text-white rounded-lg font-medium transition-colors">
            <LayoutDashboard className="w-5 h-5 text-[#a67c00]" /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg font-medium transition-colors">
            <FileText className="w-5 h-5" /> Applications
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg font-medium transition-colors">
            <Users className="w-5 h-5" /> Users
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg font-medium transition-colors">
            <Settings className="w-5 h-5" /> Settings
          </a>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-gray-800 w-full rounded-lg font-medium transition-colors">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-10 shrink-0">
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-full max-w-md border border-gray-200 focus-within:ring-2 focus-within:ring-[#a67c00] transition-all">
            <Search className="w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name, org, or district..." 
              className="bg-transparent border-none outline-none ml-2 w-full text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-gray-500 hover:text-[#581c24] transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-10 h-10 bg-[#581c24] text-white font-bold rounded-full flex items-center justify-center border-2 border-[#a67c00]">
              A
            </div>
          </div>
        </header>

        {/* Dashboard Content (Visible if no app is selected) */}
        {!selectedApp ? (
          <div className="flex-1 overflow-y-auto p-6 lg:p-10">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800">Applications Overview</h1>
              <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 shadow-sm">
                <Filter className="w-4 h-4" /> Filter
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                { title: "Total Applications", value: "124", color: "text-blue-600", bg: "bg-blue-50" },
                { title: "Pending Review", value: "45", color: "text-yellow-600", bg: "bg-yellow-50" },
                { title: "Approved", value: "72", color: "text-green-600", bg: "bg-green-50" },
                { title: "Rejected", value: "7", color: "text-red-600", bg: "bg-red-50" },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
                  <span className="text-sm font-semibold text-gray-500 mb-2">{stat.title}</span>
                  <div className="flex items-center gap-3">
                    <span className={`text-3xl font-bold text-gray-800`}>{stat.value}</span>
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${stat.bg} ${stat.color}`}>+12%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                      <th className="p-4 font-semibold">App ID</th>
                      <th className="p-4 font-semibold">Applicant / Org</th>
                      <th className="p-4 font-semibold">District</th>
                      <th className="p-4 font-semibold">Type</th>
                      <th className="p-4 font-semibold">Date</th>
                      <th className="p-4 font-semibold">Status</th>
                      <th className="p-4 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredApps.map((app) => (
                      <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 text-sm font-medium text-gray-900">{app._id}</td>
                        <td className="p-4">
                          <p className="text-sm font-bold text-gray-900">{app.ownerName}</p>
                          <p className="text-xs text-gray-500">{app.organisationName}</p>
                        </td>
                        <td className="p-4 text-sm text-gray-600">{app.district}</td>
                        <td className="p-4 text-sm text-gray-600">{app.orgType}</td>
                        <td className="p-4 text-sm text-gray-600">{app.createdAt}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            app.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                            app.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => setSelectedApp(app)}
                            className="text-[#581c24] bg-rose-50 hover:bg-[#581c24] hover:text-white px-3 py-1.5 rounded-md text-sm font-semibold transition-all border border-rose-100 flex items-center gap-1 inline-flex"
                          >
                            <Eye className="w-4 h-4" /> View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          
          /* 3. Detailed View (Full Page Overlay for a specific application) */
          <div className="flex-1 overflow-y-auto bg-white animate-fade-in relative">
            
            {/* Action Header Sticky */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10 shadow-sm">
              <button 
                onClick={() => setSelectedApp(null)}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-semibold transition-colors"
              >
                <ChevronLeft className="w-5 h-5" /> Back to List
              </button>
              <div className="flex gap-3">
                <button className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-100 flex items-center gap-2 transition-colors">
                  <XCircle className="w-4 h-4" /> Reject
                </button>
                <button className="bg-green-50 text-green-700 border border-green-200 px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-100 flex items-center gap-2 transition-colors">
                  <CheckCircle className="w-4 h-4" /> Approve
                </button>
              </div>
            </div>

            <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-8">
              
              {/* Header Info */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-extrabold text-[#581c24]">{selectedApp.ownerName}</h2>
                  <p className="text-lg text-[#a67c00] font-medium mt-1">{selectedApp.organisationName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 mb-1">Application ID</p>
                  <p className="font-mono font-bold text-gray-800 bg-gray-100 px-3 py-1 rounded border border-gray-200">{selectedApp._id}</p>
                </div>
              </div>

              {/* Grid 1: Basic Info */}
              <div className="bg-[#fbf9f6] rounded-xl border border-[#e6d5bc] overflow-hidden">
                <div className="bg-[#581c24] px-6 py-3 border-b border-[#e6d5bc]">
                  <h3 className="font-bold text-white flex items-center gap-2"><Users className="w-5 h-5 text-[#a67c00]"/> Basic Information</h3>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase mb-1 flex items-center gap-1"><Phone className="w-3 h-3"/> Mobile No.</p>
                    <p className="font-medium text-gray-900">{selectedApp.mobileNo}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase mb-1 flex items-center gap-1"><MapPin className="w-3 h-3"/> District</p>
                    <p className="font-medium text-gray-900">{selectedApp.district}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase mb-1 flex items-center gap-1"><Calendar className="w-3 h-3"/> Applied On</p>
                    <p className="font-medium text-gray-900">{selectedApp.createdAt}</p>
                  </div>
                </div>
              </div>

              {/* Grid 2: Business Profile */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2"><Building className="w-5 h-5 text-gray-500"/> Business Profile</h3>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Organisation Type</p>
                    <p className="font-medium text-gray-900 bg-gray-100 inline-block px-2 py-1 rounded text-sm">{selectedApp.orgType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Export Situation</p>
                    <p className="font-medium text-gray-900 bg-blue-50 text-blue-700 border border-blue-100 inline-block px-2 py-1 rounded text-sm">{selectedApp.exportSituation}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Production Capacity</p>
                    <p className="font-medium text-gray-900 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-600"/> {selectedApp.productionCapacity}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase mb-1">No. of Employees</p>
                    <p className="font-medium text-gray-900 flex items-center gap-2"><Users className="w-4 h-4 text-gray-400"/> {selectedApp.employees} workers</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Working Process Profile</p>
                    <p className="font-medium text-gray-800 bg-gray-50 p-4 rounded-lg border border-gray-100 leading-relaxed text-sm">
                      {selectedApp.workingProcess}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Value Added Products</p>
                    <p className="font-medium text-gray-900">{selectedApp.valueAddedProducts || "N/A"}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Social Media / GI Tag</p>
                    <p className="font-medium text-[#a67c00]">{selectedApp.socialMediaOrGI || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Grid 3: Arrays (Needs & Docs Checkboxes) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                  <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2"><FileCheck className="w-5 h-5 text-gray-500"/> Documents Claimed</h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      {selectedApp.companyDocumentsAvailable.map((doc, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700 font-medium">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                  <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2"><Briefcase className="w-5 h-5 text-gray-500"/> Training Needs</h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      {selectedApp.trainingNeeds.map((need, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700 font-medium">
                          <CheckCircle className="w-4 h-4 text-[#a67c00] shrink-0 mt-0.5" /> {need}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Grid 4: Uploaded Files (Downloads) */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-10">
                <div className="bg-[#581c24] px-6 py-3 border-b border-[#581c24]">
                  <h3 className="font-bold text-white flex items-center gap-2"><Download className="w-5 h-5 text-[#a67c00]"/> Uploaded Files</h3>
                </div>
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(selectedApp.files).map(([key, fileUrl]) => (
                    <div key={key} className={`border rounded-lg p-4 flex items-center justify-between transition-all ${fileUrl ? 'bg-gray-50 border-gray-200 hover:border-[#a67c00]' : 'bg-gray-50/50 border-dashed border-gray-200'}`}>
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                        <p className={`text-sm mt-1 font-medium ${fileUrl ? 'text-[#581c24]' : 'text-gray-400 italic'}`}>
                          {fileUrl ? fileUrl.substring(0, 15) + "..." : "Not uploaded"}
                        </p>
                      </div>
                      {fileUrl && (
                        <a href={`/uploads/${fileUrl}`} target="_blank" rel="noreferrer" className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#a67c00] hover:border-[#a67c00] transition-colors shadow-sm">
                          <Download className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}
      </main>
      
      <style dangerouslySetInnerHTML={{__html: `
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
};

export default AdminDashboard;