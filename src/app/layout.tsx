import './globals.css'
import { SectionProvider } from './components/SectionContext'

export const metadata = {
  title: 'Portfolio - WebGL Interactive Background',
  description: 'A modern portfolio with interactive WebGL background',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SectionProvider>
          {children}
        </SectionProvider>
      </body>
    </html>
  )
}

