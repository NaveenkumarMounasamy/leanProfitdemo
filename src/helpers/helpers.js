import { useTheme } from '@emotion/react'
import toast from 'react-hot-toast'

export function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }

  return color
}

export function customToast({ theme, message, isSuccess, duration }) {
  return toast.success(message, {
    duration: duration || 3000,
    style: {
      padding: '16px',
      color: theme.palette.primary.main,
      border: `1px solid ${theme.palette.primary.main}`
    },
    iconTheme: {
      primary: isSuccess ? theme.palette.primary.success : theme.palette.primary.error,
      secondary: theme.palette.primary.contrastText
    }
  })
}
