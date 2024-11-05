import { useRef } from 'react';

export default function Intro() {
  const el = useRef<HTMLSpanElement>(null);



  return (
    <section id="home" className="mb-28 max-w-[50rem] text-center sm:mb-0">
      <div className="flex items-center justify-center">
        <div className="relative">
          
        </div>
      </div>

      <h1 className="mb-10 mt-4 px-6 text-lg font-medium !leading-[1.5] sm:text-2xl text-gray-950 dark:text-slate-100">
        <p className="italic font-light text-sm sm:text-base my-4">„ Be the change that you wish to see in the world. "</p>
        <span className="font-bold">Hello</span>, My name is <span className="font-bold">Dávid</span>, a tech geek based in Slovakia with <span className="font-bold">2 years</span> of experience. <br />
        <span className="font-bold text-gray-600 dark:text-slate-300">I'm <span ref={el}></span></span>
      </h1>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-0 text-md sm:text-lg font-medium">
        <a href="#contact" className="group bg-gray-900 dark:bg-gray-700 text-white px-5 py-2 flex items-center gap-2 rounded-full hover:scale-105 transition-all">
          Contact me here
        </a>
        <a href="/CV_2023_Mikulas.pdf" download className="group bg-white dark:bg-white/10 text-gray-900 dark:text-white/80 border border-gray-300 px-5 py-2 flex items-center gap-2 rounded-full hover:scale-105 transition-all">
          Download CV 
        </a>
      </div>

      
    </section>
  );
}