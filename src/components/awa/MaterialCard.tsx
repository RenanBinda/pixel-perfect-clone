import { ArrowUpRight, BookOpen, FileText, Video, File } from "lucide-react";
import { TemaBadge } from "@/components/smis/TemaBadge";
import { TIPO_MATERIAL_LABEL, formatarDataCurta, type MaterialBiblioteca } from "@/lib/awa";

const tipoIcon = {
  guia: BookOpen,
  vídeo: Video,
  artigo: FileText,
  documento: File,
} as const;

export function MaterialCard({ material }: { material: MaterialBiblioteca }) {
  const Icon = tipoIcon[material.tipo];

  return (
    <a
      href={material.href}
      className="group flex h-full flex-col rounded-2xl border border-line bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-teal hover:shadow-card"
    >
      <div className="flex items-center justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <span className="rounded-full bg-soft px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          {TIPO_MATERIAL_LABEL[material.tipo]}
        </span>
      </div>

      <h3 className="mt-4 text-base font-bold leading-snug text-navy">
        {material.titulo}
      </h3>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">
        {material.descricao}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <TemaBadge tema={material.tema} />
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-line pt-4 text-xs">
        <span className="text-muted-foreground">
          {material.autor} · {formatarDataCurta(material.publicadoEm)}
        </span>
        <ArrowUpRight
          className="h-4 w-4 text-navy transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden
        />
      </div>
    </a>
  );
}