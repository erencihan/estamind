'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, PlanType } from '@/types/database'
import { SESSION_COOKIE_MAX_AGE_SEC, SESSION_COOKIE_NAME, STORAGE_KEYS } from '@/config/constants'

function setSessionCookie() {
  if (typeof document === 'undefined') return
  document.cookie = `${SESSION_COOKIE_NAME}=1; path=/; max-age=${SESSION_COOKIE_MAX_AGE_SEC}; SameSite=Lax`
}

function clearSessionCookie() {
  if (typeof document === 'undefined') return
  document.cookie = `${SESSION_COOKIE_NAME}=; path=/; max-age=0`
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  dataContributions: number
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  signInWithGoogle: () => Promise<boolean>
  logout: () => void
  addCredits: (amount: number) => void
  incrementDataContributions: () => void
  updatePlan: (planType: PlanType, monthlyCredits: number) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [dataContributions, setDataContributions] = useState(0)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER)
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setSessionCookie()
    }
    // Load data contributions count
    const storedContributions = localStorage.getItem(STORAGE_KEYS.DATA_CONTRIBUTIONS)
    if (storedContributions) {
      setDataContributions(parseInt(storedContributions, 10))
    }
    setIsLoading(false)
  }, [])

  const addCredits = (amount: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        monthly_credits: user.monthly_credits + amount,
        updated_at: new Date().toISOString()
      }
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser))
      setUser(updatedUser)
    }
  }

  const incrementDataContributions = () => {
    const newCount = dataContributions + 1
    setDataContributions(newCount)
    localStorage.setItem(STORAGE_KEYS.DATA_CONTRIBUTIONS, newCount.toString())
  }

  const updatePlan = (planType: PlanType, monthlyCredits: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        plan_type: planType,
        monthly_credits: monthlyCredits,
        updated_at: new Date().toISOString()
      }
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser))
      setUser(updatedUser)
      setSessionCookie()
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    // Simulated login - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Demo user for testing
    if (email && password) {
      const mockUser: User = {
        id: 'demo-user-id',
        email,
        name: email.split('@')[0],
        phone: null,
        company: 'Demo Emlak',
        avatar_url: null,
        plan_type: 'pro',
        monthly_credits: 20,
        used_credits: 0,
        is_verified: true,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(mockUser))
      setUser(mockUser)
      setSessionCookie()
      setIsLoading(false)
      return true
    }
    
    setIsLoading(false)
    return false
  }

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true)
    
    // Simulated registration - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (email && password && name) {
      const mockUser: User = {
        id: `user-${Date.now()}`,
        email,
        name,
        phone: null,
        company: null,
        avatar_url: null,
        plan_type: 'lite',
        monthly_credits: 1,
        used_credits: 0,
        is_verified: false,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(mockUser))
      setUser(mockUser)
      setSessionCookie()
      setIsLoading(false)
      return true
    }
    
    setIsLoading(false)
    return false
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.USER)
    clearSessionCookie()
    setUser(null)
  }

  const signInWithGoogle = async (): Promise<boolean> => {
    setIsLoading(true)
    
    // Simulated Google login - replace with actual Google OAuth
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Demo user for testing
    const mockUser: User = {
      id: 'google-user-id',
      email: 'user@gmail.com',
      name: 'Google User',
      phone: null,
      company: 'Demo Emlak',
      avatar_url: null,
      plan_type: 'pro',
      monthly_credits: 20,
      used_credits: 0,
      is_verified: true,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(mockUser))
    setUser(mockUser)
    setSessionCookie()
    setIsLoading(false)
    return true
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, dataContributions, login, register, signInWithGoogle, logout, addCredits, incrementDataContributions, updatePlan }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
