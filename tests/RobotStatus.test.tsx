import RobotStatus from '../components/RobotStatus';
import '@testing-library/jest-dom';
import { render, screen, act, fireEvent } from '@testing-library/react';

describe('Calculator', () => {
  it('renders disconnect status', async () => {
    await act(() => render(<RobotStatus poseConnected={ false } />));
    expect(await screen.findByText('Connection offline')).toBeInTheDocument();
  });
  it('renders right connected status and pos values', async () => {
    await act(() =>
      render(
        <RobotStatus poseConnected={ true } pose={ { x: 10, y: 10, angle: 10 } } />
      )
    );
    expect(await screen.findByText('Connection online')).toBeInTheDocument();
    expect(await screen.findByText('x=10, y=10, angle=10')).toBeInTheDocument();
  });
  it('renders unpause buttons', async () => {
    const pause = jest.fn();
    const unpause = jest.fn();

    await act(() =>
      render(
        <RobotStatus
          poseConnected={ true }
          pausedConnected={ true }
          pose={ { x: 10, y: 10, angle: 10 } }
          pause={ pause }
          unpause={ unpause }
          paused = { true }
        />
      )
    );
    const pauseunpauseButton = await screen.findByRole('button');

    expect(pauseunpauseButton).toHaveTextContent('Start moving');

    fireEvent.click(pauseunpauseButton);
    expect(unpause).toHaveBeenCalledTimes(1);
  });

  it('renders pause buttons', async () => {
    const pause = jest.fn();
    const unpause = jest.fn();

    await act(() =>
      render(
        <RobotStatus
          poseConnected={ true }
          pausedConnected={ true }
          pose={ { x: 10, y: 10, angle: 10 } }
          pause={ pause }
          unpause={ unpause }
          paused = { false }
        />
      )
    );
    const pauseunpauseButton = await screen.findByRole('button');

    expect(pauseunpauseButton).toHaveTextContent('Stop moving');

    fireEvent.click(pauseunpauseButton);
    expect(pause).toHaveBeenCalledTimes(1);
  });
});
