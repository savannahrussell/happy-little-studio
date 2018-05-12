import { $body } from '../constants/elements';

// This is invoked by the `main.js` entry file one directory up
export default function sample($nodes) {
  $body.append('<small>May the force be with you.</small>');

  // Immediate access to selected jQuery nodes
  console.log('Selected nodes', $nodes);
}