import React, { useState, useCallback } from 'react';
import styles from './FormInput.module.css';
const FormInput = ({ handleSubmit }: { handleSubmit: () => void }) => {
  const [manualPos, setManualPos] = useState<{ [key: string]: number }>({x: '', y: '', angle: ''});

  const handleChange = useCallback(
    (edited: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setManualPos((currPos) => ({
        ...currPos,
        [edited]: Number(e.target.value),
      }));
    },
    []
  );

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSubmit(manualPos);
    },
    [handleSubmit, manualPos]
  );
  // Title of three inputs
  const poses = ['x', 'y', 'angle'];
  return (
    <form className={ styles.formContainer } action="submit" onSubmit={ onSubmit }>
      {poses.map((pose: string, index: number) => {
        return (
          <div
            className={ styles.inputPose }
            key={ index }
          >
            <label style={ { marginBottom: 3 } } htmlFor={ `${pose}-input` }>
              {pose.toUpperCase()}
            </label>
            <input
              placeholder={ `Please enter the ${pose.toUpperCase()} value` }
              id={ `${pose}-input` }
              type="number"
              step="any"
              value={ manualPos[pose] }
              onChange={ handleChange(pose) }
            />
          </div>
        );
      })}
      <button className={ styles.submitButton }>Submit</button>
    </form>
  );
};

export default FormInput;
