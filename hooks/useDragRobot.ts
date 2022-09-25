import { useEffect, useCallback, useState } from 'react';
import { PosePayload } from '../lib/stream';

export const useDragRobot = ({
  ref,
  actualHeight,
  actualWidth,
  handleSubmit,
  pose,
  width,
  height,
  pause,
}: {
  ref: { current: HTMLDivElement };
  actualHeight: number;
  actualWidth: number;
  handleSubmit: () => void;
  pose: PosePayload;
  width: number;
  height: number;
  pause: () => void;
}) => {
  const [pressed, setPressed] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translate(calc(${position.x}px + 50%), calc(${position.y}px - 50%))`;
    }
  }, [position, ref]);

  // Update the current position if mouse is down
  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      if (pressed) {
        setPosition({
          x: position.x + event.movementX,
          y: position.y + event.movementY,
        });
      }
    },
    [pressed, position.x, position.y]
  );

  // submit the position of moved robot to the server
  const onMouseUp = useCallback(() => {
    setPressed(false);
    handleSubmit({
      x: pose.x + (position.x * actualWidth) / (10 * width),
      y: pose.y - (position.y * actualHeight) / (10 * height),
      angle: pose.angle,
    });
    setPosition({ x: 0, y: 0 });
  }, [
    actualHeight,
    actualWidth,
    handleSubmit,
    height,
    width,
    pose.x,
    pose.y,
    pose.angle,
    position.x,
    position.y,
  ]);

  const onMouseDown = useCallback(
    ({ target, pointerId }: { target: HTMLDivElement; pointerId: number }) => {
      pause();
      target.setPointerCapture(pointerId);
      setPressed(true);
    },
    [pause]
  );

  return { onMouseDown, onMouseMove, onMouseUp };
};
