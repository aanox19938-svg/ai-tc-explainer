import { Users, FileText, MessageSquare, Shield } from 'lucide-react';

export default function AdminPage() {
  const stats = { users: 1, documents: 0, chats: 0 };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Shield className="h-8 w-8 text-primary-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600">System overview and management</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {[{ label: 'Total Users', value: stats.users, icon: Users, color: 'bg-blue-50 text-blue-700' }, { label: 'Documents Analyzed', value: stats.documents, icon: FileText, color: 'bg-green-50 text-green-700' }, { label: 'Chat Queries', value: stats.chats, icon: MessageSquare, color: 'bg-purple-50 text-purple-700' }].map((s, i) => (
          <div key={i} className="card flex items-center gap-4">
            <div className={`p-3 rounded-xl ${s.color}`}><s.icon className="h-6 w-6" /></div>
            <div><p className="text-2xl font-bold text-gray-900">{s.value}</p><p className="text-sm text-gray-500">{s.label}</p></div>
          </div>
        ))}
      </div>

      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 mb-4">System Status</h3>
        <div className="space-y-3">
          {['API Service', 'Database', 'AI Engine'].map((s, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-green-800 font-medium">{s}</span>
              <span className="text-green-700 text-sm font-medium">Operational</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}