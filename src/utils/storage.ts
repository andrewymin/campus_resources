import DemoData from '../data/data.json'

// Types for data
export interface Data {
  users: User[]
  resources: Resource[]
  announcements: Announcement[]
  bookmarks: Bookmark[]
}

export interface User {
  id: number
  username: string
  password: string
  role: 'admin' | 'user'
  name: string
}

export interface Resource {
  id: number
  title: string
  description: string
  location: string
  hours: string
}

interface Announcement {
  id: number
  title: string
  description: string
}

export interface Bookmark {
  id: number
  userId: number
  resourceId: number
}

// Load or initialize data
export function loadData(){
  const stored = localStorage.getItem('campusData')
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch (err) {
      console.warn('Error parsing localStorage data, reinitializing...', err)
      // Since data existed but something stopped it, re-setItem data
      localStorage.setItem('campusData', JSON.stringify(DemoData))
      return DemoData
    }
  }
  // If nothing exists, initialize it
  localStorage.setItem('campusData', JSON.stringify(DemoData))
  return DemoData
}

// Save entire dataset back to localStorage
export function saveData(data: Data) {
  localStorage.setItem('campusData', JSON.stringify(data))
}

// Get user data
export function getUser(userId: Number) {
    const stored = localStorage.getItem('campusData')
    if (!stored) return
    const parsed = JSON.parse(stored) as Data
    return parsed.users.find((user)=> user.id === userId)
}

// Get a specific category (e.g. resources, announcements)
export function getSection<T extends keyof Data>(key: T): Data[T] {
  const stored = localStorage.getItem('campusData')
  if (!stored) return [] as Data[T]
  const parsed = JSON.parse(stored) as Data
  return parsed[key]
}

// Update a specific category (e.g. update resources only); only for ADMIN
export function updateSection<T extends keyof Data>(key: T, newData: Data[T]) {
  const stored = localStorage.getItem('campusData')
  const parsed = stored ? (JSON.parse(stored) as Data) : ({} as Data)
  parsed[key] = newData
  localStorage.setItem('campusData', JSON.stringify(parsed))
}

// Reset all data 
export function resetData() {
  localStorage.clear()
  localStorage.setItem('campusData', JSON.stringify(DemoData))
  document.location.reload()
}
