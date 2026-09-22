import { AlertTriangle, Shield, Info, AlertCircle } from 'lucide-react';

const riskConfig = {
  critical: { color: 'bg-red-100 text-red-800 border-red-200', icon: AlertTriangle, label: 'Critical' },
  high: { color: 'bg-orange-100 text-orange-800 border-orange-200', icon: AlertCircle, label: 'High Risk' },
  medium: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Info, label: 'Medium' },
  low: { color: 'bg-green-100 text-green-800 border-green-200', icon: Shield, label: 'Low Risk' }
};

const categoryLabels = {
  data_sharing: 'Data Sharing',
  auto_renewal: 'Auto-Renewal',
  liability: 'Liability',
  termination: 'Termination',
  privacy: 'Privacy',
  other: 'Other'
};

export default function RiskBadge({ level, showLabel = true, size = 'md' }) {
  const config = riskConfig[level] || riskConfig.medium;
  const Icon = config.icon;
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-3 py-1 text-sm gap-1.5',
    lg: 'px-4 py-1.5 text-base gap-2'
  };

  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${config.color} ${sizeClasses[size]}`}>
      <Icon className={size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} />
      {showLabel && <span>{config.label}</span>}
    </span>
  );
}

export function CategoryBadge({ category }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
      {categoryLabels[category] || category}
    </span>
  );
}