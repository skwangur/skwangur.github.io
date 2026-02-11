import './index.css'
import { BirthdayInvitation } from './components/birthday/BirthdayInvitation'
import { FloatingPetals } from './components/birthday/FloatingPetals'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-blush to-cream">
      <FloatingPetals />
      <BirthdayInvitation />
    </div>
  )
}

export default App
