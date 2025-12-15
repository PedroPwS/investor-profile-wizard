export interface Question {
  question: string;
  options: string[];
}

export interface ProfileResult {
  score: number;
  name: string;
  description: string;
  recommendation: string;
  allocation: string;
  details: string;
  rfPercent: number;
  rvPercent: number;
}
