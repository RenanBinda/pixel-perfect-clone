import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import type { Map as LeafletMap } from "leaflet";
import { LocateFixed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { agruparLocalizacoes } from "@/lib/mapa-iniciativas";
import { TEMA_LABEL, type Iniciativa } from "@/lib/smis";

export default function MapaLeaflet({ iniciativas, filtrado }: { iniciativas: Iniciativa[]; filtrado: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const [engine, setEngine] = useState<typeof import("leaflet") | null>(null);
  const [erro, setErro] = useState(false);
  const [tilesFalharam, setTilesFalharam] = useState(false);
  const grupos = agruparLocalizacoes(iniciativas);
  const localizadas = grupos.reduce((total, grupo) => total + grupo.iniciativas.length, 0);

  useEffect(() => {
    let cancelado = false;
    void import("leaflet").then((L) => {
      if (cancelado || !containerRef.current) return;
      const map = L.map(containerRef.current, { scrollWheelZoom: false }).setView([-14.235, -51.9253], 4);
      mapRef.current = map;
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).on("tileerror", () => { if (!cancelado) setTilesFalharam(true); }).addTo(map);
      const observer = new ResizeObserver(() => map.invalidateSize());
      observer.observe(containerRef.current);
      map.on("unload", () => observer.disconnect());
      setEngine(L);
    }).catch(() => { if (!cancelado) setErro(true); });
    return () => {
      cancelado = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!engine || !map) return;
    const pontos = agruparLocalizacoes(iniciativas);
    const layers = engine.layerGroup().addTo(map);
    const roots: ReturnType<typeof createRoot>[] = [];
    for (const ponto of pontos) {
      const numero = ponto.iniciativas.length;
      const icon = engine.divIcon({
        className: "ceurs-map-marker",
        html: `<span class="ceurs-map-pin"><span>${numero > 1 ? numero : ""}</span></span>`,
        iconSize: [36, 44], iconAnchor: [18, 42], popupAnchor: [0, -38],
      });
      const popup = document.createElement("div");
      const root = createRoot(popup);
      roots.push(root);
      root.render(<div className="space-y-4 text-foreground">
        <p className="text-xs text-muted-foreground">{ponto.iniciativas[0]?.localizacaoMapa ?? "Localização da iniciativa"}</p>
        {ponto.iniciativas.map((iniciativa) => <article key={iniciativa.id} className="space-y-2 border-t border-border pt-3">
          <span className="text-xs font-semibold text-teal">{TEMA_LABEL[iniciativa.tema]}</span>
          <h3 className="text-sm font-bold">{iniciativa.titulo}</h3>
          <p className="text-xs text-muted-foreground">{iniciativa.escola}</p>
          <Button asChild size="sm"><a href={`/smis/iniciativas/${encodeURIComponent(iniciativa.id)}`}>Ver iniciativa completa</a></Button>
        </article>)}
      </div>);
      engine.marker(ponto.coordenadas, { icon, title: ponto.iniciativas.map((i) => i.titulo).join("; ") })
        .bindPopup(popup, { maxWidth: 300, minWidth: 240 }).addTo(layers);
    }
    map.closePopup();
    if (filtrado && pontos.length) map.fitBounds(engine.latLngBounds(pontos.map((ponto) => ponto.coordenadas)), { padding: [55, 55], maxZoom: 11 });
    else map.setView([-14.235, -51.9253], 4);
    return () => { layers.remove(); roots.forEach((root) => root.unmount()); };
  }, [engine, iniciativas, filtrado]);

  return <section className="mt-6" aria-label="Mapa interativo das iniciativas">
    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-lg font-bold text-navy">Iniciativas no território</h2>
      <Button variant="ghost" size="sm" title="Mostrar o Brasil inteiro" disabled={!engine} onClick={() => mapRef.current?.setView([-14.235, -51.9253], 4)}>
        <LocateFixed aria-hidden /> Brasil inteiro
      </Button>
    </div>
    <div className="relative overflow-hidden rounded-lg border border-border">
      <div ref={containerRef} className="ceurs-map h-[360px] w-full bg-muted md:h-[460px]" aria-label="Mapa do Brasil com iniciativas" />
      {!engine && <div className="absolute inset-0 z-10 flex items-center justify-center bg-muted text-muted-foreground" role="status">{erro ? "Não foi possível abrir o mapa. Recarregue a página." : "Carregando mapa…"}</div>}
    </div>
    <div className="mt-3 flex flex-wrap justify-between gap-2 text-xs text-muted-foreground" aria-live="polite">
      <span>{localizadas} {localizadas === 1 ? "iniciativa localizada" : "iniciativas localizadas"} · Dados de demonstração; pins aproximados por município.</span>
      {iniciativas.length > localizadas && <span>{iniciativas.length - localizadas} sem coordenadas, {iniciativas.length - localizadas === 1 ? "disponível" : "disponíveis"} na lista.</span>}
      {filtrado && localizadas === 0 && <span>Nenhuma localização disponível para estes filtros.</span>}
      {tilesFalharam && <span role="alert">Parte do mapa não carregou. As iniciativas continuam disponíveis na lista.</span>}
    </div>
  </section>;
}