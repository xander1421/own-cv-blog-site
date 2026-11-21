import assert from 'node:assert/strict';
import { buildPilotInquiry, chatterPilot } from '../src/data/chatterPilot';

// User input must stay in the body, never become a recipient or mail header.
const values = {
  company: 'Acme & Sons', teamSize: '5–15 people', devices: 'Debian + Android',
  goal: 'Private messages & calls?\nBcc: other@example.test',
};
const draft = buildPilotInquiry(values);
const url = new URL(draft.mailto);
assert.equal(url.protocol, 'mailto:');
assert.equal(url.pathname, chatterPilot.email);
assert.deepEqual([...url.searchParams.keys()], ['subject', 'body']);
assert.equal(url.searchParams.get('subject'), chatterPilot.subject);
assert.equal(url.searchParams.get('body'), draft.body);
for (const value of Object.values(values)) assert.ok(draft.body.includes(value));
assert.ok(!draft.mailto.includes('&Bcc='));
assert.ok(buildPilotInquiry({ ...values, company: '  ' }).body.includes('Not specified'));
console.log('Pilot inquiry: recipient, encoding, user content and optional-company checks passed.');
