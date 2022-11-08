import React, { useMemo } from "react";
import style from "./bar.module.css";

type BarDisplayProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  isSelected: boolean;
  /* progress start point */
  progressX: number;
  progressWidth: number;
  progressType?: string;
  barCornerRadius: number;
  styles: {
    backgroundColor: string;
    backgroundSelectedColor: string;
    progressColor: string;
    progressSelectedColor: string;
  };
  onMouseDown: (event: React.MouseEvent<SVGPolygonElement, MouseEvent>) => void;
};
export const BarDisplay: React.FC<BarDisplayProps> = ({
  x,
  y,
  width,
  height,
  isSelected,
  progressX,
  progressWidth,
  progressType,
  barCornerRadius,
  styles,
  onMouseDown,
}) => {
  const getProcessColor = () => {
    return isSelected ? styles.progressSelectedColor : styles.progressColor;
  };

  const getBarColor = () => {
    return isSelected ? styles.backgroundSelectedColor : styles.backgroundColor;
  };

  const progress = useMemo(() => {
    if (progressType === 'DELAY') {
      return {
        x: progressX + progressWidth,
        width: width - progressWidth,
        y,
        height,
      };
    }
    return {
      x: progressX,
      width: progressWidth,
      y,
      height,
    };
  }, [progressX, width, progressWidth, y, height, progressType]);

  return (
    <g onMouseDown={onMouseDown}>
      <rect
        x={x}
        width={width}
        y={y}
        height={height}
        ry={barCornerRadius}
        rx={barCornerRadius}
        fill={getBarColor()}
        className={style.barBackground}
      />
      <rect
        x={progress.x}
        width={progress.width}
        y={progress.y}
        height={progress.height}
        ry={barCornerRadius}
        rx={barCornerRadius}
        fill={getProcessColor()}
      />
    </g>
  );
};
