import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuizStore } from '../store/quizStore';
import { useAuthStore } from '../store/authStore';
import { useLeaderboardStore } from '../store/leaderboardStore';
import { 
  BookOpen, 
  Clock, 
  Zap, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import { toast } from 'sonner';

export default function Quiz() {
  const { user, addXP } = useAuthStore();
  const { syncUserScore } = useLeaderboardStore();
  const { 
    quizzes, 
    currentQuiz, 
    currentQuestionIndex, 
    selectedAnswers, 
    score, 
    quizCompleted, 
    xpEarned,
    startQuiz, 
    selectAnswer, 
    nextQuestion, 
    resetQuiz,
    fetchQuizzes
  } = useQuizStore();

  const [timeLeft, setTimeLeft] = useState(0);

  // DOWNLOAD AVAILABLE DECKS ON MOUNT
  useEffect(() => {
    fetchQuizzes();
  }, []);

  // COUNTDOWN TIMER EFFECT
  useEffect(() => {
    if (!currentQuiz || quizCompleted) return;

    if (timeLeft === 0) {
      // Force finalize if time expires
      toast.warning("Time limit exceeded! Compiling active selections...");
      handleForceNextBatch();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, currentQuiz, quizCompleted]);

  const handleStart = (quizId, duration) => {
    startQuiz(quizId);
    setTimeLeft(duration);
    toast.success("MCQ Decryption initialised. Good luck! ⚡");
  };

  const handleForceNextBatch = () => {
    // Repeatedly trigger next until complete
    const totalQuestions = currentQuiz.questions.length;
    for (let i = currentQuestionIndex; i < totalQuestions; i++) {
      nextQuestion();
    }
  };

  const handleNext = () => {
    nextQuestion();
  };

  const handleFinish = () => {
    // Add XP to user
    addXP(xpEarned);
    
    // Sync to leaderboard ranking
    syncUserScore(user.name, user.xp + xpEarned);

    toast.success(`Quiz session compiled! +${xpEarned} XP awarded! 🚀`);
    resetQuiz();
  };

  return (
    <div className="max-w-4xl mx-auto select-none transition-all duration-300">
      
      <AnimatePresence mode="wait">
        {!currentQuiz ? (
          /* QUIZ LISTING SCREEN */
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="space-y-1">
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">MCQ Arena</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">Unlock credentials and allocate massive XP points by solving technical concepts.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 pt-4">
              {quizzes.map((quiz) => (
                <Card key={quiz.id} className="flex flex-col justify-between h-52 relative overflow-hidden group border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <BookOpen className="h-28 w-28 text-slate-800 dark:text-white" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-snug group-hover:text-primary transition-colors">{quiz.title}</h3>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-[85%]">{quiz.description}</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-200 dark:border-white/5 pt-4">
                    <div className="flex gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-primary" />
                        {quiz.duration}s
                      </span>
                      <span className="flex items-center gap-1 text-accent font-bold">
                        <Zap className="h-3.5 w-3.5 text-accent fill-accent" />
                        +{quiz.xp} XP
                      </span>
                    </div>
                    
                    <Button 
                      onClick={() => handleStart(quiz.id, quiz.duration)}
                      variant="primary" 
                      className="px-4 py-2 text-xs font-bold uppercase tracking-wider gap-1.5 shadow-sm"
                    >
                      Enter Deck
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        ) : (
          /* MCQ SLIDE DECK INTERFACE */
          <motion.div
            key="quiz"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-6"
          >
            {/* Header Timer Bar */}
            <div className="flex items-center justify-between bg-slate-100 dark:bg-white/5 px-6 py-4 rounded-2xl border border-slate-200 dark:border-white/5 shadow-md">
              <div>
                <h3 className="text-base font-bold text-slate-800 dark:text-white truncate max-w-[280px] sm:max-w-md">{currentQuiz.title}</h3>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                  QUESTION {currentQuestionIndex + 1} OF {currentQuiz.questions.length}
                </span>
              </div>

              {/* Speed Timer pill */}
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full border font-mono text-xs font-bold
                ${timeLeft <= 10 
                  ? 'border-red-500/30 bg-red-500/10 text-red-650 dark:text-red-400 animate-pulse' 
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                }
              `}>
                <Clock className="h-4 w-4" />
                <span>{timeLeft}s LEFT</span>
              </div>
            </div>

            {/* Question slide deck Card */}
            <Card className="glass relative overflow-hidden p-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 rounded-2xl shadow-sm">
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />

              <div className="space-y-6">
                <div className="flex gap-3 items-start">
                  <HelpCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <h2 className="text-xl font-bold text-slate-950 dark:text-white leading-snug">
                    {currentQuiz.questions[currentQuestionIndex].question || currentQuiz.questions[currentQuestionIndex].text}
                  </h2>
                </div>

                {/* MCQ Options list */}
                <div className="space-y-3.5 pt-2">
                  {currentQuiz.questions[currentQuestionIndex].options.map((option, index) => {
                    const questionId = currentQuiz.questions[currentQuestionIndex].id;
                    const isSelected = selectedAnswers[questionId] === index;
                    return (
                      <button
                        key={index}
                        onClick={() => selectAnswer(questionId, index)}
                        className={`w-full text-left p-4 rounded-xl border flex items-center justify-between transition-all duration-200 font-semibold text-sm group
                          ${isSelected 
                            ? 'border-primary bg-primary/10 text-primary dark:text-white shadow-sm' 
                            : 'border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-950/20 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-white/10 hover:text-slate-900 dark:hover:text-slate-200'
                          }
                        `}
                      >
                        <span>{option}</span>
                        <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center shrink-0
                          ${isSelected 
                            ? 'border-primary bg-primary' 
                            : 'border-slate-300 dark:border-white/10 group-hover:border-slate-400 dark:group-hover:border-white/20'
                          }
                        `}>
                          {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white dark:bg-slate-950" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-white/5">
                  <button 
                    onClick={() => {
                      if (confirm("Terminate active session? All score metrics will be nullified.")) {
                        resetQuiz();
                      }
                    }}
                    className="flex items-center gap-1.5 text-xs font-mono text-slate-450 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-350 transition-colors"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    ABORT SESSION
                  </button>

                  <Button 
                    onClick={handleNext}
                    variant="accent" 
                    className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider gap-1.5 shadow-sm"
                    disabled={selectedAnswers[currentQuiz.questions[currentQuestionIndex].id] === undefined}
                  >
                    {currentQuestionIndex === currentQuiz.questions.length - 1 ? 'Compile Test' : 'Next Question'}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OVERLAY SCORE RESULT MODAL */}
      <Modal 
        isOpen={quizCompleted} 
        onClose={handleFinish} 
        title="MCQ Compilation Report"
      >
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            {score === currentQuiz?.questions.length ? (
              <div className="p-4 rounded-full bg-accent/10 border border-accent/20 text-accent">
                <CheckCircle className="h-14 w-14 fill-accent/10" />
              </div>
            ) : (
              <div className="p-4 rounded-full bg-primary/10 border border-primary/20 text-primary">
                <AlertCircle className="h-14 w-14 fill-primary/10" />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">DECRYPTION SUCCESSFUL</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">Simulated compilation metrics complete.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-200 dark:border-white/5 text-center">
              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider font-mono">Accuracy Ratios</span>
              <p className="text-2xl font-extrabold text-slate-800 dark:text-white mt-1">
                {score} <span className="text-xs font-normal text-slate-400">/ {currentQuiz?.questions.length}</span>
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-200 dark:border-white/5 text-center">
              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider font-mono">Rewards Allocated</span>
              <p className="text-2xl font-extrabold text-accent flex items-center justify-center gap-1 mt-1">
                <Zap className="h-5 w-5 fill-accent text-accent" />
                +{xpEarned} <span className="text-xs font-normal text-slate-400">XP</span>
              </p>
            </div>
          </div>

          <div className="pt-2">
            <Button 
              onClick={handleFinish} 
              variant="primary" 
              className="w-full py-3"
            >
              Collect Rewards & Sync Leaderboard
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
