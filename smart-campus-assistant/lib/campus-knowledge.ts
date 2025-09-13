// Campus Knowledge Base - Enhanced Natural Language Processing Helper

import { searchFAQs } from "./campus-faq"

export interface KnowledgeEntry {
  keywords: string[]
  category: "schedule" | "facilities" | "dining" | "library" | "administrative" | "calendar" | "faq"
  response: string
  data?: any
}

export const campusKnowledge: KnowledgeEntry[] = [
  // Class Schedule Related
  {
    keywords: ["class", "schedule", "course", "time", "when", "CS101", "computer science"],
    category: "schedule",
    response: "I can help you with class schedules. Here are the current courses:",
  },
  {
    keywords: ["professor", "instructor", "teacher", "who teaches"],
    category: "schedule",
    response: "Here are the instructors for current courses:",
  },

  // Facilities Related
  {
    keywords: ["library", "where is", "location", "building", "hours"],
    category: "facilities",
    response: "Here's information about campus facilities:",
  },
  {
    keywords: ["gym", "recreation", "fitness", "pool", "sports", "exercise"],
    category: "facilities",
    response: "The Student Recreation Center offers excellent fitness facilities:",
  },
  {
    keywords: ["lab", "laboratory", "science", "research", "equipment"],
    category: "facilities",
    response: "Our Science Laboratory Complex provides state-of-the-art research facilities:",
  },
  {
    keywords: ["parking", "park", "car", "vehicle", "permit"],
    category: "facilities",
    response: "Here's information about campus parking:",
  },

  // Dining Related
  {
    keywords: ["food", "eat", "dining", "cafeteria", "restaurant", "menu", "hungry"],
    category: "dining",
    response: "Here are the dining options available on campus:",
  },
  {
    keywords: ["coffee", "cafe", "drink", "beverage"],
    category: "dining",
    response: "For coffee and light refreshments, check out Campus Grind:",
  },
  {
    keywords: ["pizza", "late night", "dinner"],
    category: "dining",
    response: "Pizza Corner is great for dinner and late-night dining:",
  },
  {
    keywords: ["vegetarian", "vegan", "dietary", "gluten-free", "healthy"],
    category: "dining",
    response: "We have excellent vegetarian and vegan options available:",
  },

  // Library Related
  {
    keywords: ["book", "borrow", "study", "research", "quiet", "computer", "print"],
    category: "library",
    response: "The Central Library offers comprehensive services:",
  },
  {
    keywords: ["printing", "scan", "copy", "computer lab"],
    category: "library",
    response: "For printing and computer services:",
  },

  // Administrative Related
  {
    keywords: ["pay", "tuition", "fees", "bill", "payment", "money"],
    category: "administrative",
    response: "For tuition payments and financial services:",
  },
  {
    keywords: ["id card", "student id", "replacement", "lost card"],
    category: "administrative",
    response: "For student ID card services:",
  },
  {
    keywords: ["scholarship", "financial aid", "money", "assistance"],
    category: "administrative",
    response: "For scholarships and financial assistance:",
  },
  {
    keywords: ["register", "registration", "enroll", "add class", "drop class"],
    category: "administrative",
    response: "For course registration:",
  },

  // Calendar Related
  {
    keywords: ["calendar", "events", "dates", "deadline", "exam", "holiday"],
    category: "calendar",
    response: "Here are upcoming important dates:",
  },
  {
    keywords: ["exam", "test", "midterm", "final"],
    category: "calendar",
    response: "Here are the upcoming exam dates:",
  },

  // FAQ Related
  {
    keywords: ["how", "what", "where", "when", "why", "help", "question", "faq"],
    category: "faq",
    response: "I found some frequently asked questions that might help:",
  },
]

export const findRelevantKnowledge = (query: string): KnowledgeEntry[] => {
  const lowercaseQuery = query.toLowerCase()
  const words = lowercaseQuery.split(" ")

  return campusKnowledge.filter((entry) =>
    entry.keywords.some((keyword) =>
      words.some((word) => word.includes(keyword.toLowerCase()) || keyword.toLowerCase().includes(word)),
    ),
  )
}

export const categorizeQuery = (query: string): string => {
  const lowercaseQuery = query.toLowerCase()

  // Check for FAQ indicators first
  if (
    lowercaseQuery.includes("how do i") ||
    lowercaseQuery.includes("how to") ||
    lowercaseQuery.includes("what should i") ||
    lowercaseQuery.includes("can i") ||
    lowercaseQuery.includes("where do i") ||
    lowercaseQuery.includes("help") ||
    lowercaseQuery.includes("?")
  ) {
    // Try to find matching FAQs
    const faqs = searchFAQs(query)
    if (faqs.length > 0) {
      return "faq"
    }
  }

  const relevantKnowledge = findRelevantKnowledge(query)
  if (relevantKnowledge.length > 0) {
    return relevantKnowledge[0].category
  }
  return "general"
}

export const getContextualHelp = (category: string): string[] => {
  const helpTexts: Record<string, string[]> = {
    schedule: [
      "Try asking: 'What's my class schedule?'",
      "Or: 'When is my CS101 class?'",
      "Or: 'Who teaches calculus?'",
    ],
    facilities: [
      "Try asking: 'Where is the library?'",
      "Or: 'What are the gym hours?'",
      "Or: 'How do I get to the science building?'",
    ],
    dining: [
      "Try asking: 'What dining options are available?'",
      "Or: 'Do you have vegetarian food?'",
      "Or: 'Where can I get coffee?'",
    ],
    library: [
      "Try asking: 'How do I borrow books?'",
      "Or: 'Can I print at the library?'",
      "Or: 'What are the library hours?'",
    ],
    administrative: [
      "Try asking: 'How do I pay tuition?'",
      "Or: 'Where do I get my student ID?'",
      "Or: 'How do I apply for scholarships?'",
    ],
    calendar: [
      "Try asking: 'When are final exams?'",
      "Or: 'What are the important dates?'",
      "Or: 'When is registration?'",
    ],
  }

  return (
    helpTexts[category] || [
      "Try asking about classes, facilities, dining, library, or administrative services",
      "You can ask questions like 'Where is...' or 'How do I...'",
      "I'm here to help with any campus-related questions!",
    ]
  )
}

// Enhanced query processing with FAQ integration
export const processEnhancedQuery = (query: string) => {
  const category = categorizeQuery(query)

  if (category === "faq") {
    const matchingFAQs = searchFAQs(query)
    if (matchingFAQs.length > 0) {
      return {
        category: "faq",
        faqs: matchingFAQs,
        suggestions: getContextualHelp(matchingFAQs[0].category),
      }
    }
  }

  return {
    category,
    faqs: [],
    suggestions: getContextualHelp(category),
  }
}
