import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, Eye, Download, ChevronLeft, FileCheck 
} from 'lucide-react';
import { CSVLink } from 'react-csv';
import API_URL from './config/config'; 
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`${API_URL}/applications`);
        setApplications(response.data.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
        toast.error("Error fetching applications"); 
      }
    };
    fetchApplications();
  }, []);

  const filteredApps = applications.filter(app => 
    app.ownerName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    app.organisationName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#f3f4f6] font-sans text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1a1a] text-white hidden md:flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-gray-800">
          <span className="font-bold text-xl text-white">Carpet<span className="text-[#a67c00]">Admin</span></span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <button className="flex items-center gap-3 w-full px-4 py-3 bg-[#581c24] text-white rounded-lg font-medium">
            <LayoutDashboard className="w-5 h-5 text-[#a67c00]" /> Dashboard
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b flex items-center justify-between px-10">
          <input 
            type="text" placeholder="Search applications..." 
            className="bg-gray-100 px-4 py-2 rounded-lg w-80 outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <CSVLink 
            data={applications} 
            filename={"Carpet_Applications.csv"}
            className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-green-700 transition-all"
          >
            <Download className="w-4 h-4" /> Export Excel
          </CSVLink>
        </header>

        <div className="flex-1 overflow-y-auto p-10">
          {!selectedApp ? (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                  <tr>
                    <th className="p-4">App ID</th><th className="p-4">Name</th><th className="p-4">District</th><th className="p-4">Status</th><th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredApps.map((app) => (
                    <tr key={app._id} className="hover:bg-gray-50">
                      <td className="p-4 font-bold">{app._id}</td>
                      <td className="p-4">{app.ownerName}</td>
                      <td className="p-4">{app.district}</td>
                      <td className="p-4"><span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">{app.status || 'Pending'}</span></td>
                      <td className="p-4 text-right">
                        <button onClick={() => setSelectedApp(app)} className="text-[#581c24] font-bold flex items-center gap-1 justify-end w-full">
                          <Eye className="w-4 h-4" /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-xl shadow-lg border">
              <button onClick={() => setSelectedApp(null)} className="mb-6 flex items-center text-gray-500 font-bold"><ChevronLeft /> Back</button>
              <h2 className="text-3xl font-extrabold text-[#581c24] mb-6">Details for {selectedApp.ownerName}</h2>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="p-4 bg-gray-50 rounded-lg"><p className="text-xs text-gray-500 uppercase font-bold">Organisation</p><p className="font-bold">{selectedApp.organisationName}</p></div>
                <div className="p-4 bg-gray-50 rounded-lg"><p className="text-xs text-gray-500 uppercase font-bold">Mobile</p><p className="font-bold">{selectedApp.mobileNo}</p></div>
                <div className="col-span-2 p-4 bg-gray-50 rounded-lg"><p className="text-xs text-gray-500 uppercase font-bold">Working Process</p><p className="font-bold">{selectedApp.workingProcess}</p></div>
                <div className="col-span-2 p-4 bg-gray-50 rounded-lg"><p className="text-xs text-gray-500 uppercase font-bold">Training Needs</p><p className="font-bold">{selectedApp.trainingNeeds?.join(', ')}</p></div>
              </div>

              {/* Uploaded Documents Section */}
              <div className="mt-8">
                <h4 className="font-bold text-lg text-[#581c24] mb-4 border-b pb-2">Uploaded Documents</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedApp.files && Object.entries(selectedApp.files).map(([key, filePath]) => (
                    filePath ? (
                      <a 
                        key={key}
                        href={filePath} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center gap-3 p-4 bg-blue-50 text-blue-700 rounded-lg border border-blue-200 hover:bg-blue-100 transition-all font-semibold text-sm"
                      >
                        <FileCheck className="w-5 h-5" />
                        {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                      </a>
                    ) : (
                      <div key={key} className="p-4 bg-gray-100 text-gray-400 rounded-lg border border-dashed text-sm">
                        {key.replace(/([A-Z])/g, ' $1').toUpperCase()} (N/A)
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;