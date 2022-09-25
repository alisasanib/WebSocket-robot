import { PosePayload } from '../lib/stream';
import styles from './RobotStatus.module.css';


const RobotStatus = ({
  pose,
  poseConnected,
  pausedConnected,
  pause,
  unpause,
  paused,
}: {
  pose: PosePayload;
  poseConnected: boolean;
  pausedConnected: boolean;
  pause: () => void;
  unpause: () => void;
  paused: boolean;
}) => {
  // Connection status
  const status = poseConnected ? (
    <div className={ styles.connected }>Connection online</div>
  ) : (
    <div className={ styles.disconnected }>Connection offline</div>
  );

  // Current pose
  const poseValue =
    poseConnected && pose ? (
      <div className={ styles.pose }>
        <strong>Current robot pose</strong>
        <code>
          x={formatNumber(pose.x)}, y={formatNumber(pose.y)}, angle=
          {formatNumber(pose.angle)}
        </code>
      </div>
    ) : null;

  const pauseButton = pausedConnected ? (
    <div className={ styles.buttons }>
      <button
        className={ [styles.button, paused ? styles.pausedButton : styles.unpausedButton].join(' ') }
        onClick={ paused ? unpause : pause }
      >
        {paused ? 'Start moving' : 'Stop moving'}
      </button>
    </div>
  ) : null;

  // Component content
  return (
    <div className={ styles.statusContainer }>
      {status}
      {poseValue}
      {pauseButton}
    </div>
  );
};

const formatNumber = (num: number) => +num.toFixed(2);

export default RobotStatus;
