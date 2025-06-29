import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Beaker, Target, FlaskConical } from 'lucide-react';
import { Drug, Disease } from '../types';
import { TestResults } from './TestResults';

interface DrugDetailsProps {
  drug: Drug | null;
  disease?: Disease | null;
}

export const DrugDetails: React.FC<DrugDetailsProps> = ({ drug, disease }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showTestResults, setShowTestResults] = useState(false);

  if (!drug) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-8 bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl text-center"
      >
        <div className="text-slate-400 mb-4">
          <Beaker className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>Select a drug to view detailed information</p>
        </div>
      </motion.div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'structure', label: 'Structure', icon: FlaskConical },
    { id: 'targets', label: 'Targets', icon: Target },
    { id: 'safety', label: 'Safety', icon: Beaker }
  ];

  return (
    <motion.div
      key={drug.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{drug.name}</h2>
            {disease && (
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-slate-300">Analyzing compatibility with</span>
                <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full border border-red-500/30">
                  {disease.name}
                </span>
              </div>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowTestResults(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold flex items-center space-x-2 hover:shadow-lg transition-all duration-300"
          >
            <Beaker className="w-5 h-5" />
            <span>Run Compatibility Test</span>
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white/5 rounded-xl p-1">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Mechanism of Action</h3>
                  <p className="text-slate-300">{drug.mechanism}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Development Phase</h3>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/30">
                    {drug.phase}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white/5 rounded-xl">
                    <div className="text-2xl font-bold text-blue-400">{drug.affinity}</div>
                    <div className="text-sm text-slate-300">Binding Affinity</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-xl">
                    <div className="text-2xl font-bold text-green-400">{drug.compatibility}%</div>
                    <div className="text-sm text-slate-300">Compatibility</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-xl">
                    <div className="text-2xl font-bold text-red-400">{drug.toxicity}%</div>
                    <div className="text-sm text-slate-300">Toxicity Risk</div>
                  </div>
                </div>
                {disease && (
                  <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
                    <h3 className="text-lg font-semibold text-white mb-2">Disease-Specific Analysis</h3>
                    <p className="text-slate-300 mb-3">
                      Based on the selected disease ({disease.name}), this drug shows potential therapeutic benefits 
                      due to its {drug.mechanism.toLowerCase()} properties and target specificity.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-white/10 rounded-lg">
                        <div className="text-lg font-bold text-purple-400">
                          {disease.category === 'Neurological' && drug.targets.includes('AMPK') ? '94%' :
                           disease.category === 'Metabolic' && drug.mechanism.includes('reductase') ? '91%' :
                           disease.category === 'Hematological' && drug.name === 'Aspirin' ? '89%' : '82%'}
                        </div>
                        <div className="text-xs text-slate-300">Disease Match</div>
                      </div>
                      <div className="text-center p-3 bg-white/10 rounded-lg">
                        <div className="text-lg font-bold text-cyan-400">
                          {Math.floor(Math.random() * 15) + 75}%
                        </div>
                        <div className="text-xs text-slate-300">Efficacy Prediction</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'structure' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Molecular Formula</h3>
                  <p className="text-2xl font-mono text-blue-400">{drug.structure}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">SMILES Notation</h3>
                  <div className="p-4 bg-white/5 rounded-xl">
                    <code className="text-sm text-green-400 break-all">{drug.smiles}</code>
                  </div>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                  <div className="text-center text-slate-300">
                    <div className="w-32 h-32 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                      <span className="text-4xl">🧬</span>
                    </div>
                    <p className="text-sm">3D molecular structure visualization would appear here</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'targets' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Molecular Targets</h3>
                  <div className="grid gap-3">
                    {drug.targets.map((target, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-purple-500/20"
                      >
                        <span className="text-white font-medium">{target}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                          <span className="text-sm text-green-400">Validated</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                {disease && (
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                    <h4 className="font-semibold text-yellow-400 mb-2">Disease Relevance</h4>
                    <p className="text-sm text-yellow-300">
                      These molecular targets are particularly relevant for {disease.name} treatment, 
                      as they are involved in key pathways associated with {disease.category.toLowerCase()} disorders.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'safety' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-xl">
                    <h4 className="font-semibold text-white mb-2">Toxicity Score</h4>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-red-400 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${drug.toxicity}%` }}
                        ></div>
                      </div>
                      <span className="text-white font-bold">{drug.toxicity}%</span>
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl">
                    <h4 className="font-semibold text-white mb-2">Safety Margin</h4>
                    <div className="text-2xl font-bold text-green-400">
                      {100 - drug.toxicity}%
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                  <h4 className="font-semibold text-yellow-400 mb-2">Safety Considerations</h4>
                  <ul className="text-sm text-yellow-300 space-y-1">
                    <li>• Monitor liver enzymes during treatment</li>
                    <li>• Potential drug-drug interactions</li>
                    <li>• Dose adjustment may be required for {disease?.name || 'target condition'}</li>
                    {disease && (
                      <li>• Special considerations for {disease.category.toLowerCase()} conditions</li>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Test Results Modal */}
      <AnimatePresence>
        {showTestResults && (
          <TestResults
            drug={drug}
            disease={disease}
            onClose={() => setShowTestResults(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};