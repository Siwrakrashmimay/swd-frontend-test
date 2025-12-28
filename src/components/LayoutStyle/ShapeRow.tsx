"use client";

import styles from "@/styles/layout-style.module.scss";
import { AlignType, ShapeName } from "@/types/shape";

interface ShapeRowProps {
  align: AlignType;
  shapes: ShapeName[];
  onShapeClick: () => void;
}

export default function ShapeRow({
  align,
  shapes,
  onShapeClick,
}: ShapeRowProps) {
  return (
    <div className={styles.rowWrapper}>
      <div className={styles.row} style={{ justifyContent: align }}>
        {shapes.map((shape, index) => (
          <div
            key={index}
            className={styles.card}
            onClick={onShapeClick}
          >
            <div className={styles[shape]} />
          </div>
        ))}
      </div>
    </div>
  );
}
