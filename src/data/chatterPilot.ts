export const chatterPilot = {
  email: 'alexpruteanu@hotmail.com',
  path: '/chatter-teams/',
  briefPath: '/chatter-teams/deployment/',
  releases: 'https://github.com/xander1421/chatter-linux-client/releases',
  currentRelease: 'https://github.com/xander1421/chatter-linux-client/releases/latest',
  subject: 'Chatter team pilot',
} as const;

export function buildPilotInquiry(values: { company: string; teamSize: string; devices: string; goal: string }) {
  const body = [
    'Hi Alex,', '', 'I would like to discuss a Chatter pilot.', '',
    `Team / company: ${values.company.trim() || 'Not specified'}`,
    `Team size: ${values.teamSize.trim()}`,
    `Devices and operating systems: ${values.devices.trim()}`,
    '', 'What we would like to evaluate:', values.goal.trim(), '',
    'Please send a deployment outline and confirm device compatibility and pilot availability.',
  ].join('\n');
  return {
    body,
    mailto: `mailto:${chatterPilot.email}?subject=${encodeURIComponent(chatterPilot.subject)}&body=${encodeURIComponent(body)}`,
  };
}
