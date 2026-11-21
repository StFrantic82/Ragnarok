import json,base64,io,sys
sys.path.insert(0,'/home/claude/rg/bragi_art')
from scenes import skald,mead,hall,warrior
from playwright.sync_api import sync_playwright
from PIL import Image
I=json.load(open('/home/claude/rg/bragi_art/icons.json'))
def ico(k,s=70,r=10):return f'<img src="{I[k]}" style="width:{s}px;height:{s}px;border-radius:{r}px;vertical-align:middle">'
LOCK='''<svg width="70" height="70" viewBox="0 0 70 70"><rect x="12" y="32" width="46" height="34" rx="6" fill="#222"/><path d="M22 32 V20 Q22 6 36 6 Q50 6 50 20" fill="none" stroke="#222" stroke-width="7" transform="rotate(-25 50 20)"/><circle cx="35" cy="48" r="5" fill="#fff"/></svg>'''
PAIR=lambda s=60:f'<span style="display:inline-flex;gap:4px;align-items:center">{ico("Glory",s)}<b style="font-size:{s*.6}px">=</b>{ico("Glory",s)}</span>'
HARP='''<svg width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="38" fill="#3b2a6b" stroke="#c9a227" stroke-width="4"/><path d="M26 62 L28 18 Q52 16 56 36 Q50 50 54 62 Z" fill="#f2b632" stroke="#2b1d12" stroke-width="3"/><path d="M33 24 L34 58 M40 22 L41 58 M47 26 L47 58" stroke="#7a4d10" stroke-width="2"/></svg>'''
BG={'C':('#d6ecfa','#3a8fd0'),'I':('#f6e7c4','#c9a227'),'E':('#f9d3d8','#c8323e'),'G':('#ece6dc','#6b6b6b')}
def num(n,c='#d22',s=72):return f'<b style="font:900 {s}px DejaVu Serif;color:{c};-webkit-text-stroke:2px #fff">{n}</b>'
def hero(n=None,s=90):
    h=ico('h',s,0)
    return h if n is None else f'<span style="position:relative;display:inline-block">{h}<span style="position:absolute;left:0;right:0;top:{s*.22}px;text-align:center">{num(n,"#fff",s*.48)}</span></span>'
def herocost(n,s=110):
    return f'<span style="position:relative;display:inline-block">{ico("h",s,0)}<span style="position:absolute;left:0;right:0;top:{s*.2}px;text-align:center">{num(n,"#d22",s*.5)}</span></span>'
def eff(spec):
    out=[]
    for e in spec:
        if e[0]=='h':out.append(hero(e[1]))
        elif e[0]=='x':out.append(f'{hero()} <b style="font:900 44px DejaVu Sans">×</b> {PAIR() if e[2]=="pair" else ico(e[2])}')
        elif e[0]=='xn':out.append(f'{hero(e[1])} <b style="font:900 44px DejaVu Sans">×</b> {ico(e[2])}')
        elif e[0]=='atk':out.append(ico('Atk',90,0))
        elif e[0]=='+':out.append('<b style="font:900 50px DejaVu Sans">+</b>')
    return ' '.join(out)
def vpbox(vp):
    if vp is None:return ''
    inner=num(vp[0],'#2c8a2c',64)+(f'<div><b style="font:900 34px DejaVu Sans">×</b> {ico(vp[1],52) if vp[1]!="pair" else PAIR(40)}</div>' if len(vp)>1 else '')
    return f'<div style="position:absolute;right:18px;top:0;width:150px;min-height:170px;background:linear-gradient(#f9df9b,#f0c35a);border-radius:0 0 14px 14px;box-shadow:0 4px 0 #c99a33;text-align:center;padding-top:14px"><div style="color:#3c8c3c;font:700 22px DejaVu Sans">🌿 PV 🌿</div>{inner}</div>'
def bonus(b):
    if not b:return ''
    if b==['Atk']:c=ico('Atk',70,0)+'<b style="font:900 34px DejaVu Sans;color:#d22">+1</b>'
    elif b==['Unl']:c=LOCK
    else:c=''.join(ico(x,62) for x in b)+'<b style="font:900 38px DejaVu Sans;color:#d22"> -1</b>'
    return f'<div style="position:absolute;left:50%;transform:translateX(-50%);top:0;background:#d4d4d4;padding:16px 22px 18px;border-radius:0 0 10px 10px;display:flex;gap:6px;align-items:center;box-shadow:0 4px 0 #aaa">{c}</div>'
def card(name,t,tag,cost,bon,vp,ef,scene):
    bg,fr=BG[t]
    tagh=f'<div style="position:absolute;left:22px;top:22px">{ico(tag,92,14)}</div>' if tag else ''
    return f'''<div id=c style="width:661px;height:1028px;position:relative;background:{bg};font-family:DejaVu Serif;overflow:hidden">
{tagh}{bonus(bon)}{vpbox(vp)}
<div style="position:absolute;top:205px;left:0;right:0;text-align:center;font:700 46px DejaVu Serif;font-variant:small-caps;color:#5a3517">{name}</div>
<div style="position:absolute;left:70px;top:275px;width:521px;height:470px;border:16px solid {fr};border-radius:10px;box-shadow:inset 0 0 0 4px #2b1d12, 0 0 0 4px #2b1d12;overflow:hidden">{scene()}</div>
<div style="position:absolute;left:0;right:0;top:820px;text-align:center">{eff(ef)}</div>
<div style="position:absolute;left:14px;bottom:18px">{herocost(cost) if cost is not None else ''}</div>
<div style="position:absolute;right:16px;bottom:16px">{HARP}</div></div>'''
def god():
    return f'''<div id=c style="width:661px;height:1028px;position:relative;background:#ece6dc;font-family:DejaVu Serif">
<div style="position:absolute;top:150px;left:0;right:0;text-align:center;font:700 64px DejaVu Serif;font-variant:small-caps;color:#5a3517">Bragi</div>
<div style="position:absolute;left:70px;top:240px;width:521px;height:500px;border:16px solid #3b2a6b;border-radius:10px;box-shadow:inset 0 0 0 4px #2b1d12,0 0 0 4px #2b1d12;overflow:hidden">{skald()}</div>
<div style="position:absolute;left:0;right:0;top:810px;text-align:center"><span style="transform:scale(1.6);display:inline-block">{HARP}</span></div>
<div style="position:absolute;right:16px;bottom:16px">{HARP}</div></div>'''
def scoring():
    sq=lambda n,c:f'<span style="display:inline-block;width:58px;height:78px;background:{c};border-radius:8px;color:#fff;font:900 46px DejaVu Sans;text-align:center;line-height:78px;border:3px solid #fff;box-shadow:0 0 0 2px #2b1d12">{n}</span>'
    return f'''<div id=c style="width:1028px;height:661px;position:relative;background:#f1e4cc;font-family:DejaVu Serif">
<div style="position:absolute;left:60px;top:20px;width:420px;text-align:center;font:700 54px DejaVu Serif;font-variant:small-caps;color:#5a3517">Bragi</div>
<div style="position:absolute;left:60px;top:95px;width:420px;height:420px;border:14px solid #8a8a8a;border-radius:10px;box-shadow:inset 0 0 0 4px #2b1d12,0 0 0 4px #2b1d12;overflow:hidden">{skald()}</div>
<div style="position:absolute;left:60px;top:555px;width:448px;display:flex;gap:14px;justify-content:center;align-items:center">{sq(4,'#1f6fbf')}{sq(3,'#d9a91c')}{sq(5,'#d22b2b')}{hero(5,84)}</div>
<div style="position:absolute;left:540px;top:30px;width:450px;text-align:center"><div style="font:700 42px DejaVu Serif;font-variant:small-caps;color:#5a3517;text-decoration:underline">God of Poetry</div>
<div style="margin:18px 0"><span style="transform:scale(1.5);display:inline-block">{HARP}</span></div>
<div style="font:700 26px DejaVu Serif;color:#5a3517;font-variant:small-caps;line-height:1.35">Song of Heroes<br><span style="font-size:24px">Cards you play this turn count as if they were in your Valhalla</span></div>
<div style="margin:28px auto 0;width:330px;padding:22px 10px;background:linear-gradient(#f9df9b,#f0c35a);border-radius:16px;box-shadow:0 4px 0 #c99a33">{num(3,'#2c8a2c',70)} <b style="font:900 40px DejaVu Sans">×</b> {PAIR(62)}</div></div></div>'''
CARDS=[
('Kvasir','C',None,3,['Character','Event'],(3,),[('h',1),('+',),('xn',1,'Event')],skald),
('Gunnlöð','C',None,2,['Item'],(3,),[('x',1,'pair')],mead),
('Bragi Boddason','C','Glory',4,['Glory'],(2,'Glory'),[('h',2)],skald),
('The Einherjar','C','Warrior',3,['Atk'],(2,'Warrior'),[('xn',2,'Warrior')],warrior),
('Óðrerir','I','Artefact',2,['Giant'],(2,'Event'),[('h',1)],mead),
('Bragarfull','I','Glory',3,['Elite'],(2,'Elite'),[('xn',1,'Glory')],hall),
('Golden Harp','I',None,4,['Event'],(4,),[('h',1),('+',),('xn',1,'Character')],skald),
('The Mead of Poetry','E','Destiny',2,['Unl'],(3,),[('h',1)],mead),
('Welcome to Valhalla','E','Glory',2,['Undead'],(4,),[('xn',1,'Glory')],hall),
("Ægir's Feast",'E',None,2,['World'],(2,'World'),[('h',1),('+',),('xn',1,'Item')],hall),
('Lokasenna','E',None,2,['Beast'],(3,),[('atk',)],hall),
('Hákonarmál','E','Glory',3,['Elite'],(3,'Glory'),[('h',2)],warrior)]
out={}
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome');pg=b.new_page(viewport={'width':1100,'height':1100})
    def shot(html,key,size,prev=None):
        pg.set_content('<html><body style="margin:0">'+html+'</body></html>');pg.wait_for_timeout(150)
        png=pg.locator('#c').screenshot();im=Image.open(io.BytesIO(png)).convert('RGB')
        if prev:im.save(prev)
        im=im.resize(size,Image.LANCZOS);bb=io.BytesIO();im.save(bb,'WEBP',quality=82);out[key]='data:image/webp;base64,'+base64.b64encode(bb.getvalue()).decode()
    shot(god(),'Bragi|Bragi',(280,435),'/home/claude/rg/bragi_art/god.png')
    shot(scoring(),'Bragi|S',(360,231),'/home/claude/rg/bragi_art/scoring.png')
    for c in CARDS:shot(card(*c),'Bragi|'+c[0],(280,435),'/home/claude/rg/bragi_art/'+c[0].replace("'",'').replace(' ','_')+'.png')
open('/home/claude/rg/bragi_img.js','w').write('<script>Object.assign(IMG,'+json.dumps(out)+');</script>')
print(len(out))
