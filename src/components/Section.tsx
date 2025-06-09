interface SectionProps {
  id: string;
  title: string;
  innerRef: React.RefObject<HTMLElement | null>;
}

export function Section({ id, title, innerRef }: SectionProps) {
  return (
    <section
      id={id}
      ref={innerRef}
      className="min-h-screen flex items-center justify-center border-b bg-gray-100 p-8"
    >
      <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
    </section>
  );

}