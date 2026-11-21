import os
D=os.path.dirname(os.path.abspath(__file__))
import json,glob
d={}
for f in sorted(glob.glob(D+'/cimg_*.json')):d.update(json.load(open(f)))
s=open(D+'/base.html').read();k=s.rfind('</body>')
c='<script>const CIMG='+json.dumps(d)+';</script>'+open(D+'/baldr_img.js').read()+open(D+'/loki_img.js').read()
open(os.path.join(D,'..','index.html'),'w').write(s[:k]+c+open(D+'/ai.js').read()+open(D+'/loki.js').read()+open(D+'/track.js').read()+open(D+'/home.js').read()+open(D+'/rules.js').read()+open(D+'/godinfo.js').read()+open(D+'/undo.js').read()+open(D+'/tutorial.js').read()+open(D+'/sim.js').read()+open(D+'/mp.js').read()+open(D+'/i18n.js').read()+s[k:])
print('creature imgs',len(d))
