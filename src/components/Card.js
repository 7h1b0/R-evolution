import { h } from 'preact';

export default ({ title, children }) => (
  <div class="card">
    <h2>{title}</h2>
    {children}
  </div>
);
