import { useContext } from 'react'
import { AppScrollContext } from '../context/AppScrollContext'

export function useAppScroll() {
  return useContext(AppScrollContext)
}
