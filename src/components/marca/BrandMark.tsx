import type { CSSProperties } from 'react';

type BrandMarkProps = { size?: number; step?: number; mono?: boolean; inverse?: boolean; markColor?: string | undefined };

export function BrandMark({ size = 64, step = 4, mono = false, inverse = false, markColor }: BrandMarkProps) {
  const navy = markColor ?? (inverse ? '#F5F8F7' : mono ? '#0A3153' : '#0A3153');
  const teal = mono ? navy : inverse ? '#18B9B0' : '#18B9B0';
  const orange = mono ? navy : inverse ? '#FFC338' : '#FF8B12';
  const opacityFlow = step >= 2 ? 1 : 0.12;
  const opacityNodes = step >= 3 ? 1 : 0.08;
  return <svg width={size} height={size} viewBox="0 0 120 110" role="img" aria-label="Símbolo CEURS: um C aberto formado por uma onda e pontos">
    <path fill={navy} d="M73 13C47 8 23 25 19 47c-5 24 12 44 37 45 17 1 33-8 44-23-13 8-26 9-37 6-18-5-28-18-24-32 4-14 18-21 31-19 12 1 18 8 24 13 6 3 13-1 13-7 0-7-13-15-24-17-3-1-7-1-10 0Z" />
    <path fill={teal} opacity={opacityFlow} d="M27 59c6 17 25 26 43 18 14-4 24-15 30-27-12 8-24 12-35 11-15-2-23-12-25-23-9 5-13 12-13 21Z" />
    <path d="M57 22c10-6 22-5 32 2 6 4 11 9 15 9" fill="none" stroke={orange} strokeWidth="6" strokeLinecap="round" opacity={opacityFlow} />
    <circle cx="105" cy="44" r="4.5" fill={teal} opacity={opacityNodes} />
    <circle cx="100" cy="57" r="3" fill={navy} opacity={opacityNodes} />
  </svg>;
}

export function Wordmark({ size = 64, mono = false, inverse = false, markColor }: BrandMarkProps) {
  const textColor = markColor ?? (inverse ? '#F5F8F7' : '#0A3153');
  const subColor = inverse ? 'rgba(245,248,247,.72)' : mono ? (markColor ?? '#0A3153') : '#59737D';
  const small = Math.round(size * 0.3);
  return <span className="wordmark-lockup" style={{ '--mark-size': `${size}px` } as CSSProperties}>
    <BrandMark size={size} mono={mono} inverse={inverse} markColor={markColor} />
    <span className="wordmark-type" style={{ color: textColor }}><b>CEURS</b><small style={{ color: subColor }}>ESCOLAS</small></span>
  </span>;
}
