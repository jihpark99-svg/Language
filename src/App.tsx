import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, Coffee, ChevronRight, ChevronLeft, PlayCircle, BookOpen, CheckCircle2, FileJson, Cpu, Monitor, Smartphone } from 'lucide-react';
import { courseData, ColorTheme } from './data/lessons';

const iconMap: Record<string, React.ElementType> = {
  python: Code2,
  java: Coffee,
  javascript: FileJson,
  cpp: Cpu,
  csharp: Monitor,
  swift: Smartphone,
};

const colorStyles: Record<ColorTheme, any> = {
  blue: { bg: 'bg-blue-500', text: 'text-blue-600', lightBg: 'bg-blue-100', border: 'hover:border-blue-500', shadow: 'hover:shadow-blue-500/10', cardBg: 'bg-blue-50', progress: 'bg-blue-500', hoverBg: 'hover:bg-blue-600' },
  orange: { bg: 'bg-orange-500', text: 'text-orange-600', lightBg: 'bg-orange-100', border: 'hover:border-orange-500', shadow: 'hover:shadow-orange-500/10', cardBg: 'bg-orange-50', progress: 'bg-orange-500', hoverBg: 'hover:bg-orange-600' },
  yellow: { bg: 'bg-yellow-500', text: 'text-yellow-600', lightBg: 'bg-yellow-100', border: 'hover:border-yellow-500', shadow: 'hover:shadow-yellow-500/10', cardBg: 'bg-yellow-50', progress: 'bg-yellow-500', hoverBg: 'hover:bg-yellow-600' },
  indigo: { bg: 'bg-indigo-500', text: 'text-indigo-600', lightBg: 'bg-indigo-100', border: 'hover:border-indigo-500', shadow: 'hover:shadow-indigo-500/10', cardBg: 'bg-indigo-50', progress: 'bg-indigo-500', hoverBg: 'hover:bg-indigo-600' },
  purple: { bg: 'bg-purple-500', text: 'text-purple-600', lightBg: 'bg-purple-100', border: 'hover:border-purple-500', shadow: 'hover:shadow-purple-500/10', cardBg: 'bg-purple-50', progress: 'bg-purple-500', hoverBg: 'hover:bg-purple-600' },
  rose: { bg: 'bg-rose-500', text: 'text-rose-600', lightBg: 'bg-rose-100', border: 'hover:border-rose-500', shadow: 'hover:shadow-rose-500/10', cardBg: 'bg-rose-50', progress: 'bg-rose-500', hoverBg: 'hover:bg-rose-600' },
  violet: { bg: 'bg-violet-500', text: 'text-violet-600', lightBg: 'bg-violet-100', border: 'hover:border-violet-500', shadow: 'hover:shadow-violet-500/10', cardBg: 'bg-violet-50', progress: 'bg-violet-500', hoverBg: 'hover:bg-violet-600' },
  cyan: { bg: 'bg-cyan-500', text: 'text-cyan-600', lightBg: 'bg-cyan-100', border: 'hover:border-cyan-500', shadow: 'hover:shadow-cyan-500/10', cardBg: 'bg-cyan-50', progress: 'bg-cyan-500', hoverBg: 'hover:bg-cyan-600' },
};

export default function App() {
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  const handleSelectLang = (lang: string) => {
    setSelectedLang(lang);
    setCurrentLessonIndex(0);
  };

  const handleNext = () => {
    if (selectedLang && currentLessonIndex < courseData[selectedLang].lessons.length - 1) {
      setCurrentLessonIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(prev => prev - 1);
    }
  };

  const handleHome = () => {
    setSelectedLang(null);
    setCurrentLessonIndex(0);
  };

  const activeLangData = selectedLang ? courseData[selectedLang] : null;
  const activeColors = activeLangData ? colorStyles[activeLangData.colorTheme] : null;

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-stone-200">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleHome}
          >
            <div className="bg-stone-800 p-2 rounded-xl text-white">
              <Code2 size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight">친절한 코딩 교실</h1>
          </div>
          {activeLangData && activeColors && (
            <div className="text-sm font-medium text-stone-500 bg-stone-100 px-3 py-1.5 rounded-full flex items-center gap-2">
              <span className={`${activeColors.text} font-bold`}>{activeLangData.name}</span>
              <span>과정 진행 중</span>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <AnimatePresence mode="wait">
          {!selectedLang ? (
            <motion.div
              key="selector"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-800">
                  어떤 언어로 시작해 볼까요? 🎉
                </h2>
                <p className="text-lg text-stone-600 leading-relaxed">
                  코딩이 처음이신가요? 걱정하지 마세요! 20년 차 엔지니어인 제가 아주 쉽고 친절하게 안내해 드릴게요. 
                  가장 핵심적인 3가지 프로그래밍 언어(파이썬, 자바, 자바스크립트) 중 하나를 선택해 보세요.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(courseData).map(([key, data]) => {
                  const Icon = iconMap[key] || Code2;
                  const colors = colorStyles[data.colorTheme];
                  
                  return (
                    <button
                      key={key}
                      onClick={() => handleSelectLang(key)}
                      className={`group relative bg-white p-6 rounded-3xl border-2 border-stone-200 ${colors.border} ${colors.shadow} transition-all duration-300 text-left overflow-hidden flex flex-col h-full`}
                    >
                      <div className={`absolute top-0 right-0 w-24 h-24 ${colors.cardBg} rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500`}></div>
                      <div className={`${colors.lightBg} w-14 h-14 rounded-2xl flex items-center justify-center ${colors.text} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-stone-800 mb-2">{data.name}</h3>
                      <p className="text-stone-600 text-sm leading-relaxed mb-6 flex-grow">
                        {data.description}
                      </p>
                      <div className={`flex items-center ${colors.text} font-semibold text-sm group-hover:translate-x-2 transition-transform mt-auto`}>
                        시작하기 <ChevronRight className="ml-1 w-4 h-4" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            activeLangData && activeColors && (
            <motion.div
              key="tutorial"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-3xl mx-auto"
            >
              <div className="mb-8">
                <button 
                  onClick={handleHome}
                  className="text-stone-500 hover:text-stone-800 flex items-center text-sm font-medium mb-6 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> 언어 다시 선택하기
                </button>
                
                {/* Progress Bar */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-stone-500">진행도</span>
                  <span className={`text-sm font-bold ${activeColors.text}`}>
                    {currentLessonIndex + 1} / {activeLangData.lessons.length}
                  </span>
                </div>
                <div className="w-full bg-stone-200 rounded-full h-2.5 overflow-hidden">
                  <motion.div 
                    className={`${activeColors.progress} h-2.5 rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentLessonIndex + 1) / activeLangData.lessons.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  ></motion.div>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`${activeColors.lightBg} ${activeColors.text} p-2 rounded-lg`}>
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-stone-800">
                      {activeLangData.lessons[currentLessonIndex].title}
                    </h2>
                  </div>
                  
                  <div className="prose prose-stone prose-lg max-w-none mb-10">
                    <p className="text-stone-600 leading-relaxed whitespace-pre-wrap">
                      {activeLangData.lessons[currentLessonIndex].content}
                    </p>
                  </div>

                  <div className="bg-stone-900 rounded-2xl overflow-hidden mb-8 shadow-lg">
                    <div className="flex items-center px-4 py-3 bg-stone-800 border-b border-stone-700">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <span className="ml-4 text-xs font-mono text-stone-400">
                        example.{activeLangData.fileExtension}
                      </span>
                    </div>
                    <div className="p-6 overflow-x-auto">
                      <pre className="text-stone-100 font-mono text-sm md:text-base leading-relaxed">
                        <code>{activeLangData.lessons[currentLessonIndex].codeExample}</code>
                      </pre>
                    </div>
                    {activeLangData.lessons[currentLessonIndex].output && (
                      <div className="bg-black/50 p-4 border-t border-stone-700">
                        <div className="text-xs font-mono text-stone-500 mb-2">Output:</div>
                        <pre className="text-green-400 font-mono text-sm md:text-base leading-relaxed">
                          <code>{activeLangData.lessons[currentLessonIndex].output}</code>
                        </pre>
                      </div>
                    )}
                  </div>

                  <div className={`${activeColors.cardBg} border border-stone-200/50 rounded-2xl p-6 flex gap-4 mb-8`}>
                    <div className={`${activeColors.text} shrink-0 mt-1`}>
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className={`font-bold ${activeColors.text} mb-2`}>엔지니어의 친절한 설명</h4>
                      <p className="text-stone-700 leading-relaxed text-sm md:text-base whitespace-pre-wrap">
                        {activeLangData.lessons[currentLessonIndex].explanation}
                      </p>
                    </div>
                  </div>

                  {activeLangData.lessons[currentLessonIndex].practiceProblem && (
                    <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="bg-stone-800 text-white p-1.5 rounded-lg">
                          <Code2 className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-stone-800 text-lg">연습 문제</h4>
                      </div>
                      <p className="text-stone-700 leading-relaxed mb-6 font-medium">
                        {activeLangData.lessons[currentLessonIndex].practiceProblem}
                      </p>
                      
                      <details key={currentLessonIndex} className="group">
                        <summary className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-stone-500 hover:text-stone-800 transition-colors list-none">
                          <span className="bg-stone-200 group-open:bg-stone-800 group-open:text-white px-3 py-1.5 rounded-full transition-colors">
                            정답 확인하기
                          </span>
                        </summary>
                        <div className="mt-4 bg-stone-900 rounded-xl p-5 shadow-inner">
                          <pre className="text-green-400 font-mono text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                            <code>{activeLangData.lessons[currentLessonIndex].practiceSolution}</code>
                          </pre>
                        </div>
                      </details>
                    </div>
                  )}
                </div>

                <div className="bg-stone-50 p-6 border-t border-stone-200 flex justify-between items-center">
                  <button
                    onClick={handlePrev}
                    disabled={currentLessonIndex === 0}
                    className={`px-6 py-3 rounded-xl font-semibold flex items-center transition-all ${
                      currentLessonIndex === 0 
                        ? 'text-stone-400 cursor-not-allowed' 
                        : 'text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5 mr-1" /> 이전
                  </button>
                  
                  {currentLessonIndex < activeLangData.lessons.length - 1 ? (
                    <button
                      onClick={handleNext}
                      className={`px-6 py-3 ${activeColors.bg} ${activeColors.hoverBg} text-white rounded-xl font-semibold flex items-center shadow-md transition-all hover:translate-y-[-2px]`}
                    >
                      다음으로 <ChevronRight className="w-5 h-5 ml-1" />
                    </button>
                  ) : (
                    <button
                      onClick={handleHome}
                      className="px-6 py-3 bg-stone-800 hover:bg-stone-900 text-white rounded-xl font-semibold flex items-center shadow-md transition-all hover:translate-y-[-2px]"
                    >
                      <PlayCircle className="w-5 h-5 mr-2" /> 처음으로 돌아가기
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
            )
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
