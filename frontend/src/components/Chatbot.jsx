import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, MessageCircle } from 'lucide-react';
import axios from 'axios';

export default function Chatbot({ documentId }) {
  const [messages, setMessages] = useState([{ type: 'bot', text: "Hi! I've read this document. Ask me anything about it — like 'What happens to my data?' or 'Can I get a refund?'" }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages]);

  useEffect(() => {
    if (documentId) {
      axios.get(`/api/chat/${documentId}/history`)
        .then(res => {
          if (res.data.length > 0) {
            const history = res.data.flatMap(chat => [{ type: 'user', text: chat.question }, { type: 'bot', text: chat.answer }]);
            setMessages(prev => [prev[0], ...history]);
          }
        }).catch(() => {});
    }
  }, [documentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const question = input.trim();
    setInput('');
    setMessages(prev => [...prev, { type: 'user', text: question }]);
    setLoading(true);
    try {
      const res = await axios.post(`/api/chat/${documentId}`, { question });
      setMessages(prev => [...prev, { type: 'bot', text: res.data.answer }]);
    } catch {
      setMessages(prev => [...prev, { type: 'bot', text: 'Sorry, I had trouble processing that. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const suggestedQuestions = ['What data do they collect about me?', 'Can I cancel anytime?', 'What are my liability risks?', 'Do they share my information?'];

  return (
    <div className="card flex flex-col h-[600px]">
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200">
        <MessageCircle className="h-5 w-5 text-primary-600" />
        <h3 className="text-lg font-bold text-gray-900">AI Chatbot</h3>
        <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Document Q&A</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.type === 'user' ? 'bg-primary-100' : 'bg-gray-100'}`}>
              {msg.type === 'user' ? <User className="h-4 w-4 text-primary-700" /> : <Bot className="h-4 w-4 text-gray-600" />}
            </div>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.type === 'user' ? 'bg-primary-600 text-white rounded-tr-sm' : 'bg-gray-100 text-gray-800 rounded-tl-sm'}`}>{msg.text}</div>
          </div>
        ))}
        {loading && <div className="flex gap-3"><div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><Bot className="h-4 w-4 text-gray-600" /></div><div className="bg-gray-100 p-3 rounded-2xl rounded-tl-sm"><Loader2 className="h-4 w-4 animate-spin text-gray-500" /></div></div>}
        <div ref={messagesEndRef} />
      </div>

      {messages.length <= 2 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {suggestedQuestions.map((q, i) => <button key={i} onClick={() => setInput(q)} className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors">{q}</button>)}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2 pt-4 border-t border-gray-200">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about this document..." className="flex-1 input-field py-2.5 text-sm" />
        <button type="submit" disabled={loading || !input.trim()} className="btn-primary px-4 py-2.5 disabled:opacity-50"><Send className="h-4 w-4" /></button>
      </form>
    </div>
  );
}