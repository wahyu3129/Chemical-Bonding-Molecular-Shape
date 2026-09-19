import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, ArrowRight, RefreshCw, AlertCircle, Award } from 'lucide-react';
import { CAMBRIDGE_QUIZ_BANK } from '../data/curriculumData';
import { StudentProgress } from '../types';

interface QuizViewProps {
  progress: StudentProgress;
  onUpdateProgress: (newProg: StudentProgress) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  progress,
  onUpdateProgress
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const question = CAMBRIDGE_QUIZ_BANK[currentIdx] || CAMBRIDGE_QUIZ_BANK[0];

  const handleOptionSelect = (opt: string) => {
    if (hasSubmitted) return;
    setSelectedOption(opt);
  };

  const handleCheck = () => {
    if (!selectedOption) return;
    setHasSubmitted(true);

    const isCorrect = selectedOption === question.correctAnswer;

    if (isCorrect) {
      setQuizScore(s => s + 1);
      onUpdateProgress({
        ...progress,
        totalCorrectAnswers: progress.totalCorrectAnswers + 1,
        totalQuestionsAnswered: progress.totalQuestionsAnswered + 1
      });
    } else {
      onUpdateProgress({
        ...progress,
        totalQuestionsAnswered: progress.totalQuestionsAnswered + 1
      });
    }
  };

  const handleNext = () => {
    setCurrentIdx(i => (i + 1) % CAMBRIDGE_QUIZ_BANK.length);
    setSelectedOption(null);
    setHasSubmitted(false);
  };

  const isCorrect = selectedOption === question.correctAnswer;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Title Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider mb-1">
            <HelpCircle className="w-4 h-4" />
            Cambridge AS & A Level Examination Prep
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-100">
            Concept Verification Quiz Engine
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Validate VSEPR rules, molecular shapes, bond angles, and formula calculations with exam explanations.
          </p>
        </div>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-center shrink-0">
          <span className="text-[10px] text-slate-500 uppercase block">Quiz Session Score</span>
          <span className="text-emerald-400 font-bold text-sm">{quizScore} / {CAMBRIDGE_QUIZ_BANK.length}</span>
        </div>
      </div>

      {/* Main Question Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <span className="text-xs font-mono text-sky-400 font-bold">
            Question {currentIdx + 1} of {CAMBRIDGE_QUIZ_BANK.length}
          </span>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
            Topic: {question.topic}
          </span>
        </div>

        {/* Question Text */}
        <h2 className="text-base md:text-lg font-bold text-slate-100 leading-snug">
          {question.question}
        </h2>

        {/* Multiple Choice Options */}
        <div className="space-y-2.5">
          {question.options?.map((opt) => {
            const isSelected = selectedOption === opt;
            const isCorrectAnswer = opt === question.correctAnswer;

            let btnStyle = 'bg-slate-950/80 text-slate-200 border-slate-800 hover:bg-slate-800';

            if (hasSubmitted) {
              if (isCorrectAnswer) {
                btnStyle = 'bg-emerald-950/80 text-emerald-200 border-emerald-500/50';
              } else if (isSelected && !isCorrectAnswer) {
                btnStyle = 'bg-rose-950/80 text-rose-200 border-rose-500/50';
              } else {
                btnStyle = 'bg-slate-950/40 text-slate-500 border-slate-900';
              }
            } else if (isSelected) {
              btnStyle = 'bg-sky-500/20 text-sky-300 border-sky-500/40 shadow-sm';
            }

            return (
              <button
                key={opt}
                onClick={() => handleOptionSelect(opt)}
                disabled={hasSubmitted}
                className={`w-full p-4 rounded-xl border text-xs font-semibold text-left transition-all flex items-center justify-between ${btnStyle}`}
              >
                <span>{opt}</span>
                {hasSubmitted && isCorrectAnswer && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                {hasSubmitted && isSelected && !isCorrectAnswer && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Select the single best answer required by the Cambridge syllabus.
          </span>

          {!hasSubmitted ? (
            <button
              onClick={handleCheck}
              disabled={!selectedOption}
              className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-slate-950 font-bold text-xs transition-all shadow-md shadow-sky-500/20"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Feedback Explanation */}
        {hasSubmitted && (
          <div className={`p-4 rounded-xl border text-xs space-y-2 ${
            isCorrect ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-200' : 'bg-rose-950/50 border-rose-500/40 text-rose-200'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Spot On! Correct Answer.
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-rose-400" />
                  Incorrect. Review Cambridge Examination Explanation:
                </>
              )}
            </div>
            <p className="leading-relaxed text-slate-300">{question.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};
