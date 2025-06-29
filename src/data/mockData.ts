import { Drug, Disease } from '../types';

export const mockDrugs: Drug[] = [
  {
    id: '1',
    name: 'Metformin',
    structure: 'C4H11N5',
    smiles: 'CN(C)C(=N)NC(=N)N',
    affinity: 8.2,
    compatibility: 87,
    toxicity: 12,
    mechanism: 'AMPK activator',
    targets: ['AMPK', 'Complex I'],
    phase: 'FDA Approved',
    score: 92
  },
  {
    id: '2',
    name: 'Rapamycin',
    structure: 'C51H79NO13',
    smiles: 'CC[C@H]1CC[C@@H]2[C@@H](C[C@H]([C@@H]3[C@H]2CC[C@H]4[C@@H]3CC[C@@H]([C@H]4C)O)C)C',
    affinity: 9.1,
    compatibility: 94,
    toxicity: 23,
    mechanism: 'mTOR inhibitor',
    targets: ['mTOR', 'FKBP12'],
    phase: 'FDA Approved',
    score: 88
  },
  {
    id: '3',
    name: 'Lovastatin',
    structure: 'C24H36O5',
    smiles: 'CCC(C)(C)C(=O)O[C@H]1C[C@@H](C)C=C2[C@H]1[C@H](C)C[C@@H]3[C@@H]2CC[C@@H](C3)O',
    affinity: 7.8,
    compatibility: 79,
    toxicity: 18,
    mechanism: 'HMG-CoA reductase inhibitor',
    targets: ['HMG-CoA reductase'],
    phase: 'FDA Approved',
    score: 85
  },
  {
    id: '4',
    name: 'Thalidomide',
    structure: 'C13H10N2O4',
    smiles: 'O=C1N(C(=O)C2=CC=CC=C12)C3CCC(=O)NC3=O',
    affinity: 8.7,
    compatibility: 72,
    toxicity: 45,
    mechanism: 'Immunomodulator',
    targets: ['CRBN', 'TNF-α'],
    phase: 'FDA Approved',
    score: 76
  },
  {
    id: '5',
    name: 'Aspirin',
    structure: 'C9H8O4',
    smiles: 'CC(=O)OC1=CC=CC=C1C(=O)O',
    affinity: 6.5,
    compatibility: 91,
    toxicity: 8,
    mechanism: 'COX inhibitor',
    targets: ['COX-1', 'COX-2'],
    phase: 'FDA Approved',
    score: 89
  },
  {
    id: '6',
    name: 'Chloroquine',
    structure: 'C18H26ClN3',
    smiles: 'CCN(CC)CCCC(C)NC1=C2C=CC(=CC2=NC=C1)Cl',
    affinity: 7.3,
    compatibility: 68,
    toxicity: 32,
    mechanism: 'Autophagy modulator',
    targets: ['Autophagy', 'TLR'],
    phase: 'FDA Approved',
    score: 74
  }
];

export const mockDiseases: Disease[] = [
  { id: '1', name: 'Huntington\'s Disease', category: 'Neurological', prevalence: '1 in 10,000', selected: false },
  { id: '2', name: 'Amyotrophic Lateral Sclerosis', category: 'Neurological', prevalence: '1 in 50,000', selected: true },
  { id: '3', name: 'Duchenne Muscular Dystrophy', category: 'Muscular', prevalence: '1 in 3,500', selected: false },
  { id: '4', name: 'Cystic Fibrosis', category: 'Respiratory', prevalence: '1 in 2,500', selected: false },
  { id: '5', name: 'Sickle Cell Disease', category: 'Hematological', prevalence: '1 in 365', selected: false },
  { id: '6', name: 'Hemophilia A', category: 'Hematological', prevalence: '1 in 5,000', selected: false },
  { id: '7', name: 'Gaucher Disease', category: 'Metabolic', prevalence: '1 in 57,000', selected: false },
  { id: '8', name: 'Wilson\'s Disease', category: 'Metabolic', prevalence: '1 in 30,000', selected: false }
];