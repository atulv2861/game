import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
  Outlet,
  Link
} from "react-router-dom";
import SignIn from "./components/SigninAndSignup/SignInComponent";
import SignInForm from "./components/SigninAndSignup/SignInFormComponent";
import SignUpForm from "./components/SigninAndSignup/SignUpFormComponent";
import DashboardComponent from "./components/Dashboard/DashboardComponent";
import DashboardPanelComponent from "./components/DashboardPanel/DashboardPanelComponent";
import SidebarComponent from "./components/Sidebar/SidebarComponent";
import AnalyticsComponent from "./components/Analytics/AnalyticsComponent";
import CreateQuizComponent from "./components/CreateQuiz/CreateQuizComponent";
import LiveQuizComponent from "./components/LiveQuiz/LiveQuizComponent";
import CongratesComponent from "./components/LiveQuiz/CongratesComponent";
import QuestionsAnalysisComponent from "./components/Analytics/QuestionAnalysis/QuestionsAnalysisComponent";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignIn />} />
        <Route path="/dashboard-panel/*" element={<DashboardPanelComponent />}>
          <Route path="dashboard" element={<DashboardComponent />} />
          <Route path="analytics" element={<AnalyticsComponent />} />         
          <Route path="question-wise-analysis/:quizId" element={<QuestionsAnalysisComponent/>}/>
        </Route>
        <Route path="/live-quiz/:id" element={<LiveQuizComponent />} />
        <Route path="/congrates" element={<CongratesComponent/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
