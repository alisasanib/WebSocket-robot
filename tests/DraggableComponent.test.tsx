import DraggableComponent from '../components/DraggableComponent';
import '@testing-library/jest-dom';
import { render, screen, act, fireEvent } from '@testing-library/react';

describe('DraggableComponent', () => {
  it('renders robot position at map correctly', async () => {
    const handleSubmit = jest.fn();
    const pause = jest.fn();
    const unpause = jest.fn();
    await act(() =>
      render(
        <DraggableComponent
          handleSubmit={ handleSubmit }
          pose= { { x: 10, y: 10, angle: 10 } }
          actualHeight= { 1000 }
          actualWidth= { 1600 }
          height= { 300 }
          width= { 400 }
          pause= { pause }
          unpause= { unpause }
        />
      )
    );
    expect(await screen.findByTestId('robot-indicator')).toHaveStyle('top: 270px');
    expect(await screen.findByTestId('robot-indicator')).toHaveStyle('right: 375px');
  });
  it('renders robot position at [0,0] coordination(bottom left corner) correctly', async () => {
    const handleSubmit = jest.fn();
    const pause = jest.fn();
    const unpause = jest.fn();
    await act(() =>
      render(
        <DraggableComponent
          handleSubmit={ handleSubmit }
          pose= { { x: 0, y: 0, angle: 10 } }
          actualHeight= { 1000 }
          actualWidth= { 1600 }
          height= { 300 }
          width= { 400 }
          pause= { pause }
          unpause= { unpause }
        />
      )
    );
    expect(await screen.findByTestId('robot-indicator')).toHaveStyle('top: 300px');
    expect(await screen.findByTestId('robot-indicator')).toHaveStyle('right: 400px');
  });
  it('renders robot position at [160,100] coordination(top right corner) correctly', async () => {
    const handleSubmit = jest.fn();
    const pause = jest.fn();
    const unpause = jest.fn();
    await act(() =>
      render(
        <DraggableComponent
          handleSubmit={ handleSubmit }
          pose= { { x: 160, y: 100, angle: 10 } }
          actualHeight= { 1000 }
          actualWidth= { 1600 }
          height= { 300 }
          width= { 400 }
          pause= { pause }
          unpause= { unpause }
        />
      )
    );
    expect(await screen.findByTestId('robot-indicator')).toHaveStyle('top: 0px');
    expect(await screen.findByTestId('robot-indicator')).toHaveStyle('right: 0px');
  });
});
