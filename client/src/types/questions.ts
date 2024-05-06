type QuestionType = 'multiple' | 'boolean';

export interface QuestionInterface {
  all_answers: string[];
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: QuestionType;
}
