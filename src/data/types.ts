export type Lesson = {
  id: string;
  title: string;
  content: string;
  codeExample: string;
  explanation: string;
  output?: string;
  practiceProblem?: string;
  practiceSolution?: string;
};

export type ColorTheme = 'blue' | 'orange' | 'yellow' | 'indigo' | 'purple' | 'rose' | 'violet' | 'cyan';

export type LanguageData = {
  name: string;
  description: string;
  colorTheme: ColorTheme;
  fileExtension: string;
  lessons: Lesson[];
};
