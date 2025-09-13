"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  MessageCircle,
  Send,
  Calendar,
  MapPin,
  Utensils,
  BookOpen,
  CreditCard,
  Users,
  Clock,
  Phone,
  Mail,
  Brain,
} from "lucide-react"
import { generateNaturalResponse } from "@/lib/ai-processor"
import { categorizeQuery } from "@/lib/campus-knowledge"

interface Message {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
  data?: any
  type?: "text" | "structured" | "faq"
  confidence?: number
  suggestions?: string[]
}

const quickActions = [
  { icon: Calendar, label: "Class Schedule", query: "Show me my class schedule" },
  { icon: MapPin, label: "Campus Map", query: "Where is the library?" },
  { icon: Utensils, label: "Dining Options", query: "What are today's dining options?" },
  { icon: BookOpen, label: "Library Hours", query: "What are the library hours?" },
  { icon: CreditCard, label: "Fees & Payments", query: "How do I pay my tuition fees?" },
  { icon: Users, label: "Student Services", query: "What student services are available?" },
]

export function CampusAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your Smart Campus Assistant powered by advanced AI. I can understand natural language and help you with class schedules, campus facilities, dining options, library services, and administrative procedures. Feel free to ask me anything in your own words!",
      sender: "assistant",
      timestamp: new Date(),
      type: "text",
      confidence: 1.0,
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const aiResponse = await generateNaturalResponse(content)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse.content,
        sender: "assistant",
        timestamp: new Date(),
        data: aiResponse.data,
        type: aiResponse.type,
        confidence: aiResponse.confidence,
        suggestions: aiResponse.suggestions,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      // Fallback error handling
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I apologize, but I'm having trouble processing your request right now. Please try again or ask me something else!",
        sender: "assistant",
        timestamp: new Date(),
        type: "text",
        confidence: 0.1,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickAction = (query: string) => {
    handleSendMessage(query)
  }

  const renderStructuredData = (data: any, message: Message) => {
    if (!data) return null

    // Handle FAQ data specifically
    if (message.type === "faq" && Array.isArray(data)) {
      return (
        <div className="mt-3 space-y-3">
          {data.slice(0, 3).map((faq: any, index: number) => (
            <Card key={index} className="bg-muted/50 border-border/50">
              <CardContent className="p-4">
                <h4 className="font-heading font-semibold text-card-foreground mb-2">{faq.question}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                {faq.relatedQuestions && faq.relatedQuestions.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Related questions:</p>
                    <div className="space-y-1">
                      {faq.relatedQuestions.slice(0, 2).map((question: string, i: number) => (
                        <Button
                          key={i}
                          variant="ghost"
                          size="sm"
                          className="h-auto p-2 text-xs text-left justify-start hover:bg-sidebar-accent"
                          onClick={() => handleSendMessage(question)}
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          {message.suggestions && message.suggestions.length > 0 && (
            <div className="mt-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-xs font-medium text-primary mb-2">You might also ask:</p>
              <div className="space-y-1">
                {message.suggestions.slice(0, 3).map((suggestion: string, i: number) => (
                  <Button
                    key={i}
                    variant="ghost"
                    size="sm"
                    className="h-auto p-2 text-xs text-left justify-start hover:bg-primary/10 text-primary"
                    onClick={() => handleSendMessage(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      )
    }

    // Handle other types of structured data
    if (Array.isArray(data)) {
      return (
        <div className="mt-3 space-y-3">
          {data.map((item: any, index: number) => (
            <Card key={index} className="bg-muted/50 border-border/50">
              <CardContent className="p-4">
                {categorizeQuery(message.content) === "schedule" && (
                  <div>
                    <h4 className="font-heading font-semibold text-card-foreground">
                      {item.courseCode} - {item.courseName}
                    </h4>
                    <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>Instructor: {item.instructor}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>
                          {item.time} - {item.days.join(", ")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>
                )}
                {categorizeQuery(message.content) === "facilities" && (
                  <div>
                    <h4 className="font-heading font-semibold text-card-foreground">{item.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{item.hours}</span>
                      </div>
                      {item.contact && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>{item.contact}</span>
                        </div>
                      )}
                    </div>
                    {item.amenities && (
                      <div className="mt-2">
                        <p className="text-xs font-medium text-muted-foreground mb-1">Amenities:</p>
                        <div className="flex flex-wrap gap-1">
                          {item.amenities.slice(0, 4).map((amenity: string, i: number) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {categorizeQuery(message.content) === "dining" && (
                  <div>
                    <h4 className="font-heading font-semibold text-card-foreground">{item.name}</h4>
                    <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{item.hours}</span>
                      </div>
                    </div>
                    {item.specialties && (
                      <div className="mt-2">
                        <p className="text-xs font-medium text-muted-foreground mb-1">Specialties:</p>
                        <div className="flex flex-wrap gap-1">
                          {item.specialties.map((specialty: string, i: number) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {categorizeQuery(message.content) === "library" && (
                  <div>
                    <h4 className="font-heading font-semibold text-card-foreground">{item.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{item.hours}</span>
                      </div>
                    </div>
                  </div>
                )}
                {categorizeQuery(message.content) === "administrative" && (
                  <div>
                    <h4 className="font-heading font-semibold text-card-foreground">{item.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{item.hours}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{item.contact}</span>
                      </div>
                    </div>
                  </div>
                )}
                {categorizeQuery(message.content) === "calendar" && (
                  <div>
                    <h4 className="font-heading font-semibold text-card-foreground">{item.event}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(item.date).toLocaleDateString()}</span>
                      </div>
                      <Badge
                        variant={
                          item.type === "deadline" ? "destructive" : item.type === "exam" ? "secondary" : "default"
                        }
                        className="text-xs"
                      >
                        {item.type}
                      </Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )
    }

    return null
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-80 bg-sidebar border-r border-sidebar-border p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-primary rounded-lg">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-xl text-sidebar-foreground">Smart Campus</h1>
            <p className="text-sm text-sidebar-foreground/70 flex items-center gap-1">
              <Brain className="h-3 w-3" />
              AI Assistant
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-heading font-semibold text-sidebar-foreground">Quick Actions</h2>
          <div className="grid gap-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                className="justify-start gap-3 h-auto p-3 text-left hover:bg-sidebar-accent"
                onClick={() => handleQuickAction(action.query)}
              >
                <action.icon className="h-4 w-4 text-sidebar-primary" />
                <span className="text-sm">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-8 p-4 bg-sidebar-accent rounded-lg">
          <h3 className="font-heading font-semibold text-sm mb-2">Campus Hours</h3>
          <div className="space-y-1 text-xs text-sidebar-foreground/70">
            <div className="flex justify-between">
              <span>Library:</span>
              <span>8AM - 10PM</span>
            </div>
            <div className="flex justify-between">
              <span>Cafeteria:</span>
              <span>7AM - 9PM</span>
            </div>
            <div className="flex justify-between">
              <span>Admin Office:</span>
              <span>9AM - 5PM</span>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center gap-2 mb-1">
            <Brain className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-primary">AI-Powered</span>
          </div>
          <p className="text-xs text-muted-foreground">Natural language understanding with contextual responses</p>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-border p-4 bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-primary" />
              <h2 className="font-heading font-semibold text-card-foreground">Campus Assistant Chat</h2>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                <Brain className="h-3 w-3 mr-1" />
                AI Online
              </Badge>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <Card
                  className={`max-w-[80%] ${
                    message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                    {(message.type === "structured" || message.type === "faq") && message.data && (
                      <div className="mt-3">{renderStructuredData(message.data, message)}</div>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <p
                        className={`text-xs ${
                          message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      {message.sender === "assistant" && message.confidence !== undefined && (
                        <div className="flex items-center gap-1">
                          <Brain className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{Math.round(message.confidence * 100)}%</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <Card className="bg-card text-card-foreground">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <Brain className="h-4 w-4 text-primary animate-pulse" />
                      <span className="text-sm text-muted-foreground">AI is thinking...</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-border p-4 bg-card">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about campus in natural language..."
                className="flex-1 bg-input border-border"
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage(inputValue)
                  }
                }}
                disabled={isLoading}
              />
              <Button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isLoading}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Powered by AI • Ask questions naturally like "When is my next class?" or "Where can I get lunch?"
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
