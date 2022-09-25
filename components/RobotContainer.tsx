import styles from './RobotContainer.module.css';

import { useCallback, useState } from 'react';

import {
  getPoseStream,
  useStream,
  PosePayload,
  PausedPayload,
  getPausedStream,
} from '../lib/stream';

import MapImage from './MapImage';
import FormInput from './FormInput';
import RobotStatus from './RobotStatus';

const RobotContainer = () => {
  // Pause state
  const { connected: pausedConnected, stream: pausedStream } = useStream(
    getPausedStream,
    (payload) => setPaused(payload.paused)
  );

  // Current pose
  const [pose, setPose] = useState<PosePayload>();
  // Current paused status
  const [paused, setPaused] = useState<PausedPayload>();

  const { connected: poseConnected, stream: poseStream } = useStream(
    getPoseStream,
    (payload) => setPose(payload)
  );

  const setPoseManually = useCallback(
    ({ x, y, angle }: { x: number; y: number; angle: number }) => {
      return poseStream?.send({
        ...((x || x === 0) && { x }),
        ...((y || y === 0) && { y }),
        ...((angle || angle === 0) && { angle }),
      });
    },
    [poseStream]
  );

  // Pause and unpause buttons
  const pause = useCallback(
    () => pausedStream?.send({ paused: true }),
    [pausedStream]
  );
  const unpause = useCallback(
    () => pausedStream?.send({ paused: false }),
    [pausedStream]
  );

  return (
    <div className={ styles.container }>
      <div className={ styles.statusAndFormContainer }>
        <RobotStatus
          pose={ pose }
          poseConnected={ poseConnected }
          pausedConnected={ pausedConnected }
          pause={ pause }
          unpause={ unpause }
          paused={ paused }
        />
        {pose && <FormInput handleSubmit={ setPoseManually } />}
      </div>
      {pose && poseConnected && (
        <MapImage
          pose={ pose }
          handleSubmit={ setPoseManually }
          pause={ pause }
          unpause={ unpause }
        />
      )}
    </div>
  );
};

export default RobotContainer;
