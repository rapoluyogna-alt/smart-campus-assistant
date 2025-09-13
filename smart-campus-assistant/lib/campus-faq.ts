// Campus-Specific FAQ and Knowledge System

export interface FAQ {
  id: string
  question: string
  answer: string
  category: "academic" | "facilities" | "dining" | "library" | "administrative" | "general"
  keywords: string[]
  relatedQuestions: string[]
}

export const campusFAQs: FAQ[] = [
  // Academic FAQs
  {
    id: "1",
    question: "How do I register for classes?",
    answer:
      "To register for classes, visit the Registrar's Office in Administration Building, Room 100 (8AM-5PM, Mon-Fri). You'll need academic advisor approval, prerequisite completion verification, and tuition payment if required. You can also register online through the student portal.",
    category: "academic",
    keywords: ["register", "registration", "enroll", "classes", "courses", "sign up"],
    relatedQuestions: ["When does registration open?", "How do I drop a class?", "What if a class is full?"],
  },
  {
    id: "2",
    question: "When are final exams?",
    answer:
      "Final exams for Fall 2024 begin on December 9th and run through December 13th. The exam schedule is posted on the student portal, and you can also check with your individual instructors for specific exam times and locations.",
    category: "academic",
    keywords: ["final", "exams", "finals", "test", "examination", "schedule"],
    relatedQuestions: ["Where do I take my exams?", "What if I miss a final exam?", "When are midterm exams?"],
  },
  {
    id: "3",
    question: "How do I contact my professor?",
    answer:
      "You can contact your professors through email (check your syllabus for their email addresses), during their office hours, or after class. Most professors also use the campus learning management system for course communications.",
    category: "academic",
    keywords: ["professor", "instructor", "teacher", "contact", "email", "office hours"],
    relatedQuestions: ["What are office hours?", "How do I schedule a meeting?", "Where are faculty offices?"],
  },

  // Facilities FAQs
  {
    id: "4",
    question: "Where is the library located?",
    answer:
      "The Central Library is located in Main Campus, Building A. It's open 8AM-10PM Monday through Friday, and 10AM-8PM on weekends. The library offers study rooms, computer labs, printing services, and extensive book and digital collections.",
    category: "facilities",
    keywords: ["library", "location", "where", "building", "central library"],
    relatedQuestions: ["What are library hours?", "How do I reserve a study room?", "Can I print at the library?"],
  },
  {
    id: "5",
    question: "How do I access the gym?",
    answer:
      "The Student Recreation Center is located on South Campus and is open 6AM-11PM daily. You need a valid student ID to access the facility. It includes gym equipment, swimming pool, basketball courts, rock climbing wall, and group fitness classes.",
    category: "facilities",
    keywords: ["gym", "recreation", "fitness", "access", "student id", "workout"],
    relatedQuestions: ["What equipment is available?", "Are there fitness classes?", "How much does it cost?"],
  },
  {
    id: "6",
    question: "Where can I park on campus?",
    answer:
      "Student parking is available in designated lots around campus. You need a parking permit, which can be purchased from Campus Security. Visitor parking is available in the main lot near the Administration Building for $5/day.",
    category: "facilities",
    keywords: ["parking", "park", "car", "permit", "lot", "vehicle"],
    relatedQuestions: ["How much is a parking permit?", "Where is visitor parking?", "What about overnight parking?"],
  },

  // Dining FAQs
  {
    id: "7",
    question: "What dining options are available?",
    answer:
      "Campus offers several dining options: Main Campus Cafeteria (7AM-9PM daily) with international cuisine, Campus Grind Coffee Shop (6:30AM-10PM) for coffee and pastries, and Pizza Corner (11AM-11PM) for Italian food and late-night dining.",
    category: "dining",
    keywords: ["dining", "food", "eat", "cafeteria", "restaurant", "meal"],
    relatedQuestions: ["What are the hours?", "Do you have vegetarian options?", "How do I pay for meals?"],
  },
  {
    id: "8",
    question: "Do you have vegetarian and vegan options?",
    answer:
      "Yes! All dining locations offer vegetarian options, and the Main Campus Cafeteria has a dedicated vegan section. Menu items are clearly labeled with dietary information including vegetarian, vegan, and gluten-free options.",
    category: "dining",
    keywords: ["vegetarian", "vegan", "dietary", "restrictions", "gluten-free", "healthy"],
    relatedQuestions: ["What about food allergies?", "Is there a salad bar?", "Can I see nutritional information?"],
  },

  // Library FAQs
  {
    id: "9",
    question: "How do I borrow books from the library?",
    answer:
      "To borrow books, bring your student ID to the Circulation Desk. Students can borrow up to 10 books for 3 weeks with one renewal option. Late fees are $0.50 per day per item. You can also reserve books online through the library catalog.",
    category: "library",
    keywords: ["borrow", "books", "checkout", "loan", "student id", "circulation"],
    relatedQuestions: ["How long can I keep books?", "How do I renew books?", "What if I lose a book?"],
  },
  {
    id: "10",
    question: "Can I print and scan at the library?",
    answer:
      "Yes! The library has computer and printing services available 8AM-10PM (Mon-Fri) and 10AM-8PM (weekends). Printing costs $0.10 per page for black & white and $0.25 for color. Scanning services are free.",
    category: "library",
    keywords: ["print", "printing", "scan", "scanning", "computer", "copy"],
    relatedQuestions: ["How do I pay for printing?", "Can I print from my laptop?", "Is there wireless printing?"],
  },

  // Administrative FAQs
  {
    id: "11",
    question: "How do I pay my tuition?",
    answer:
      "Tuition can be paid at Student Financial Services (Administration Building, Room 150, 9AM-5PM Mon-Fri) by cash, check, or card. You can also pay online through the student portal or set up a payment plan. Contact billing@university.edu for assistance.",
    category: "administrative",
    keywords: ["tuition", "pay", "payment", "fees", "bill", "financial"],
    relatedQuestions: ["Can I set up a payment plan?", "When is tuition due?", "What payment methods are accepted?"],
  },
  {
    id: "12",
    question: "How do I get a replacement student ID?",
    answer:
      "Visit Student ID Services at the Student Union Building, Ground Floor (8AM-6PM Mon-Fri, 10AM-4PM Sat). Bring photo identification and proof of enrollment. Replacement fee is $15. New students get their first ID free.",
    category: "administrative",
    keywords: ["student id", "replacement", "lost", "card", "new id"],
    relatedQuestions: ["What if I lost my ID?", "How much does it cost?", "What do I need to bring?"],
  },
  {
    id: "13",
    question: "How do I apply for scholarships?",
    answer:
      "Visit the Financial Aid Office (Administration Building, Room 200, 9AM-4PM Mon-Fri). You'll need a completed FAFSA, academic transcripts, personal statement, and letters of recommendation. Applications are typically due by March 1st for the following academic year.",
    category: "administrative",
    keywords: ["scholarship", "financial aid", "apply", "application", "money", "assistance"],
    relatedQuestions: ["What scholarships are available?", "When is the deadline?", "Do I need good grades?"],
  },

  // General FAQs
  {
    id: "14",
    question: "What should I do in an emergency?",
    answer:
      "In case of emergency, call 911 immediately. For campus security, call (555) 123-SAFE. Emergency phones are located throughout campus. The Campus Safety Office is available 24/7 and can provide escorts, emergency assistance, and incident reporting.",
    category: "general",
    keywords: ["emergency", "safety", "security", "help", "911", "campus safety"],
    relatedQuestions: ["Where are emergency phones?", "How do I report an incident?", "Is there campus security?"],
  },
  {
    id: "15",
    question: "How do I connect to campus WiFi?",
    answer:
      "Connect to the 'CampusWiFi' network using your student ID and password. If you have trouble connecting, visit IT Support in the Library Computer Lab or call the IT Help Desk at (555) 123-TECH. Guest WiFi is also available for visitors.",
    category: "general",
    keywords: ["wifi", "internet", "connection", "network", "password", "it support"],
    relatedQuestions: ["What's the WiFi password?", "Why is WiFi slow?", "Is there guest WiFi?"],
  },
]

export const searchFAQs = (query: string): FAQ[] => {
  const lowercaseQuery = query.toLowerCase()
  const queryWords = lowercaseQuery.split(/\s+/).filter((word) => word.length > 2)

  return campusFAQs
    .map((faq) => {
      let score = 0

      // Check question match
      if (faq.question.toLowerCase().includes(lowercaseQuery)) {
        score += 10
      }

      // Check keyword matches
      faq.keywords.forEach((keyword) => {
        if (lowercaseQuery.includes(keyword.toLowerCase())) {
          score += 5
        }
      })

      // Check individual word matches
      queryWords.forEach((word) => {
        if (faq.question.toLowerCase().includes(word) || faq.answer.toLowerCase().includes(word)) {
          score += 1
        }
        faq.keywords.forEach((keyword) => {
          if (keyword.toLowerCase().includes(word)) {
            score += 2
          }
        })
      })

      return { faq, score }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ faq }) => faq)
}

export const getFAQsByCategory = (category: string): FAQ[] => {
  return campusFAQs.filter((faq) => faq.category === category)
}

export const getRelatedFAQs = (faqId: string): FAQ[] => {
  const faq = campusFAQs.find((f) => f.id === faqId)
  if (!faq) return []

  return campusFAQs.filter((f) =>
    faq.relatedQuestions.some((question) => f.question.toLowerCase().includes(question.toLowerCase())),
  )
}
