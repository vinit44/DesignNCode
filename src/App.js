
// Import React Router components
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Pages
import Home from "./Home";

// Student Pages
import Interviews from "./student/Interviews";

import StudentLogin from "./student/StudentLogin";
import StudentRegister from "./student/StudentRegister";
import StudentDashboard from "./student/StudentDashboard";
import Beginner from "./student/Beginner";
import Frontend from "./student/Frontend";
import FrontendSyllabus from "./student/FrontendSyllabus";
import JavaDeveloper from "./student/JavaDeveloper";
import JavaDevloperSyllabus from "./student/JavaDevloperSyllabus";
import AiMl from "./student/AiMl";
import AiMlSyllabus from "./student/AiMlSyllabus";
import AppDevelopment from "./student/AppDevelopment";
import AppDevSyllabus from "./student/AppDevSyllabus";
import Cloud from "./student/Cloud";  
import CloudSyllabus from "./student/CloudSyllabus";
import DataScience from "./student/DataScience";
import DataScienceSyllabus from "./student/DataScienceSyllabus";
import DevOps from "./student/DevOps";    
import DevOpsSyllabus from "./student/DevOpsSyllabus";
import DSA from "./student/DSA";
import DSASyllabus from "./student/DSASyllabus";
import FullStack from "./student/FullStack";
import FullStackSyllabus from "./student/FullStackSyllabus";
import MernStack from "./student/MernStack";
import MernStackSyllabus from "./student/MernStackSyllabus";
import Testing from "./student/Testing";
import TestingSyllabus from "./student/TestingSyllabus";
import UiUx from "./student/UiUx";
import UiuxSyllabus from "./student/UiuxSyllabus";


   

import Intermediate from "./IntermediatePages/Intermediate";
import IMernStack from "./IntermediatePages/IMernStack";
import ITesting from "./IntermediatePages/ITesting";
import IDevOps from "./IntermediatePages/IDevOps";
import IDSA from "./IntermediatePages/IDSA";  
import IUiUx from "./IntermediatePages/IUiUx";
import IDataScience from "./IntermediatePages/IDataScience";
import IAppDevelopment from "./IntermediatePages/IAppDevelopment";
import IAiMl from "./IntermediatePages/IAiMl";
import ICloud from "./IntermediatePages/ICloud";
import IFrontend from "./IntermediatePages/IFrontend";
import IJavaDeveloper from "./IntermediatePages/IJavaDeveloper";
import IFullStack from "./IntermediatePages/IFullStack";


// Company Pages
import CompanyLogin from "./company/CompanyLogin";
import CompanyRegister from "./company/CompanyRegister";
import Dashboard from "./company/Dashboard";

// Admin Page
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";

// App Component
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Student Routes */}
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/register" element={<StudentRegister />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/interviews" element={<Interviews />} />
        <Route path="/beginner" element={<Beginner />} />
        <Route path="/frontend" element={<Frontend />} />
        <Route path="/frontend/syllabus" element={<FrontendSyllabus />} />
        <Route path="/javaDeveloper" element={<JavaDeveloper />} />
        <Route path="/javasyllabus" element={<JavaDevloperSyllabus />} />
        <Route path="/ai-ml" element={<AiMl />} />
        <Route path="/ai-ml/syllabus" element={<AiMlSyllabus />} />
        <Route path="/appdevelopment" element={<AppDevelopment />} />
        <Route path="/appdevelopment/syllabus" element={<AppDevSyllabus />} />
        <Route path="/cloud" element={<Cloud/>} />
        <Route path="/cloud/syllabus" element={<CloudSyllabus/>} />
        <Route path="/data-science" element={<DataScience />} />
        <Route path="/datasciencesyllabus" element={<DataScienceSyllabus />} />
        <Route path="devops" element={<DevOps />} />
        <Route path="/devops/syllabus" element={<DevOpsSyllabus />} />
        <Route path="/dsa" element={<DSA />} />
        <Route path="/dsa/syllabus" element={<DSASyllabus />} />
        <Route path="/fullstack" element={<FullStack />} />
        <Route path="/fullstacksyllabus" element={<FullStackSyllabus />} />
        <Route path="/mernstack" element={<MernStack />} />
        <Route path="/mernstacksyllabus" element={<MernStackSyllabus />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/testing/syllabus" element={<TestingSyllabus />} />
        <Route path="/uiux" element={<UiUx />} />
        <Route path="/uiuxsyllabus" element={<UiuxSyllabus />} />

        
       
        <Route path="/intermediate" element={<Intermediate />} />
        <Route path="/imernstack" element={<IMernStack />} />
        <Route path="/itesting" element={<ITesting />} /> 
        <Route path="/idevops" element={<IDevOps />} />
        <Route path="/idsa" element={<IDSA />} />
        <Route path="/iuiux" element={<IUiUx />} />
        <Route path="/idatascience" element={<IDataScience />} />
        <Route path="/iappdevelopment" element={<IAppDevelopment />} />
        <Route path="/iaiml" element={<IAiMl />} />
        <Route path="/icloud" element={<ICloud />} />
        <Route path="/ifrontend" element={<IFrontend />} />
        <Route path="/ijavadeveloper" element={<IJavaDeveloper />} />
        <Route path="/ifullstack" element={<IFullStack />} />

        

        {/* Company Routes */}
        <Route path="/company/login" element={<CompanyLogin />} />
        <Route path="/company/register" element={<CompanyRegister />} />
<Route path="/company/dashboard" element={<Dashboard />} />

        {/* Admin Route */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
