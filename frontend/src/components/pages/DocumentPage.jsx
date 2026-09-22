import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import SummaryView from "../SummaryView";
import Chatbot from "../Chatbot";
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';

export default function DocumentPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`/api/documents/${id}`)
      .then(res => setData(res.data))
      .catch(() => setError('Failed to load document analysis'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="min-h-[calc(100vh-64px)] flex items-center justify-center"><div className="text-center"><Loader2 className="h-10 w-10 animate-spin text-primary-600 mx-auto mb-4" /><p className="text-gray-600">Loading analysis...</p></div></div>;
  if (error || !data) return <div className="min-h-[calc(100vh-64px)] flex items-center justify-center"><div className="text-center"><AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-4" /><p className="text-gray-700 font-medium">{error || 'Document not found'}</p><Link to="/dashboard" className="text-primary-600 hover:underline mt-2 inline-block">Back to Dashboard</Link></div></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"><ArrowLeft className="h-4 w-4" /> Back to Dashboard</Link>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2"><SummaryView summary={data.summary?.summary_text || ''} clauses={data.clauses || []} documentName={data.document?.file_name} /></div>
        <div className="lg:col-span-1"><Chatbot documentId={id} /></div>
      </div>
    </div>
  );
}