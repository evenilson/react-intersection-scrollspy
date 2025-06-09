import { useMemo, useRef } from "react";
import { Header, Section } from "./components";
import { useActiveSection } from "./hooks";

export function App() {

  const homeRef = useRef<HTMLElement>(null!);
  const aboutRef = useRef<HTMLElement>(null!);
  const projectsRef = useRef<HTMLElement>(null!);
  const contactRef = useRef<HTMLElement>(null!);

  const sectionRefs = useMemo(() => ({
    home: homeRef,
    about: aboutRef,
    projects: projectsRef,
    contact: contactRef,
  }), []);

  const activeSection = useActiveSection(sectionRefs);

  return (
    <>
      <Header activeSection={activeSection ?? ""}/>
      <main>
        <Section id="home" title="Início" innerRef={homeRef} />
        <Section id="about" title="Sobre" innerRef={aboutRef} />
        <Section id="projects" title="Projetos" innerRef={projectsRef} />
        <Section id="contact" title="Contato" innerRef={contactRef} />
      </main>
    </>
  )
}
