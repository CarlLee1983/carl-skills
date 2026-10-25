from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin,urlsplit,unquote
import subprocess,json,hashlib
ROOT=Path.cwd(); SITE=ROOT/'site'; BASE='ec23251'; evidence=ROOT/'.scratch/header-navigation/validation'
class Page(HTMLParser):
 def __init__(self,s):
  super().__init__();self.links=[];self.anchors=[];self.ids=set();self.feed(s)
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if t=='a' and a.get('href'):self.anchors.append(a['href'])
  if a.get('id'):self.ids.add(a['id'])
  for key in ('href','src'):
   if a.get(key):self.links.append(a[key])
def header(s,marker):
 start=s.index('<div class="'+marker+'">');depth=0
 import re
 for m in re.finditer(r'<div\b[^>]*>|</div>',s[start:]):
  depth+=-1 if m.group().startswith('</') else 1
  if depth==0:return s[start:start+m.end()]
 raise AssertionError('unclosed header')
checks=[]
for p in sorted(SITE.rglob('*.html')):
 if 'prototypes' in p.parts:continue
 rel=p.relative_to(ROOT).as_posix();new=p.read_text();old=subprocess.check_output(['git','show',BASE+':'+rel],text=True)
 before=header(old,'bar');after=header(new,'site-header')
 assert old[old.index('<body>'):].replace(before,'')==new[new.index('<body>'):].replace(after,''), rel+' content changed'
 base='https://example.test/carl-skills/'+p.relative_to(SITE).as_posix()
 assert {urljoin(base,u).replace('/index.html','/') for u in Page(before).anchors}<={urljoin(base,u).replace('/index.html','/') for u in Page(after).anchors}, rel+' lost original links'
 for url in Page(new).anchors + [u for u in Page(new).links if not u.startswith('#')]:
  u=urlsplit(urljoin('https://example.test/carl-skills/'+p.relative_to(SITE).as_posix(),url))
  if u.netloc!='example.test':continue
  assert u.path.startswith('/carl-skills/'),(rel,url)
  target=SITE/unquote(u.path.removeprefix('/carl-skills/'))
  if target.is_dir():target=target/'index.html'
  assert target.exists(),(rel,url)
  if u.fragment and target.suffix=='.html':assert u.fragment in Page(target.read_text()).ids,(rel,url)
 assert after.count('aria-label="全站導覽"')==1
 assert after.count('aria-label="手機全站導覽"')==1
 checks.append({'page':rel,'preserved_body':True,'preserved_header_targets':True,'local_targets_valid':True})
result={'baseline':BASE,'pages':checks,'sha256':{str(p.relative_to(ROOT)):hashlib.sha256(p.read_bytes()).hexdigest() for p in SITE.rglob('*') if p.is_file() and 'prototypes' not in p.parts and p.suffix in ('.html','.css','.js')}}
(evidence/'static.json').write_text(json.dumps(result,indent=2)+'\n')
print(f'{len(checks)} pages: body preserved, original header targets preserved, all local targets/fragments valid')
