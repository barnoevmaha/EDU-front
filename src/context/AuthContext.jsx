// Foydalanuvchi haqidagi ma'lumot butun ilovaga shu Context orqali tarqaladi.
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { api } from '../api.js'

const AuthContext = createContext(null)

const USER_KEY = 'edu_user'      // kirgan foydalanuvchi
const DEVICE_KEY = 'edu_device'  // shu qurilmada eslab qolingan kirish ma'lumoti

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Sayt ochilganda: avval xotiradagi foydalanuvchini ko'rsatamiz,
  // keyin fonda serverdan yangilab olamiz. Shunda qayta login qilish shart emas.
  useEffect(() => {
    const savedUser = localStorage.getItem(USER_KEY)
    const savedDevice = localStorage.getItem(DEVICE_KEY)

    if (savedUser) setUser(JSON.parse(savedUser))

    if (!savedDevice) {
      setLoading(false)
      return
    }

    api
      .login(JSON.parse(savedDevice))
      .then((fresh) => {
        localStorage.setItem(USER_KEY, JSON.stringify(fresh))
        setUser(fresh)
      })
      .catch(() => {
        // Server o'chiq bo'lsa ham eski ma'lumot bilan ishlayveramiz.
      })
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (payload) => {
    const fresh = await api.login(payload)
    localStorage.setItem(USER_KEY, JSON.stringify(fresh))
    // Qurilmani eslab qolamiz - keyingi safar ism va token so'ralmaydi.
    localStorage.setItem(DEVICE_KEY, JSON.stringify(payload))
    setUser(fresh)
    return fresh
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(DEVICE_KEY)
    setUser(null)
  }, [])

  // Admin statusni o'zgartirgan bo'lsa - shu funksiya yangilab beradi.
  const refresh = useCallback(async () => {
    if (!user) return null
    const fresh = await api.me(user.id)
    localStorage.setItem(USER_KEY, JSON.stringify(fresh))
    setUser(fresh)
    return fresh
  }, [user])

  const isStaff = user?.role === 'teacher' || user?.role === 'admin'
  const isViewer = user?.role === 'student' && user?.status !== 'student'

  const value = { user, loading, login, logout, refresh, isStaff, isViewer }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Istalgan komponentda: const { user, logout } = useAuth()
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth faqat AuthProvider ichida ishlaydi')
  return ctx
}
