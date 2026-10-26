
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StudentRegistration from "./components/StudentRegistration";
import AdminDashboard from "./admin/AdminDashboard";
import UserManagement from "./admin/UserManagement";
import BoardingVerification from "./admin/BoardingVerification";
import ComplaintsManagement from "./admin/ComplaintsManagement";
import ReviewModeration from "./admin/ReviewModeration";
import SystemAnalytics from "./admin/SystemAnalytics";
import BoardingRecommendations from "./admin/BoardingRecommendations";
import AIReviewSummarization from "./admin/AIReviewSummarization";
import AdminSettings from "./admin/AdminSettings";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentRegistration />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/admin/boarding-verification" element={<BoardingVerification />}/>
        <Route path="/admin/complaints" element={<ComplaintsManagement />}/>
        <Route path="/admin/reviews" element={<ReviewModeration />}/>
        <Route path="/admin/analytics" element={<SystemAnalytics />}/>
        <Route path="/admin/recommendations" element={<BoardingRecommendations />}/>
        <Route path="/admin/review-summaries" element={<AIReviewSummarization />}/>
        <Route path="/admin/settings" element={<AdminSettings />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
