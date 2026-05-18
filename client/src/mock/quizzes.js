export const mockQuizzes = [
  {
    id: "q1",
    title: "Operating Systems Core Concepts",
    description: "Test your knowledge on Deadlocks, Memory Management, and CPU Scheduling.",
    duration: 60, // seconds
    xp: 200,
    questions: [
      {
        id: "q1_1",
        question: "Which of the following scheduling algorithms can lead to starvation?",
        options: [
          "Round Robin",
          "Shortest Job First (SJF)",
          "First Come First Served (FCFS)",
          "Priority Scheduling"
        ],
        answerIndex: 1
      },
      {
        id: "q1_2",
        question: "What is the critical condition for deadlock prevention involving resources?",
        options: [
          "Mutual Exclusion",
          "Hold and Wait",
          "No Preemption",
          "Circular Wait"
        ],
        answerIndex: 3
      }
    ]
  },
  {
    id: "q2",
    title: "DSA & Big O Complexity Analysis",
    description: "Crack sorting algorithm runtimes, graph paths, and balance factor checks.",
    duration: 45,
    xp: 150,
    questions: [
      {
        id: "q2_1",
        question: "What is the worst-case time complexity of Quick Sort?",
        options: [
          "O(n log n)",
          "O(n^2)",
          "O(n)",
          "O(2^n)"
        ],
        answerIndex: 1
      }
    ]
  }
];
