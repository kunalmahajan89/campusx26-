import { create } from 'zustand';
import { mockQuizzes } from '../mock/quizzes';

export const useQuizStore = create()((set, get) => ({
  quizzes: mockQuizzes,
  currentQuiz: null,
  currentQuestionIndex: 0,
  selectedAnswers: {},
  score: 0,
  quizCompleted: false,
  xpEarned: 0,

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
  },

  selectAnswer: (questionId, answerIndex) => {
    set((state) => ({
      selectedAnswers: {
        ...state.selectedAnswers,
        [questionId]: answerIndex
      }
    }));
  },

  nextQuestion: () => {
    const { currentQuiz, currentQuestionIndex } = get();
    if (!currentQuiz) return;

    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      set({ currentQuestionIndex: currentQuestionIndex + 1 });
    } else {
      // Calculate results
      let score = 0;
      currentQuiz.questions.forEach((q) => {
        if (get().selectedAnswers[q.id] === q.answerIndex) {
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
