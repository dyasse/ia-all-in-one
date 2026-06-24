export type ResetItem = {
  id: string;
  title: string;
  energy: 'low' | 'medium' | 'high' | 'overloaded';
  time: '2' | '5' | '15' | '30';
  vibe: 'calm' | 'fun' | 'movement' | 'creative' | 'social' | 'home' | 'focus' | 'no-scroll';
  action: string;
  startLine: string;
  reward: string;
  pdfPage: string;
  vip?: boolean;
};
const make = (energy: ResetItem['energy'], count: number, vip = false): ResetItem[] => {
  const vibes: ResetItem['vibe'][] = ['calm','fun','movement','creative','social','home','focus','no-scroll'];
  const times: ResetItem['time'][] = ['2','5','15','30'];
  return Array.from({length: count}, (_, i) => {
    const vibe = vibes[i % vibes.length]; const time = times[i % times.length];
    return { id: `${vip?'vip-':''}${energy}-${time}-${vibe}-${String(i+1).padStart(3,'0')}`, title: `${vibe.replace('-', ' ')} ${energy} reset`, energy, time, vibe,
      action: actionFor(energy, vibe, time), startLine: `Set a ${time}-minute timer. You only need the first small step.`,
      reward: rewardFor(vibe), pdfPage: vip ? 'VIP Bonus - Reward Vault + Page Match' : `Page ${12 + i} - ${time}-Minute Action Picker`, vip };
  });
};
function actionFor(e: ResetItem['energy'], v: ResetItem['vibe'], t: ResetItem['time']) {
  const base = {
    calm: 'Open a window or look toward natural light, then move one visible item into its place or into a basket.',
    fun: 'Pick one song and do the easiest useful action until it ends.',
    movement: 'Stand up, roll your shoulders, and reset one small surface or object.',
    creative: 'Open notes and write three messy words about what you want next.',
    social: 'Send one low-pressure message or react kindly to one pending note.',
    home: 'Put five visible items into one basket, drawer, or trash bag.',
    focus: 'Write the next task as one verb plus one object, then do the first motion.',
    'no-scroll': 'Put your phone down, take one slow breath, and write one word for what you need next.'
  }[v];
  return `${base} Keep it ${e === 'overloaded' ? 'extra quiet and optional' : 'small'} for ${t} minutes.`;
}
function rewardFor(v: ResetItem['vibe']) {
  return ({calm:'Tea or cozy blanket after starting.', fun:'One favorite song after the reset.', movement:'Fresh air or a stretch break.', creative:'Five minutes with a favorite pen or hobby.', social:'Save a kind reply as your win.', home:'Enjoy the clear spot for one minute.', focus:'Check it off and take a no-phone sip break.', 'no-scroll':'Return with choice instead of autopilot.'})[v];
}
export const resets: ResetItem[] = [
  {id:'low-2-calm-001', title:'Window + One Item Reset', energy:'low', time:'2', vibe:'calm', action:'Open a window or look toward natural light, then move one visible item into its place or into a basket.', startLine:'Set a 2-minute timer. You only need the first step.', reward:'Play one favorite song after starting.', pdfPage:'Page 20 - 2-Minute Action Picker'},
  {id:'no-scroll-2-001', title:'Before You Scroll Reset', energy:'low', time:'2', vibe:'no-scroll', action:'Put your phone down, take one slow breath, and write one word for what you need next.', startLine:'You are not quitting forever. You are only pausing for two minutes.', reward:'Return with choice instead of autopilot.', pdfPage:'Page 55 - No-Scroll Cards'},
  ...make('low',18), ...make('medium',20), ...make('high',15), ...make('overloaded',15), ...make('medium',10,true)
];
