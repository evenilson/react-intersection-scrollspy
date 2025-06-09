import clsx from "clsx";

interface HeaderProps {
  activeSection: string;
}

export function Header({ activeSection }: HeaderProps) {
  const sections = [
    { id: "home", name: "Início" },
    { id: "about", name: "Sobre" }, 
    { id: "projects", name: "Projetos" }, 
    { id: "contact", name: "Contato" }
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <nav className="flex justify-center gap-8 py-4">
        { sections.map(({ id, name }) => (
          <a
            key={id} 
            href={`#${id}`}
            className={clsx(
              "text-sm font-semibold transition-colors",
              activeSection === id ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
            )}
          >
            {name}
          </a>
        )) }
      </nav>
    </header>
  );
}