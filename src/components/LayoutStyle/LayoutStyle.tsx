"use client";

import { useState } from "react";
import ControlBar from "./ControlBar";
import ShapeRow from "./ShapeRow";
import styles from "@/styles/layout-style.module.scss";
import { AlignType, ShapeName } from "@/types/shape";

const rotateLeft = <T,>(arr: T[]): T[] => {
  if (arr.length === 0) return arr;
  return [...arr.slice(1), arr[0]];
};

const rotateRight = <T,>(arr: T[]): T[] => {
  if (arr.length === 0) return arr;
  return [arr[arr.length - 1], ...arr.slice(0, arr.length - 1)];
};

const shuffleArray = <T,>(arr: T[]): T[] => {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export default function LayoutStyle() {
  const [shapes, setShapes] = useState<ShapeName[]>([
    "square",
    "circle",
    "oval",
    "trapezoid",
    "rectangle",
    "parallelogram",
  ]);

  const [topAlign, setTopAlign] = useState<AlignType>("flex-start");
  const [bottomAlign, setBottomAlign] = useState<AlignType>("flex-end");

  const handleMoveLeft = () => {
    setShapes(prev => rotateLeft(prev));
  };

  const handleMoveRight = () => {
    setShapes(prev => rotateRight(prev));
  };

  const handleMovePosition = () => {
    setTopAlign(prev => (prev === "flex-start" ? "flex-end" : "flex-start"));
    setBottomAlign(prev => (prev === "flex-start" ? "flex-end" : "flex-start"));
  };

  const handleShuffle = () => {
    setShapes(prev => shuffleArray(prev));
  };

  return (
    <div className={styles.wrapper}>
      
      <ControlBar
        onMoveLeft={handleMoveLeft}
        onMoveRight={handleMoveRight}
        onMovePosition={handleMovePosition}
      />

      <ShapeRow
        align={topAlign}
        shapes={shapes.slice(0, 3)}
        onShapeClick={handleShuffle}
      />

      <ShapeRow
        align={bottomAlign}
        shapes={shapes.slice(3, 6)}
        onShapeClick={handleShuffle}
      />
    </div>
  );
}
