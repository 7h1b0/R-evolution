import { h } from 'preact';

export default ({ type, title, name, value, onChange, autofocus = false }) => (
  <label htmlFor={title}>
    {title}
    <input
      id={title}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      autoFocus={autofocus}
    />
  </label>
);
