import { pythonData } from './python';
import { javaData } from './java';
import { javascriptData } from './javascript';
import { LanguageData, ColorTheme, Lesson } from './types';

export const courseData: Record<string, LanguageData> = {
  python: pythonData,
  java: javaData,
  javascript: javascriptData
};

export type { LanguageData, ColorTheme, Lesson };
