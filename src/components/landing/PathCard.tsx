import { Link } from "@tanstack/react-router";
import { School, ClipboardList, GraduationCap, MapPinned, Users, Leaf, Compass, Award, ArrowRight } from "lucide-react";
import type { HomeContent } from "@/lib/home-content";
export const PATH_ICONS = { school: School, clipboard: ClipboardList, graduation: GraduationCap, map: MapPinned, users: Users, leaf: Leaf, compass: Compass, award: Award };
export function PathCard({ card, active = false, preview = false }: { card: HomeContent["card"]; active?: boolean; preview?: boolean }) {
  const Icon = PATH_ICONS[card.icon];
  const content = <>
    <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-primary" />
    {card.image && <img src={card.image} alt={card.imageAlt} className="mb-5 aspect-[16/9] w-full rounded-md object-cover" loading="lazy" />}
    <div className="flex items-start justify-between gap-3">
      <Icon className="h-7 w-7 shrink-0 text-teal" strokeWidth={1.5} aria-hidden />
      <span className="rounded-md bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">{active ? "Seu caminho" : card.benefit}</span>
    </div>
    <h3 className="mt-6 break-words text-xl font-extrabold leading-snug text-navy">{card.title}</h3>
    <p className="mt-2 flex-1 break-words text-sm leading-relaxed text-muted-foreground">{card.description}</p>
    <span className="mt-6 inline-flex items-center gap-2 border-t border-line pt-4 text-sm font-bold text-navy group-hover:text-teal">{card.action.rotulo}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden /></span>
  </>;
  const className = `group relative flex h-full min-w-0 flex-col overflow-hidden rounded-lg border bg-card p-7 ${active ? "border-orange ring-2 ring-orange/40" : "border-line"} shadow-soft`;
  return preview ? <div className={className}>{content}</div> : <Link to={card.action.to} className={`${className} transition-all hover:-translate-y-1 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}>{content}</Link>;
}
