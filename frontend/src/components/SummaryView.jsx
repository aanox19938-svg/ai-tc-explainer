import { FileText, Clock, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import RiskBadge, { CategoryBadge } from './RiskBadge';

export default function SummaryView({ summary, clauses, documentName }) {
  const [expandedClause, setExpandedClause] = useState(null);
  const [filter, setFilter] = useState('all');

  const riskOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  const filteredClauses = filter === 'all' ? clauses : clauses.filter(c => c.risk_level === filter);
  const sortedClauses = [...filteredClauses].sort((a, b) => riskOrder[a.risk_level] - riskOrder[b.risk_level]);
  const riskCounts = {
    critical: clauses.filter(c => c.risk_level === 'critical').length,
    high: clauses.filter(c => c.risk_level === 'high').length,
    medium: clauses.filter(c => c.risk_level === 'medium').length,
    low: clauses.filter(c => c.risk_level === 'low').length,
  };
  const totalRisky = riskCounts.critical + riskCounts.high + riskCounts.medium;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="card">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary-100 p-3 rounded-xl">
              <FileText className="h-6 w-6 text-primary-700" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{documentName || 'Document Analysis'}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <Clock className="h-4 w-4" />
                <span>Analyzed just now</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">{totalRisky}</div>
            <div className="text-sm text-gray-500">Risky Clauses Found</div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {Object.entries(riskCounts).map(([level, count]) => (
            <button key={level} onClick={() => setFilter(filter === level ? 'all' : level)} className={`p-3 rounded-lg border-2 transition-all text-center ${filter === level ? 'border-primary-500 bg-primary-50' : 'border-transparent hover:bg-gray-50'}`}>
              <div className="text-2xl font-bold text-gray-900">{count}</div>
              <RiskBadge level={level} size="sm" />
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5 text-primary-600" />
          <h3 className="text-lg font-bold text-gray-900">AI-Generated Summary</h3>
        </div>
        <div className="prose prose-gray max-w-none">
          {summary.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="text-gray-700 leading-relaxed mb-3 last:mb-0">{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Flagged Risk Clauses</h3>
          {filter !== 'all' && <button onClick={() => setFilter('all')} className="text-sm text-primary-600 hover:text-primary-700 font-medium">Show All</button>}
        </div>

        <div className="space-y-3">
          {sortedClauses.map((clause, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors">
              <button onClick={() => setExpandedClause(expandedClause === index ? null : index)} className="w-full flex items-start gap-3 p-4 text-left bg-white hover:bg-gray-50 transition-colors">
                <RiskBadge level={clause.risk_level} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 font-medium line-clamp-2">{clause.clause_text}</p>
                </div>
                {expandedClause === index ? <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" /> : <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />}
              </button>
              {expandedClause === index && (
                <div className="px-4 pb-4 pt-2 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center gap-2 mb-2"><CategoryBadge category={clause.category} /></div>
                  <p className="text-sm text-gray-700 leading-relaxed"><span className="font-medium text-gray-900">Why this matters: </span>{clause.explanation}</p>
                </div>
              )}
            </div>
          ))}
          {sortedClauses.length === 0 && <div className="text-center py-8 text-gray-500">No clauses match the selected filter.</div>}
        </div>
      </div>
    </div>
  );
}