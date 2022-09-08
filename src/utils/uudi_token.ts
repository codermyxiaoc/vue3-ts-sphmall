import { v4 as uudiv4 } from 'uuid'
export function getuuid() {
  if(!localStorage.getItem('uuid')) {
    const uuid = uudiv4()
    localStorage.setItem('uuid',uuid)
  }
  return localStorage.getItem('uuid')
} 