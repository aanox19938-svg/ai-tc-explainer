import { useState } from 'react';
import UploadZone from "../UploadZone";
import DocumentLibrary from "../DocumentLibrary";
import { useNavigate } from 'react-router-dom';
import { Upload, History } from 'lucide-react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('upload');
  const navigate = useNavigate();

  const handleAnalysisComplete = (data) => {
    if (data.documentId) setTimeout(() => navigate(`/document/${data.documentId}`), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Analyze documents and review your history</p>
      </div>
      <div className="flex gap-4 mb-8 border-b border-gray-200">
        <button onClick={() => setActiveTab('upload')} className={`flex items-center gap-2 pb-4 px-2 font-medium border-b-2 transition-colors ${activeTab === 'upload' ? 'border-primary-600 text-primary-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}><Upload className="h-4 w-4" /> New Analysis</button>
        <button onClick={() => setActiveTab('history')} className={`flex items-center gap-2 pb-4 px-2 font-medium border-b-2 transition-colors ${activeTab === 'history' ? 'border-primary-600 text-primary-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}><History className="h-4 w-4" /> Document History</button>
      </div>
      {activeTab === 'upload' ? <UploadZone onAnalysisComplete={handleAnalysisComplete} /> : <DocumentLibrary />}
    </div>
  );
}