import { pythonData } from './python';
import { javaData } from './java';
import { javascriptData } from './javascript';
import { cppData } from './cpp';
import { LanguageData, ColorTheme, Lesson } from './types';

export const courseData: Record<string, LanguageData> = {
  python: pythonData,
  java: javaData,
  javascript: javascriptData,
  cpp: cppData
};

export type { LanguageData, ColorTheme, Lesson };
