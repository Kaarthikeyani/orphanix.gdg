import React from 'react';
import { motion } from 'framer-motion';
import { Ruler as Molecule, Star, Activity, AlertTriangle } from 'lucide-react';
import { Drug } from '../types';

interface DrugCardProps {
  drug: Drug;
  index: number;
  onClick: (drug: Drug) => void;
  isSelected: boolean;
  compact?: boolean;
}

export const DrugCard: React.FC<DrugCardProps> = ({ drug, index, onClick, isSelected, compact = false }) => {
  const getToxicityColor = (toxicity: number) => {
    if (toxicity < 20) return 'text-green-400';
    if (toxicity < 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'FDA Approved': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Phase III': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Phase II': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (compact) {
    return (
      <motion.div
        whileHover={{ 
          scale: 1.02,
          boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2)'
        }}
        className={`relative p-4 bg-white/10 backdrop-blur-md border rounded-2xl cursor-pointer transition-all duration-300 group ${
          isSelected ? 'border-blue-400/50 bg-blue-500/10 shadow-lg shadow-blue-500/20' : 'border-white/20 hover:border-blue-400/30'
        }`}
        onClick={() => onClick(drug)}
      >
        {/* Score badge */}
        <div className="absolute top-2 right-2 flex items-center space-x-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-2 py-1 rounded-full border border-yellow-500/30">
          <Star className="w-3 h-3 text-yellow-400" />
          <span className="text-xs text-yellow-400 font-medium">{drug.score}</span>
        </div>

        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 left-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center z-10"
          >
            <span className="text-white text-xs">✓</span>
          </motion.div>
        )}

        {/* Drug name and basic info */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-white mb-1 pr-16">{drug.name}</h3>
          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPhaseColor(drug.phase)}`}>
            {drug.phase}
          </div>
        </div>

        {/* Compact metrics */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="text-center">
            <div className="text-sm text-slate-300">Affinity</div>
            <div className="text-sm font-bold text-blue-400">{drug.affinity}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-slate-300">Match</div>
            <div className="text-sm font-bold text-green-400">{drug.compatibility}%</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-slate-300">Risk</div>
            <div className={`text-sm font-bold ${getToxicityColor(drug.toxicity)}`}>{drug.toxicity}%</div>
          </div>
        </div>

        {/* Mechanism */}
        <div className="text-sm text-slate-300 truncate pr-2">{drug.mechanism}</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: '0 20px 40px rgba(59, 130, 246, 0.2)'
      }}
      className={`relative p-6 bg-white/10 backdrop-blur-md border rounded-2xl cursor-pointer transition-all duration-300 group ${
        isSelected ? 'border-blue-400/50 bg-blue-500/10' : 'border-white/20 hover:border-blue-400/30'
      }`}
      onClick={() => onClick(drug)}
    >
      {/* Floating molecule icon */}
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity }
        }}
        className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center opacity-80"
      >
        <Molecule className="w-4 h-4 text-white" />
      </motion.div>

      {/* Score badge */}
      <div className="absolute top-4 right-4 flex items-center space-x-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-2 py-1 rounded-full border border-yellow-500/30">
        <Star className="w-3 h-3 text-yellow-400" />
        <span className="text-xs text-yellow-400 font-medium">{drug.score}</span>
      </div>

      {/* Drug name and structure */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white mb-1">{drug.name}</h3>
        <p className="text-sm text-slate-300 font-mono">{drug.structure}</p>
      </div>

      {/* Phase badge */}
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border mb-4 ${getPhaseColor(drug.phase)}`}>
        {drug.phase}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Activity className="w-4 h-4 text-blue-400 mr-1" />
          </div>
          <div className="text-sm text-slate-300">Affinity</div>
          <div className="text-lg font-bold text-blue-400">{drug.affinity}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-slate-300">Compatibility</div>
          <div className="text-lg font-bold text-green-400">{drug.compatibility}%</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <AlertTriangle className={`w-4 h-4 mr-1 ${getToxicityColor(drug.toxicity)}`} />
          </div>
          <div className="text-sm text-slate-300">Toxicity</div>
          <div className={`text-lg font-bold ${getToxicityColor(drug.toxicity)}`}>{drug.toxicity}%</div>
        </div>
      </div>

      {/* Mechanism */}
      <div className="mb-4">
        <div className="text-sm text-slate-300 mb-1">Mechanism</div>
        <div className="text-white font-medium">{drug.mechanism}</div>
      </div>

      {/* Targets */}
      <div className="flex flex-wrap gap-2">
        {drug.targets.map((target, idx) => (
          <span
            key={idx}
            className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30"
          >
            {target}
          </span>
        ))}
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl"></div>
      </div>
    </motion.div>
  );
};