import Frame from '../imports/Frame';
import svgPaths from '../imports/svg-81glllw5g3';

interface BridgeGroup {
  id: string;
  teeth: { toothNumber: number; role: 'abutment' | 'pontic'; treatmentId: string }[];
  createdAt: string;
}

interface ToothChartProps {
  selectedTeeth: number[];
  activeTooth?: number;
  onToothToggle: (toothNumber: number) => void;
  bridgeGroups?: Record<string, BridgeGroup>;
  treatmentColorMap?: Record<number, string>; // toothNumber -> treatment type color
}

export function ToothChart({ selectedTeeth, activeTooth, onToothToggle, bridgeGroups = {} }: ToothChartProps) {
  const isSelected = (toothNum: number) => selectedTeeth.includes(toothNum);
  const isActive = (toothNum: number) => activeTooth === toothNum;

  // Build a map: toothNumber -> { groupId, role }
  const bridgeToothMap: Record<number, { groupId: string; role: 'abutment' | 'pontic' }> = {};
  Object.values(bridgeGroups).forEach(group => {
    group.teeth.forEach(t => {
      bridgeToothMap[t.toothNumber] = { groupId: group.id, role: t.role };
    });
  });

  // Tooth mapping with their SVG paths and positions
  const teethData: Record<number, { path: string; viewBox: string; inset: string }> = {
    // Upper Right (18-11)
    18: { path: svgPaths.p32649e00, viewBox: "0 0 15 12", inset: "inset-[39.43%_81.39%_53.32%_3.41%]" },
    17: { path: svgPaths.p2dfcbf00, viewBox: "0 0 14 12", inset: "inset-[31.87%_80.76%_60.88%_4.39%]" },
    16: { path: svgPaths.p3bf8aa00, viewBox: "0 0 14 12", inset: "inset-[24.47%_78.76%_67.99%_6.96%]" },
    15: { path: svgPaths.p17dcf000, viewBox: "0 0 13 10", inset: "inset-[18.77%_76.07%_75.06%_10.32%]" },
    14: { path: svgPaths.pce3540, viewBox: "0 0 13 11", inset: "inset-[12.9%_72.94%_80.47%_14.04%]" },
    13: { path: svgPaths.p2ae5d200, viewBox: "0 0 12 12", inset: "inset-[7.17%_67.8%_85.63%_20.06%]" },
    12: { path: svgPaths.p7c3c780, viewBox: "0 0 11 12", inset: "inset-[3.29%_60.82%_89.49%_28.22%]" },
    11: { path: svgPaths.p1909a200, viewBox: "0 0 11 12", inset: "inset-[0.69%_50.1%_91.85%_38.6%]" },
    // Upper Left (21-28)
    21: { path: svgPaths.p2723ff30, viewBox: "0 0 11 12", inset: "inset-[0.69%_38.6%_91.85%_50.11%]" },
    22: { path: svgPaths.p18a71a00, viewBox: "0 0 11 12", inset: "inset-[3.29%_28.22%_89.49%_60.82%]" },
    23: { path: svgPaths.p37813000, viewBox: "0 0 12 12", inset: "inset-[7.17%_20.06%_85.63%_67.8%]" },
    24: { path: svgPaths.p6bf4c00, viewBox: "0 0 13 11", inset: "inset-[12.9%_14.04%_80.47%_72.94%]" },
    25: { path: svgPaths.pa6db100, viewBox: "0 0 13 10", inset: "inset-[18.77%_10.32%_75.06%_76.07%]" },
    26: { path: svgPaths.p1d59d00, viewBox: "0 0 14 12", inset: "inset-[24.47%_6.96%_67.99%_78.76%]" },
    27: { path: svgPaths.p2e9a9500, viewBox: "0 0 14 12", inset: "inset-[31.87%_4.39%_60.88%_80.76%]" },
    28: { path: svgPaths.p23868d10, viewBox: "0 0 15 12", inset: "inset-[39.43%_3.41%_53.32%_81.39%]" },
    // Lower Left (48-41) - Group27-Group32
    48: { path: svgPaths.p2cd96100, viewBox: "0 0 15 12", inset: "inset-[56.16%_83.65%_36.51%_1.13%]" },
    47: { path: svgPaths.p28212e00, viewBox: "0 0 14 12", inset: "inset-[63.68%_82.55%_28.97%_2.63%]" },
    46: { path: svgPaths.p16521500, viewBox: "0 0 14 12", inset: "inset-[70.74%_80.08%_21.63%_5.68%]" },
    45: { path: svgPaths.p2a3c5c00, viewBox: "0 0 13 10", inset: "inset-[77.58%_76.61%_16.03%_9.95%]" },
    44: { path: svgPaths.p25ee3880, viewBox: "0 0 13 11", inset: "inset-[82.59%_72.18%_10.77%_14.81%]" },
    43: { path: svgPaths.p3fedce80, viewBox: "0 0 11 11", inset: "inset-[87.06%_66.1%_5.88%_22.28%]" },
    42: { path: svgPaths.p237e6b80, viewBox: "0 0 10 11", inset: "inset-[90.66%_59.32%_2.32%_30.29%]" },
    41: { path: svgPaths.p33949900, viewBox: "0 0 9 11", inset: "inset-[92.51%_50.39%_0.69%_40.03%]" },
    // Lower Right (31-38) - Group24-Group19
    31: { path: svgPaths.p14efe400, viewBox: "0 0 9 11", inset: "inset-[92.5%_40.03%_0.69%_50.39%]" },
    32: { path: svgPaths.p365fb300, viewBox: "0 0 10 11", inset: "inset-[90.66%_30.29%_2.32%_59.32%]" },
    33: { path: svgPaths.p34e4e500, viewBox: "0 0 11 11", inset: "inset-[87.06%_22.28%_5.88%_66.1%]" },
    34: { path: svgPaths.p2c29ad00, viewBox: "0 0 13 11", inset: "inset-[82.59%_14.81%_10.77%_72.18%]" },
    35: { path: svgPaths.p819fc00, viewBox: "0 0 13 10", inset: "inset-[77.58%_9.95%_16.03%_76.61%]" },
    36: { path: svgPaths.p3441ea00, viewBox: "0 0 14 12", inset: "inset-[70.74%_5.67%_21.63%_80.09%]" },
    37: { path: svgPaths.pb687d00, viewBox: "0 0 14 12", inset: "inset-[63.68%_2.63%_28.97%_82.55%]" },
    38: { path: svgPaths.p2a348300, viewBox: "0 0 15 12", inset: "inset-[56.16%_1.13%_36.51%_83.65%]" },
  };

  // Helper to parse inset values
  const parseInset = (insetStr: string) => {
    const matches = insetStr.match(/inset-\[([0-9.]+)%_([0-9.]+)%_([0-9.]+)%_([0-9.]+)%\]/);
    if (matches) {
      return {
        top: parseFloat(matches[1]),
        right: parseFloat(matches[2]),
        bottom: parseFloat(matches[3]),
        left: parseFloat(matches[4]),
      };
    }
    return { top: 0, right: 0, bottom: 0, left: 0 };
  };

  // Get center position for a tooth (for bridge arcs)
  const getToothCenter = (toothNum: number) => {
    const td = teethData[toothNum];
    if (!td) return { cx: 0, cy: 0 };
    const inset = parseInset(td.inset);
    const cx = ((inset.left + (100 - inset.left - inset.right) / 2) / 100) * 93;
    const cy = ((inset.top + (100 - inset.top - inset.bottom) / 2) / 100) * 153;
    return { cx, cy };
  };

  const isUpperTooth = (toothNum: number) => toothNum >= 11 && toothNum <= 28;

  const allTeeth = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28, 48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

  // Build bridge arcs: for each bridge group, draw connecting arcs between consecutive teeth
  const bridgeArcs: { key: string; path: string }[] = [];
  Object.values(bridgeGroups).forEach(group => {
    if (group.teeth.length < 2) return;
    // Sort teeth by position in the arch
    const sorted = [...group.teeth].sort((a, b) => {
      return allTeeth.indexOf(a.toothNumber) - allTeeth.indexOf(b.toothNumber);
    });

    for (let i = 0; i < sorted.length - 1; i++) {
      const from = getToothCenter(sorted[i].toothNumber);
      const to = getToothCenter(sorted[i + 1].toothNumber);
      const isUpper = isUpperTooth(sorted[i].toothNumber);

      // Quadratic bezier arc: curves away from teeth
      const midX = (from.cx + to.cx) / 2;
      const midY = (from.cy + to.cy) / 2;
      const offset = isUpper ? -4 : 4;
      const ctrlY = midY + offset;

      bridgeArcs.push({
        key: `${group.id}-${i}`,
        path: `M ${from.cx} ${from.cy} Q ${midX} ${ctrlY} ${to.cx} ${to.cy}`,
      });
    }
  });

  return (
    <div className="w-full pb-2">
      <div className="w-full flex justify-center bg-white py-8 rounded-xl border border-gray-200">
        <div className="relative w-full max-w-md aspect-[93/153]">
          {/* Figma Frame Background */}
          <Frame />

          {/* SVG-based Interactive Overlay - Matches exact tooth shapes */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 93 153"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* SVG defs for pontic pattern */}
            <defs>
              <pattern id="pontic-stripe" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="3" stroke="rgba(245, 158, 11, 0.5)" strokeWidth="1.5" />
              </pattern>
            </defs>

            {allTeeth.map((toothNum) => {
              const toothData_entry = teethData[toothNum];
              if (!toothData_entry) return null;

              const selected = isSelected(toothNum);
              const active = isActive(toothNum);
              const bridgeInfo = bridgeToothMap[toothNum];
              const inset = parseInset(toothData_entry.inset);

              // Calculate position and size from inset values
              const x = (inset.left / 100) * 93;
              const y = (inset.top / 100) * 153;
              const width = ((100 - inset.left - inset.right) / 100) * 93;
              const height = ((100 - inset.top - inset.bottom) / 100) * 153;

              // Parse viewBox to get path dimensions
              const viewBoxParts = toothData_entry.viewBox.split(' ').map(Number);
              const pathWidth = viewBoxParts[2];
              const pathHeight = viewBoxParts[3];

              // Calculate scale to fit the path into the bounds
              const scaleX = width / pathWidth;
              const scaleY = height / pathHeight;

              let fillColor = 'rgba(99, 102, 241, 0)';
              let strokeColor = 'rgba(99, 102, 241, 0)';
              let strokeWidth = 0;
              let usePonticPattern = false;

              // Bridge teeth: amber coloring
              if (bridgeInfo) {
                if (bridgeInfo.role === 'pontic') {
                  fillColor = 'url(#pontic-stripe)';
                  usePonticPattern = true;
                  strokeColor = 'rgba(245, 158, 11, 0.8)';
                  strokeWidth = 0.3;
                } else {
                  // Abutment
                  fillColor = 'rgba(245, 158, 11, 0.3)';
                  strokeColor = 'rgba(245, 158, 11, 1)';
                  strokeWidth = 0.3;
                }

                // Override if also active
                if (active) {
                  strokeColor = 'rgba(245, 158, 11, 1)';
                  strokeWidth = 0.5;
                  if (!usePonticPattern) {
                    fillColor = 'rgba(245, 158, 11, 0.45)';
                  }
                }
              } else if (active && selected) {
                fillColor = 'rgba(99, 102, 241, 0.4)';
                strokeColor = 'rgba(99, 102, 241, 1)';
                strokeWidth = 0.4;
              } else if (active) {
                fillColor = 'rgba(99, 102, 241, 0.2)';
                strokeColor = 'rgba(99, 102, 241, 1)';
                strokeWidth = 0.4;
              } else if (selected) {
                fillColor = 'rgba(99, 102, 241, 0.25)';
                strokeColor = 'rgba(99, 102, 241, 1)';
                strokeWidth = 0.2;
              }

              return (
                <g key={toothNum} transform={`translate(${x}, ${y})`}>
                  <g transform={`scale(${scaleX}, ${scaleY})`}>
                    <path
                      d={toothData_entry.path}
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth={strokeWidth > 0 ? strokeWidth / scaleX : undefined}
                      className="pointer-events-auto cursor-pointer transition-all duration-200 hover:fill-[rgba(99,102,241,0.15)] hover:stroke-[rgba(99,102,241,0.5)] hover:stroke-[0.15]"
                      style={{
                        strokeWidth: strokeWidth > 0 ? `${strokeWidth / scaleX}` : undefined,
                      }}
                      onClick={() => onToothToggle(toothNum)}
                    />
                  </g>
                </g>
              );
            })}

            {/* Bridge connecting arcs */}
            {bridgeArcs.map(arc => (
              <path
                key={arc.key}
                d={arc.path}
                fill="none"
                stroke="rgba(245, 158, 11, 0.7)"
                strokeWidth="0.6"
                strokeDasharray="1.5 0.8"
                className="pointer-events-none"
              />
            ))}
          </svg>

          {/* Tooth number labels - separate layer */}
          <div className="absolute inset-0 pointer-events-none">
            {allTeeth.map((toothNum) => {
              const toothData_entry = teethData[toothNum];
              if (!toothData_entry) return null;

              const selected = isSelected(toothNum);
              const active = isActive(toothNum);
              const bridgeInfo = bridgeToothMap[toothNum];
              const inset = parseInset(toothData_entry.inset);

              const left = inset.left + (100 - inset.left - inset.right) / 2;
              const top = inset.top + (100 - inset.top - inset.bottom) / 2;

              return (
                <div
                  key={`label-${toothNum}`}
                  className="absolute flex items-center justify-center"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <span
                    className={`text-[11px] whitespace-nowrap transition-all duration-200 ${
                      bridgeInfo
                        ? 'text-amber-600 font-bold'
                        : active || selected
                        ? 'text-[#6366F1] font-bold'
                        : 'text-[#475569] font-semibold'
                    }`}
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      textShadow: '0 0 4px rgba(255, 255, 255, 0.9)',
                    }}
                  >
                    {toothNum}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Labels */}
          <div className="absolute top-2 left-0 right-0 text-center">

          </div>

        </div>
      </div>
    </div>
  );
}
