import { h } from 'preact';
import FormatTime from './FormatTime';

export default ({ title, value, format = false, efficiency = false }) => (
  <div class="category">
    <p>
      {format ? <FormatTime time={value} efficiency={efficiency} /> : value}
    </p>
    <p class="caption">{title}</p>
  </div>
);
