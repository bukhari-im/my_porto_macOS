import { Dock, Navbar, Welcome,Hero } from '#components/index.js';
import { Terminal }  from '#windows';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

const App = () => {
  return (
   <main>
    <Navbar />
    <Welcome />
    <Dock />
    <Hero/>

    
    <Terminal/>
    </main>
  )
};

export default App;
