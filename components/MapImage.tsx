import { useRef } from 'react';
import DraggableComponent from './DraggableComponent';
import { useContainerDimensions } from '../hooks/useContainerDimensions';
import { PosePayload } from '../lib/stream';
import styles from './MapImage.module.css';

const MapImage = ({
  pose,
  handleSubmit,
  pause,
  unpause,
}: {
  pose: PosePayload;
  handleSubmit: () => void;
  pause: () => void;
  unpause: () => void;
}) => {
  const componentRef = useRef<HTMLImageElement>(null);

  // custom hook to fetch actual and current dimensions of the map image on screen
  const {
    dimensions: { width, height },
    actualDimensions: { width: actualWidth, height: actualHeight },
    setInitialDimensions,
  } = useContainerDimensions(componentRef);

  return (
    <>
      <h4>You can change the position of the robot by dragging and dropping it to the new location :)</h4>
      <div className={ styles.imageContainer }>
        <img
          width={ '100%' }
          src={ '/images/map.png' }
          ref={ componentRef }
          alt={ 'map' }
          onLoad={ setInitialDimensions }
          style={ { userSelect: 'none' } }
        />
        {pose && actualHeight && (
          <DraggableComponent
            handleSubmit={ handleSubmit }
            pose={ pose }
            actualHeight={ actualHeight }
            actualWidth={ actualWidth }
            height={ height }
            width={ width }
            pause={ pause }
            unpause={ unpause }
          />
        )}
      </div>
    </>
  );
};

export default MapImage;
