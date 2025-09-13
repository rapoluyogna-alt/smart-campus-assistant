// Campus Database - Mock Data for Smart Campus Assistant

export interface ClassSchedule {
  id: string
  courseCode: string
  courseName: string
  instructor: string
  time: string
  days: string[]
  location: string
  semester: string
}

export interface CampusFacility {
  id: string
  name: string
  type: "academic" | "recreational" | "administrative" | "residential" | "dining"
  location: string
  hours: string
  description: string
  amenities: string[]
  contact?: string
}

export interface DiningOption {
  id: string
  name: string
  type: "cafeteria" | "restaurant" | "cafe" | "food_truck"
  location: string
  hours: string
  menu: MenuItem[]
  specialties: string[]
}

export interface MenuItem {
  name: string
  price: number
  category: "breakfast" | "lunch" | "dinner" | "snacks" | "beverages"
  dietary: string[] // vegetarian, vegan, gluten-free, etc.
}

export interface LibraryService {
  id: string
  name: string
  description: string
  location: string
  hours: string
  policies: string[]
  resources: string[]
}

export interface AdministrativeService {
  id: string
  name: string
  department: string
  description: string
  location: string
  hours: string
  requirements: string[]
  contact: string
  forms?: string[]
}

export interface AcademicCalendar {
  id: string
  event: string
  date: string
  description: string
  type: "deadline" | "holiday" | "exam" | "registration" | "event"
}

// Mock Data
export const classSchedules: ClassSchedule[] = [
  {
    id: "1",
    courseCode: "CS101",
    courseName: "Introduction to Computer Science",
    instructor: "Dr. Sarah Johnson",
    time: "9:00 AM - 10:30 AM",
    days: ["Monday", "Wednesday", "Friday"],
    location: "Science Building, Room 201",
    semester: "Fall 2024",
  },
  {
    id: "2",
    courseCode: "MATH201",
    courseName: "Calculus II",
    instructor: "Prof. Michael Chen",
    time: "11:00 AM - 12:30 PM",
    days: ["Tuesday", "Thursday"],
    location: "Mathematics Hall, Room 105",
    semester: "Fall 2024",
  },
  {
    id: "3",
    courseCode: "ENG102",
    courseName: "English Composition",
    instructor: "Dr. Emily Rodriguez",
    time: "2:00 PM - 3:30 PM",
    days: ["Monday", "Wednesday"],
    location: "Liberal Arts Building, Room 301",
    semester: "Fall 2024",
  },
  {
    id: "4",
    courseCode: "PHYS151",
    courseName: "General Physics I",
    instructor: "Dr. Robert Kim",
    time: "10:00 AM - 11:30 AM",
    days: ["Tuesday", "Thursday"],
    location: "Physics Lab, Room 150",
    semester: "Fall 2024",
  },
]

export const campusFacilities: CampusFacility[] = [
  {
    id: "1",
    name: "Central Library",
    type: "academic",
    location: "Main Campus, Building A",
    hours: "8:00 AM - 10:00 PM (Mon-Fri), 10:00 AM - 8:00 PM (Weekends)",
    description: "Main library with extensive collection of books, journals, and digital resources",
    amenities: ["Study rooms", "Computer lab", "Printing services", "WiFi", "Silent study areas"],
    contact: "library@university.edu",
  },
  {
    id: "2",
    name: "Student Recreation Center",
    type: "recreational",
    location: "South Campus",
    hours: "6:00 AM - 11:00 PM (Daily)",
    description: "Full-service fitness center with gym, pool, and sports facilities",
    amenities: ["Gym equipment", "Swimming pool", "Basketball courts", "Rock climbing wall", "Group fitness classes"],
    contact: "recreation@university.edu",
  },
  {
    id: "3",
    name: "Student Health Center",
    type: "administrative",
    location: "Health Services Building",
    hours: "8:00 AM - 5:00 PM (Mon-Fri)",
    description: "Medical services for students including routine care and emergency services",
    amenities: ["Medical consultations", "Pharmacy", "Mental health counseling", "Vaccination services"],
    contact: "(555) 123-4567",
  },
  {
    id: "4",
    name: "North Residence Hall",
    type: "residential",
    location: "North Campus",
    hours: "24/7 (Resident access)",
    description: "Modern dormitory housing for undergraduate students",
    amenities: ["Single and double rooms", "Common areas", "Laundry facilities", "Study lounges", "24/7 security"],
    contact: "housing@university.edu",
  },
  {
    id: "5",
    name: "Science Laboratory Complex",
    type: "academic",
    location: "Science Building, Floors 2-4",
    hours: "8:00 AM - 6:00 PM (Mon-Fri)",
    description: "State-of-the-art laboratories for chemistry, biology, and physics",
    amenities: ["Research equipment", "Safety equipment", "Computer workstations", "Storage facilities"],
    contact: "sciencelab@university.edu",
  },
]

export const diningOptions: DiningOption[] = [
  {
    id: "1",
    name: "Main Campus Cafeteria",
    type: "cafeteria",
    location: "Student Union Building, Ground Floor",
    hours: "7:00 AM - 9:00 PM (Daily)",
    specialties: ["International cuisine", "Healthy options", "Vegetarian/Vegan meals"],
    menu: [
      { name: "Breakfast Burrito", price: 6.99, category: "breakfast", dietary: ["vegetarian"] },
      { name: "Grilled Chicken Salad", price: 8.99, category: "lunch", dietary: ["gluten-free"] },
      { name: "Pasta Primavera", price: 9.99, category: "dinner", dietary: ["vegetarian"] },
      { name: "Fresh Fruit Bowl", price: 4.99, category: "snacks", dietary: ["vegan", "gluten-free"] },
      { name: "Coffee", price: 2.99, category: "beverages", dietary: ["vegan"] },
    ],
  },
  {
    id: "2",
    name: "Campus Grind Coffee Shop",
    type: "cafe",
    location: "Library Building, First Floor",
    hours: "6:30 AM - 10:00 PM (Mon-Fri), 8:00 AM - 8:00 PM (Weekends)",
    specialties: ["Specialty coffee", "Fresh pastries", "Light meals"],
    menu: [
      { name: "Cappuccino", price: 4.5, category: "beverages", dietary: ["vegetarian"] },
      { name: "Croissant", price: 3.99, category: "breakfast", dietary: ["vegetarian"] },
      { name: "Panini", price: 7.99, category: "lunch", dietary: [] },
      { name: "Muffin", price: 2.99, category: "snacks", dietary: ["vegetarian"] },
    ],
  },
  {
    id: "3",
    name: "Pizza Corner",
    type: "restaurant",
    location: "Student Union Building, Second Floor",
    hours: "11:00 AM - 11:00 PM (Daily)",
    specialties: ["Fresh pizza", "Italian dishes", "Late night dining"],
    menu: [
      { name: "Margherita Pizza", price: 12.99, category: "lunch", dietary: ["vegetarian"] },
      { name: "Pepperoni Pizza", price: 14.99, category: "dinner", dietary: [] },
      { name: "Caesar Salad", price: 7.99, category: "lunch", dietary: ["vegetarian"] },
      { name: "Garlic Bread", price: 4.99, category: "snacks", dietary: ["vegetarian"] },
    ],
  },
]

export const libraryServices: LibraryService[] = [
  {
    id: "1",
    name: "Book Borrowing",
    description: "Borrow books, journals, and multimedia materials",
    location: "Central Library, Circulation Desk",
    hours: "8:00 AM - 10:00 PM (Mon-Fri), 10:00 AM - 8:00 PM (Weekends)",
    policies: [
      "Students can borrow up to 10 books at a time",
      "Loan period is 3 weeks with one renewal",
      "Late fees: $0.50 per day per item",
      "Valid student ID required",
    ],
    resources: ["Books", "Journals", "DVDs", "Audio books", "Digital resources"],
  },
  {
    id: "2",
    name: "Research Assistance",
    description: "Get help with research projects and finding resources",
    location: "Central Library, Reference Desk",
    hours: "9:00 AM - 8:00 PM (Mon-Fri), 12:00 PM - 6:00 PM (Weekends)",
    policies: [
      "Free consultation with librarians",
      "Advance booking recommended for extended sessions",
      "Group research sessions available",
    ],
    resources: ["Database access", "Citation help", "Research guides", "Subject specialists"],
  },
  {
    id: "3",
    name: "Computer and Printing Services",
    description: "Access computers, printers, and scanning equipment",
    location: "Central Library, Computer Lab",
    hours: "8:00 AM - 10:00 PM (Mon-Fri), 10:00 AM - 8:00 PM (Weekends)",
    policies: [
      "Student ID required for computer access",
      "Printing: $0.10 per page (B&W), $0.25 per page (Color)",
      "2-hour time limit during peak hours",
      "Free scanning services",
    ],
    resources: ["Desktop computers", "Laptops for checkout", "Printers", "Scanners", "Software access"],
  },
]

export const administrativeServices: AdministrativeService[] = [
  {
    id: "1",
    name: "Tuition Payment",
    department: "Student Financial Services",
    description: "Pay tuition fees and manage payment plans",
    location: "Administration Building, Room 150",
    hours: "9:00 AM - 5:00 PM (Mon-Fri)",
    requirements: ["Student ID", "Payment method (cash, check, card, or online)"],
    contact: "billing@university.edu",
    forms: ["Payment plan application", "Financial aid forms"],
  },
  {
    id: "2",
    name: "Student ID Card Services",
    department: "Student Services",
    description: "Get new student ID cards or replace lost cards",
    location: "Student Union Building, Ground Floor",
    hours: "8:00 AM - 6:00 PM (Mon-Fri), 10:00 AM - 4:00 PM (Sat)",
    requirements: ["Photo identification", "Proof of enrollment", "$15 replacement fee (if applicable)"],
    contact: "studentid@university.edu",
    forms: ["ID card application", "Replacement request form"],
  },
  {
    id: "3",
    name: "Scholarship Applications",
    department: "Financial Aid Office",
    description: "Apply for scholarships and financial assistance",
    location: "Administration Building, Room 200",
    hours: "9:00 AM - 4:00 PM (Mon-Fri)",
    requirements: ["Completed FAFSA", "Academic transcripts", "Personal statement", "Letters of recommendation"],
    contact: "scholarships@university.edu",
    forms: ["Scholarship application", "FAFSA", "Merit scholarship form"],
  },
  {
    id: "4",
    name: "Course Registration",
    department: "Registrar's Office",
    description: "Register for classes and manage academic records",
    location: "Administration Building, Room 100",
    hours: "8:00 AM - 5:00 PM (Mon-Fri)",
    requirements: ["Academic advisor approval", "Prerequisite completion", "Tuition payment (if required)"],
    contact: "registrar@university.edu",
    forms: ["Course registration form", "Add/drop form", "Transcript request"],
  },
]

export const academicCalendar: AcademicCalendar[] = [
  {
    id: "1",
    event: "Fall Semester Begins",
    date: "2024-08-26",
    description: "First day of fall semester classes",
    type: "event",
  },
  {
    id: "2",
    event: "Labor Day Holiday",
    date: "2024-09-02",
    description: "No classes - University closed",
    type: "holiday",
  },
  {
    id: "3",
    event: "Add/Drop Deadline",
    date: "2024-09-06",
    description: "Last day to add or drop courses without penalty",
    type: "deadline",
  },
  {
    id: "4",
    event: "Midterm Exams",
    date: "2024-10-14",
    description: "Midterm examination period begins",
    type: "exam",
  },
  {
    id: "5",
    event: "Spring Registration Opens",
    date: "2024-11-01",
    description: "Registration opens for Spring 2025 semester",
    type: "registration",
  },
  {
    id: "6",
    event: "Thanksgiving Break",
    date: "2024-11-28",
    description: "Thanksgiving holiday - No classes Nov 28-29",
    type: "holiday",
  },
  {
    id: "7",
    event: "Final Exams",
    date: "2024-12-09",
    description: "Final examination period begins",
    type: "exam",
  },
  {
    id: "8",
    event: "Fall Semester Ends",
    date: "2024-12-13",
    description: "Last day of fall semester",
    type: "event",
  },
]

// Helper functions for data retrieval
export const getCampusData = () => ({
  classSchedules,
  campusFacilities,
  diningOptions,
  libraryServices,
  administrativeServices,
  academicCalendar,
})

export const searchFacilities = (query: string) => {
  const lowercaseQuery = query.toLowerCase()
  return campusFacilities.filter(
    (facility) =>
      facility.name.toLowerCase().includes(lowercaseQuery) ||
      facility.description.toLowerCase().includes(lowercaseQuery) ||
      facility.amenities.some((amenity) => amenity.toLowerCase().includes(lowercaseQuery)),
  )
}

export const searchDining = (query: string) => {
  const lowercaseQuery = query.toLowerCase()
  return diningOptions.filter(
    (option) =>
      option.name.toLowerCase().includes(lowercaseQuery) ||
      option.specialties.some((specialty) => specialty.toLowerCase().includes(lowercaseQuery)) ||
      option.menu.some((item) => item.name.toLowerCase().includes(lowercaseQuery)),
  )
}

export const getUpcomingEvents = (days = 30) => {
  const today = new Date()
  const futureDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000)

  return academicCalendar
    .filter((event) => {
      const eventDate = new Date(event.date)
      return eventDate >= today && eventDate <= futureDate
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}
