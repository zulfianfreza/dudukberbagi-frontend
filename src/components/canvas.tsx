"use client";

import { useState } from "react";
import { Stage, Layer, Circle, Text } from "react-konva";

function Canvas() {
  const [isDragging, setIsDragging] = useState(false);
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);
  return (
    <>
      <Stage width={1000} height={500}>
        <Layer>
          <Text
            text="Test"
            x={x}
            y={y}
            draggable
            fill={isDragging ? "green" : "black"}
            onDragStart={(e) => setIsDragging(true)}
            onDragEnd={(e) => {
              setIsDragging(false);
              setX(e.target.x());
              setY(e.target.y());
            }}
          />
          <Circle draggable x={200} y={100} radius={50} fill="green" />
        </Layer>
      </Stage>
      <div className=" aspect-square w-20 bg-blue-200"></div>
    </>
  );
}

export default Canvas;
