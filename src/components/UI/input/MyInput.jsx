import { forwardRef } from 'react';
import s from './MyInput.module.css';

const MyInput = forwardRef((props, ref) => (
  <input className={s.myInput} {...props} ref={ref} />
));

export default MyInput