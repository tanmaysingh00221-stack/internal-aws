import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { useAuth } from './lib/auth';

import { Layout } from './components/Layout';

import { Login } from './pages/Login';
import { Overview } from './pages/Overview';
import { ResourcePage } from './pages/ResourcePage';
import { Team } from './pages/Team';
import { Settings } from './pages/Settings';


// --------------------------------------------------
// App Component
// --------------------------------------------------

export default function App() {
  const { user } = useAuth();

  // Redirect unauthenticated users
  if (!user) {
    return <Login />;
  }

  return (
    <BrowserRouter>

      <Routes>

        <Route element={<Layout />}>

          {/* Dashboard */}
          <Route
            index
            element={<Overview />}
          />

          {/* AWS Resources */}
          <Route
            path="compute"
            element={<ResourcePage kind="lambda" />}
          />

          <Route
            path="storage"
            element={<ResourcePage kind="s3" />}
          />

          <Route
            path="logs"
            element={<ResourcePage kind="logs" />}
          />

          {/* Admin */}
          <Route
            path="team"
            element={<Team />}
          />

          {/* Settings */}
          <Route
            path="settings"
            element={<Settings />}
          />

          {/* Catch All */}
          <Route
            path="*"
            element={<Navigate to="/" />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}