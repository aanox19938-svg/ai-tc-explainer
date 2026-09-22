import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Trash2, Clock, ChevronRight } from 'lucide-react';
import axios from 'axios';

export default function DocumentLibrary() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/documents')
      .then(res => setDocuments(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const deleteDocument = async (id) => {
    if (!confirm('Are you sure you want to delete this document?')) return;
    try {
      await axios.delete(`/api/documents/${id}`);
      setDocuments(prev => prev.filter(d => d._id !== id));
    } catch {
      alert('Failed to delete document');
    }
  };

  if (loading) return <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div>;
  if (!documents.length) return <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300"><FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" /><p className="text-gray-500">No documents yet. Upload your first T&C!</p></div>;

  return (
    <div className="space-y-3">
      {documents.map(doc => (
        <div key={doc._id} className="card p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="bg-primary-50 p-3 rounded-lg"><FileText className="h-6 w-6 text-primary-600" /></div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 truncate">{doc.file_name}</h4>
            <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
              <span className="capitalize">{doc.file_type}</span>
              <span>•</span>
              <span>{new Date(doc.upload_date).toLocaleDateString()}</span>
              {doc.status === 'processing' && <span className="flex items-center gap-1 text-yellow-600"><Clock className="h-3 w-3" /> Processing</span>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to={`/document/${doc._id}`} className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"><ChevronRight className="h-5 w-5" /></Link>
            <button onClick={() => deleteDocument(doc._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="h-5 w-5" /></button>
          </div>
        </div>
      ))}
    </div>
  );
}