import { useState, useCallback } from 'react';
import { Upload, FileText, Type, X, Loader2, CheckCircle } from 'lucide-react';
import axios from 'axios';

export default function UploadZone({ onAnalysisComplete }) {
  const [activeTab, setActiveTab] = useState('file');
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf' || droppedFile.type.includes('wordprocessingml')) {
        setFile(droppedFile);
        setError('');
      } else {
        setError('Please upload a PDF or DOCX file');
      }
    }
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const handleSubmit = async () => {
    setError('');
    setSuccess(false);
    if (activeTab === 'file' && !file) {
      setError('Please select a file');
      return;
    }
    if (activeTab === 'text' && (!text || text.trim().length < 50)) {
      setError('Please enter at least 50 characters of text');
      return;
    }

    setLoading(true);
    try {
      let response;
      if (activeTab === 'file') {
        const formData = new FormData();
        formData.append('file', file);
        response = await axios.post('/api/documents/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        response = await axios.post('/api/documents/upload', { text });
      }
      setSuccess(true);
      if (onAnalysisComplete) onAnalysisComplete(response.data);
      setTimeout(() => {
        setFile(null);
        setText('');
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze document. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Terms & Conditions</h2>
        <p className="text-gray-600">We'll analyze it and highlight the important stuff in plain English</p>
      </div>

      <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
        <button onClick={() => { setActiveTab('file'); setError(''); }} className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md font-medium text-sm transition-all ${activeTab === 'file' ? 'bg-white text-primary-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
          <FileText className="h-4 w-4" /> Upload File
        </button>
        <button onClick={() => { setActiveTab('text'); setError(''); }} className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md font-medium text-sm transition-all ${activeTab === 'text' ? 'bg-white text-primary-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
          <Type className="h-4 w-4" /> Paste Text
        </button>
      </div>

      {activeTab === 'file' && (
        <div onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${dragActive ? 'border-primary-500 bg-primary-50' : file ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'}`}>
          {file ? (
            <div className="flex items-center justify-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
              <button onClick={() => setFile(null)} className="ml-4 text-gray-400 hover:text-red-500">
                <X className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <>
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-700 font-medium mb-1">Drop your file here, or <span className="text-primary-600">browse</span></p>
              <p className="text-sm text-gray-500">Supports PDF and DOCX files</p>
              <input type="file" accept=".pdf,.docx" onChange={handleFileChange} className="hidden" id="file-input" />
              <label htmlFor="file-input" className="mt-4 inline-block px-4 py-2 bg-primary-50 text-primary-700 rounded-lg font-medium text-sm cursor-pointer hover:bg-primary-100 transition-colors">Choose File</label>
            </>
          )}
        </div>
      )}

      {activeTab === 'text' && (
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste your Terms & Conditions text here..." className="w-full h-64 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none text-sm leading-relaxed" />
      )}

      {error && <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}
      {success && <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Document analyzed successfully! Redirecting...</div>}

      <button onClick={handleSubmit} disabled={loading || success} className="w-full mt-6 btn-primary flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
        {loading ? <><Loader2 className="h-5 w-5 animate-spin" /> Analyzing with AI...</> : <><FileText className="h-5 w-5" /> Analyze Document</>}
      </button>

      <p className="text-center text-xs text-gray-500 mt-4">Your document is processed securely and never shared with third parties</p>
    </div>
  );
}