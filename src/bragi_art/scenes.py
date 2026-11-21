# Illustrations originales, style cartoon plat (contours épais, couleurs franches), 400x400
O='stroke="#2b1d12" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"'

def skald():
    return f'''<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="bg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b4f8c"/><stop offset="1" stop-color="#7a5aa6"/></linearGradient></defs>
<rect width="400" height="400" fill="url(#bg1)"/>
<rect x="0" y="300" width="400" height="100" fill="#5a3a24"/>
<rect x="30" y="40" width="40" height="150" fill="#b8323a" {O}/><path d="M30 190 L50 170 L70 190" fill="#b8323a" {O}/>
<rect x="330" y="40" width="40" height="150" fill="#2f7a4a" {O}/><path d="M330 190 L350 170 L370 190" fill="#2f7a4a" {O}/>

<path d="M120 400 L130 260 Q200 220 270 260 L280 400 Z" fill="#2f6fb0" {O}/>
<path d="M150 270 L200 330 L250 270" fill="none" {O}/>
<circle cx="200" cy="170" r="52" fill="#f2c39b" {O}/>
<path d="M150 175 Q200 330 250 175 Q235 215 200 215 Q165 215 150 175 Z" fill="#e8e2d6" {O}/>
<path d="M148 160 Q150 105 200 105 Q250 105 252 160 Q240 128 200 126 Q160 128 148 160 Z" fill="#c9a27a" {O}/>
<circle cx="182" cy="168" r="5" fill="#2b1d12"/><circle cx="218" cy="168" r="5" fill="#2b1d12"/>
<path d="M188 192 Q200 200 212 192" fill="none" {O}/>
<path d="M255 230 Q330 220 320 330 L268 330 Z" fill="#f2b632" {O}/>
<path d="M262 240 L272 325 M278 238 L288 325 M294 236 L302 325 M308 238 L312 325" stroke="#7a4d10" stroke-width="3"/>
<circle cx="140" cy="300" r="14" fill="#f2c39b" {O}/><circle cx="268" cy="290" r="14" fill="#f2c39b" {O}/>
</svg>'''

def mead():
    return f'''<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
<rect width="400" height="400" fill="#8fc6e8"/>
<path d="M0 260 L90 120 L170 230 L250 90 L400 280 L400 400 L0 400 Z" fill="#7b8a9c" {O}/>
<path d="M250 90 L280 130 L262 128 L250 150 L236 128 L222 132 Z" fill="#fff"/>
<rect x="0" y="300" width="400" height="100" fill="#6a9c4a"/>
<path d="M150 360 L170 330 L190 360 Z M210 360 L230 325 L250 360 Z" fill="#ff8a2a" {O}/>
<path d="M95 220 Q95 345 200 345 Q305 345 305 220 Z" fill="#d9a032" {O}/>
<ellipse cx="200" cy="220" rx="105" ry="24" fill="#f6d36b" {O}/>
<ellipse cx="200" cy="222" rx="88" ry="16" fill="#e8a33a"/>
<path d="M140 190 Q120 150 150 130 Q175 110 160 80" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".8"/>
<path d="M220 185 Q250 150 230 120 Q215 95 240 70" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".8"/>
<path d="M95 250 Q70 250 72 228 M305 250 Q330 250 328 228" fill="none" {O}/>
<path d="M130 280 L270 280" stroke="#a0701c" stroke-width="6"/>
</svg>'''

def hall():
    return f'''<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
<rect width="400" height="400" fill="#6b3f26"/>
<path d="M0 0 L200 -40 L400 0 L400 120 L0 120 Z" fill="#4a2a18"/>
<circle cx="80" cy="150" r="38" fill="#c33b2f" {O}/><circle cx="80" cy="150" r="10" fill="#f2c94c" {O}/>
<circle cx="200" cy="140" r="38" fill="#2f6fb0" {O}/><circle cx="200" cy="140" r="10" fill="#f2c94c" {O}/>
<circle cx="320" cy="150" r="38" fill="#2f8a52" {O}/><circle cx="320" cy="150" r="10" fill="#f2c94c" {O}/>
<path d="M60 60 L80 30 L100 60 Z M300 60 L320 30 L340 60 Z" fill="#ffb347" {O}/>
<rect x="20" y="250" width="360" height="40" rx="6" fill="#a8693a" {O}/>
<rect x="40" y="290" width="20" height="90" fill="#7a4626" {O}/><rect x="340" y="290" width="20" height="90" fill="#7a4626" {O}/>
<path d="M90 250 Q85 205 110 200 L120 250 Z" fill="#f2e2b8" {O}/>
<path d="M180 250 Q178 200 205 198 L210 250 Z" fill="#f2e2b8" {O}/>
<path d="M280 250 Q276 205 302 202 L308 250 Z" fill="#f2e2b8" {O}/>
<ellipse cx="150" cy="245" rx="22" ry="10" fill="#d97f2e" {O}/><ellipse cx="250" cy="245" rx="22" ry="10" fill="#d97f2e" {O}/>
</svg>'''

def warrior():
    return f'''<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
<rect width="400" height="400" fill="#f0b45a"/>
<circle cx="300" cy="90" r="50" fill="#ffe08a"/>
<path d="M0 320 Q200 270 400 320 L400 400 L0 400 Z" fill="#7a9c4a" {O}/>
<rect x="290" y="70" width="10" height="300" fill="#8a5a2b" {O}/><path d="M282 72 L295 30 L308 72 Z" fill="#cfd8dc" {O}/>
<path d="M130 400 L140 280 Q200 250 260 280 L270 400 Z" fill="#9c3b2f" {O}/>
<circle cx="200" cy="200" r="50" fill="#f2c39b" {O}/>
<path d="M150 190 Q150 135 200 135 Q250 135 250 190 Z" fill="#9aa7b0" {O}/>
<path d="M150 170 Q120 150 125 120 Q140 150 158 158 M250 170 Q280 150 275 120 Q260 150 242 158" fill="#f4f1e6" {O}/>
<rect x="194" y="160" width="12" height="45" fill="#9aa7b0" {O}/>
<path d="M160 215 Q200 275 240 215 Q220 240 200 240 Q180 240 160 215 Z" fill="#c9762e" {O}/>
<circle cx="182" cy="200" r="5" fill="#2b1d12"/><circle cx="218" cy="200" r="5" fill="#2b1d12"/>
<circle cx="115" cy="320" r="62" fill="#2f6fb0" {O}/><circle cx="115" cy="320" r="16" fill="#f2c94c" {O}/>
<path d="M115 258 L115 382 M53 320 L177 320" stroke="#2b1d12" stroke-width="5"/>
</svg>'''
