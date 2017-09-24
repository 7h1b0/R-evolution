import { h } from 'preact';
import formatTime from '../utils/format';
import computeEfficiency from '../utils/efficiency';

export default ({ time, efficiency = false }) => (
  <span>
    {formatTime(time)}
    <span class="efficiency">{efficiency && computeEfficiency(time)}</span>
  </span>
);
