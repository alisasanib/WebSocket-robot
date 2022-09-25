import { useRef } from 'react';
import { useDragRobot } from '../hooks/useDragRobot';

import { PosePayload } from '../lib/stream';

import styles from './DraggableComponent.module.css';

const DraggableComponent = (props: {
  handleSubmit: () => void;
  pose: PosePayload;
  actualHeight: number;
  actualWidth: number;
  height: number;
  width: number;
  pause: () => void;
  unpause: () => void;
}) => {
  const ref = useRef<HTMLDivElement>();

  // custom hook to activate drag and drop feature for the robot on the map
  const { onMouseMove, onMouseDown, onMouseUp } = useDragRobot({
    ref,
    ...props,
  });

  const { pose, height, width, actualHeight, actualWidth } = props;
  return (
    <span
      data-testid="robot-indicator"
      style={ {
        top: height - (pose.y * 10 * height) / actualHeight,
        right: width - (pose.x * 10 * width) / actualWidth,
      } }
      className={ styles.robotIndicator }
      ref={ ref }
      onPointerMove={ onMouseMove }
      onPointerDown={ onMouseDown }
      onPointerUp={ onMouseUp }
    />
  );
};

export default DraggableComponent;
