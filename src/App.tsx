import { AuthProvider } from './contexts/AuthContext'
import KrafioApp from './components/KrafioApp'

function App() {
  return (
    <AuthProvider>
      <KrafioApp />
    </AuthProvider>
  )
}

export default App
