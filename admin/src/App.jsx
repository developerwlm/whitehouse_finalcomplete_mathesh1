import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BlogList from "./pages/BlogList";
import BlogForm from "./pages/BlogForm";
import CourseList from "./pages/CourseList";
import CourseForm from "./pages/CourseForm";
import FaqList from "./pages/FaqList";
import FaqForm from "./pages/FaqForm";
import Enquiries from "./pages/Enquiries";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/blogs" element={<BlogList />} />
            <Route path="/blogs/new" element={<BlogForm />} />
            <Route path="/blogs/:id/edit" element={<BlogForm />} />

            <Route path="/courses" element={<CourseList />} />
            <Route path="/courses/new" element={<CourseForm />} />
            <Route path="/courses/:id/edit" element={<CourseForm />} />

            <Route path="/faqs" element={<FaqList />} />
            <Route path="/faqs/new" element={<FaqForm />} />
            <Route path="/faqs/:id/edit" element={<FaqForm />} />

            <Route path="/enquiries" element={<Enquiries />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
