import { h } from 'preact';

export default ({ type, title, name, value, onChange, autofocus = false }) => (
  <input
    id={title}
    name={name}
    type={type}
    value={value}
    onChange={onChange}
    autoFocus={autofocus}
    placeholder={title}
  />
);
