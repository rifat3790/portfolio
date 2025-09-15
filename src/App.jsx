import About from "./Components/About/About"
import Banner from "./Components/Banner/Banner"
import Chatbot from "./Components/Chatbot/Chatbot"
import ExperienceEducation from "./Components/ExperienceEducation/ExperienceEducation"
import Footer from "./Components/Footer/Footer"
import GetInTouch from "./Components/GetInTouch/GetInTouch"
import Navbar from "./Components/Navbar/Navbar"
import Projects from "./Components/Projects/Projects"
import Skills from "./Components/Skills/Skills"

function App() {

  return (
    <>
      <Navbar></Navbar>
      <Banner></Banner>
      <About></About>
      <Skills></Skills>
      <Projects></Projects>
      <ExperienceEducation></ExperienceEducation>
      <GetInTouch></GetInTouch>
      <Footer></Footer>
      <Chatbot></Chatbot>
    </>
  )
}

export default App
