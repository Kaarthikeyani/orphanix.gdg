import React from 'react';
import { motion } from 'framer-motion';
import { Disease } from '../types';

interface DiseaseTagProps {
  disease: Disease;
  onClick: (disease: Disease) => void;
  isSelected?: boolean;
}

export const DiseaseTag: React.FC<DiseaseTagProps> = ({ disease, onClick, isSelected = false }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(disease)}
      className={`relative w-full p-4 rounded-2xl border transition-all duration-300 text-left ${
        isSelected
          ? 'bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-400/50 text-white shadow-lg shadow-red-500/20'
          : 'bg-white/5 border-white/20 text-slate-300 hover:border-red-400/30 hover:bg-white/10'
      }`}
    >
      <div className="font-semibold mb-1">{disease.name}</div>
      <div className="text-sm opacity-75 mb-2">{disease.category}</div>
      <div className="text-xs opacity-60">Prevalence: {disease.prevalence}</div>
      
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
        >
          <span className="text-white text-xs">✓</span>
        </motion.div>
      )}
    </motion.button>
  );
};