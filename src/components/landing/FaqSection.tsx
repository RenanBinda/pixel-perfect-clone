import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Quanto custa participar?", a: "Nada. O programa é 100% gratuito para escolas, educadores, estudantes e comunidade." },
  { q: "Escolas públicas e privadas podem participar?", a: "Sim. Escolas públicas e privadas de todo o Brasil podem entrar na rede." },
  { q: "Quem emite o certificado do curso?", a: "A UFSC certifica o curso de formação, com carga de 10 horas." },
  { q: "Preciso de conta para ver as iniciativas?", a: "Não. O mapa de iniciativas é público. A conta é necessária para fazer o curso e registrar projetos." },
];

export function FaqSection() {
  return (
    <section aria-labelledby="faq-title" className="bg-soft py-20">
      <div className="container mx-auto max-w-3xl px-4">
        <h2 id="faq-title" className="text-center text-3xl font-bold text-navy">Perguntas frequentes</h2>
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`f${i}`}>
              <AccordionTrigger className="text-left font-semibold text-navy">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
