import os
D=os.path.dirname(os.path.abspath(__file__))
import re
s=open(D+'/base.html').read()
m=s[s.index('<script>',s.index('<script>'))+8:s.index('</script>',s.index('<script>'))]
i=m.index('const IMG={');j=m.index('\n',i)
m=m[:i]+'const IMG={};'+m[j:]
a=(open(D+'/ai.js').read()+open(D+'/loki.js').read()+open(D+'/bragi.js').read()).replace('<script>','').replace('</script>','')
open(D+'/engine.js','w').write('var S;'+m+'\n'+a)
