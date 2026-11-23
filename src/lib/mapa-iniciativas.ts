import type { Iniciativa } from "./smis";

export function agruparLocalizacoes(iniciativas: Iniciativa[]) {
  const grupos = new Map<string, { coordenadas: [number, number]; iniciativas: Iniciativa[] }>();
  for (const iniciativa of iniciativas) {
    const coordenadas = iniciativa.coordenadas;
    if (iniciativa.status !== "publicada" || !coordenadas) continue;
    const [lat, lng] = coordenadas;
    if (!Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) continue;
    const chave = coordenadas.join(",");
    const grupo = grupos.get(chave);
    if (grupo) grupo.iniciativas.push(iniciativa);
    else grupos.set(chave, { coordenadas, iniciativas: [iniciativa] });
  }
  return [...grupos.values()];
}