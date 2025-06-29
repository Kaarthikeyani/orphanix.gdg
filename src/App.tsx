import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Microscope, Brain, Dna, ArrowRight } from 'lucide-react';
import { Drug, Disease } from './types';
import { mockDrugs, mockDiseases } from './data/mockData';
import { SearchBar } from './components/SearchBar';
import { DrugCard } from './components/DrugCard';
import { DiseaseTag } from './components/DiseaseTag';
import { DrugDetails } from './components/DrugDetails';

function App() {
  const [drugs, setDrugs] = useState<Drug[]>(mockDrugs);
  const [diseases, setDiseases] = useState<Disease[]>(mockDiseases);
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter drugs based on search term
  const filteredDrugs = useMemo(() => {
    if (!searchTerm) return drugs;
    
    return drugs.filter(drug =>
      drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drug.mechanism.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drug.targets.some(target => 
        target.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [drugs, searchTerm]);

  // Sort drugs based on selected disease (simulation)
  const sortedDrugs = useMemo(() => {
    if (!selectedDisease) return filteredDrugs;

    // Simulate re-ranking based on disease selection
    return [...filteredDrugs].sort((a, b) => {
      // Simple scoring based on drug properties and disease type
      const getScore = (drug: Drug) => {
        let score = drug.score;
        if (selectedDisease.category === 'Neurological' && drug.targets.includes('AMPK')) score += 10;
        if (selectedDisease.category === 'Metabolic' && drug.mechanism.includes('reductase')) score += 15;
        if (selectedDisease.category === 'Neurological' && drug.name === 'Rapamycin') score += 20;
        if (selectedDisease.category === 'Hematological' && drug.name === 'Aspirin') score += 15;
        return score;
      };
      return getScore(b) - getScore(a);
    });
  }, [filteredDrugs, selectedDisease]);

  const handleDiseaseSelect = (disease: Disease) => {
    setSelectedDisease(disease);
    setSelectedDrug(null); // Reset drug selection when disease changes
  };

  const handleDrugSelect = (drug: Drug) => {
    setSelectedDrug(drug);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-white/5 backdrop-blur-md border-b border-white/20"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                <Microscope className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">DrugScope AI</h1>
                <p className="text-slate-300">Intelligent Drug Repurposing Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-slate-300">
                <Brain className="w-5 h-5" />
                <span className="text-sm">AI-Powered</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <Dna className="w-5 h-5" />
                <span className="text-sm">Molecular Analysis</span>
              </div>
            </div>
          </div>
        </motion.header>

        <div className="max-w-7xl mx-auto p-6">
          {/* Selection Flow Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center justify-center space-x-4 text-slate-300"
          >
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-300 ${
              selectedDisease ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-white/5 border-white/20'
            }`}>
              <span className="text-sm font-medium">1. Select Disease</span>
              {selectedDisease && <span className="text-xs">✓</span>}
            </div>
            <ArrowRight className="w-4 h-4" />
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-300 ${
              selectedDrug ? 'bg-green-500/20 border-green-500/50 text-green-400' : 
              selectedDisease ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' : 'bg-white/5 border-white/20'
            }`}>
              <span className="text-sm font-medium">2. Select Drug</span>
              {selectedDrug && <span className="text-xs">✓</span>}
            </div>
            <ArrowRight className="w-4 h-4" />
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-300 ${
              selectedDrug && selectedDisease ? 'bg-purple-500/20 border-purple-500/50 text-purple-400' : 'bg-white/5 border-white/20'
            }`}>
              <span className="text-sm font-medium">3. View Analysis</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Left Panel - Disease Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="h-[650px] flex flex-col"
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex flex-col h-full">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                  <span>Select Target Disease</span>
                </h2>
                
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="space-y-3 flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                    {diseases.map((disease) => (
                      <DiseaseTag
                        key={disease.id}
                        disease={disease}
                        onClick={handleDiseaseSelect}
                        isSelected={selectedDisease?.id === disease.id}
                      />
                    ))}
                  </div>
                  
                  {selectedDisease && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex-shrink-0"
                    >
                      <div className="text-green-400 font-medium mb-1">Selected Disease:</div>
                      <div className="text-white font-semibold">{selectedDisease.name}</div>
                      <div className="text-sm text-green-300">{selectedDisease.category}</div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Right Panel - Drug Selection */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="h-[650px] flex flex-col"
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex flex-col h-full">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    2
                  </div>
                  <span>Select Drug Candidate</span>
                  {selectedDisease && (
                    <span className="text-sm text-blue-400 font-normal">
                      (Ranked for {selectedDisease.name})
                    </span>
                  )}
                </h2>
                
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="flex-shrink-0">
                    <SearchBar 
                      searchTerm={searchTerm}
                      onSearchChange={setSearchTerm}
                    />
                  </div>
                  
                  <motion.div
                    layout
                    className="space-y-4 flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
                  >
                    <AnimatePresence mode="popLayout">
                      {sortedDrugs.map((drug, index) => (
                        <motion.div
                          key={drug.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <DrugCard
                            drug={drug}
                            index={index}
                            onClick={handleDrugSelect}
                            isSelected={selectedDrug?.id === drug.id}
                            compact={true}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>

                  {selectedDrug && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl flex-shrink-0"
                    >
                      <div className="text-blue-400 font-medium mb-1">Selected Drug:</div>
                      <div className="text-white font-semibold">{selectedDrug.name}</div>
                      <div className="text-sm text-blue-300">{selectedDrug.mechanism}</div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Analysis Report Section */}
          <AnimatePresence>
            {selectedDrug && selectedDisease && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.5 }}
                className="mt-8"
              >
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <span>Drug-Disease Analysis Report</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div className="p-4 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-xl border border-red-500/20">
                      <div className="text-red-400 font-medium mb-1">Target Disease</div>
                      <div className="text-white font-semibold text-lg">{selectedDisease.name}</div>
                      <div className="text-sm text-red-300">{selectedDisease.category} • {selectedDisease.prevalence}</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                      <div className="text-blue-400 font-medium mb-1">Selected Drug</div>
                      <div className="text-white font-semibold text-lg">{selectedDrug.name}</div>
                      <div className="text-sm text-blue-300">{selectedDrug.phase} • Score: {selectedDrug.score}</div>
                    </div>
                  </div>
                </div>
                <DrugDetails drug={selectedDrug} disease={selectedDisease} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty State */}
          {(!selectedDrug || !selectedDisease) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 p-12 bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl text-center"
            >
              <div className="text-slate-400 mb-4">
                <Brain className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">Ready to Analyze Drug-Disease Compatibility</p>
                <p className="text-sm">
                  {!selectedDisease ? 'Start by selecting a target disease from the left panel' :
                   !selectedDrug ? 'Now choose a drug candidate from the right panel' :
                   'Analysis will appear here'}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;