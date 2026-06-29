// Visual tooth-surface selector — the standard dental surface diagram
// (Buccal / Mesial / Occlusal / Distal / Lingual) rendered in the BDC palette.
//
// It drives the existing cavity-class "surface codes" so the data model is
// unchanged:
//   Class I   -> ['O']
//   Class II  -> ['OM' | 'OD' | 'MOD']   (O is the base, toggle M and/or D)
//   Class III -> ['M' | 'D']             (single select)
//   Class IV  -> ['M' | 'D']
//
// Zone layout (clinical convention): Buccal top, Lingual bottom,
// Mesial left, Distal right, Occlusal center.

interface ToothSurfaceSelectorProps {
  availableSurfaces: string[]; // codes valid for the current class
  selected: string[];          // current treatment.surfaces (single code)
  onChange: (surfaces: string[]) => void;
  readOnly?: boolean;
  size?: number;               // px (square)
  showLabels?: boolean;        // hide letters for tiny chart dots
}

const SIGNAL = '#40C0C3'; // selected
const PINE = '#26C4B5';   // outline / available label
const TINT = '#E3F1F1';   // available, not selected
const GREY = '#F1ECE0';   // unavailable
const GREY_LINE = '#E0D8C8';
const STONE = '#B8AE9C';

const polar = (r: number, deg: number): [number, number] => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [50 + r * Math.cos(a), 50 + r * Math.sin(a)];
};

const wedge = (a0: number, a1: number, ri: number, ro: number): string => {
  const [x0o, y0o] = polar(ro, a0);
  const [x1o, y1o] = polar(ro, a1);
  const [x1i, y1i] = polar(ri, a1);
  const [x0i, y0i] = polar(ri, a0);
  return `M${x0o} ${y0o}A${ro} ${ro} 0 0 1 ${x1o} ${y1o}L${x1i} ${y1i}A${ri} ${ri} 0 0 0 ${x0i} ${y0i}Z`;
};

const ZONES = [
  { letter: 'B', d: wedge(-45, 45, 24, 46), label: polar(35, 0) },   // top — Buccal
  { letter: 'D', d: wedge(45, 135, 24, 46), label: polar(35, 90) },  // right — Distal
  { letter: 'L', d: wedge(135, 225, 24, 46), label: polar(35, 180) },// bottom — Lingual
  { letter: 'M', d: wedge(225, 315, 24, 46), label: polar(35, 270) },// left — Mesial
];

export function ToothSurfaceSelector({
  availableSurfaces,
  selected,
  onChange,
  readOnly = false,
  size = 132,
  showLabels = true,
}: ToothSurfaceSelectorProps) {
  const comboMode = availableSurfaces.some((c) => c.length > 1);
  const availableLetters = new Set(availableSurfaces.join('').split(''));
  const activeLetters = new Set((selected[0] || '').split(''));

  const setCode = (letters: Set<string>) => {
    const key = [...letters].sort().join('');
    const match = availableSurfaces.find((c) => c.split('').sort().join('') === key);
    if (match) onChange([match]);
  };

  const handleZone = (letter: string) => {
    if (readOnly || !availableLetters.has(letter)) return;
    if (comboMode) {
      if (letter === 'O') return; // O is the base in combo mode
      const md = new Set([...activeLetters].filter((l) => l === 'M' || l === 'D'));
      if (md.has(letter)) md.delete(letter);
      else md.add(letter);
      if (md.size === 0) return; // keep at least one of M/D
      setCode(new Set(['O', ...md]));
    } else {
      onChange([letter]); // single select
    }
  };

  const fillFor = (letter: string) =>
    activeLetters.has(letter) ? SIGNAL : availableLetters.has(letter) ? TINT : GREY;
  const strokeFor = (letter: string) => (availableLetters.has(letter) ? PINE : GREY_LINE);
  const labelColor = (letter: string) =>
    activeLetters.has(letter) ? '#ffffff' : availableLetters.has(letter) ? PINE : STONE;
  const interactive = (letter: string) => !readOnly && availableLetters.has(letter);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Tooth surface selector"
    >
      {ZONES.map((z) => (
        <g key={z.letter} onClick={() => handleZone(z.letter)} style={{ cursor: interactive(z.letter) ? 'pointer' : 'default' }}>
          <path d={z.d} fill={fillFor(z.letter)} stroke={strokeFor(z.letter)} strokeWidth={1.2} />
          {showLabels && (
          <text
            x={z.label[0]}
            y={z.label[1]}
            fontSize={9}
            fontWeight={600}
            textAnchor="middle"
            dominantBaseline="central"
            fill={labelColor(z.letter)}
            style={{ pointerEvents: 'none', userSelect: 'none' }}
          >
            {z.letter}
          </text>
          )}
        </g>
      ))}

      {/* Center — Occlusal */}
      <g onClick={() => handleZone('O')} style={{ cursor: interactive('O') ? 'pointer' : 'default' }}>
        <circle cx={50} cy={50} r={21} fill={fillFor('O')} stroke={strokeFor('O')} strokeWidth={1.2} />
        {showLabels && (
        <text
          x={50}
          y={50}
          fontSize={10}
          fontWeight={600}
          textAnchor="middle"
          dominantBaseline="central"
          fill={labelColor('O')}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          O
        </text>
        )}
      </g>
    </svg>
  );
}
