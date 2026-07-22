import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Layout from './components/Layout'
import {Home,About,Skills,Projects,Education,Courses,Publications,Contact} from './pages'
function RoutedApp(){return <Layout><Routes><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/skills" element={<Skills/>}/><Route path="/projects" element={<Projects/>}/><Route path="/education" element={<Education/>}/><Route path="/courses" element={<Courses/>}/><Route path="/publications" element={<Publications/>}/><Route path="/contact" element={<Contact/>}/><Route path="*" element={<Home/>}/></Routes></Layout>}
export default function App(){return <BrowserRouter><RoutedApp/></BrowserRouter>}
