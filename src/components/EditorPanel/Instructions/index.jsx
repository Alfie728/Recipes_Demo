import React, { useState, useEffect, useRef } from 'react';
import Button from '@/components/Button';
import styles from './index.module.scss';

const Instructions = (props) => {
  const { instructions, handleChange, addInstruction, deleteInstruction } =
    props;

  const [newInstruction, setNewInstruction] = useState(false);
  const ref = useRef();
  const addInstructionThenScrollIntoView = () => {
    addInstruction();
    setNewInstruction(true);
  };
  useEffect(() => {
    if (newInstruction) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
      setNewInstruction(false);
    }
  }, [newInstruction]);
  return (
    <div className={styles['instructions_panel']}>
      <span className={styles['title']}>Instructions</span>
      {instructions &&
        instructions.map((instruction, index) => {
          const instructionID = `instruction-${index}`;
          return (
            <div key={index} className={styles['panel_item']}>
              <label htmlFor={instructionID}>{index + 1}</label>
              <input
                type="text"
                id={instructionID}
                value={instruction}
                onChange={(e) =>
                  handleChange({
                    instructions: [
                      ...instructions.slice(0, index),
                      e.target.value,
                      ...instructions.slice(index + 1),
                    ],
                  })
                }
              />
              <Button
                className="btn-danger"
                onClick={() => deleteInstruction(index)}
              >
                X
              </Button>
            </div>
          );
        })}
      <div className={styles['add']}>
        <Button
          className="btn-primary"
          onClick={() => addInstructionThenScrollIntoView()}
        >
          Add Instruction
        </Button>
      </div>
      <div className={styles['the-end']} ref={ref}></div>
    </div>
  );
};

export default Instructions;
