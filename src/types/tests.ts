export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Test {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  questions: Question[];
}
