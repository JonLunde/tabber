import React from 'react';

const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

function GuitarTuner(props) {
  const { idx, tuning, changeTuning } = props;

  //   switch (idx) {
  //     case 1:
  //       const [tuning, setTuning] = useState('e');
  //       break;
  //     case 2:
  //       const [tuning, setTuning] = useState('a');
  //       break;
  //     case 3:
  //       const [tuning, setTuning] = useState('d');
  //       break;
  //     case 4:
  //       const [tuning, setTuning] = useState('g');
  //       break;
  //     case 5:
  //       const [tuning, setTuning] = useState('b');
  //       break;
  //     case 6:
  //       const [tuning, setTuning] = useState('e');
  //       break;

  //     default:
  //       console.log('TUNER ERROR!');
  //       break;
  //   }

  function handleChange(event) {
    setTuning(event.target.value);
  }

  return (
    // <div className={`guitar__tuner guitar__tuner--${idx}`}>
    //   <select name="tuner" id="tuner" value={tuning} onChange={changeTuning(event.target.value)}>
    //     {notes.map((note, i) => (
    //       <option value={note} key={i}>
    //         {note}
    //       </option>
    //     ))}
    //   </select>
    // </div>
    y
  );
}

export default GuitarTuner;
