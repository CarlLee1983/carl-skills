const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
function check(file, scenario) {
  const source = fs.readFileSync(file, 'utf8');
  const elements = {};
  for (const match of source.matchAll(/<([a-z0-9]+)\b([^>]*\bid="([^"]+)"[^>]*)>/g)) elements['#' + match[3]] = { value: '', hidden: /\bhidden/.test(match[2]), textContent: '', handlers: {}, addEventListener(type, fn) { this.handlers[type] = fn; } };
  const cards = [...source.matchAll(/data-series="([^"]+)"/g)].map(m => ({ dataset: { series: m[1] }, hidden: false }));
  const document = { querySelector: id => { if (!elements[id]) throw Error('Unknown selector ' + id); return elements[id]; }, querySelectorAll: () => cards };
  const script = source.match(/<script>([\s\S]*?)<\/script>/)[1];
  new vm.Script(script).runInNewContext({ document });
  const fire = (id, event) => elements[id].handlers[event]({ preventDefault() {} });
  const assert = (condition, message) => { if (!condition) throw Error(message); };
  scenario(elements, cards, fire, assert);
  for (const m of source.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const target = m[1];
    assert(!/^(https?:|\/\/)/.test(target), 'External resource');
    if (target.startsWith('#')) assert(!!elements[target], 'Missing fragment ' + target);
    else assert(fs.existsSync(path.resolve(path.dirname(file), target)), 'Missing file ' + target);
  }
  for (const m of source.matchAll(/<label for="([^"]+)"/g)) assert(!!elements['#'+m[1]], 'Unbound label');
  const record = { source: file, sha256: crypto.createHash('sha256').update(source).digest('hex'), method: 'Node vm with minimal DOM stubs; static link and label checks', result: 'pass', checks: scenario.name, limitations: 'No browser rendering, native form reset, keyboard, overflow, responsive or human trial verified.' };
  const base = file.startsWith('capability/') ? 'capability' : 'autonomous';
  fs.mkdirSync(base + '/evidence', { recursive: true });
  fs.writeFileSync(base + '/evidence/' + path.basename(file, '.html') + '.json', JSON.stringify(record, null, 2) + '\n');
  console.log(file + ': PASS (' + scenario.name + ')');
}
check('autonomous/prototypes/pottery-v1.html', function filterAndPlan(e,c,fire,a) { e['#series'].value='tea';fire('#series','change');a(!c[0].hidden && c[1].hidden && c[2].hidden,'tea filter');e['#series'].value='all';fire('#series','change');a(c.every(x=>!x.hidden),'all filter');e['#session'].value='手捏日用杯';e['#people'].value='2 人';fire('#plan','submit');a(e['#result'].textContent.includes('2 人'),'plan output');fire('#plan','reset');a(e['#result'].textContent.includes('請選擇'),'reset feedback'); });
check('autonomous/prototypes/school-v1.html', function threeCourseChoicesAndReset(e,c,fire,a) { for (const goal of ['meeting','travel','presentation']) { e['#goal'].value=goal;fire('#finder','submit');a(!e['#recommendation'].hidden && e['#course-title'].textContent.length>0 && e['#course-info'].textContent.includes('適合'),'course result'); }fire('#finder','reset');a(e['#recommendation'].hidden,'reset hides result'); });
check('capability/prototypes/course-v1.html', function markAndClearReading(e,c,fire,a) {fire('#done','click');a(e['#result'].textContent.includes('本次已閱讀'),'mark');fire('#reset','click');a(e['#result'].textContent.includes('尚未標記'),'clear');});
