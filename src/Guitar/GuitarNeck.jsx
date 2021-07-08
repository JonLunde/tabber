import React, { useState } from 'react';
import GuitarString from './GuitarString';

function GuitarNeck(props) {
  const { dispatch, tuning } = props;

  return (
    <div className="guitar__neck">
      <div className="guitar__nut"></div>

      <div className="guitar__dot guitar__dot--1"></div>
      <div className="guitar__dot guitar__dot--2"></div>
      <div className="guitar__dot guitar__dot--3"></div>
      <div className="guitar__dot guitar__dot--4"></div>
      <div className="guitar__dot guitar__dot--5"></div>
      <div className="guitar__dot guitar__dot--6"></div>
      <div className="guitar__dot guitar__dot--7"></div>
      <div className="guitar__dot guitar__dot--8"></div>
      <div className="guitar__dot guitar__dot--9"></div>
      <div className="guitar__dot guitar__dot--10"></div>

      <div className="guitar__fret--1"> </div>
      <div className="guitar__fret--2"> </div>
      <div className="guitar__fret--3"> </div>
      <div className="guitar__fret--4"> </div>
      <div className="guitar__fret--5"> </div>
      <div className="guitar__fret--6"> </div>
      <div className="guitar__fret--7"> </div>
      <div className="guitar__fret--8"> </div>
      <div className="guitar__fret--9"> </div>
      <div className="guitar__fret--10"> </div>
      <div className="guitar__fret--11"> </div>
      <div className="guitar__fret--12"> </div>
      <div className="guitar__fret--13"> </div>
      <div className="guitar__fret--14"> </div>
      <div className="guitar__fret--15"> </div>
      <div className="guitar__fret--16"> </div>
      <div className="guitar__fret--17"> </div>
      <div className="guitar__fret--18"> </div>
      <div className="guitar__fret--19"> </div>
      <div className="guitar__fret--20"> </div>
      <div className="guitar__fret--21"> </div>
      <div className="guitar__fret--22"> </div>
      <div className="guitar__fret--23"> </div>
      <div className="guitar__fret--24"> </div>

      <div className="guitar__container-strings">
        <GuitarString id={0} key={0} dispatch={dispatch} tuning={tuning} />
        <GuitarString id={1} key={1} dispatch={dispatch} tuning={tuning} />
        <GuitarString id={2} key={2} dispatch={dispatch} tuning={tuning} />
        <GuitarString id={3} key={3} dispatch={dispatch} tuning={tuning} />
        <GuitarString id={4} key={4} dispatch={dispatch} tuning={tuning} />
        <GuitarString id={5} key={5} dispatch={dispatch} tuning={tuning} />
      </div>
    </div>
  );
}

export default GuitarNeck;
