// API Configuration - Use import.meta.env for Vite
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api"

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

// Generic API request wrapper
async function apiRequest<T = any>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  try {
    // For now, we'll mock the responses
    // In production, this would make actual HTTP requests
    const mockResponse = await mockApiCall<T>(endpoint, options)
    return mockResponse
  } catch (error) {
    console.error("API Error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

// Mock API call function (replace with real fetch/axios later)
async function mockApiCall<T>(endpoint: string, options: RequestInit): Promise<ApiResponse<T>> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Import mock data based on endpoint
  const { mockStudent } = await import("../mocks/mockStudent")
  const { mockCourses } = await import("../mocks/mockCourses")
  const { mockGrades } = await import("../mocks/mockGrades")
  const { mockPayments } = await import("../mocks/mockPayments")

  // Route mock responses based on endpoint
  switch (endpoint) {
    case "/student/profile":
      return { success: true, data: mockStudent as T }

    case "/student/courses":
      return { success: true, data: mockCourses as T }

    case "/student/grades":
      return { success: true, data: mockGrades as T }

    case "/student/payments":
      return { success: true, data: mockPayments as T }

    case "/teacher/courses":
      return { success: true, data: mockCourses as T }

    default:
      return { success: false, error: "Endpoint not found" }
  }
}

// API Methods
export const api = {
  // GET request
  get: <T = any>(endpoint: string): Promise<ApiResponse<T>> => {
    return apiRequest<T>(endpoint, { method: "GET" })
  },

  // POST request
  post: <T = any>(endpoint: string, data?: any): Promise<ApiResponse<T>> => {
    return apiRequest<T>(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    })
  },

  // PUT request
  put: <T = any>(endpoint: string, data?: any): Promise<ApiResponse<T>> => {
    return apiRequest<T>(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    })
  },

  // DELETE request
  delete: <T = any>(endpoint: string): Promise<ApiResponse<T>> => {
    return apiRequest<T>(endpoint, { method: "DELETE" })
  },
}

// Specific API functions for different entities
export const studentApi = {
  getProfile: () => api.get("/student/profile"),
  getCourses: () => api.get("/student/courses"),
  getGrades: () => api.get("/student/grades"),
  getPayments: () => api.get("/student/payments"),
  updateProfile: (data: any) => api.put("/student/profile", data),
}

export const teacherApi = {
  getCourses: () => api.get("/teacher/courses"),
  getStudents: (courseId: string) => api.get(`/teacher/courses/${courseId}/students`),
  getAssessments: (courseId: string) => api.get(`/teacher/courses/${courseId}/assessments`),
  createAssessment: (data: any) => api.post("/teacher/assessments", data),
}

export const authApi = {
  login: (credentials: any) => api.post("/auth/login", credentials),
  register: (userData: any) => api.post("/auth/register", userData),
  logout: () => api.post("/auth/logout"),
  forgotPassword: (email: string) => api.post("/auth/forgot-password", { email }),
}
