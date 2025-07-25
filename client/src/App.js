import './App.css';
import HealthForm from './board';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import { ClerkProvider } from '@clerk/clerk-react'

function App() {
  const PUBLISHABLE_KEY = "pk_test_c29saWQtc2F0eXItNzEuY2xlcmsuYWNjb3VudHMuZGV2JA"

  if (!PUBLISHABLE_KEY) {
    throw new Error('Add your Clerk Publishable Key to the .env file')
  }
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Router>
        <Routes>
          <Route path="/" element={<HealthForm />} />
        </Routes>
      </Router>
    </ClerkProvider>
  );
}

export default App;
