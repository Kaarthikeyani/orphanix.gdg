import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, ChevronDown, ChevronUp, Target } from 'lucide-react';
import { Drug, Disease, TestResult } from '../types';

interface TestResultsProps {
  drug: Drug;
  disease?: Disease | null;
  onClose: () => void;
}

export const TestResults: React.FC<TestResultsProps> = ({ drug, disease, onClose }) => {
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedModification, setExpandedModification] = useState<number | null>(null);

  useEffect(() => {
    // Simulate API call with disease-specific results
    const timer = setTimeout(() => {
      const baseCompatibility = Math.floor(Math.random() * 20) + 75; // 75-95%
      const baseToxicity = Math.floor(Math.random() * 30) + 10; // 10-40%
      
      // Adjust based on disease if provided
      let adjustedCompatibility = baseCompatibility;
      let adjustedToxicity = baseToxicity;
      let diseaseSpecificExplanation = "";

      if (disease) {
        if (disease.category === 'Neurological' && drug.targets.includes('AMPK')) {
          adjustedCompatibility += 5;
          diseaseSpecificExplanation = ` The drug's AMPK activation mechanism shows enhanced compatibility with ${disease.name}, as AMPK pathways are crucial in neurological disorders.`;
        } else if (disease.category === 'Metabolic' && drug.mechanism.includes('reductase')) {
          adjustedCompatibility += 8;
          adjustedToxicity -= 5;
          diseaseSpecificExplanation = ` The reductase inhibition mechanism is particularly well-suited for ${disease.name}, showing improved safety profile in metabolic conditions.`;
        } else if (disease.category === 'Hematological' && drug.name === 'Aspirin') {
          adjustedCompatibility += 6;
          diseaseSpecificExplanation = ` Aspirin's antiplatelet effects demonstrate strong therapeutic potential for ${disease.name} management.`;
        }
      }

      setTestResult({
        compatibility: Math.min(adjustedCompatibility, 98),
        toxicity: Math.max(adjustedToxicity, 5),
        explanation: `The drug shows ${adjustedCompatibility > 85 ? 'high' : 'moderate'} compatibility due to its selective binding mechanism and favorable pharmacokinetic properties. However, potential off-target effects may limit its effectiveness in certain patient populations.${diseaseSpecificExplanation}`,
        modifications: [
          "Modify the aromatic ring system to improve selectivity",
          "Add a hydrophilic group to enhance bioavailability", 
          "Consider stereochemical optimization for better binding",
          disease ? `Optimize dosing regimen for ${disease.category.toLowerCase()} conditions` : "Explore prodrug approaches to reduce toxicity"
        ],
        confidence: Math.floor(Math.random() * 15) + 85 // 85-100%
      });
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [drug, disease]);

  const CircularProgress: React.FC<{ value: number; color: string; size?: number }> = ({ 
    value, 
    color, 
    size = 120 
  }) => {
    const radius = (size - 10) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            fill="transparent"
            className="text-gray-700"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={color}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-bold text-white"
          >
            {value}%
          </motion.span>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900/90 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Compatibility Test Results</h2>
            <div className="flex items-center space-x-4 text-slate-300">
              <span>Drug: <span className="text-blue-400 font-medium">{drug.name}</span></span>
              {disease && (
                <>
                  <Target className="w-4 h-4" />
                  <span>Disease: <span className="text-red-400 font-medium">{disease.name}</span></span>
                </>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full mx-auto mb-4"
            />
            <p className="text-slate-300">
              Running compatibility analysis{disease ? ` for ${disease.name}` : ''}...
            </p>
          </div>
        ) : (
          testResult && (
            <div className="space-y-8">
              {/* Progress Rings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Compatibility Score
                    {disease && <span className="text-sm text-slate-400 block">for {disease.name}</span>}
                  </h3>
                  <CircularProgress 
                    value={testResult.compatibility} 
                    color="text-green-400" 
                  />
                  <div className="mt-4 flex items-center justify-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-medium">
                      {testResult.compatibility >= 90 ? 'Excellent' : 
                       testResult.compatibility >= 80 ? 'Very Good' :
                       testResult.compatibility >= 70 ? 'Good' : 'Fair'}
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Toxicity Level
                    {disease && <span className="text-sm text-slate-400 block">in {disease.category} context</span>}
                  </h3>
                  <CircularProgress 
                    value={testResult.toxicity} 
                    color={testResult.toxicity < 25 ? "text-green-400" : 
                           testResult.toxicity < 50 ? "text-yellow-400" : "text-red-400"} 
                  />
                  <div className="mt-4 flex items-center justify-center space-x-2">
                    <AlertTriangle className={`w-5 h-5 ${
                      testResult.toxicity < 25 ? 'text-green-400' :
                      testResult.toxicity < 50 ? 'text-yellow-400' : 'text-red-400'
                    }`} />
                    <span className={`font-medium ${
                      testResult.toxicity < 25 ? 'text-green-400' :
                      testResult.toxicity < 50 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {testResult.toxicity < 25 ? 'Low Risk' :
                       testResult.toxicity < 50 ? 'Moderate Risk' : 'High Risk'}
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Disease-Specific Insights */}
              {disease && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20"
                >
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <Target className="w-5 h-5 text-purple-400" />
                    <span>Disease-Specific Analysis</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-white/10 rounded-lg">
                      <div className="text-lg font-bold text-purple-400">
                        {disease.category === 'Neurological' ? '92%' :
                         disease.category === 'Metabolic' ? '89%' :
                         disease.category === 'Hematological' ? '87%' : '84%'}
                      </div>
                      <div className="text-xs text-slate-300">Disease Match Score</div>
                    </div>
                    <div className="text-center p-3 bg-white/10 rounded-lg">
                      <div className="text-lg font-bold text-cyan-400">
                        {disease.category === 'Neurological' ? 'High' :
                         disease.category === 'Metabolic' ? 'Very High' : 'Moderate'}
                      </div>
                      <div className="text-xs text-slate-300">Therapeutic Potential</div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300">
                    This drug shows {disease.category === 'Metabolic' ? 'exceptional' : 'strong'} potential 
                    for treating {disease.name} based on its mechanism of action and molecular targets 
                    relevant to {disease.category.toLowerCase()} pathways.
                  </p>
                </motion.div>
              )}

              {/* Explanation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="p-6 bg-white/5 rounded-xl border border-white/20"
              >
                <h3 className="text-lg font-semibold text-white mb-4">
                  Analysis Summary
                </h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-slate-300 leading-relaxed"
                >
                  {testResult.explanation}
                </motion.p>
              </motion.div>

              {/* Modification Suggestions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-white">Optimization Suggestions</h3>
                <div className="space-y-3">
                  {testResult.modifications.map((modification, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      className="border border-white/20 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedModification(
                          expandedModification === index ? null : index
                        )}
                        className="w-full p-4 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-between text-left"
                      >
                        <span className="text-white">{modification}</span>
                        {expandedModification === index ? (
                          <ChevronUp className="w-5 h-5 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        )}
                      </button>
                      <AnimatePresence>
                        {expandedModification === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-white/5 border-t border-white/20"
                          >
                            <div className="p-4 text-sm text-slate-300">
                              This modification could improve the drug's efficacy by targeting specific molecular pathways 
                              while reducing off-target effects{disease ? ` in ${disease.category.toLowerCase()} conditions` : ''}. 
                              Further computational modeling and experimental validation would be required to assess feasibility.
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Confidence Score */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="text-center p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20"
              >
                <h3 className="text-lg font-semibold text-white mb-2">Analysis Confidence</h3>
                <div className="text-3xl font-bold text-blue-400 mb-2">{testResult.confidence}%</div>
                <p className="text-sm text-slate-300">
                  Based on molecular data, predictive models{disease ? `, and ${disease.name} pathophysiology` : ''}
                </p>
              </motion.div>
            </div>
          )
        )}
      </motion.div>
    </motion.div>
  );
};