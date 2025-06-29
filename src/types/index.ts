export interface Drug {
  id: string;
  name: string;
  structure: string;
  smiles: string;
  affinity: number;
  compatibility: number;
  toxicity: number;
  mechanism: string;
  targets: string[];
  phase: string;
  score: number;
}

export interface Disease {
  id: string;
  name: string;
  category: string;
  prevalence: string;
  selected: boolean;
}

export interface TestResult {
  compatibility: number;
  toxicity: number;
  explanation: string;
  modifications: string[];
  confidence: number;
}