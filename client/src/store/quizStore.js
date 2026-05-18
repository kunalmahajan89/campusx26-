import { create } from 'zustand';
import { mockQuizzes } from '../mock/quizzes';
import { api, checkServerHealth } from '../api';
import { useAuthStore } from './authStore';
import { toast } from 'sonner';

export const useQuizStore = create()((set, get) => ({
  quizzes: mockQuizzes,
  currentQuiz: null,
  currentQuestionIndex: 0,
  selectedAnswers: {},
  score: 0,
  quizCompleted: false,
  xpEarned: 0,
  loading: false,

  // PULL TIMED MCQ QUESTIONS FROM DATABASE OR FALLBACK TO MOCK
  fetchQuizzes: async () => {
    set({ loading: true });
    try {
      const isOnline = await checkServerHealth();
      if (isOnline) {
        const data = await api.quizzes.getAll();
        
        // Map Mongoose MongoDB collections to React components format
        const mapped = data.map((quiz) => ({
          id: quiz._id,
          title: quiz.title,
          description: quiz.description || "Decryption assessment node test",
          type: quiz.type || "daily",
          duration: quiz.duration || 60,
          xp: quiz.xpReward || 250,
          questions: quiz.questions.map((q, idx) => ({
            id: q._id || `q_${idx}`,
            text: q.questionText,
            options: q.options,
            answerIndex: parseInt(q.correctAnswer) || 0
          }))
        }));

        set({ quizzes: mapped, loading: false });
      } else {
        set({ quizzes: mockQuizzes, loading: false });
      }
    } catch (err) {
      console.error("Quiz download error, using mock catalog:", err);
      set({ quizzes: mockQuizzes, loading: false });
    }
  },

  startQuiz: (quizId) => {
    const quiz = get().quizzes.find((q) => q.id === quizId);
    if (!quiz) return;

    set({
      currentQuiz: quiz,
      currentQuestionIndex: 0,
      selectedAnswers: {},
      score: 0,
      quizCompleted: false,
      xpEarned: 0
    });
    toast.success(`Instantiating Timed MCQ: ${quiz.title} ⏳`);
  },

  selectAnswer: (questionId, answerIndex) => {
    set((state) => ({
      selectedAnswers: {
        ...state.selectedAnswers,
        [questionId]: answerIndex
      }
    }));
  },

  nextQuestion: async () => {
    const { currentQuiz, currentQuestionIndex, selectedAnswers } = get();
    if (!currentQuiz) return;

    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      set({ currentQuestionIndex: currentQuestionIndex + 1 });
    } else {
      // Compile results accuracy
      let score = 0;
      currentQuiz.questions.forEach((q) => {
        if (selectedAnswers[q.id] === q.answerIndex) {
          score += 1;
        }
      });

      const percentage = (score / currentQuiz.questions.length);
      const xpEarned = Math.round(percentage * currentQuiz.xp);

      set({
        score,
        quizCompleted: true,
        xpEarned
      });

      // Securely update user points (XP) in MongoDB
      if (xpEarned > 0) {
        await useAuthStore.getState().addXP(xpEarned);
        toast.success(`Decryption complete! Credit allocated: +${xpEarned} XP! ⚡`);
      }
    }
  },

  resetQuiz: () => {
    set({
      currentQuiz: null,
      currentQuestionIndex: 0,
      selectedAnswers: {},
      score: 0,
      quizCompleted: false,
      xpEarned: 0
    });
  }
}));
