// AI-powered Natural Language Processing for Campus Assistant - Enhanced with FAQ System

import { getCampusData, searchFacilities, searchDining, getUpcomingEvents } from "./campus-data"
import { processEnhancedQuery } from "./campus-knowledge"
import { searchFAQs } from "./campus-faq"

export interface AIResponse {
  content: string
  data?: any
  type: "text" | "structured" | "faq"
  confidence: number
  suggestions?: string[]
}

export interface QueryContext {
  query: string
  category: string
  keywords: string[]
  intent: string
}

// Enhanced query analysis using NLP techniques
export const analyzeQuery = (query: string): QueryContext => {
  const lowercaseQuery = query.toLowerCase()
  const words = lowercaseQuery.split(/\s+/).filter((word) => word.length > 2)

  // Remove common stop words
  const stopWords = [
    "the",
    "and",
    "or",
    "but",
    "in",
    "on",
    "at",
    "to",
    "for",
    "of",
    "with",
    "by",
    "is",
    "are",
    "was",
    "were",
    "what",
    "where",
    "when",
    "how",
    "can",
    "could",
    "would",
    "should",
  ]
  const keywords = words.filter((word) => !stopWords.includes(word))

  const { category } = processEnhancedQuery(query)

  // Determine user intent
  let intent = "information"
  if (lowercaseQuery.includes("how") || lowercaseQuery.includes("help")) {
    intent = "help"
  } else if (lowercaseQuery.includes("where") || lowercaseQuery.includes("location")) {
    intent = "location"
  } else if (lowercaseQuery.includes("when") || lowercaseQuery.includes("time") || lowercaseQuery.includes("hours")) {
    intent = "schedule"
  } else if (lowercaseQuery.includes("what") || lowercaseQuery.includes("show") || lowercaseQuery.includes("list")) {
    intent = "list"
  }

  return {
    query,
    category,
    keywords,
    intent,
  }
}

// Advanced query processing with contextual understanding and FAQ integration
export const processAdvancedQuery = async (query: string): Promise<AIResponse> => {
  const context = analyzeQuery(query)
  const campusData = getCampusData()
  const lowercaseQuery = query.toLowerCase()

  // Enhanced FAQ processing
  if (context.category === "faq") {
    const matchingFAQs = searchFAQs(query)
    if (matchingFAQs.length > 0) {
      const topFAQ = matchingFAQs[0]
      return {
        content: `Here's what I found about "${query}":\n\n**${topFAQ.question}**\n\n${topFAQ.answer}`,
        data: matchingFAQs,
        type: "faq",
        confidence: 0.95,
        suggestions: topFAQ.relatedQuestions,
      }
    }
  }

  // Handle complex queries with multiple intents
  if (context.keywords.length === 0) {
    return {
      content:
        "I'd be happy to help! Could you please be more specific about what you're looking for? I can assist with class schedules, campus facilities, dining options, library services, and administrative procedures.",
      type: "text",
      confidence: 0.3,
    }
  }

  // Enhanced facility queries
  if (context.category === "facilities") {
    const facilities = searchFacilities(query)

    if (context.intent === "location" && facilities.length > 0) {
      const facility = facilities[0]
      return {
        content: `The ${facility.name} is located at ${facility.location}. ${facility.description}`,
        data: [facility],
        type: "structured",
        confidence: 0.9,
      }
    }

    if (context.intent === "schedule" && facilities.length > 0) {
      const facility = facilities[0]
      return {
        content: `The ${facility.name} is open ${facility.hours}.`,
        data: [facility],
        type: "structured",
        confidence: 0.9,
      }
    }

    return {
      content:
        facilities.length > 0 ? "Here are the campus facilities I found:" : "Here are all available campus facilities:",
      data: facilities.length > 0 ? facilities : campusData.campusFacilities,
      type: "structured",
      confidence: facilities.length > 0 ? 0.8 : 0.6,
    }
  }

  // Enhanced dining queries
  if (context.category === "dining") {
    const dining = searchDining(query)

    if (lowercaseQuery.includes("open") || lowercaseQuery.includes("hours")) {
      return {
        content: "Here are the dining hours for today:",
        data: dining.length > 0 ? dining : campusData.diningOptions,
        type: "structured",
        confidence: 0.9,
      }
    }

    if (lowercaseQuery.includes("menu") || lowercaseQuery.includes("food") || lowercaseQuery.includes("eat")) {
      return {
        content: "Here are the available dining options and their specialties:",
        data: dining.length > 0 ? dining : campusData.diningOptions,
        type: "structured",
        confidence: 0.8,
      }
    }

    return {
      content: "Here are the dining options available on campus:",
      data: dining.length > 0 ? dining : campusData.diningOptions,
      type: "structured",
      confidence: 0.7,
    }
  }

  // Enhanced schedule queries
  if (context.category === "schedule") {
    if (context.intent === "list" || lowercaseQuery.includes("all") || lowercaseQuery.includes("my")) {
      return {
        content: "Here are your current class schedules:",
        data: campusData.classSchedules,
        type: "structured",
        confidence: 0.9,
      }
    }

    // Look for specific course codes
    const courseMatch = query.match(/([A-Z]{2,4}\s?\d{3})/i)
    if (courseMatch) {
      const courseCode = courseMatch[1].replace(/\s/, "")
      const course = campusData.classSchedules.find((c) => c.courseCode.toLowerCase() === courseCode.toLowerCase())
      if (course) {
        return {
          content: `Here's the schedule for ${course.courseCode}:`,
          data: [course],
          type: "structured",
          confidence: 0.95,
        }
      }
    }

    return {
      content: "Here are your class schedules:",
      data: campusData.classSchedules,
      type: "structured",
      confidence: 0.8,
    }
  }

  // Enhanced library queries
  if (context.category === "library") {
    if (lowercaseQuery.includes("book") || lowercaseQuery.includes("borrow")) {
      const bookService = campusData.libraryServices.find((s) => s.name.toLowerCase().includes("book"))
      return {
        content: "Here's information about borrowing books from the library:",
        data: bookService ? [bookService] : campusData.libraryServices,
        type: "structured",
        confidence: 0.9,
      }
    }

    if (lowercaseQuery.includes("computer") || lowercaseQuery.includes("print")) {
      const computerService = campusData.libraryServices.find((s) => s.name.toLowerCase().includes("computer"))
      return {
        content: "Here's information about computer and printing services:",
        data: computerService ? [computerService] : campusData.libraryServices,
        type: "structured",
        confidence: 0.9,
      }
    }

    return {
      content: "Here are all the library services available:",
      data: campusData.libraryServices,
      type: "structured",
      confidence: 0.8,
    }
  }

  // Enhanced administrative queries
  if (context.category === "administrative") {
    if (lowercaseQuery.includes("pay") || lowercaseQuery.includes("tuition") || lowercaseQuery.includes("fee")) {
      const tuitionService = campusData.administrativeServices.find((s) => s.name.toLowerCase().includes("tuition"))
      return {
        content: "Here's how to pay your tuition and fees:",
        data: tuitionService
          ? [tuitionService]
          : campusData.administrativeServices.filter(
              (s) => s.name.toLowerCase().includes("tuition") || s.name.toLowerCase().includes("financial"),
            ),
        type: "structured",
        confidence: 0.9,
      }
    }

    if (lowercaseQuery.includes("scholarship") || lowercaseQuery.includes("financial aid")) {
      const scholarshipService = campusData.administrativeServices.find((s) =>
        s.name.toLowerCase().includes("scholarship"),
      )
      return {
        content: "Here's information about scholarships and financial aid:",
        data: scholarshipService
          ? [scholarshipService]
          : campusData.administrativeServices.filter(
              (s) => s.name.toLowerCase().includes("scholarship") || s.name.toLowerCase().includes("financial"),
            ),
        type: "structured",
        confidence: 0.9,
      }
    }

    return {
      content: "Here are the administrative services available:",
      data: campusData.administrativeServices,
      type: "structured",
      confidence: 0.7,
    }
  }

  // Enhanced calendar queries
  if (context.category === "calendar") {
    const upcomingEvents = getUpcomingEvents()

    if (lowercaseQuery.includes("exam") || lowercaseQuery.includes("test")) {
      const exams = upcomingEvents.filter((event) => event.type === "exam")
      return {
        content:
          exams.length > 0 ? "Here are the upcoming exam dates:" : "No upcoming exams found in the next 30 days.",
        data: exams.length > 0 ? exams : upcomingEvents,
        type: "structured",
        confidence: 0.9,
      }
    }

    if (lowercaseQuery.includes("deadline")) {
      const deadlines = upcomingEvents.filter((event) => event.type === "deadline")
      return {
        content:
          deadlines.length > 0
            ? "Here are the upcoming deadlines:"
            : "No upcoming deadlines found in the next 30 days.",
        data: deadlines.length > 0 ? deadlines : upcomingEvents,
        type: "structured",
        confidence: 0.9,
      }
    }

    return {
      content: "Here are the upcoming important dates:",
      data: upcomingEvents,
      type: "structured",
      confidence: 0.8,
    }
  }

  // Try FAQ search as fallback
  const potentialFAQs = searchFAQs(query)
  if (potentialFAQs.length > 0) {
    const topFAQ = potentialFAQs[0]
    return {
      content: `I think this might help answer your question:\n\n**${topFAQ.question}**\n\n${topFAQ.answer}`,
      data: potentialFAQs.slice(0, 3),
      type: "faq",
      confidence: 0.7,
      suggestions: topFAQ.relatedQuestions,
    }
  }

  // Ultimate fallback with enhanced suggestions
  return {
    content: `I'm not sure I understand "${query}" completely, but I'm here to help! I can assist you with:

🎓 **Academic Information**
• Class schedules and course details
• Academic calendar and important dates
• Exam schedules and deadlines

🏢 **Campus Facilities**
• Building locations and hours
• Library services and resources
• Recreation center and gym facilities

🍽️ **Dining & Services**
• Cafeteria menus and hours
• Coffee shops and restaurants
• Campus dining options

💼 **Administrative Services**
• Tuition payments and fees
• Student ID card services
• Scholarships and financial aid

❓ **Common Questions**
• How do I register for classes?
• Where is the library?
• How do I pay tuition?
• What dining options are available?

Try asking me something like "How do I borrow books?" or "Where can I get lunch?"`,
    type: "text",
    confidence: 0.4,
    suggestions: [
      "How do I register for classes?",
      "Where is the library?",
      "What dining options are available?",
      "How do I pay tuition?",
    ],
  }
}

// Simulate AI processing delay and add natural language generation
export const generateNaturalResponse = async (query: string): Promise<AIResponse> => {
  // Simulate AI processing time
  await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 1000))

  const response = await processAdvancedQuery(query)

  // Add natural language variations to responses
  const variations = {
    "Here are": ["Here are", "I found", "Here's what I found:", "These are"],
    "Here's": ["Here's", "Here is", "I found", "This is"],
    "I can help": ["I can help", "I'd be happy to help", "Let me assist you", "I'm here to help"],
  }

  let naturalContent = response.content
  Object.entries(variations).forEach(([original, replacements]) => {
    if (naturalContent.startsWith(original)) {
      const randomReplacement = replacements[Math.floor(Math.random() * replacements.length)]
      naturalContent = naturalContent.replace(original, randomReplacement)
    }
  })

  return {
    ...response,
    content: naturalContent,
  }
}
