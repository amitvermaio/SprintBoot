import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/common/AppLayout.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';
import LoginPage from './pages/auth/Login.jsx';
import RegisterPage from './pages/auth/Register.jsx';
import TodoDashboard from './pages/todo/TodoDashboard.jsx';
import NotFound from './pages/NotFound.jsx';

const App = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/todos" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/todos" element={<TodoDashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;