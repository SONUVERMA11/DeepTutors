export type BlogCategory =
  | "Study Tips"
  | "Exam Prep"
  | "Platform News"
  | "For Tutors";

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  date: string;
  readTime: string;
  imageUrl: string;
  imageAlt: string;
  categoryColor: string;
  categoryBg: string;
  featured?: boolean;
  content: string[];
}

export const blogArticles: BlogArticle[] = [
  {
    slug: "how-to-choose-the-right-tutor",
    title: "How to Choose the Right Tutor: A Parent's Complete Guide",
    excerpt:
      "A practical framework to evaluate tutor quality, communication style, and long-term fit before committing to a learning plan.",
    category: "Study Tips",
    date: "Mar 28, 2026",
    readTime: "8 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Parent and student reviewing a study plan at home",
    categoryColor: "var(--color-primary-dark)",
    categoryBg: "var(--color-primary-100)",
    featured: true,
    content: [
      "Choosing a tutor is not only about subject expertise. The best outcomes happen when academic capability, teaching style, consistency, and communication all align with the student. Parents often optimize for credentials first, but in practice, consistency and clarity explain more progress over a full term.",
      "Start with outcomes, not personalities. Define the exact objective for the next 8 to 12 weeks: grade improvement, exam strategy, confidence in specific chapters, or habit-building. A tutor can only be assessed properly when the goal is measurable.",
      "Then evaluate teaching clarity in a trial class. Ask the student to explain the same concept back in their own words after the session. If the explanation quality improves, the tutor is creating understanding rather than only delivering content.",
      "Check communication hygiene early. Great tutors confirm schedules, share session plans, and summarize progress in short updates. If logistics feel chaotic in week one, it usually gets worse during exam season.",
      "Finally, review fit every four sessions. Keep the tutor if performance trend and motivation both improve. If either declines, switch fast. A timely switch is not a failure; it is good academic management."
    ],
  },
  {
    slug: "top-10-jee-preparation-strategies",
    title: "Top 10 JEE Preparation Strategies That Actually Work",
    excerpt:
      "High-impact habits used by consistent rank improvers, from revision cycles to mistake log systems.",
    category: "Exam Prep",
    date: "Mar 22, 2026",
    readTime: "6 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Student preparing for competitive exams with books and notes",
    categoryColor: "#4834D4",
    categoryBg: "rgba(108,92,231,0.12)",
    content: [
      "JEE preparation rewards consistency more than intensity spikes. Students who improve fastest run predictable weekly systems: topic coverage, timed practice, error reviews, and deliberate revision.",
      "The most useful habit is a mistake log. For each wrong question, write why it happened: concept gap, calculation error, or question misread. Patterns appear quickly and guide what to fix first.",
      "Use spaced revision windows. Revisit each chapter after 24 hours, 7 days, and 21 days. This keeps retention stable and reduces re-learning effort close to the exam.",
      "Balance mock tests with deep analysis. One full test with two hours of review is better than three tests with no diagnosis. Improvement comes from correction loops, not volume alone."
    ],
  },
  {
    slug: "why-personalized-learning-matters",
    title: "Why Personalized Learning Matters More Than Ever",
    excerpt:
      "How tailored pacing and adaptive tutoring improve concept retention, confidence, and measurable outcomes.",
    category: "Platform News",
    date: "Mar 18, 2026",
    readTime: "5 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Tutor mentoring a student with personalized lesson notes",
    categoryColor: "#00B894",
    categoryBg: "rgba(0,206,201,0.12)",
    content: [
      "Standardized instruction is efficient for institutions, but many learners need pacing flexibility to perform at their best. Personalized tutoring closes that gap by adapting sequence, speed, and explanation depth in real time.",
      "When a tutor observes hesitation patterns and adjusts examples instantly, cognitive load drops. Students spend more time learning and less time decoding classroom context.",
      "At DeepTutors, we are improving tutor-student matching around these signals: preferred pace, communication tone, and target milestones. Better matching reduces churn and creates better month-over-month outcomes."
    ],
  },
  {
    slug: "building-a-successful-tutoring-business",
    title: "Building a Successful Tutoring Business on DeepTutors",
    excerpt:
      "A clear playbook for tutors to position expertise, improve retention, and scale responsibly.",
    category: "For Tutors",
    date: "Mar 14, 2026",
    readTime: "7 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Professional tutor planning lessons on a laptop",
    categoryColor: "#B5700A",
    categoryBg: "rgba(255,159,10,0.12)",
    content: [
      "Top-performing tutors run their work like a professional service, not ad-hoc classes. They define outcomes, communicate clearly, and document progress.",
      "Start by narrowing your positioning. Being known for specific outcomes, like Grade 10 Algebra recovery or SAT Math score jumps, builds trust faster than generic profiles.",
      "Session quality matters, but post-session communication is what drives retention. A two-minute recap after each class significantly improves parent confidence and student accountability.",
      "Finally, protect your calendar with structured slots. Availability discipline helps avoid burnout and keeps delivery quality high over the full academic cycle."
    ],
  },
  {
    slug: "cbse-vs-icse-choosing-the-right-board",
    title: "CBSE vs ICSE: Which Board Is Right for Your Child?",
    excerpt:
      "A practical comparison of learning style, workload, and long-term pathway implications for families.",
    category: "Study Tips",
    date: "Mar 10, 2026",
    readTime: "6 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Student choosing between academic tracks",
    categoryColor: "var(--color-primary-dark)",
    categoryBg: "var(--color-primary-100)",
    content: [
      "Board selection should reflect the student's learning temperament, not only market popularity. CBSE usually favors concise exam frameworks, while ICSE tends to emphasize language depth and broader coursework.",
      "Parents should compare weekly workload tolerance, writing comfort, and future exam targets. Misalignment here creates avoidable stress that no tutor can fully offset.",
      "A short trial period with board-specific practice materials often reveals fit quickly. Use that signal before making long-term decisions."
    ],
  },
  {
    slug: "sat-score-improvement-guide",
    title: "How to Improve Your SAT Score by 200+ Points",
    excerpt:
      "A data-backed 10-week approach for students targeting major score jumps with better strategy, not just more hours.",
    category: "Exam Prep",
    date: "Mar 5, 2026",
    readTime: "7 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "SAT preparation desk with mock tests and notes",
    categoryColor: "#4834D4",
    categoryBg: "rgba(108,92,231,0.12)",
    content: [
      "Large SAT score improvements usually come from correcting process mistakes: weak timing strategy, poor question triage, and inconsistent error review.",
      "Use a weekly pattern: one timed section drill per day, one full-length simulation every weekend, and one focused correction session after each test.",
      "Prioritize the most frequently missed question families first. Targeted correction creates faster gains than broad revision across all topics."
    ],
  },
];

export function getBlogBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((article) => article.slug === slug);
}
