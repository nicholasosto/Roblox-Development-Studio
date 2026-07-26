import{j as ce,p as Rl,r as Rt,W as os,T as Mc,z as ls,E as Ec,Y as cs,K as yc}from"./index-BxI9cHTT.js";const bc="Hex City Center Roblox Unit Grid",Tc="measured-draft",Ac=1,wc="2026-07-25",Rc={dimensional:"This app-local JSON is the sole numeric authority; bundle JSON, SVG, and PNG are derived copies",canonicalSpec:"apps/command-center/src/spatial/fixtures/hex-city-center-grid-spec.json",sourceBundle:"output/imagegen/hex-city-center-grid-2026-07-25/",projectWorkflow:"_project/workflows/measured-spatial-grid-to-studio-blockout.md",vectorPreview:"output/imagegen/hex-city-center-grid-2026-07-25/hex-city-center-grid-measured-draft.svg",preview:"output/imagegen/hex-city-center-grid-2026-07-25/hex-city-center-grid-measured-draft.png",generatedConcept:"non-dimensional visual reference only"},Cc={plane:"X/Z",origin:[0,0],imageRight:"+X",imageDown:"+Z",north:"-Z",verticalAxisShown:!1},Pc={boundsStuds:{x:[-256,256],z:[-256,256]},sizeStuds:[512,512],pngPixels:[2048,2048],plotPixels:[1792,1792],plotPixelsPerStud:3.5},Dc={minorStuds:4,majorStuds:16,superStuds:64},Ic={orientation:"flat-top",construction:"For apothem A, vertices are (2A/sqrt(3),0), (A/sqrt(3),A), (-A/sqrt(3),A), (-2A/sqrt(3),0), (-A/sqrt(3),-A), (A/sqrt(3),-A).",core:{apothemStuds:80,flatToFlatStuds:160,pointToPointStuds:184.752086},innerSidewalkOuterEdge:{apothemStuds:92,bandWidthStuds:12,flatToFlatStuds:184,pointToPointStuds:212.464899},roadCenterline:{apothemStuds:108,flatToFlatStuds:216,pointToPointStuds:249.415316},roadOuterEdge:{apothemStuds:124,bandWidthStuds:32,laneWidthStuds:16,flatToFlatStuds:248,pointToPointStuds:286.365734},outerSidewalkOuterEdge:{apothemStuds:136,bandWidthStuds:12,flatToFlatStuds:272,pointToPointStuds:314.078546}},Lc={count:6,normalAnglesDegreesFromPositiveX:[30,90,150,210,270,330],roadWidthStuds:32,laneWidthStuds:16,sidewalkEachSideStuds:12,sidewalkToSidewalkWidthStuds:56,crosswalkDepthStuds:12,crosswalkPaintHasPhysicalWidth:!1},Uc={schema:"trembus.spatial-appearance/v1",revision:1,projection:{mode:"world-xz",uAxis:"+X",vAxis:"-Z",anchor:[0,0]},textureAssets:[{id:"spatial-orientation-diagnostic",role:"color",sourceKey:"spatial-orientation-diagnostic",optional:!0}],surfaceDefinitions:[{id:"ground",maps:{},mapping:{tileStuds:[16,16],offsetStuds:[0,0],rotationDegrees:0},preview:{fallbackColor:"#0A0D12",roughness:.95,metalness:0,normalStrength:1},roblox:{mode:"enumMaterial",material:"Ground",physics:"inherit"}},{id:"core",maps:{},mapping:{tileStuds:[16,16],offsetStuds:[0,0],rotationDegrees:0},preview:{fallbackColor:"#D4AF37",roughness:.82,metalness:.02,normalStrength:1},roblox:{mode:"enumMaterial",material:"Concrete",physics:"inherit"}},{id:"sidewalk",maps:{},mapping:{tileStuds:[16,16],offsetStuds:[0,0],rotationDegrees:0},preview:{fallbackColor:"#44DDFF",roughness:.88,metalness:0,normalStrength:1},roblox:{mode:"enumMaterial",material:"Concrete",physics:"inherit"}},{id:"road",maps:{color:"spatial-orientation-diagnostic"},mapping:{tileStuds:[16,16],offsetStuds:[0,0],rotationDegrees:0},preview:{fallbackColor:"#5A6371",roughness:.92,metalness:0,normalStrength:1},roblox:{mode:"enumMaterial",material:"Asphalt",physics:"inherit"}}],surfaceBindings:[{geometryRole:"ground",surfaceId:"ground"},{geometryRole:"core",surfaceId:"core"},{geometryRole:"sidewalk.inner",surfaceId:"sidewalk"},{geometryRole:"sidewalk.outer",surfaceId:"sidewalk"},{geometryRole:"road.ring",surfaceId:"road"},{geometryRole:"road.approach",surfaceId:"road"},{geometryRole:"sidewalk.approach",surfaceId:"sidewalk"}]},Nc=["All band widths are measured perpendicular to the regular hex edges.","Boundary strokes and road paint are annotations and add zero physical studs.","If one-stud curbs are added, subtract them from the sidewalk allocation unless the overall plan is deliberately enlarged.","Do not infer dimensions from the generated concept raster."],Fc={projectEntityCreated:!0,ownerTargetRecorded:!0,studioImported:!0,studioSaved:!1,playQaCompleted:!1,published:!1,uploaded:!1,registered:!1,syncbackApplied:!1,promotionAuthorized:!1,promoted:!1,committed:!1},Oc={title:bc,status:Tc,revision:Ac,date:wc,authority:Rc,coordinateSystem:Cc,view:Pc,grid:Dc,hex:Ic,approaches:Lc,appearance:Uc,implementationNotes:Nc,promotionGates:Fc},Cl=2*1024*1024,ir="trembus.spatial-appearance/v1",vi=["ground","core","sidewalk.inner","sidewalk.outer","road.ring","road.approach","sidewalk.approach"];function ft(n,e){if(!n||typeof n!="object"||Array.isArray(n))throw new Error(`${e} must be a JSON object`);return n}function sr(n){return n&&typeof n=="object"&&!Array.isArray(n)?n:{}}function mt(n,e){if(typeof n!="number"||!Number.isFinite(n))throw new Error(`${e} must be a finite number`);return n}function rr(n,e,t){return n==null?e:mt(n,t)}function uo(n,e){if(!Array.isArray(n)||n.length!==2)throw new Error(`${e} must contain two numbers`);const t=mt(n[0],`${e}[0]`),i=mt(n[1],`${e}[1]`);if(!(t<i))throw new Error(`${e} must be ascending`);return[t,i]}function jr(n,e){if(!Array.isArray(n)||n.length!==2)throw new Error(`${e} must contain X and Z`);return[mt(n[0],`${e}[0]`),mt(n[1],`${e}[1]`)]}function Zn(n,e,t=.001){return Math.abs(n-e)<=t}function hs(n,e){return typeof n=="string"&&n.trim()?n.trim():e}function It(n,e,t){if(n!=null&&!Zn(mt(n,t),e))throw new Error(`${t} conflicts with the apothem geometry`)}const Bc=/^[a-z][a-z0-9._-]{0,63}$/,zc=/^#[0-9a-fA-F]{6}$/,Yr=["color","normal","roughness","metalness"],Gc=16,kc=32,Vc=16,Ws=8192;function fn(n,e,t){for(const i of Object.keys(n))if(!e.includes(i))throw new Error(`${t}.${i} is not supported`)}function ar(n,e,t){if(!Array.isArray(n))throw new Error(`${e} must be an array`);if(n.length>t)throw new Error(`${e} may contain at most ${t} entries`);return n}function Fi(n,e){if(typeof n!="string"||!Bc.test(n))throw new Error(`${e} must be a lowercase id using letters, numbers, dot, underscore, or hyphen`);if(n==="constructor"||n==="prototype"||n==="__proto__")throw new Error(`${e} uses a reserved id`);return n}function Si(n,e,t,i){const s=mt(n,e);if(s<t||s>i)throw new Error(`${e} must be between ${t} and ${i}`);return s}function fo(n,e){const t=jr(n,e);for(const i of t)if(Math.abs(i)>Ws)throw new Error(`${e} components may not exceed ${Ws} studs`);return t}function Hc(n,e){if(!Array.isArray(n)||n.length!==2)throw new Error(`${e} must contain two stud dimensions`);return[Si(n[0],`${e}[0]`,.125,Ws),Si(n[1],`${e}[1]`,.125,Ws)]}function Wc(n,e){if(typeof n!="string"||!zc.test(n))throw new Error(`${e} must be a six-digit hexadecimal color`);return n.toUpperCase()}function Xc(n,e){if(typeof n!="string"||!Yr.includes(n))throw new Error(`${e} must be color, normal, roughness, or metalness`);return n}function jc(n,e){if(typeof n!="string"||!/^[A-Z][A-Za-z0-9]{0,63}$/.test(n))throw new Error(`${e} must be a Roblox Enum.Material member name`);return n}function Yc(n){const e=ft(n,"appearance");if(fn(e,["schema","revision","projection","textureAssets","surfaceDefinitions","surfaceBindings"],"appearance"),e.schema!==ir)throw new Error(`appearance.schema must be ${ir}`);const t=Si(e.revision,"appearance.revision",1,9999);if(!Number.isInteger(t))throw new Error("appearance.revision must be an integer");const i=ft(e.projection,"appearance.projection");if(fn(i,["mode","uAxis","vAxis","anchor"],"appearance.projection"),i.mode!=="world-xz"||i.uAxis!=="+X"||i.vAxis!=="-Z")throw new Error("appearance.projection must use world-xz with +X U and -Z V axes");const s=fo(i.anchor,"appearance.projection.anchor"),r=ar(e.textureAssets,"appearance.textureAssets",Gc),a=[],o=new Map;for(let g=0;g<r.length;g+=1){const v=`appearance.textureAssets[${g}]`,f=ft(r[g],v);fn(f,["id","role","sourceKey","optional"],v);const d=Fi(f.id,`${v}.id`);if(o.has(d))throw new Error(`duplicate texture asset id "${d}"`);const E=f.optional==null?!1:f.optional;if(typeof E!="boolean")throw new Error(`${v}.optional must be a boolean`);const T={id:d,role:Xc(f.role,`${v}.role`),sourceKey:Fi(f.sourceKey,`${v}.sourceKey`),optional:E};a.push(T),o.set(d,T)}const c=ar(e.surfaceDefinitions,"appearance.surfaceDefinitions",kc),l=[],u=new Map;for(let g=0;g<c.length;g+=1){const v=`appearance.surfaceDefinitions[${g}]`,f=ft(c[g],v);fn(f,["id","maps","mapping","preview","roblox"],v);const d=Fi(f.id,`${v}.id`);if(u.has(d))throw new Error(`duplicate surface definition id "${d}"`);const E=ft(f.maps,`${v}.maps`);fn(E,Yr,`${v}.maps`);const T={};for(const M of Yr){if(E[M]==null)continue;const Y=Fi(E[M],`${v}.maps.${M}`),R=o.get(Y);if(!R)throw new Error(`${v}.maps.${M} references unknown asset "${Y}"`);if(R.role!==M)throw new Error(`${v}.maps.${M} references ${R.role} asset "${Y}"`);T[M]=Y}const y=ft(f.mapping,`${v}.mapping`);if(fn(y,["tileStuds","offsetStuds","rotationDegrees"],`${v}.mapping`),mt(y.rotationDegrees,`${v}.mapping.rotationDegrees`)!==0)throw new Error(`${v}.mapping.rotationDegrees must be 0 in appearance v1`);const A=ft(f.preview,`${v}.preview`);fn(A,["fallbackColor","roughness","metalness","normalStrength"],`${v}.preview`);let D;if(f.roblox!=null){const M=ft(f.roblox,`${v}.roblox`);if(fn(M,["mode","material","physics"],`${v}.roblox`),M.mode!=="enumMaterial")throw new Error(`${v}.roblox.mode must be enumMaterial`);if(M.physics!=="inherit")throw new Error(`${v}.roblox.physics must be inherit`);D={mode:"enumMaterial",material:jc(M.material,`${v}.roblox.material`),physics:"inherit"}}const x={id:d,maps:T,mapping:{tileStuds:Hc(y.tileStuds,`${v}.mapping.tileStuds`),offsetStuds:fo(y.offsetStuds,`${v}.mapping.offsetStuds`),rotationDegrees:0},preview:{fallbackColor:Wc(A.fallbackColor,`${v}.preview.fallbackColor`),roughness:Si(A.roughness,`${v}.preview.roughness`,0,1),metalness:Si(A.metalness,`${v}.preview.metalness`,0,1),normalStrength:Si(A.normalStrength,`${v}.preview.normalStrength`,0,4)},...D?{roblox:D}:{}};l.push(x),u.set(d,x)}const p=ar(e.surfaceBindings,"appearance.surfaceBindings",Vc);if(p.length!==vi.length)throw new Error(`appearance.surfaceBindings must bind all ${vi.length} surface roles`);const h=[],m=new Set;for(let g=0;g<p.length;g+=1){const v=`appearance.surfaceBindings[${g}]`,f=ft(p[g],v);if(fn(f,["geometryRole","surfaceId"],v),typeof f.geometryRole!="string"||!vi.includes(f.geometryRole))throw new Error(`${v}.geometryRole is not a supported surface role`);const d=f.geometryRole;if(m.has(d))throw new Error(`duplicate surface binding role "${d}"`);const E=Fi(f.surfaceId,`${v}.surfaceId`);if(!u.has(E))throw new Error(`${v}.surfaceId references unknown surface "${E}"`);m.add(d),h.push({geometryRole:d,surfaceId:E})}for(const g of vi)if(!m.has(g))throw new Error(`appearance.surfaceBindings is missing geometry role "${g}"`);return{schema:ir,revision:t,projection:{mode:"world-xz",uAxis:"+X",vAxis:"-Z",anchor:s},textureAssets:a,surfaceDefinitions:l,surfaceBindings:h}}function Pl(n){const e=ft(n,"Grid spec"),t=ft(e.coordinateSystem,"coordinateSystem");if(t.plane!=="X/Z")throw new Error("Only X/Z grid specs are supported");if(t.verticalAxisShown===!0)throw new Error("Authoritative Y geometry is not supported by this renderer");const i=hs(t.north,"-Z");if(i!=="-Z")throw new Error("Only grid specs with north = -Z are supported");const s=ft(e.view,"view"),r=ft(s.boundsStuds,"view.boundsStuds"),a=uo(r.x,"view.boundsStuds.x"),o=uo(r.z,"view.boundsStuds.z"),c=a[1]-a[0],l=o[1]-o[0];if(c>8192||l>8192)throw new Error("View bounds may not exceed 8,192 studs per axis");const u=jr(t.origin??[0,0],"coordinateSystem.origin");if(u[0]<a[0]||u[0]>a[1]||u[1]<o[0]||u[1]>o[1])throw new Error("The origin must lie inside the view bounds");if(s.sizeStuds!=null){const Z=jr(s.sizeStuds,"view.sizeStuds");if(!Zn(Z[0],c)||!Zn(Z[1],l))throw new Error("view.sizeStuds conflicts with view.boundsStuds")}const p=ft(e.grid,"grid"),h=mt(p.minorStuds,"grid.minorStuds"),m=mt(p.majorStuds,"grid.majorStuds"),g=mt(p.superStuds,"grid.superStuds");if(!(h>0&&m>=h&&g>=m))throw new Error("Grid steps must satisfy 0 < minor ≤ major ≤ super");if(!Zn(m/h,Math.round(m/h))||!Zn(g/h,Math.round(g/h)))throw new Error("Major and super grid steps must be whole minor-grid multiples");if(c/h+l/h>1200)throw new Error("Minor grid spacing would create too many lines");const f=ft(e.hex,"hex");if(f.orientation!=="flat-top")throw new Error("Only flat-top regular hex specs are supported");const d=ft(f.core,"hex.core"),E=ft(f.innerSidewalkOuterEdge,"hex.innerSidewalkOuterEdge"),T=sr(f.roadCenterline),y=ft(f.roadOuterEdge,"hex.roadOuterEdge"),P=ft(f.outerSidewalkOuterEdge,"hex.outerSidewalkOuterEdge"),A=mt(d.apothemStuds,"hex.core.apothemStuds"),D=mt(E.apothemStuds,"hex.innerSidewalkOuterEdge.apothemStuds"),x=mt(y.apothemStuds,"hex.roadOuterEdge.apothemStuds"),M=mt(P.apothemStuds,"hex.outerSidewalkOuterEdge.apothemStuds"),Y=rr(T.apothemStuds,(D+x)/2,"hex.roadCenterline.apothemStuds");if(!(0<A&&A<D&&D<Y&&Y<x&&x<M))throw new Error("Hex apothems must increase from core through outer sidewalk");const R=Math.min((a[1]-u[0])*Math.sqrt(3)/2,(u[0]-a[0])*Math.sqrt(3)/2,o[1]-u[1],u[1]-o[0]);if(M>R+.001)throw new Error("The outer hex must fit completely inside the declared view bounds");It(d.flatToFlatStuds,2*A,"hex.core.flatToFlatStuds"),It(d.pointToPointStuds,4*A/Math.sqrt(3),"hex.core.pointToPointStuds"),It(E.flatToFlatStuds,2*D,"hex.innerSidewalkOuterEdge.flatToFlatStuds"),It(E.pointToPointStuds,4*D/Math.sqrt(3),"hex.innerSidewalkOuterEdge.pointToPointStuds"),It(T.flatToFlatStuds,2*Y,"hex.roadCenterline.flatToFlatStuds"),It(T.pointToPointStuds,4*Y/Math.sqrt(3),"hex.roadCenterline.pointToPointStuds"),It(y.flatToFlatStuds,2*x,"hex.roadOuterEdge.flatToFlatStuds"),It(y.pointToPointStuds,4*x/Math.sqrt(3),"hex.roadOuterEdge.pointToPointStuds"),It(P.flatToFlatStuds,2*M,"hex.outerSidewalkOuterEdge.flatToFlatStuds"),It(P.pointToPointStuds,4*M/Math.sqrt(3),"hex.outerSidewalkOuterEdge.pointToPointStuds"),It(E.bandWidthStuds,D-A,"hex.innerSidewalkOuterEdge.bandWidthStuds"),It(y.bandWidthStuds,x-D,"hex.roadOuterEdge.bandWidthStuds"),It(P.bandWidthStuds,M-x,"hex.outerSidewalkOuterEdge.bandWidthStuds");const B=ft(e.approaches,"approaches");if(!Array.isArray(B.normalAnglesDegreesFromPositiveX)||B.normalAnglesDegreesFromPositiveX.length===0||B.normalAnglesDegreesFromPositiveX.length>6)throw new Error("approaches must provide one to six face-normal angles");const G=B.normalAnglesDegreesFromPositiveX.map((Z,ie)=>mt(Z,`approaches.normalAnglesDegreesFromPositiveX[${ie}]`));if(B.count!=null&&mt(B.count,"approaches.count")!==G.length)throw new Error("approaches.count must match the angle array");const X=G.map(Z=>(Z%360+360)%360);if(new Set(X.map(Z=>Z.toFixed(6))).size!==X.length)throw new Error("Approach angles must be unique");for(const Z of X){const ie=((Z-30)%60+60)%60;if(!Zn(ie,0)&&!Zn(ie,60))throw new Error("Approaches must align to flat-top hex face normals")}const k=mt(B.roadWidthStuds,"approaches.roadWidthStuds"),z=rr(B.laneWidthStuds,k/2,"approaches.laneWidthStuds"),V=mt(B.sidewalkEachSideStuds,"approaches.sidewalkEachSideStuds"),ee=rr(B.crosswalkDepthStuds,M-x,"approaches.crosswalkDepthStuds"),Q=k+2*V;if(!(k>0&&z>0&&z<=k&&V>=0&&ee>=0&&Number.isFinite(Q)))throw new Error("Approach road, lane, sidewalk, and crosswalk widths are invalid");const ue=Math.max(c,l);if(Q>Math.min(c,l)||ee>ue)throw new Error("Approach dimensions must remain within the declared view extent");if(B.crosswalkPaintHasPhysicalWidth===!0)throw new Error("Crosswalk paint must remain a zero-width annotation");It(B.sidewalkToSidewalkWidthStuds,k+2*V,"approaches.sidewalkToSidewalkWidthStuds");const pe=sr(e.promotionGates),K=Object.fromEntries(Object.entries(pe).filter(Z=>typeof Z[1]=="boolean")),xe=sr(e.authority);let Pe,Ve;if(Object.prototype.hasOwnProperty.call(e,"appearance"))try{Pe=Yc(e.appearance)}catch(Z){Ve=Z instanceof Error?`Appearance ignored: ${Z.message}`:"Appearance ignored: the appearance contract is invalid"}return{raw:e,title:hs(e.title,"Untitled grid spec"),status:hs(e.status,"draft"),revision:String(e.revision??"—"),date:String(e.date??"—"),authority:hs(xe.dimensional,"Loaded local JSON"),origin:u,north:i,boundsX:a,boundsZ:o,size:[c,l],grid:{minor:h,major:m,super:g},hex:{coreA:A,innerA:D,centerA:Y,roadOuterA:x,outerA:M},approaches:{angles:X,roadWidth:k,laneWidth:z,sidewalkWidth:V,totalWidth:Q,crosswalkDepth:ee},promotionGates:K,appearance:Pe,appearanceWarning:Ve}}function Zc(n,e){if(e>Cl)throw new Error("Grid spec exceeds the 2 MiB local-file limit");let t;try{t=JSON.parse(n)}catch{throw new Error("Grid spec is not valid JSON")}return Pl(t)}const or=(()=>{try{return{ok:!0,spec:Pl(Oc)}}catch(n){return{ok:!1,message:n instanceof Error?n.message:"The bundled measured draft could not be validated"}}})();const Ga="183",bi={ROTATE:0,DOLLY:1,PAN:2},Mi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},qc=0,po=1,$c=2,Bs=1,Kc=2,Wi=3,bn=0,Ut=1,vn=2,En=0,Ti=1,mo=2,go=3,_o=4,Jc=5,qn=100,Qc=101,eh=102,th=103,nh=104,ih=200,sh=201,rh=202,ah=203,Zr=204,qr=205,oh=206,lh=207,ch=208,hh=209,uh=210,dh=211,fh=212,ph=213,mh=214,$r=0,Kr=1,Jr=2,wi=3,Qr=4,ea=5,ta=6,na=7,Dl=0,gh=1,_h=2,rn=0,Il=1,Ll=2,Ul=3,ka=4,Nl=5,Fl=6,Ol=7,Bl=300,Qn=301,Ri=302,lr=303,cr=304,qs=306,qi=1e3,Mn=1001,ia=1002,Et=1003,xh=1004,us=1005,At=1006,hr=1007,Kn=1008,Gt=1009,zl=1010,Gl=1011,$i=1012,Va=1013,on=1014,nn=1015,Tn=1016,Ha=1017,Wa=1018,Ki=1020,kl=35902,Vl=35899,Hl=1021,Wl=1022,qt=1023,An=1026,Jn=1027,Xl=1028,Xa=1029,Ci=1030,ja=1031,Ya=1033,zs=33776,Gs=33777,ks=33778,Vs=33779,sa=35840,ra=35841,aa=35842,oa=35843,la=36196,ca=37492,ha=37496,ua=37488,da=37489,fa=37490,pa=37491,ma=37808,ga=37809,_a=37810,xa=37811,va=37812,Sa=37813,Ma=37814,Ea=37815,ya=37816,ba=37817,Ta=37818,Aa=37819,wa=37820,Ra=37821,Ca=36492,Pa=36494,Da=36495,Ia=36283,La=36284,Ua=36285,Na=36286,vh=3200,jl=0,Sh=1,Sn="",zt="srgb",Pi="srgb-linear",Xs="linear",Qe="srgb",ii=7680,xo=519,Mh=512,Eh=513,yh=514,Za=515,bh=516,Th=517,qa=518,Ah=519,vo=35044,So="300 es",sn=2e3,Ji=2001;function wh(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Qi(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Rh(){const n=Qi("canvas");return n.style.display="block",n}const Mo={};function Eo(...n){const e="THREE."+n.shift();console.log(e,...n)}function Yl(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ce(...n){n=Yl(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Ze(...n){n=Yl(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function js(...n){const e=n.join(" ");e in Mo||(Mo[e]=!0,Ce(...n))}function Ch(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const Ph={[$r]:Kr,[Jr]:ta,[Qr]:na,[wi]:ea,[Kr]:$r,[ta]:Jr,[na]:Qr,[ea]:wi};class ei{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let yo=1234567;const ji=Math.PI/180,es=180/Math.PI;function Li(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(bt[n&255]+bt[n>>8&255]+bt[n>>16&255]+bt[n>>24&255]+"-"+bt[e&255]+bt[e>>8&255]+"-"+bt[e>>16&15|64]+bt[e>>24&255]+"-"+bt[t&63|128]+bt[t>>8&255]+"-"+bt[t>>16&255]+bt[t>>24&255]+bt[i&255]+bt[i>>8&255]+bt[i>>16&255]+bt[i>>24&255]).toLowerCase()}function ke(n,e,t){return Math.max(e,Math.min(t,n))}function $a(n,e){return(n%e+e)%e}function Dh(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function Ih(n,e,t){return n!==e?(t-n)/(e-n):0}function Yi(n,e,t){return(1-t)*n+t*e}function Lh(n,e,t,i){return Yi(n,e,1-Math.exp(-t*i))}function Uh(n,e=1){return e-Math.abs($a(n,e*2)-e)}function Nh(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Fh(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Oh(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Bh(n,e){return n+Math.random()*(e-n)}function zh(n){return n*(.5-Math.random())}function Gh(n){n!==void 0&&(yo=n);let e=yo+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function kh(n){return n*ji}function Vh(n){return n*es}function Hh(n){return(n&n-1)===0&&n!==0}function Wh(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Xh(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function jh(n,e,t,i,s){const r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+i)/2),u=a((e+i)/2),p=r((e-i)/2),h=a((e-i)/2),m=r((i-e)/2),g=a((i-e)/2);switch(s){case"XYX":n.set(o*u,c*p,c*h,o*l);break;case"YZY":n.set(c*h,o*u,c*p,o*l);break;case"ZXZ":n.set(c*p,c*h,o*u,o*l);break;case"XZX":n.set(o*u,c*g,c*m,o*l);break;case"YXY":n.set(c*m,o*u,c*g,o*l);break;case"ZYZ":n.set(c*g,c*m,o*u,o*l);break;default:Ce("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function xi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Ct(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Zl={DEG2RAD:ji,RAD2DEG:es,generateUUID:Li,clamp:ke,euclideanModulo:$a,mapLinear:Dh,inverseLerp:Ih,lerp:Yi,damp:Lh,pingpong:Uh,smoothstep:Nh,smootherstep:Fh,randInt:Oh,randFloat:Bh,randFloatSpread:zh,seededRandom:Gh,degToRad:kh,radToDeg:Vh,isPowerOfTwo:Hh,ceilPowerOfTwo:Wh,floorPowerOfTwo:Xh,setQuaternionFromProperEuler:jh,normalize:Ct,denormalize:xi};class Ue{constructor(e=0,t=0){Ue.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ke(this.x,e.x,t.x),this.y=ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ke(this.x,e,t),this.y=ke(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Bn{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let c=i[s+0],l=i[s+1],u=i[s+2],p=i[s+3],h=r[a+0],m=r[a+1],g=r[a+2],v=r[a+3];if(p!==v||c!==h||l!==m||u!==g){let f=c*h+l*m+u*g+p*v;f<0&&(h=-h,m=-m,g=-g,v=-v,f=-f);let d=1-o;if(f<.9995){const E=Math.acos(f),T=Math.sin(E);d=Math.sin(d*E)/T,o=Math.sin(o*E)/T,c=c*d+h*o,l=l*d+m*o,u=u*d+g*o,p=p*d+v*o}else{c=c*d+h*o,l=l*d+m*o,u=u*d+g*o,p=p*d+v*o;const E=1/Math.sqrt(c*c+l*l+u*u+p*p);c*=E,l*=E,u*=E,p*=E}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=p}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],c=i[s+1],l=i[s+2],u=i[s+3],p=r[a],h=r[a+1],m=r[a+2],g=r[a+3];return e[t]=o*g+u*p+c*m-l*h,e[t+1]=c*g+u*h+l*p-o*m,e[t+2]=l*g+u*m+o*h-c*p,e[t+3]=u*g-o*p-c*h-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),u=o(s/2),p=o(r/2),h=c(i/2),m=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=h*u*p+l*m*g,this._y=l*m*p-h*u*g,this._z=l*u*g+h*m*p,this._w=l*u*p-h*m*g;break;case"YXZ":this._x=h*u*p+l*m*g,this._y=l*m*p-h*u*g,this._z=l*u*g-h*m*p,this._w=l*u*p+h*m*g;break;case"ZXY":this._x=h*u*p-l*m*g,this._y=l*m*p+h*u*g,this._z=l*u*g+h*m*p,this._w=l*u*p-h*m*g;break;case"ZYX":this._x=h*u*p-l*m*g,this._y=l*m*p+h*u*g,this._z=l*u*g-h*m*p,this._w=l*u*p+h*m*g;break;case"YZX":this._x=h*u*p+l*m*g,this._y=l*m*p+h*u*g,this._z=l*u*g-h*m*p,this._w=l*u*p-h*m*g;break;case"XZY":this._x=h*u*p-l*m*g,this._y=l*m*p-h*u*g,this._z=l*u*g+h*m*p,this._w=l*u*p+h*m*g;break;default:Ce("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],p=t[10],h=i+o+p;if(h>0){const m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(u-c)*m,this._y=(r-l)*m,this._z=(a-s)*m}else if(i>o&&i>p){const m=2*Math.sqrt(1+i-o-p);this._w=(u-c)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+l)/m}else if(o>p){const m=2*Math.sqrt(1+o-i-p);this._w=(r-l)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(c+u)/m}else{const m=2*Math.sqrt(1+p-i-o);this._w=(a-s)/m,this._x=(r+l)/m,this._y=(c+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ke(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-i*l,this._z=r*u+a*l+i*c-s*o,this._w=a*u-i*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+i*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class O{constructor(e=0,t=0,i=0){O.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(bo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(bo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*i),u=2*(o*t-r*s),p=2*(r*i-a*t);return this.x=t+c*l+a*p-o*u,this.y=i+c*u+o*l-r*p,this.z=s+c*p+r*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ke(this.x,e.x,t.x),this.y=ke(this.y,e.y,t.y),this.z=ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ke(this.x,e,t),this.y=ke(this.y,e,t),this.z=ke(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-i*c,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return ur.copy(this).projectOnVector(e),this.sub(ur)}reflect(e){return this.sub(ur.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ur=new O,bo=new Bn;class Oe{constructor(e,t,i,s,r,a,o,c,l){Oe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,c,l)}set(e,t,i,s,r,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=c,u[6]=i,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],u=i[4],p=i[7],h=i[2],m=i[5],g=i[8],v=s[0],f=s[3],d=s[6],E=s[1],T=s[4],y=s[7],P=s[2],A=s[5],D=s[8];return r[0]=a*v+o*E+c*P,r[3]=a*f+o*T+c*A,r[6]=a*d+o*y+c*D,r[1]=l*v+u*E+p*P,r[4]=l*f+u*T+p*A,r[7]=l*d+u*y+p*D,r[2]=h*v+m*E+g*P,r[5]=h*f+m*T+g*A,r[8]=h*d+m*y+g*D,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-i*r*u+i*o*c+s*r*l-s*a*c}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],p=u*a-o*l,h=o*c-u*r,m=l*r-a*c,g=t*p+i*h+s*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=p*v,e[1]=(s*l-u*i)*v,e[2]=(o*i-s*a)*v,e[3]=h*v,e[4]=(u*t-s*c)*v,e[5]=(s*r-o*t)*v,e[6]=m*v,e[7]=(i*c-l*t)*v,e[8]=(a*t-i*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(dr.makeScale(e,t)),this}rotate(e){return this.premultiply(dr.makeRotation(-e)),this}translate(e,t){return this.premultiply(dr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const dr=new Oe,To=new Oe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ao=new Oe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Yh(){const n={enabled:!0,workingColorSpace:Pi,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Qe&&(s.r=yn(s.r),s.g=yn(s.g),s.b=yn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Qe&&(s.r=Ai(s.r),s.g=Ai(s.g),s.b=Ai(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Sn?Xs:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return js("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return js("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Pi]:{primaries:e,whitePoint:i,transfer:Xs,toXYZ:To,fromXYZ:Ao,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:zt},outputColorSpaceConfig:{drawingBufferColorSpace:zt}},[zt]:{primaries:e,whitePoint:i,transfer:Qe,toXYZ:To,fromXYZ:Ao,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:zt}}}),n}const qe=Yh();function yn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ai(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let si;class Zh{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{si===void 0&&(si=Qi("canvas")),si.width=e.width,si.height=e.height;const s=si.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=si}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Qi("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=yn(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(yn(t[i]/255)*255):t[i]=yn(t[i]);return{data:t,width:e.width,height:e.height}}else return Ce("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let qh=0;class Ka{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:qh++}),this.uuid=Li(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(fr(s[a].image)):r.push(fr(s[a]))}else r=fr(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function fr(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Zh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ce("Texture: Unable to serialize Texture."),{})}let $h=0;const pr=new O;class wt extends ei{constructor(e=wt.DEFAULT_IMAGE,t=wt.DEFAULT_MAPPING,i=Mn,s=Mn,r=At,a=Kn,o=qt,c=Gt,l=wt.DEFAULT_ANISOTROPY,u=Sn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$h++}),this.uuid=Li(),this.name="",this.source=new Ka(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Ue(0,0),this.repeat=new Ue(1,1),this.center=new Ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(pr).x}get height(){return this.source.getSize(pr).y}get depth(){return this.source.getSize(pr).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ce(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ce(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Bl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case qi:e.x=e.x-Math.floor(e.x);break;case Mn:e.x=e.x<0?0:1;break;case ia:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case qi:e.y=e.y-Math.floor(e.y);break;case Mn:e.y=e.y<0?0:1;break;case ia:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}wt.DEFAULT_IMAGE=null;wt.DEFAULT_MAPPING=Bl;wt.DEFAULT_ANISOTROPY=1;class ct{constructor(e=0,t=0,i=0,s=1){ct.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const c=e.elements,l=c[0],u=c[4],p=c[8],h=c[1],m=c[5],g=c[9],v=c[2],f=c[6],d=c[10];if(Math.abs(u-h)<.01&&Math.abs(p-v)<.01&&Math.abs(g-f)<.01){if(Math.abs(u+h)<.1&&Math.abs(p+v)<.1&&Math.abs(g+f)<.1&&Math.abs(l+m+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const T=(l+1)/2,y=(m+1)/2,P=(d+1)/2,A=(u+h)/4,D=(p+v)/4,x=(g+f)/4;return T>y&&T>P?T<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(T),s=A/i,r=D/i):y>P?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=A/s,r=x/s):P<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),i=D/r,s=x/r),this.set(i,s,r,t),this}let E=Math.sqrt((f-g)*(f-g)+(p-v)*(p-v)+(h-u)*(h-u));return Math.abs(E)<.001&&(E=1),this.x=(f-g)/E,this.y=(p-v)/E,this.z=(h-u)/E,this.w=Math.acos((l+m+d-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ke(this.x,e.x,t.x),this.y=ke(this.y,e.y,t.y),this.z=ke(this.z,e.z,t.z),this.w=ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ke(this.x,e,t),this.y=ke(this.y,e,t),this.z=ke(this.z,e,t),this.w=ke(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Kh extends ei{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:At,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new ct(0,0,e,t),this.scissorTest=!1,this.viewport=new ct(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:i.depth},r=new wt(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:At,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Ka(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class an extends Kh{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class ql extends wt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Et,this.minFilter=Et,this.wrapR=Mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Jh extends wt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Et,this.minFilter=Et,this.wrapR=Mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class at{constructor(e,t,i,s,r,a,o,c,l,u,p,h,m,g,v,f){at.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,c,l,u,p,h,m,g,v,f)}set(e,t,i,s,r,a,o,c,l,u,p,h,m,g,v,f){const d=this.elements;return d[0]=e,d[4]=t,d[8]=i,d[12]=s,d[1]=r,d[5]=a,d[9]=o,d[13]=c,d[2]=l,d[6]=u,d[10]=p,d[14]=h,d[3]=m,d[7]=g,d[11]=v,d[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new at().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,i=e.elements,s=1/ri.setFromMatrixColumn(e,0).length(),r=1/ri.setFromMatrixColumn(e,1).length(),a=1/ri.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),p=Math.sin(r);if(e.order==="XYZ"){const h=a*u,m=a*p,g=o*u,v=o*p;t[0]=c*u,t[4]=-c*p,t[8]=l,t[1]=m+g*l,t[5]=h-v*l,t[9]=-o*c,t[2]=v-h*l,t[6]=g+m*l,t[10]=a*c}else if(e.order==="YXZ"){const h=c*u,m=c*p,g=l*u,v=l*p;t[0]=h+v*o,t[4]=g*o-m,t[8]=a*l,t[1]=a*p,t[5]=a*u,t[9]=-o,t[2]=m*o-g,t[6]=v+h*o,t[10]=a*c}else if(e.order==="ZXY"){const h=c*u,m=c*p,g=l*u,v=l*p;t[0]=h-v*o,t[4]=-a*p,t[8]=g+m*o,t[1]=m+g*o,t[5]=a*u,t[9]=v-h*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const h=a*u,m=a*p,g=o*u,v=o*p;t[0]=c*u,t[4]=g*l-m,t[8]=h*l+v,t[1]=c*p,t[5]=v*l+h,t[9]=m*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const h=a*c,m=a*l,g=o*c,v=o*l;t[0]=c*u,t[4]=v-h*p,t[8]=g*p+m,t[1]=p,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=m*p+g,t[10]=h-v*p}else if(e.order==="XZY"){const h=a*c,m=a*l,g=o*c,v=o*l;t[0]=c*u,t[4]=-p,t[8]=l*u,t[1]=h*p+v,t[5]=a*u,t[9]=m*p-g,t[2]=g*p-m,t[6]=o*u,t[10]=v*p+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Qh,e,eu)}lookAt(e,t,i){const s=this.elements;return Ot.subVectors(e,t),Ot.lengthSq()===0&&(Ot.z=1),Ot.normalize(),Cn.crossVectors(i,Ot),Cn.lengthSq()===0&&(Math.abs(i.z)===1?Ot.x+=1e-4:Ot.z+=1e-4,Ot.normalize(),Cn.crossVectors(i,Ot)),Cn.normalize(),ds.crossVectors(Ot,Cn),s[0]=Cn.x,s[4]=ds.x,s[8]=Ot.x,s[1]=Cn.y,s[5]=ds.y,s[9]=Ot.y,s[2]=Cn.z,s[6]=ds.z,s[10]=Ot.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],u=i[1],p=i[5],h=i[9],m=i[13],g=i[2],v=i[6],f=i[10],d=i[14],E=i[3],T=i[7],y=i[11],P=i[15],A=s[0],D=s[4],x=s[8],M=s[12],Y=s[1],R=s[5],B=s[9],G=s[13],X=s[2],k=s[6],z=s[10],V=s[14],ee=s[3],Q=s[7],ue=s[11],pe=s[15];return r[0]=a*A+o*Y+c*X+l*ee,r[4]=a*D+o*R+c*k+l*Q,r[8]=a*x+o*B+c*z+l*ue,r[12]=a*M+o*G+c*V+l*pe,r[1]=u*A+p*Y+h*X+m*ee,r[5]=u*D+p*R+h*k+m*Q,r[9]=u*x+p*B+h*z+m*ue,r[13]=u*M+p*G+h*V+m*pe,r[2]=g*A+v*Y+f*X+d*ee,r[6]=g*D+v*R+f*k+d*Q,r[10]=g*x+v*B+f*z+d*ue,r[14]=g*M+v*G+f*V+d*pe,r[3]=E*A+T*Y+y*X+P*ee,r[7]=E*D+T*R+y*k+P*Q,r[11]=E*x+T*B+y*z+P*ue,r[15]=E*M+T*G+y*V+P*pe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],p=e[6],h=e[10],m=e[14],g=e[3],v=e[7],f=e[11],d=e[15],E=c*m-l*h,T=o*m-l*p,y=o*h-c*p,P=a*m-l*u,A=a*h-c*u,D=a*p-o*u;return t*(v*E-f*T+d*y)-i*(g*E-f*P+d*A)+s*(g*T-v*P+d*D)-r*(g*y-v*A+f*D)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],p=e[9],h=e[10],m=e[11],g=e[12],v=e[13],f=e[14],d=e[15],E=t*o-i*a,T=t*c-s*a,y=t*l-r*a,P=i*c-s*o,A=i*l-r*o,D=s*l-r*c,x=u*v-p*g,M=u*f-h*g,Y=u*d-m*g,R=p*f-h*v,B=p*d-m*v,G=h*d-m*f,X=E*G-T*B+y*R+P*Y-A*M+D*x;if(X===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/X;return e[0]=(o*G-c*B+l*R)*k,e[1]=(s*B-i*G-r*R)*k,e[2]=(v*D-f*A+d*P)*k,e[3]=(h*A-p*D-m*P)*k,e[4]=(c*Y-a*G-l*M)*k,e[5]=(t*G-s*Y+r*M)*k,e[6]=(f*y-g*D-d*T)*k,e[7]=(u*D-h*y+m*T)*k,e[8]=(a*B-o*Y+l*x)*k,e[9]=(i*Y-t*B-r*x)*k,e[10]=(g*A-v*y+d*E)*k,e[11]=(p*y-u*A-m*E)*k,e[12]=(o*M-a*R-c*x)*k,e[13]=(t*R-i*M+s*x)*k,e[14]=(v*T-g*P-f*E)*k,e[15]=(u*P-p*T+h*E)*k,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,c=e.z,l=r*a,u=r*o;return this.set(l*a+i,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+i,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,u=a+a,p=o+o,h=r*l,m=r*u,g=r*p,v=a*u,f=a*p,d=o*p,E=c*l,T=c*u,y=c*p,P=i.x,A=i.y,D=i.z;return s[0]=(1-(v+d))*P,s[1]=(m+y)*P,s[2]=(g-T)*P,s[3]=0,s[4]=(m-y)*A,s[5]=(1-(h+d))*A,s[6]=(f+E)*A,s[7]=0,s[8]=(g+T)*D,s[9]=(f-E)*D,s[10]=(1-(h+v))*D,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinant();if(r===0)return i.set(1,1,1),t.identity(),this;let a=ri.set(s[0],s[1],s[2]).length();const o=ri.set(s[4],s[5],s[6]).length(),c=ri.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Wt.copy(this);const l=1/a,u=1/o,p=1/c;return Wt.elements[0]*=l,Wt.elements[1]*=l,Wt.elements[2]*=l,Wt.elements[4]*=u,Wt.elements[5]*=u,Wt.elements[6]*=u,Wt.elements[8]*=p,Wt.elements[9]*=p,Wt.elements[10]*=p,t.setFromRotationMatrix(Wt),i.x=a,i.y=o,i.z=c,this}makePerspective(e,t,i,s,r,a,o=sn,c=!1){const l=this.elements,u=2*r/(t-e),p=2*r/(i-s),h=(t+e)/(t-e),m=(i+s)/(i-s);let g,v;if(c)g=r/(a-r),v=a*r/(a-r);else if(o===sn)g=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===Ji)g=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=p,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=sn,c=!1){const l=this.elements,u=2/(t-e),p=2/(i-s),h=-(t+e)/(t-e),m=-(i+s)/(i-s);let g,v;if(c)g=1/(a-r),v=a/(a-r);else if(o===sn)g=-2/(a-r),v=-(a+r)/(a-r);else if(o===Ji)g=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=p,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const ri=new O,Wt=new at,Qh=new O(0,0,0),eu=new O(1,1,1),Cn=new O,ds=new O,Ot=new O,wo=new at,Ro=new Bn;class ln{constructor(e=0,t=0,i=0,s=ln.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],p=s[2],h=s[6],m=s[10];switch(t){case"XYZ":this._y=Math.asin(ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ke(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-p,r),this._z=0);break;case"ZXY":this._x=Math.asin(ke(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-p,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ke(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ke(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-p,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,m),this._y=0);break;default:Ce("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return wo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(wo,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ro.setFromEuler(this),this.setFromQuaternion(Ro,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ln.DEFAULT_ORDER="XYZ";class Ja{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let tu=0;const Co=new O,ai=new Bn,pn=new at,fs=new O,Oi=new O,nu=new O,iu=new Bn,Po=new O(1,0,0),Do=new O(0,1,0),Io=new O(0,0,1),Lo={type:"added"},su={type:"removed"},oi={type:"childadded",child:null},mr={type:"childremoved",child:null};class St extends ei{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:tu++}),this.uuid=Li(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=St.DEFAULT_UP.clone();const e=new O,t=new ln,i=new Bn,s=new O(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new at},normalMatrix:{value:new Oe}}),this.matrix=new at,this.matrixWorld=new at,this.matrixAutoUpdate=St.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ja,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ai.setFromAxisAngle(e,t),this.quaternion.multiply(ai),this}rotateOnWorldAxis(e,t){return ai.setFromAxisAngle(e,t),this.quaternion.premultiply(ai),this}rotateX(e){return this.rotateOnAxis(Po,e)}rotateY(e){return this.rotateOnAxis(Do,e)}rotateZ(e){return this.rotateOnAxis(Io,e)}translateOnAxis(e,t){return Co.copy(e).applyQuaternion(this.quaternion),this.position.add(Co.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Po,e)}translateY(e){return this.translateOnAxis(Do,e)}translateZ(e){return this.translateOnAxis(Io,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(pn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?fs.copy(e):fs.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Oi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pn.lookAt(Oi,fs,this.up):pn.lookAt(fs,Oi,this.up),this.quaternion.setFromRotationMatrix(pn),s&&(pn.extractRotation(s.matrixWorld),ai.setFromRotationMatrix(pn),this.quaternion.premultiply(ai.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ze("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Lo),oi.child=e,this.dispatchEvent(oi),oi.child=null):Ze("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(su),mr.child=e,this.dispatchEvent(mr),mr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),pn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),pn.multiply(e.parent.matrixWorld)),e.applyMatrix4(pn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Lo),oi.child=e,this.dispatchEvent(oi),oi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Oi,e,nu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Oi,iu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const p=c[l];r(e.shapes,p)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),p=a(e.shapes),h=a(e.skeletons),m=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),p.length>0&&(i.shapes=p),h.length>0&&(i.skeletons=h),m.length>0&&(i.animations=m),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),e.pivot!==null&&(this.pivot=e.pivot.clone()),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}St.DEFAULT_UP=new O(0,1,0);St.DEFAULT_MATRIX_AUTO_UPDATE=!0;St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ei extends St{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ru={type:"move"};class gr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ei,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ei,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ei,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const v of e.hand.values()){const f=t.getJointPose(v,i),d=this._getHandJoint(l,v);f!==null&&(d.matrix.fromArray(f.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=f.radius),d.visible=f!==null}const u=l.joints["index-finger-tip"],p=l.joints["thumb-tip"],h=u.position.distanceTo(p.position),m=.02,g=.005;l.inputState.pinching&&h>m+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=m-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ru)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ei;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const $l={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Pn={h:0,s:0,l:0},ps={h:0,s:0,l:0};function _r(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class We{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=zt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=qe.workingColorSpace){return this.r=e,this.g=t,this.b=i,qe.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=qe.workingColorSpace){if(e=$a(e,1),t=ke(t,0,1),i=ke(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=_r(a,r,e+1/3),this.g=_r(a,r,e),this.b=_r(a,r,e-1/3)}return qe.colorSpaceToWorking(this,s),this}setStyle(e,t=zt){function i(r){r!==void 0&&parseFloat(r)<1&&Ce("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ce("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ce("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=zt){const i=$l[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ce("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=yn(e.r),this.g=yn(e.g),this.b=yn(e.b),this}copyLinearToSRGB(e){return this.r=Ai(e.r),this.g=Ai(e.g),this.b=Ai(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=zt){return qe.workingToColorSpace(Tt.copy(this),e),Math.round(ke(Tt.r*255,0,255))*65536+Math.round(ke(Tt.g*255,0,255))*256+Math.round(ke(Tt.b*255,0,255))}getHexString(e=zt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=qe.workingColorSpace){qe.workingToColorSpace(Tt.copy(this),t);const i=Tt.r,s=Tt.g,r=Tt.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const p=a-o;switch(l=u<=.5?p/(a+o):p/(2-a-o),a){case i:c=(s-r)/p+(s<r?6:0);break;case s:c=(r-i)/p+2;break;case r:c=(i-s)/p+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=qe.workingColorSpace){return qe.workingToColorSpace(Tt.copy(this),t),e.r=Tt.r,e.g=Tt.g,e.b=Tt.b,e}getStyle(e=zt){qe.workingToColorSpace(Tt.copy(this),e);const t=Tt.r,i=Tt.g,s=Tt.b;return e!==zt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Pn),this.setHSL(Pn.h+e,Pn.s+t,Pn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Pn),e.getHSL(ps);const i=Yi(Pn.h,ps.h,t),s=Yi(Pn.s,ps.s,t),r=Yi(Pn.l,ps.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Tt=new We;We.NAMES=$l;class au extends St{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ln,this.environmentIntensity=1,this.environmentRotation=new ln,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Xt=new O,mn=new O,xr=new O,gn=new O,li=new O,ci=new O,Uo=new O,vr=new O,Sr=new O,Mr=new O,Er=new ct,yr=new ct,br=new ct;class Zt{constructor(e=new O,t=new O,i=new O){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Xt.subVectors(e,t),s.cross(Xt);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Xt.subVectors(s,t),mn.subVectors(i,t),xr.subVectors(e,t);const a=Xt.dot(Xt),o=Xt.dot(mn),c=Xt.dot(xr),l=mn.dot(mn),u=mn.dot(xr),p=a*l-o*o;if(p===0)return r.set(0,0,0),null;const h=1/p,m=(l*c-o*u)*h,g=(a*u-o*c)*h;return r.set(1-m-g,g,m)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,gn)===null?!1:gn.x>=0&&gn.y>=0&&gn.x+gn.y<=1}static getInterpolation(e,t,i,s,r,a,o,c){return this.getBarycoord(e,t,i,s,gn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,gn.x),c.addScaledVector(a,gn.y),c.addScaledVector(o,gn.z),c)}static getInterpolatedAttribute(e,t,i,s,r,a){return Er.setScalar(0),yr.setScalar(0),br.setScalar(0),Er.fromBufferAttribute(e,t),yr.fromBufferAttribute(e,i),br.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Er,r.x),a.addScaledVector(yr,r.y),a.addScaledVector(br,r.z),a}static isFrontFacing(e,t,i,s){return Xt.subVectors(i,t),mn.subVectors(e,t),Xt.cross(mn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Xt.subVectors(this.c,this.b),mn.subVectors(this.a,this.b),Xt.cross(mn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Zt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Zt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return Zt.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return Zt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Zt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;li.subVectors(s,i),ci.subVectors(r,i),vr.subVectors(e,i);const c=li.dot(vr),l=ci.dot(vr);if(c<=0&&l<=0)return t.copy(i);Sr.subVectors(e,s);const u=li.dot(Sr),p=ci.dot(Sr);if(u>=0&&p<=u)return t.copy(s);const h=c*p-u*l;if(h<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(i).addScaledVector(li,a);Mr.subVectors(e,r);const m=li.dot(Mr),g=ci.dot(Mr);if(g>=0&&m<=g)return t.copy(r);const v=m*l-c*g;if(v<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(i).addScaledVector(ci,o);const f=u*g-m*p;if(f<=0&&p-u>=0&&m-g>=0)return Uo.subVectors(r,s),o=(p-u)/(p-u+(m-g)),t.copy(s).addScaledVector(Uo,o);const d=1/(f+v+h);return a=v*d,o=h*d,t.copy(i).addScaledVector(li,a).addScaledVector(ci,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class ns{constructor(e=new O(1/0,1/0,1/0),t=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(jt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(jt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=jt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,jt):jt.fromBufferAttribute(r,a),jt.applyMatrix4(e.matrixWorld),this.expandByPoint(jt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ms.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ms.copy(i.boundingBox)),ms.applyMatrix4(e.matrixWorld),this.union(ms)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,jt),jt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Bi),gs.subVectors(this.max,Bi),hi.subVectors(e.a,Bi),ui.subVectors(e.b,Bi),di.subVectors(e.c,Bi),Dn.subVectors(ui,hi),In.subVectors(di,ui),kn.subVectors(hi,di);let t=[0,-Dn.z,Dn.y,0,-In.z,In.y,0,-kn.z,kn.y,Dn.z,0,-Dn.x,In.z,0,-In.x,kn.z,0,-kn.x,-Dn.y,Dn.x,0,-In.y,In.x,0,-kn.y,kn.x,0];return!Tr(t,hi,ui,di,gs)||(t=[1,0,0,0,1,0,0,0,1],!Tr(t,hi,ui,di,gs))?!1:(_s.crossVectors(Dn,In),t=[_s.x,_s.y,_s.z],Tr(t,hi,ui,di,gs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,jt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(jt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(_n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),_n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),_n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),_n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),_n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),_n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),_n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),_n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(_n),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const _n=[new O,new O,new O,new O,new O,new O,new O,new O],jt=new O,ms=new ns,hi=new O,ui=new O,di=new O,Dn=new O,In=new O,kn=new O,Bi=new O,gs=new O,_s=new O,Vn=new O;function Tr(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Vn.fromArray(n,r);const o=s.x*Math.abs(Vn.x)+s.y*Math.abs(Vn.y)+s.z*Math.abs(Vn.z),c=e.dot(Vn),l=t.dot(Vn),u=i.dot(Vn);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const dt=new O,xs=new Ue;let ou=0;class $t{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ou++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=vo,this.updateRanges=[],this.gpuType=nn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)xs.fromBufferAttribute(this,t),xs.applyMatrix3(e),this.setXY(t,xs.x,xs.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)dt.fromBufferAttribute(this,t),dt.applyMatrix3(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)dt.fromBufferAttribute(this,t),dt.applyMatrix4(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)dt.fromBufferAttribute(this,t),dt.applyNormalMatrix(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)dt.fromBufferAttribute(this,t),dt.transformDirection(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=xi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Ct(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=xi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=xi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=xi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=xi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),i=Ct(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),i=Ct(i,this.array),s=Ct(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),i=Ct(i,this.array),s=Ct(s,this.array),r=Ct(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==vo&&(e.usage=this.usage),e}}class Kl extends $t{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Jl extends $t{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Nt extends $t{constructor(e,t,i){super(new Float32Array(e),t,i)}}const lu=new ns,zi=new O,Ar=new O;class $s{constructor(e=new O,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):lu.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;zi.subVectors(e,this.center);const t=zi.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(zi,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ar.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(zi.copy(e.center).add(Ar)),this.expandByPoint(zi.copy(e.center).sub(Ar))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let cu=0;const kt=new at,wr=new St,fi=new O,Bt=new ns,Gi=new ns,vt=new O;class Dt extends ei{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:cu++}),this.uuid=Li(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(wh(e)?Jl:Kl)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Oe().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return kt.makeRotationFromQuaternion(e),this.applyMatrix4(kt),this}rotateX(e){return kt.makeRotationX(e),this.applyMatrix4(kt),this}rotateY(e){return kt.makeRotationY(e),this.applyMatrix4(kt),this}rotateZ(e){return kt.makeRotationZ(e),this.applyMatrix4(kt),this}translate(e,t,i){return kt.makeTranslation(e,t,i),this.applyMatrix4(kt),this}scale(e,t,i){return kt.makeScale(e,t,i),this.applyMatrix4(kt),this}lookAt(e){return wr.lookAt(e),wr.updateMatrix(),this.applyMatrix4(wr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fi).negate(),this.translate(fi.x,fi.y,fi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Nt(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ce("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ns);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ze("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];Bt.setFromBufferAttribute(r),this.morphTargetsRelative?(vt.addVectors(this.boundingBox.min,Bt.min),this.boundingBox.expandByPoint(vt),vt.addVectors(this.boundingBox.max,Bt.max),this.boundingBox.expandByPoint(vt)):(this.boundingBox.expandByPoint(Bt.min),this.boundingBox.expandByPoint(Bt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ze('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new $s);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ze("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(e){const i=this.boundingSphere.center;if(Bt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Gi.setFromBufferAttribute(o),this.morphTargetsRelative?(vt.addVectors(Bt.min,Gi.min),Bt.expandByPoint(vt),vt.addVectors(Bt.max,Gi.max),Bt.expandByPoint(vt)):(Bt.expandByPoint(Gi.min),Bt.expandByPoint(Gi.max))}Bt.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)vt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(vt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)vt.fromBufferAttribute(o,l),c&&(fi.fromBufferAttribute(e,l),vt.add(fi)),s=Math.max(s,i.distanceToSquared(vt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ze('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ze("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new $t(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let x=0;x<i.count;x++)o[x]=new O,c[x]=new O;const l=new O,u=new O,p=new O,h=new Ue,m=new Ue,g=new Ue,v=new O,f=new O;function d(x,M,Y){l.fromBufferAttribute(i,x),u.fromBufferAttribute(i,M),p.fromBufferAttribute(i,Y),h.fromBufferAttribute(r,x),m.fromBufferAttribute(r,M),g.fromBufferAttribute(r,Y),u.sub(l),p.sub(l),m.sub(h),g.sub(h);const R=1/(m.x*g.y-g.x*m.y);isFinite(R)&&(v.copy(u).multiplyScalar(g.y).addScaledVector(p,-m.y).multiplyScalar(R),f.copy(p).multiplyScalar(m.x).addScaledVector(u,-g.x).multiplyScalar(R),o[x].add(v),o[M].add(v),o[Y].add(v),c[x].add(f),c[M].add(f),c[Y].add(f))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let x=0,M=E.length;x<M;++x){const Y=E[x],R=Y.start,B=Y.count;for(let G=R,X=R+B;G<X;G+=3)d(e.getX(G+0),e.getX(G+1),e.getX(G+2))}const T=new O,y=new O,P=new O,A=new O;function D(x){P.fromBufferAttribute(s,x),A.copy(P);const M=o[x];T.copy(M),T.sub(P.multiplyScalar(P.dot(M))).normalize(),y.crossVectors(A,M);const R=y.dot(c[x])<0?-1:1;a.setXYZW(x,T.x,T.y,T.z,R)}for(let x=0,M=E.length;x<M;++x){const Y=E[x],R=Y.start,B=Y.count;for(let G=R,X=R+B;G<X;G+=3)D(e.getX(G+0)),D(e.getX(G+1)),D(e.getX(G+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new $t(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,m=i.count;h<m;h++)i.setXYZ(h,0,0,0);const s=new O,r=new O,a=new O,o=new O,c=new O,l=new O,u=new O,p=new O;if(e)for(let h=0,m=e.count;h<m;h+=3){const g=e.getX(h+0),v=e.getX(h+1),f=e.getX(h+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,f),u.subVectors(a,r),p.subVectors(s,r),u.cross(p),o.fromBufferAttribute(i,g),c.fromBufferAttribute(i,v),l.fromBufferAttribute(i,f),o.add(u),c.add(u),l.add(u),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(v,c.x,c.y,c.z),i.setXYZ(f,l.x,l.y,l.z)}else for(let h=0,m=t.count;h<m;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,r),p.subVectors(s,r),u.cross(p),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)vt.fromBufferAttribute(e,t),vt.normalize(),e.setXYZ(t,vt.x,vt.y,vt.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,p=o.normalized,h=new l.constructor(c.length*u);let m=0,g=0;for(let v=0,f=c.length;v<f;v++){o.isInterleavedBufferAttribute?m=c[v]*o.data.stride+o.offset:m=c[v]*u;for(let d=0;d<u;d++)h[g++]=l[m++]}return new $t(h,u,p)}if(this.index===null)return Ce("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Dt,i=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,i);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let u=0,p=l.length;u<p;u++){const h=l[u],m=e(h,i);c.push(m)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let p=0,h=l.length;p<h;p++){const m=l[p];u.push(m.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],p=r[l];for(let h=0,m=p.length;h<m;h++)u.push(p[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const p=a[l];this.addGroup(p.start,p.count,p.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let hu=0;class Ui extends ei{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:hu++}),this.uuid=Li(),this.name="",this.type="Material",this.blending=Ti,this.side=bn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Zr,this.blendDst=qr,this.blendEquation=qn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new We(0,0,0),this.blendAlpha=0,this.depthFunc=wi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=xo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ii,this.stencilZFail=ii,this.stencilZPass=ii,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ce(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ce(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ti&&(i.blending=this.blending),this.side!==bn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Zr&&(i.blendSrc=this.blendSrc),this.blendDst!==qr&&(i.blendDst=this.blendDst),this.blendEquation!==qn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==wi&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==xo&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ii&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ii&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ii&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const xn=new O,Rr=new O,vs=new O,Ln=new O,Cr=new O,Ss=new O,Pr=new O;class Ks{constructor(e=new O,t=new O(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,xn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=xn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(xn.copy(this.origin).addScaledVector(this.direction,t),xn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Rr.copy(e).add(t).multiplyScalar(.5),vs.copy(t).sub(e).normalize(),Ln.copy(this.origin).sub(Rr);const r=e.distanceTo(t)*.5,a=-this.direction.dot(vs),o=Ln.dot(this.direction),c=-Ln.dot(vs),l=Ln.lengthSq(),u=Math.abs(1-a*a);let p,h,m,g;if(u>0)if(p=a*c-o,h=a*o-c,g=r*u,p>=0)if(h>=-g)if(h<=g){const v=1/u;p*=v,h*=v,m=p*(p+a*h+2*o)+h*(a*p+h+2*c)+l}else h=r,p=Math.max(0,-(a*h+o)),m=-p*p+h*(h+2*c)+l;else h=-r,p=Math.max(0,-(a*h+o)),m=-p*p+h*(h+2*c)+l;else h<=-g?(p=Math.max(0,-(-a*r+o)),h=p>0?-r:Math.min(Math.max(-r,-c),r),m=-p*p+h*(h+2*c)+l):h<=g?(p=0,h=Math.min(Math.max(-r,-c),r),m=h*(h+2*c)+l):(p=Math.max(0,-(a*r+o)),h=p>0?r:Math.min(Math.max(-r,-c),r),m=-p*p+h*(h+2*c)+l);else h=a>0?-r:r,p=Math.max(0,-(a*h+o)),m=-p*p+h*(h+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(Rr).addScaledVector(vs,h),m}intersectSphere(e,t){xn.subVectors(e.center,this.origin);const i=xn.dot(this.direction),s=xn.dot(xn)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,p=1/this.direction.z,h=this.origin;return l>=0?(i=(e.min.x-h.x)*l,s=(e.max.x-h.x)*l):(i=(e.max.x-h.x)*l,s=(e.min.x-h.x)*l),u>=0?(r=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),p>=0?(o=(e.min.z-h.z)*p,c=(e.max.z-h.z)*p):(o=(e.max.z-h.z)*p,c=(e.min.z-h.z)*p),i>c||o>s)||((o>i||i!==i)&&(i=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,xn)!==null}intersectTriangle(e,t,i,s,r){Cr.subVectors(t,e),Ss.subVectors(i,e),Pr.crossVectors(Cr,Ss);let a=this.direction.dot(Pr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ln.subVectors(this.origin,e);const c=o*this.direction.dot(Ss.crossVectors(Ln,Ss));if(c<0)return null;const l=o*this.direction.dot(Cr.cross(Ln));if(l<0||c+l>a)return null;const u=-o*Ln.dot(Pr);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ql extends Ui{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new We(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ln,this.combine=Dl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const No=new at,Hn=new Ks,Ms=new $s,Fo=new O,Es=new O,ys=new O,bs=new O,Dr=new O,Ts=new O,Oo=new O,As=new O;class cn extends St{constructor(e=new Dt,t=new Ql){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Ts.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=o[c],p=r[c];u!==0&&(Dr.fromBufferAttribute(p,e),a?Ts.addScaledVector(Dr,u):Ts.addScaledVector(Dr.sub(t),u))}t.add(Ts)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ms.copy(i.boundingSphere),Ms.applyMatrix4(r),Hn.copy(e.ray).recast(e.near),!(Ms.containsPoint(Hn.origin)===!1&&(Hn.intersectSphere(Ms,Fo)===null||Hn.origin.distanceToSquared(Fo)>(e.far-e.near)**2))&&(No.copy(r).invert(),Hn.copy(e.ray).applyMatrix4(No),!(i.boundingBox!==null&&Hn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Hn)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,p=r.attributes.normal,h=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=h.length;g<v;g++){const f=h[g],d=a[f.materialIndex],E=Math.max(f.start,m.start),T=Math.min(o.count,Math.min(f.start+f.count,m.start+m.count));for(let y=E,P=T;y<P;y+=3){const A=o.getX(y),D=o.getX(y+1),x=o.getX(y+2);s=ws(this,d,e,i,l,u,p,A,D,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const g=Math.max(0,m.start),v=Math.min(o.count,m.start+m.count);for(let f=g,d=v;f<d;f+=3){const E=o.getX(f),T=o.getX(f+1),y=o.getX(f+2);s=ws(this,a,e,i,l,u,p,E,T,y),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,v=h.length;g<v;g++){const f=h[g],d=a[f.materialIndex],E=Math.max(f.start,m.start),T=Math.min(c.count,Math.min(f.start+f.count,m.start+m.count));for(let y=E,P=T;y<P;y+=3){const A=y,D=y+1,x=y+2;s=ws(this,d,e,i,l,u,p,A,D,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const g=Math.max(0,m.start),v=Math.min(c.count,m.start+m.count);for(let f=g,d=v;f<d;f+=3){const E=f,T=f+1,y=f+2;s=ws(this,a,e,i,l,u,p,E,T,y),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}}}function uu(n,e,t,i,s,r,a,o){let c;if(e.side===Ut?c=i.intersectTriangle(a,r,s,!0,o):c=i.intersectTriangle(s,r,a,e.side===bn,o),c===null)return null;As.copy(o),As.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(As);return l<t.near||l>t.far?null:{distance:l,point:As.clone(),object:n}}function ws(n,e,t,i,s,r,a,o,c,l){n.getVertexPosition(o,Es),n.getVertexPosition(c,ys),n.getVertexPosition(l,bs);const u=uu(n,e,t,i,Es,ys,bs,Oo);if(u){const p=new O;Zt.getBarycoord(Oo,Es,ys,bs,p),s&&(u.uv=Zt.getInterpolatedAttribute(s,o,c,l,p,new Ue)),r&&(u.uv1=Zt.getInterpolatedAttribute(r,o,c,l,p,new Ue)),a&&(u.normal=Zt.getInterpolatedAttribute(a,o,c,l,p,new O),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new O,materialIndex:0};Zt.getNormal(Es,ys,bs,h.normal),u.face=h,u.barycoord=p}return u}class du extends wt{constructor(e=null,t=1,i=1,s,r,a,o,c,l=Et,u=Et,p,h){super(null,a,o,c,l,u,s,r,p,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ir=new O,fu=new O,pu=new Oe;class Nn{constructor(e=new O(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Ir.subVectors(i,t).cross(fu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Ir),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||pu.getNormalMatrix(e),s=this.coplanarPoint(Ir).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Wn=new $s,mu=new Ue(.5,.5),Rs=new O;class Qa{constructor(e=new Nn,t=new Nn,i=new Nn,s=new Nn,r=new Nn,a=new Nn){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=sn,i=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],u=r[4],p=r[5],h=r[6],m=r[7],g=r[8],v=r[9],f=r[10],d=r[11],E=r[12],T=r[13],y=r[14],P=r[15];if(s[0].setComponents(l-a,m-u,d-g,P-E).normalize(),s[1].setComponents(l+a,m+u,d+g,P+E).normalize(),s[2].setComponents(l+o,m+p,d+v,P+T).normalize(),s[3].setComponents(l-o,m-p,d-v,P-T).normalize(),i)s[4].setComponents(c,h,f,y).normalize(),s[5].setComponents(l-c,m-h,d-f,P-y).normalize();else if(s[4].setComponents(l-c,m-h,d-f,P-y).normalize(),t===sn)s[5].setComponents(l+c,m+h,d+f,P+y).normalize();else if(t===Ji)s[5].setComponents(c,h,f,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Wn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Wn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Wn)}intersectsSprite(e){Wn.center.set(0,0,0);const t=mu.distanceTo(e.center);return Wn.radius=.7071067811865476+t,Wn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Wn)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Rs.x=s.normal.x>0?e.max.x:e.min.x,Rs.y=s.normal.y>0?e.max.y:e.min.y,Rs.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Rs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Fn extends Ui{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new We(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ys=new O,Zs=new O,Bo=new at,ki=new Ks,Cs=new $s,Lr=new O,zo=new O;class yi extends St{constructor(e=new Dt,t=new Fn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)Ys.fromBufferAttribute(t,s-1),Zs.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=Ys.distanceTo(Zs);e.setAttribute("lineDistance",new Nt(i,1))}else Ce("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Cs.copy(i.boundingSphere),Cs.applyMatrix4(s),Cs.radius+=r,e.ray.intersectsSphere(Cs)===!1)return;Bo.copy(s).invert(),ki.copy(e.ray).applyMatrix4(Bo);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const m=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let v=m,f=g-1;v<f;v+=l){const d=u.getX(v),E=u.getX(v+1),T=Ps(this,e,ki,c,d,E,v);T&&t.push(T)}if(this.isLineLoop){const v=u.getX(g-1),f=u.getX(m),d=Ps(this,e,ki,c,v,f,g-1);d&&t.push(d)}}else{const m=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let v=m,f=g-1;v<f;v+=l){const d=Ps(this,e,ki,c,v,v+1,v);d&&t.push(d)}if(this.isLineLoop){const v=Ps(this,e,ki,c,g-1,m,g-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Ps(n,e,t,i,s,r,a){const o=n.geometry.attributes.position;if(Ys.fromBufferAttribute(o,s),Zs.fromBufferAttribute(o,r),t.distanceSqToSegment(Ys,Zs,Lr,zo)>i)return;Lr.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(Lr);if(!(l<e.near||l>e.far))return{distance:l,point:zo.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const Go=new O,ko=new O;class gu extends yi{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)Go.fromBufferAttribute(t,s),ko.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Go.distanceTo(ko);e.setAttribute("lineDistance",new Nt(i,1))}else Ce("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class ec extends wt{constructor(e=[],t=Qn,i,s,r,a,o,c,l,u){super(e,t,i,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ts extends wt{constructor(e,t,i=on,s,r,a,o=Et,c=Et,l,u=An,p=1){if(u!==An&&u!==Jn)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:p};super(h,s,r,a,o,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ka(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class _u extends ts{constructor(e,t=on,i=Qn,s,r,a=Et,o=Et,c,l=An){const u={width:e,height:e,depth:1},p=[u,u,u,u,u,u];super(e,e,t,i,s,r,a,o,c,l),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class tc extends wt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class is extends Dt{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],u=[],p=[];let h=0,m=0;g("z","y","x",-1,-1,i,t,e,a,r,0),g("z","y","x",1,-1,i,t,-e,a,r,1),g("x","z","y",1,1,e,i,t,s,a,2),g("x","z","y",1,-1,e,i,-t,s,a,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new Nt(l,3)),this.setAttribute("normal",new Nt(u,3)),this.setAttribute("uv",new Nt(p,2));function g(v,f,d,E,T,y,P,A,D,x,M){const Y=y/D,R=P/x,B=y/2,G=P/2,X=A/2,k=D+1,z=x+1;let V=0,ee=0;const Q=new O;for(let ue=0;ue<z;ue++){const pe=ue*R-G;for(let K=0;K<k;K++){const xe=K*Y-B;Q[v]=xe*E,Q[f]=pe*T,Q[d]=X,l.push(Q.x,Q.y,Q.z),Q[v]=0,Q[f]=0,Q[d]=A>0?1:-1,u.push(Q.x,Q.y,Q.z),p.push(K/D),p.push(1-ue/x),V+=1}}for(let ue=0;ue<x;ue++)for(let pe=0;pe<D;pe++){const K=h+pe+k*ue,xe=h+pe+k*(ue+1),Pe=h+(pe+1)+k*(ue+1),Ve=h+(pe+1)+k*ue;c.push(K,xe,Ve),c.push(xe,Pe,Ve),ee+=6}o.addGroup(m,ee,M),m+=ee,h+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new is(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class ss extends Dt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),c=Math.floor(s),l=o+1,u=c+1,p=e/o,h=t/c,m=[],g=[],v=[],f=[];for(let d=0;d<u;d++){const E=d*h-a;for(let T=0;T<l;T++){const y=T*p-r;g.push(y,-E,0),v.push(0,0,1),f.push(T/o),f.push(1-d/c)}}for(let d=0;d<c;d++)for(let E=0;E<o;E++){const T=E+l*d,y=E+l*(d+1),P=E+1+l*(d+1),A=E+1+l*d;m.push(T,y,A),m.push(y,P,A)}this.setIndex(m),this.setAttribute("position",new Nt(g,3)),this.setAttribute("normal",new Nt(v,3)),this.setAttribute("uv",new Nt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ss(e.width,e.height,e.widthSegments,e.heightSegments)}}function Di(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(Ce("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function Pt(n){const e={};for(let t=0;t<n.length;t++){const i=Di(n[t]);for(const s in i)e[s]=i[s]}return e}function xu(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function nc(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:qe.workingColorSpace}const vu={clone:Di,merge:Pt};var Su=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Mu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class hn extends Ui{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Su,this.fragmentShader=Mu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Di(e.uniforms),this.uniformsGroups=xu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Eu extends hn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class yu extends Ui{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new We(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new We(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=jl,this.normalScale=new Ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ln,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class bu extends Ui{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=vh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Tu extends Ui{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Au extends Fn{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}const Ur={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(Vo(n)||(this.files[n]=e))},get:function(n){if(this.enabled!==!1&&!Vo(n))return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};function Vo(n){try{const e=n.slice(n.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class wu{constructor(e,t,i){const s=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,p){return l.push(u,p),this},this.removeHandler=function(u){const p=l.indexOf(u);return p!==-1&&l.splice(p,2),this},this.getHandler=function(u){for(let p=0,h=l.length;p<h;p+=2){const m=l[p],g=l[p+1];if(m.global&&(m.lastIndex=0),m.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Ru=new wu;class eo{constructor(e){this.manager=e!==void 0?e:Ru,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}eo.DEFAULT_MATERIAL_NAME="__DEFAULT";const pi=new WeakMap;class Cu extends eo{constructor(e){super(e)}load(e,t,i,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Ur.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let p=pi.get(a);p===void 0&&(p=[],pi.set(a,p)),p.push({onLoad:t,onError:s})}return a}const o=Qi("img");function c(){u(),t&&t(this);const p=pi.get(this)||[];for(let h=0;h<p.length;h++){const m=p[h];m.onLoad&&m.onLoad(this)}pi.delete(this),r.manager.itemEnd(e)}function l(p){u(),s&&s(p),Ur.remove(`image:${e}`);const h=pi.get(this)||[];for(let m=0;m<h.length;m++){const g=h[m];g.onError&&g.onError(p)}pi.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Ur.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}}class Pu extends eo{constructor(e){super(e)}load(e,t,i,s){const r=new wt,a=new Cu(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},i,s),r}}class ic extends St{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new We(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Du extends ic{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.groundColor=new We(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Nr=new at,Ho=new O,Wo=new O;class Iu{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ue(512,512),this.mapType=Gt,this.map=null,this.mapPass=null,this.matrix=new at,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Qa,this._frameExtents=new Ue(1,1),this._viewportCount=1,this._viewports=[new ct(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Ho.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ho),Wo.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Wo),t.updateMatrixWorld(),Nr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Nr,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Ji||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Nr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Ds=new O,Is=new Bn,Jt=new O;class sc extends St{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new at,this.projectionMatrix=new at,this.projectionMatrixInverse=new at,this.coordinateSystem=sn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ds,Is,Jt),Jt.x===1&&Jt.y===1&&Jt.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ds,Is,Jt.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(Ds,Is,Jt),Jt.x===1&&Jt.y===1&&Jt.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ds,Is,Jt.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Un=new O,Xo=new Ue,jo=new Ue;class Vt extends sc{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=es*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ji*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return es*2*Math.atan(Math.tan(ji*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Un.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Un.x,Un.y).multiplyScalar(-e/Un.z),Un.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Un.x,Un.y).multiplyScalar(-e/Un.z)}getViewSize(e,t){return this.getViewBounds(e,Xo,jo),t.subVectors(jo,Xo)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ji*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*i/l,s*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Js extends sc{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Lu extends Iu{constructor(){super(new Js(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Uu extends ic{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.shadow=new Lu}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const mi=-90,gi=1;class Nu extends St{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Vt(mi,gi,e,t);s.layers=this.layers,this.add(s);const r=new Vt(mi,gi,e,t);r.layers=this.layers,this.add(r);const a=new Vt(mi,gi,e,t);a.layers=this.layers,this.add(a);const o=new Vt(mi,gi,e,t);o.layers=this.layers,this.add(o);const c=new Vt(mi,gi,e,t);c.layers=this.layers,this.add(c);const l=new Vt(mi,gi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===sn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ji)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,u]=this.children,p=e.getRenderTarget(),h=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let f=!1;e.isWebGLRenderer===!0?f=e.state.buffers.depth.getReversed():f=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(p,h,m),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Fu extends Vt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Yo=new at;class Ou{constructor(e,t,i=0,s=1/0){this.ray=new Ks(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new Ja,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ze("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Yo.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Yo),this}intersectObject(e,t=!0,i=[]){return Fa(e,this,i,t),i.sort(Zo),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)Fa(e[s],this,i,t);return i.sort(Zo),i}}function Zo(n,e){return n.distance-e.distance}function Fa(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let a=0,o=r.length;a<o;a++)Fa(r[a],e,t,!0)}}class qo{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ke(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(ke(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Bu extends ei{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Ce("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function $o(n,e,t,i){const s=zu(i);switch(t){case Hl:return n*e;case Xl:return n*e/s.components*s.byteLength;case Xa:return n*e/s.components*s.byteLength;case Ci:return n*e*2/s.components*s.byteLength;case ja:return n*e*2/s.components*s.byteLength;case Wl:return n*e*3/s.components*s.byteLength;case qt:return n*e*4/s.components*s.byteLength;case Ya:return n*e*4/s.components*s.byteLength;case zs:case Gs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ks:case Vs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ra:case oa:return Math.max(n,16)*Math.max(e,8)/4;case sa:case aa:return Math.max(n,8)*Math.max(e,8)/2;case la:case ca:case ua:case da:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ha:case fa:case pa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ma:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ga:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case _a:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case xa:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case va:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Sa:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Ma:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Ea:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case ya:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case ba:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Ta:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Aa:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case wa:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Ra:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Ca:case Pa:case Da:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Ia:case La:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Ua:case Na:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function zu(n){switch(n){case Gt:case zl:return{byteLength:1,components:1};case $i:case Gl:case Tn:return{byteLength:2,components:1};case Ha:case Wa:return{byteLength:2,components:4};case on:case Va:case nn:return{byteLength:4,components:1};case kl:case Vl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ga}}));typeof window<"u"&&(window.__THREE__?Ce("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ga);function rc(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Gu(n){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,p=l.byteLength,h=n.createBuffer();n.bindBuffer(c,h),n.bufferData(c,l,u),o.onUploadCallback();let m;if(l instanceof Float32Array)m=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=n.SHORT;else if(l instanceof Uint32Array)m=n.UNSIGNED_INT;else if(l instanceof Int32Array)m=n.INT;else if(l instanceof Int8Array)m=n.BYTE;else if(l instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:p}}function i(o,c,l){const u=c.array,p=c.updateRanges;if(n.bindBuffer(l,o),p.length===0)n.bufferSubData(l,0,u);else{p.sort((m,g)=>m.start-g.start);let h=0;for(let m=1;m<p.length;m++){const g=p[h],v=p[m];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++h,p[h]=v)}p.length=h+1;for(let m=0,g=p.length;m<g;m++){const v=p[m];n.bufferSubData(l,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var ku=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Vu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Hu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Wu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Xu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ju=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Yu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Zu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,qu=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,$u=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ku=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ju=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Qu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,ed=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,td=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,nd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,id=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,sd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,rd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ad=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,od=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,ld=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,cd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,hd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ud=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,dd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,fd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,pd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,md=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,gd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_d="gl_FragColor = linearToOutputTexel( gl_FragColor );",xd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,vd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Sd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Md=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Ed=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,yd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,bd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Td=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ad=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,wd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Rd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Cd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Pd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Dd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Id=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Ld=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Ud=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Nd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Fd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Od=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Bd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,zd=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Gd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,kd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Vd=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Hd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Wd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Xd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Yd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Zd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,qd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,$d=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Kd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Jd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Qd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ef=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,tf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,nf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,sf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,af=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,of=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,hf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,uf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,df=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ff=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,pf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,mf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,gf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,_f=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,xf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,vf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Sf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Mf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ef=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,yf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,bf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Tf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Af=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,wf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Rf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Cf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Pf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Df=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,If=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Lf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Uf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Nf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ff=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Of=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Bf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,zf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Gf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const kf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Vf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Zf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,qf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,$f=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Kf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Jf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ep=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,np=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ip=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,ap=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,op=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,lp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,cp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,up=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,dp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,gp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_p=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Sp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Be={alphahash_fragment:ku,alphahash_pars_fragment:Vu,alphamap_fragment:Hu,alphamap_pars_fragment:Wu,alphatest_fragment:Xu,alphatest_pars_fragment:ju,aomap_fragment:Yu,aomap_pars_fragment:Zu,batching_pars_vertex:qu,batching_vertex:$u,begin_vertex:Ku,beginnormal_vertex:Ju,bsdfs:Qu,iridescence_fragment:ed,bumpmap_pars_fragment:td,clipping_planes_fragment:nd,clipping_planes_pars_fragment:id,clipping_planes_pars_vertex:sd,clipping_planes_vertex:rd,color_fragment:ad,color_pars_fragment:od,color_pars_vertex:ld,color_vertex:cd,common:hd,cube_uv_reflection_fragment:ud,defaultnormal_vertex:dd,displacementmap_pars_vertex:fd,displacementmap_vertex:pd,emissivemap_fragment:md,emissivemap_pars_fragment:gd,colorspace_fragment:_d,colorspace_pars_fragment:xd,envmap_fragment:vd,envmap_common_pars_fragment:Sd,envmap_pars_fragment:Md,envmap_pars_vertex:Ed,envmap_physical_pars_fragment:Ld,envmap_vertex:yd,fog_vertex:bd,fog_pars_vertex:Td,fog_fragment:Ad,fog_pars_fragment:wd,gradientmap_pars_fragment:Rd,lightmap_pars_fragment:Cd,lights_lambert_fragment:Pd,lights_lambert_pars_fragment:Dd,lights_pars_begin:Id,lights_toon_fragment:Ud,lights_toon_pars_fragment:Nd,lights_phong_fragment:Fd,lights_phong_pars_fragment:Od,lights_physical_fragment:Bd,lights_physical_pars_fragment:zd,lights_fragment_begin:Gd,lights_fragment_maps:kd,lights_fragment_end:Vd,logdepthbuf_fragment:Hd,logdepthbuf_pars_fragment:Wd,logdepthbuf_pars_vertex:Xd,logdepthbuf_vertex:jd,map_fragment:Yd,map_pars_fragment:Zd,map_particle_fragment:qd,map_particle_pars_fragment:$d,metalnessmap_fragment:Kd,metalnessmap_pars_fragment:Jd,morphinstance_vertex:Qd,morphcolor_vertex:ef,morphnormal_vertex:tf,morphtarget_pars_vertex:nf,morphtarget_vertex:sf,normal_fragment_begin:rf,normal_fragment_maps:af,normal_pars_fragment:of,normal_pars_vertex:lf,normal_vertex:cf,normalmap_pars_fragment:hf,clearcoat_normal_fragment_begin:uf,clearcoat_normal_fragment_maps:df,clearcoat_pars_fragment:ff,iridescence_pars_fragment:pf,opaque_fragment:mf,packing:gf,premultiplied_alpha_fragment:_f,project_vertex:xf,dithering_fragment:vf,dithering_pars_fragment:Sf,roughnessmap_fragment:Mf,roughnessmap_pars_fragment:Ef,shadowmap_pars_fragment:yf,shadowmap_pars_vertex:bf,shadowmap_vertex:Tf,shadowmask_pars_fragment:Af,skinbase_vertex:wf,skinning_pars_vertex:Rf,skinning_vertex:Cf,skinnormal_vertex:Pf,specularmap_fragment:Df,specularmap_pars_fragment:If,tonemapping_fragment:Lf,tonemapping_pars_fragment:Uf,transmission_fragment:Nf,transmission_pars_fragment:Ff,uv_pars_fragment:Of,uv_pars_vertex:Bf,uv_vertex:zf,worldpos_vertex:Gf,background_vert:kf,background_frag:Vf,backgroundCube_vert:Hf,backgroundCube_frag:Wf,cube_vert:Xf,cube_frag:jf,depth_vert:Yf,depth_frag:Zf,distance_vert:qf,distance_frag:$f,equirect_vert:Kf,equirect_frag:Jf,linedashed_vert:Qf,linedashed_frag:ep,meshbasic_vert:tp,meshbasic_frag:np,meshlambert_vert:ip,meshlambert_frag:sp,meshmatcap_vert:rp,meshmatcap_frag:ap,meshnormal_vert:op,meshnormal_frag:lp,meshphong_vert:cp,meshphong_frag:hp,meshphysical_vert:up,meshphysical_frag:dp,meshtoon_vert:fp,meshtoon_frag:pp,points_vert:mp,points_frag:gp,shadow_vert:_p,shadow_frag:xp,sprite_vert:vp,sprite_frag:Sp},he={common:{diffuse:{value:new We(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Oe}},envmap:{envMap:{value:null},envMapRotation:{value:new Oe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Oe},normalScale:{value:new Ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new We(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new We(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0},uvTransform:{value:new Oe}},sprite:{diffuse:{value:new We(16777215)},opacity:{value:1},center:{value:new Ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}}},tn={basic:{uniforms:Pt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.fog]),vertexShader:Be.meshbasic_vert,fragmentShader:Be.meshbasic_frag},lambert:{uniforms:Pt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new We(0)},envMapIntensity:{value:1}}]),vertexShader:Be.meshlambert_vert,fragmentShader:Be.meshlambert_frag},phong:{uniforms:Pt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new We(0)},specular:{value:new We(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Be.meshphong_vert,fragmentShader:Be.meshphong_frag},standard:{uniforms:Pt([he.common,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.roughnessmap,he.metalnessmap,he.fog,he.lights,{emissive:{value:new We(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag},toon:{uniforms:Pt([he.common,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.gradientmap,he.fog,he.lights,{emissive:{value:new We(0)}}]),vertexShader:Be.meshtoon_vert,fragmentShader:Be.meshtoon_frag},matcap:{uniforms:Pt([he.common,he.bumpmap,he.normalmap,he.displacementmap,he.fog,{matcap:{value:null}}]),vertexShader:Be.meshmatcap_vert,fragmentShader:Be.meshmatcap_frag},points:{uniforms:Pt([he.points,he.fog]),vertexShader:Be.points_vert,fragmentShader:Be.points_frag},dashed:{uniforms:Pt([he.common,he.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Be.linedashed_vert,fragmentShader:Be.linedashed_frag},depth:{uniforms:Pt([he.common,he.displacementmap]),vertexShader:Be.depth_vert,fragmentShader:Be.depth_frag},normal:{uniforms:Pt([he.common,he.bumpmap,he.normalmap,he.displacementmap,{opacity:{value:1}}]),vertexShader:Be.meshnormal_vert,fragmentShader:Be.meshnormal_frag},sprite:{uniforms:Pt([he.sprite,he.fog]),vertexShader:Be.sprite_vert,fragmentShader:Be.sprite_frag},background:{uniforms:{uvTransform:{value:new Oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Be.background_vert,fragmentShader:Be.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Oe}},vertexShader:Be.backgroundCube_vert,fragmentShader:Be.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Be.cube_vert,fragmentShader:Be.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Be.equirect_vert,fragmentShader:Be.equirect_frag},distance:{uniforms:Pt([he.common,he.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Be.distance_vert,fragmentShader:Be.distance_frag},shadow:{uniforms:Pt([he.lights,he.fog,{color:{value:new We(0)},opacity:{value:1}}]),vertexShader:Be.shadow_vert,fragmentShader:Be.shadow_frag}};tn.physical={uniforms:Pt([tn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Oe},clearcoatNormalScale:{value:new Ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Oe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Oe},sheen:{value:0},sheenColor:{value:new We(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Oe},transmissionSamplerSize:{value:new Ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Oe},attenuationDistance:{value:0},attenuationColor:{value:new We(0)},specularColor:{value:new We(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Oe},anisotropyVector:{value:new Ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Oe}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag};const Ls={r:0,b:0,g:0},Xn=new ln,Mp=new at;function Ep(n,e,t,i,s,r){const a=new We(0);let o=s===!0?0:1,c,l,u=null,p=0,h=null;function m(E){let T=E.isScene===!0?E.background:null;if(T&&T.isTexture){const y=E.backgroundBlurriness>0;T=e.get(T,y)}return T}function g(E){let T=!1;const y=m(E);y===null?f(a,o):y&&y.isColor&&(f(y,1),T=!0);const P=n.xr.getEnvironmentBlendMode();P==="additive"?t.buffers.color.setClear(0,0,0,1,r):P==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||T)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(E,T){const y=m(T);y&&(y.isCubeTexture||y.mapping===qs)?(l===void 0&&(l=new cn(new is(1,1,1),new hn({name:"BackgroundCubeMaterial",uniforms:Di(tn.backgroundCube.uniforms),vertexShader:tn.backgroundCube.vertexShader,fragmentShader:tn.backgroundCube.fragmentShader,side:Ut,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(P,A,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),Xn.copy(T.backgroundRotation),Xn.x*=-1,Xn.y*=-1,Xn.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Xn.y*=-1,Xn.z*=-1),l.material.uniforms.envMap.value=y,l.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Mp.makeRotationFromEuler(Xn)),l.material.toneMapped=qe.getTransfer(y.colorSpace)!==Qe,(u!==y||p!==y.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=y,p=y.version,h=n.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new cn(new ss(2,2),new hn({name:"BackgroundMaterial",uniforms:Di(tn.background.uniforms),vertexShader:tn.background.vertexShader,fragmentShader:tn.background.fragmentShader,side:bn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.toneMapped=qe.getTransfer(y.colorSpace)!==Qe,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||p!==y.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=y,p=y.version,h=n.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function f(E,T){E.getRGB(Ls,nc(n)),t.buffers.color.setClear(Ls.r,Ls.g,Ls.b,T,r)}function d(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(E,T=1){a.set(E),o=T,f(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(E){o=E,f(a,o)},render:g,addToRenderList:v,dispose:d}}function yp(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let r=s,a=!1;function o(R,B,G,X,k){let z=!1;const V=p(R,X,G,B);r!==V&&(r=V,l(r.object)),z=m(R,X,G,k),z&&g(R,X,G,k),k!==null&&e.update(k,n.ELEMENT_ARRAY_BUFFER),(z||a)&&(a=!1,y(R,B,G,X),k!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function c(){return n.createVertexArray()}function l(R){return n.bindVertexArray(R)}function u(R){return n.deleteVertexArray(R)}function p(R,B,G,X){const k=X.wireframe===!0;let z=i[B.id];z===void 0&&(z={},i[B.id]=z);const V=R.isInstancedMesh===!0?R.id:0;let ee=z[V];ee===void 0&&(ee={},z[V]=ee);let Q=ee[G.id];Q===void 0&&(Q={},ee[G.id]=Q);let ue=Q[k];return ue===void 0&&(ue=h(c()),Q[k]=ue),ue}function h(R){const B=[],G=[],X=[];for(let k=0;k<t;k++)B[k]=0,G[k]=0,X[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:G,attributeDivisors:X,object:R,attributes:{},index:null}}function m(R,B,G,X){const k=r.attributes,z=B.attributes;let V=0;const ee=G.getAttributes();for(const Q in ee)if(ee[Q].location>=0){const pe=k[Q];let K=z[Q];if(K===void 0&&(Q==="instanceMatrix"&&R.instanceMatrix&&(K=R.instanceMatrix),Q==="instanceColor"&&R.instanceColor&&(K=R.instanceColor)),pe===void 0||pe.attribute!==K||K&&pe.data!==K.data)return!0;V++}return r.attributesNum!==V||r.index!==X}function g(R,B,G,X){const k={},z=B.attributes;let V=0;const ee=G.getAttributes();for(const Q in ee)if(ee[Q].location>=0){let pe=z[Q];pe===void 0&&(Q==="instanceMatrix"&&R.instanceMatrix&&(pe=R.instanceMatrix),Q==="instanceColor"&&R.instanceColor&&(pe=R.instanceColor));const K={};K.attribute=pe,pe&&pe.data&&(K.data=pe.data),k[Q]=K,V++}r.attributes=k,r.attributesNum=V,r.index=X}function v(){const R=r.newAttributes;for(let B=0,G=R.length;B<G;B++)R[B]=0}function f(R){d(R,0)}function d(R,B){const G=r.newAttributes,X=r.enabledAttributes,k=r.attributeDivisors;G[R]=1,X[R]===0&&(n.enableVertexAttribArray(R),X[R]=1),k[R]!==B&&(n.vertexAttribDivisor(R,B),k[R]=B)}function E(){const R=r.newAttributes,B=r.enabledAttributes;for(let G=0,X=B.length;G<X;G++)B[G]!==R[G]&&(n.disableVertexAttribArray(G),B[G]=0)}function T(R,B,G,X,k,z,V){V===!0?n.vertexAttribIPointer(R,B,G,k,z):n.vertexAttribPointer(R,B,G,X,k,z)}function y(R,B,G,X){v();const k=X.attributes,z=G.getAttributes(),V=B.defaultAttributeValues;for(const ee in z){const Q=z[ee];if(Q.location>=0){let ue=k[ee];if(ue===void 0&&(ee==="instanceMatrix"&&R.instanceMatrix&&(ue=R.instanceMatrix),ee==="instanceColor"&&R.instanceColor&&(ue=R.instanceColor)),ue!==void 0){const pe=ue.normalized,K=ue.itemSize,xe=e.get(ue);if(xe===void 0)continue;const Pe=xe.buffer,Ve=xe.type,Z=xe.bytesPerElement,ie=Ve===n.INT||Ve===n.UNSIGNED_INT||ue.gpuType===Va;if(ue.isInterleavedBufferAttribute){const ae=ue.data,Ie=ae.stride,Re=ue.offset;if(ae.isInstancedInterleavedBuffer){for(let De=0;De<Q.locationSize;De++)d(Q.location+De,ae.meshPerAttribute);R.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let De=0;De<Q.locationSize;De++)f(Q.location+De);n.bindBuffer(n.ARRAY_BUFFER,Pe);for(let De=0;De<Q.locationSize;De++)T(Q.location+De,K/Q.locationSize,Ve,pe,Ie*Z,(Re+K/Q.locationSize*De)*Z,ie)}else{if(ue.isInstancedBufferAttribute){for(let ae=0;ae<Q.locationSize;ae++)d(Q.location+ae,ue.meshPerAttribute);R.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let ae=0;ae<Q.locationSize;ae++)f(Q.location+ae);n.bindBuffer(n.ARRAY_BUFFER,Pe);for(let ae=0;ae<Q.locationSize;ae++)T(Q.location+ae,K/Q.locationSize,Ve,pe,K*Z,K/Q.locationSize*ae*Z,ie)}}else if(V!==void 0){const pe=V[ee];if(pe!==void 0)switch(pe.length){case 2:n.vertexAttrib2fv(Q.location,pe);break;case 3:n.vertexAttrib3fv(Q.location,pe);break;case 4:n.vertexAttrib4fv(Q.location,pe);break;default:n.vertexAttrib1fv(Q.location,pe)}}}}E()}function P(){M();for(const R in i){const B=i[R];for(const G in B){const X=B[G];for(const k in X){const z=X[k];for(const V in z)u(z[V].object),delete z[V];delete X[k]}}delete i[R]}}function A(R){if(i[R.id]===void 0)return;const B=i[R.id];for(const G in B){const X=B[G];for(const k in X){const z=X[k];for(const V in z)u(z[V].object),delete z[V];delete X[k]}}delete i[R.id]}function D(R){for(const B in i){const G=i[B];for(const X in G){const k=G[X];if(k[R.id]===void 0)continue;const z=k[R.id];for(const V in z)u(z[V].object),delete z[V];delete k[R.id]}}}function x(R){for(const B in i){const G=i[B],X=R.isInstancedMesh===!0?R.id:0,k=G[X];if(k!==void 0){for(const z in k){const V=k[z];for(const ee in V)u(V[ee].object),delete V[ee];delete k[z]}delete G[X],Object.keys(G).length===0&&delete i[B]}}}function M(){Y(),a=!0,r!==s&&(r=s,l(r.object))}function Y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:M,resetDefaultState:Y,dispose:P,releaseStatesOfGeometry:A,releaseStatesOfObject:x,releaseStatesOfProgram:D,initAttributes:v,enableAttribute:f,disableUnusedAttributes:E}}function bp(n,e,t){let i;function s(l){i=l}function r(l,u){n.drawArrays(i,l,u),t.update(u,i,1)}function a(l,u,p){p!==0&&(n.drawArraysInstanced(i,l,u,p),t.update(u,i,p))}function o(l,u,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,u,0,p);let m=0;for(let g=0;g<p;g++)m+=u[g];t.update(m,i,1)}function c(l,u,p,h){if(p===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<l.length;g++)a(l[g],u[g],h[g]);else{m.multiDrawArraysInstancedWEBGL(i,l,0,u,0,h,0,p);let g=0;for(let v=0;v<p;v++)g+=u[v]*h[v];t.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function Tp(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const D=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(D){return!(D!==qt&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(D){const x=D===Tn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(D!==Gt&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&D!==nn&&!x)}function c(D){if(D==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(Ce("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const p=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),f=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),E=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),T=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),P=n.getParameter(n.MAX_SAMPLES),A=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:p,reversedDepthBuffer:h,maxTextures:m,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:f,maxAttributes:d,maxVertexUniforms:E,maxVaryings:T,maxFragmentUniforms:y,maxSamples:P,samples:A}}function Ap(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new Nn,o=new Oe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(p,h){const m=p.length!==0||h||i!==0||s;return s=h,i=p.length,m},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(p,h){t=u(p,h,0)},this.setState=function(p,h,m){const g=p.clippingPlanes,v=p.clipIntersection,f=p.clipShadows,d=n.get(p);if(!s||g===null||g.length===0||r&&!f)r?u(null):l();else{const E=r?0:i,T=E*4;let y=d.clippingState||null;c.value=y,y=u(g,h,T,m);for(let P=0;P!==T;++P)y[P]=t[P];d.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=E}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(p,h,m,g){const v=p!==null?p.length:0;let f=null;if(v!==0){if(f=c.value,g!==!0||f===null){const d=m+v*4,E=h.matrixWorldInverse;o.getNormalMatrix(E),(f===null||f.length<d)&&(f=new Float32Array(d));for(let T=0,y=m;T!==v;++T,y+=4)a.copy(p[T]).applyMatrix4(E,o),a.normal.toArray(f,y),f[y+3]=a.constant}c.value=f,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,f}}const On=4,Ko=[.125,.215,.35,.446,.526,.582],$n=20,wp=256,Vi=new Js,Jo=new We;let Fr=null,Or=0,Br=0,zr=!1;const Rp=new O;class Qo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:a=256,position:o=Rp}=r;Fr=this._renderer.getRenderTarget(),Or=this._renderer.getActiveCubeFace(),Br=this._renderer.getActiveMipmapLevel(),zr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=nl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=tl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Fr,Or,Br),this._renderer.xr.enabled=zr,e.scissorTest=!1,_i(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Qn||e.mapping===Ri?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Fr=this._renderer.getRenderTarget(),Or=this._renderer.getActiveCubeFace(),Br=this._renderer.getActiveMipmapLevel(),zr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:At,minFilter:At,generateMipmaps:!1,type:Tn,format:qt,colorSpace:Pi,depthBuffer:!1},s=el(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=el(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Cp(r)),this._blurMaterial=Dp(r,e,t),this._ggxMaterial=Pp(r,e,t)}return s}_compileMaterial(e){const t=new cn(new Dt,e);this._renderer.compile(t,Vi)}_sceneToCubeUV(e,t,i,s,r){const c=new Vt(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],p=this._renderer,h=p.autoClear,m=p.toneMapping;p.getClearColor(Jo),p.toneMapping=rn,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(s),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new cn(new is,new Ql({name:"PMREM.Background",side:Ut,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,f=v.material;let d=!1;const E=e.background;E?E.isColor&&(f.color.copy(E),e.background=null,d=!0):(f.color.copy(Jo),d=!0);for(let T=0;T<6;T++){const y=T%3;y===0?(c.up.set(0,l[T],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[T],r.y,r.z)):y===1?(c.up.set(0,0,l[T]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[T],r.z)):(c.up.set(0,l[T],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[T]));const P=this._cubeSize;_i(s,y*P,T>2?P:0,P,P),p.setRenderTarget(s),d&&p.render(v,c),p.render(e,c)}p.toneMapping=m,p.autoClear=h,e.background=E}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Qn||e.mapping===Ri;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=nl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=tl());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;_i(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,Vi)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const c=a.uniforms,l=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),p=Math.sqrt(l*l-u*u),h=0+l*1.25,m=p*h,{_lodMax:g}=this,v=this._sizeLods[i],f=3*v*(i>g-On?i-g+On:0),d=4*(this._cubeSize-v);c.envMap.value=e.texture,c.roughness.value=m,c.mipInt.value=g-t,_i(r,f,d,3*v,2*v),s.setRenderTarget(r),s.render(o,Vi),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=g-i,_i(e,f,d,3*v,2*v),s.setRenderTarget(e),s.render(o,Vi)}_blur(e,t,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Ze("blur direction must be either latitudinal or longitudinal!");const u=3,p=this._lodMeshes[s];p.material=l;const h=l.uniforms,m=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*$n-1),v=r/g,f=isFinite(r)?1+Math.floor(u*v):$n;f>$n&&Ce(`sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${$n}`);const d=[];let E=0;for(let D=0;D<$n;++D){const x=D/v,M=Math.exp(-x*x/2);d.push(M),D===0?E+=M:D<f&&(E+=2*M)}for(let D=0;D<d.length;D++)d[D]=d[D]/E;h.envMap.value=e.texture,h.samples.value=f,h.weights.value=d,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:T}=this;h.dTheta.value=g,h.mipInt.value=T-i;const y=this._sizeLods[s],P=3*y*(s>T-On?s-T+On:0),A=4*(this._cubeSize-y);_i(t,P,A,3*y,2*y),c.setRenderTarget(t),c.render(p,Vi)}}function Cp(n){const e=[],t=[],i=[];let s=n;const r=n-On+1+Ko.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let c=1/o;a>n-On?c=Ko[a-n+On-1]:a===0&&(c=0),t.push(c);const l=1/(o-2),u=-l,p=1+l,h=[u,u,p,u,p,p,u,u,p,p,u,p],m=6,g=6,v=3,f=2,d=1,E=new Float32Array(v*g*m),T=new Float32Array(f*g*m),y=new Float32Array(d*g*m);for(let A=0;A<m;A++){const D=A%3*2/3-1,x=A>2?0:-1,M=[D,x,0,D+2/3,x,0,D+2/3,x+1,0,D,x,0,D+2/3,x+1,0,D,x+1,0];E.set(M,v*g*A),T.set(h,f*g*A);const Y=[A,A,A,A,A,A];y.set(Y,d*g*A)}const P=new Dt;P.setAttribute("position",new $t(E,v)),P.setAttribute("uv",new $t(T,f)),P.setAttribute("faceIndex",new $t(y,d)),i.push(new cn(P,null)),s>On&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function el(n,e,t){const i=new an(n,e,t);return i.texture.mapping=qs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function _i(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function Pp(n,e,t){return new hn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:wp,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Qs(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function Dp(n,e,t){const i=new Float32Array($n),s=new O(0,1,0);return new hn({name:"SphericalGaussianBlur",defines:{n:$n,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Qs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function tl(){return new hn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Qs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function nl(){return new hn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Qs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function Qs(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class ac extends an{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new ec(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new is(5,5,5),r=new hn({name:"CubemapFromEquirect",uniforms:Di(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ut,blending:En});r.uniforms.tEquirect.value=t;const a=new cn(s,r),o=t.minFilter;return t.minFilter===Kn&&(t.minFilter=At),new Nu(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}function Ip(n){let e=new WeakMap,t=new WeakMap,i=null;function s(h,m=!1){return h==null?null:m?a(h):r(h)}function r(h){if(h&&h.isTexture){const m=h.mapping;if(m===lr||m===cr)if(e.has(h)){const g=e.get(h).texture;return o(g,h.mapping)}else{const g=h.image;if(g&&g.height>0){const v=new ac(g.height);return v.fromEquirectangularTexture(n,h),e.set(h,v),h.addEventListener("dispose",l),o(v.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const m=h.mapping,g=m===lr||m===cr,v=m===Qn||m===Ri;if(g||v){let f=t.get(h);const d=f!==void 0?f.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==d)return i===null&&(i=new Qo(n)),f=g?i.fromEquirectangular(h,f):i.fromCubemap(h,f),f.texture.pmremVersion=h.pmremVersion,t.set(h,f),f.texture;if(f!==void 0)return f.texture;{const E=h.image;return g&&E&&E.height>0||v&&E&&c(E)?(i===null&&(i=new Qo(n)),f=g?i.fromEquirectangular(h):i.fromCubemap(h),f.texture.pmremVersion=h.pmremVersion,t.set(h,f),h.addEventListener("dispose",u),f.texture):null}}}return h}function o(h,m){return m===lr?h.mapping=Qn:m===cr&&(h.mapping=Ri),h}function c(h){let m=0;const g=6;for(let v=0;v<g;v++)h[v]!==void 0&&m++;return m===g}function l(h){const m=h.target;m.removeEventListener("dispose",l);const g=e.get(m);g!==void 0&&(e.delete(m),g.dispose())}function u(h){const m=h.target;m.removeEventListener("dispose",u);const g=t.get(m);g!==void 0&&(t.delete(m),g.dispose())}function p(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:p}}function Lp(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&js("WebGLRenderer: "+i+" extension not supported."),s}}}function Up(n,e,t,i){const s={},r=new WeakMap;function a(p){const h=p.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",a),delete s[h.id];const m=r.get(h);m&&(e.remove(m),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(p,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function c(p){const h=p.attributes;for(const m in h)e.update(h[m],n.ARRAY_BUFFER)}function l(p){const h=[],m=p.index,g=p.attributes.position;let v=0;if(g===void 0)return;if(m!==null){const E=m.array;v=m.version;for(let T=0,y=E.length;T<y;T+=3){const P=E[T+0],A=E[T+1],D=E[T+2];h.push(P,A,A,D,D,P)}}else{const E=g.array;v=g.version;for(let T=0,y=E.length/3-1;T<y;T+=3){const P=T+0,A=T+1,D=T+2;h.push(P,A,A,D,D,P)}}const f=new(g.count>=65535?Jl:Kl)(h,1);f.version=v;const d=r.get(p);d&&e.remove(d),r.set(p,f)}function u(p){const h=r.get(p);if(h){const m=p.index;m!==null&&h.version<m.version&&l(p)}else l(p);return r.get(p)}return{get:o,update:c,getWireframeAttribute:u}}function Np(n,e,t){let i;function s(h){i=h}let r,a;function o(h){r=h.type,a=h.bytesPerElement}function c(h,m){n.drawElements(i,m,r,h*a),t.update(m,i,1)}function l(h,m,g){g!==0&&(n.drawElementsInstanced(i,m,r,h*a,g),t.update(m,i,g))}function u(h,m,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,m,0,r,h,0,g);let f=0;for(let d=0;d<g;d++)f+=m[d];t.update(f,i,1)}function p(h,m,g,v){if(g===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let d=0;d<h.length;d++)l(h[d]/a,m[d],v[d]);else{f.multiDrawElementsInstancedWEBGL(i,m,0,r,h,0,v,0,g);let d=0;for(let E=0;E<g;E++)d+=m[E]*v[E];t.update(d,i,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=p}function Fp(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:Ze("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Op(n,e,t){const i=new WeakMap,s=new ct;function r(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,p=u!==void 0?u.length:0;let h=i.get(o);if(h===void 0||h.count!==p){let M=function(){D.dispose(),i.delete(o),o.removeEventListener("dispose",M)};h!==void 0&&h.texture.dispose();const m=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],d=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let T=0;m===!0&&(T=1),g===!0&&(T=2),v===!0&&(T=3);let y=o.attributes.position.count*T,P=1;y>e.maxTextureSize&&(P=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const A=new Float32Array(y*P*4*p),D=new ql(A,y,P,p);D.type=nn,D.needsUpdate=!0;const x=T*4;for(let Y=0;Y<p;Y++){const R=f[Y],B=d[Y],G=E[Y],X=y*P*4*Y;for(let k=0;k<R.count;k++){const z=k*x;m===!0&&(s.fromBufferAttribute(R,k),A[X+z+0]=s.x,A[X+z+1]=s.y,A[X+z+2]=s.z,A[X+z+3]=0),g===!0&&(s.fromBufferAttribute(B,k),A[X+z+4]=s.x,A[X+z+5]=s.y,A[X+z+6]=s.z,A[X+z+7]=0),v===!0&&(s.fromBufferAttribute(G,k),A[X+z+8]=s.x,A[X+z+9]=s.y,A[X+z+10]=s.z,A[X+z+11]=G.itemSize===4?s.w:1)}}h={count:p,texture:D,size:new Ue(y,P)},i.set(o,h),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let m=0;for(let v=0;v<l.length;v++)m+=l[v];const g=o.morphTargetsRelative?1:1-m;c.getUniforms().setValue(n,"morphTargetBaseInfluence",g),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function Bp(n,e,t,i,s){let r=new WeakMap;function a(l){const u=s.render.frame,p=l.geometry,h=e.get(l,p);if(r.get(h)!==u&&(e.update(h),r.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const m=l.skeleton;r.get(m)!==u&&(m.update(),r.set(m,u))}return h}function o(){r=new WeakMap}function c(l){const u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const zp={[Il]:"LINEAR_TONE_MAPPING",[Ll]:"REINHARD_TONE_MAPPING",[Ul]:"CINEON_TONE_MAPPING",[ka]:"ACES_FILMIC_TONE_MAPPING",[Fl]:"AGX_TONE_MAPPING",[Ol]:"NEUTRAL_TONE_MAPPING",[Nl]:"CUSTOM_TONE_MAPPING"};function Gp(n,e,t,i,s){const r=new an(e,t,{type:n,depthBuffer:i,stencilBuffer:s}),a=new an(e,t,{type:Tn,depthBuffer:!1,stencilBuffer:!1}),o=new Dt;o.setAttribute("position",new Nt([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Nt([0,2,0,0,2,0],2));const c=new Eu({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),l=new cn(o,c),u=new Js(-1,1,1,-1,0,1);let p=null,h=null,m=!1,g,v=null,f=[],d=!1;this.setSize=function(E,T){r.setSize(E,T),a.setSize(E,T);for(let y=0;y<f.length;y++){const P=f[y];P.setSize&&P.setSize(E,T)}},this.setEffects=function(E){f=E,d=f.length>0&&f[0].isRenderPass===!0;const T=r.width,y=r.height;for(let P=0;P<f.length;P++){const A=f[P];A.setSize&&A.setSize(T,y)}},this.begin=function(E,T){if(m||E.toneMapping===rn&&f.length===0)return!1;if(v=T,T!==null){const y=T.width,P=T.height;(r.width!==y||r.height!==P)&&this.setSize(y,P)}return d===!1&&E.setRenderTarget(r),g=E.toneMapping,E.toneMapping=rn,!0},this.hasRenderPass=function(){return d},this.end=function(E,T){E.toneMapping=g,m=!0;let y=r,P=a;for(let A=0;A<f.length;A++){const D=f[A];if(D.enabled!==!1&&(D.render(E,P,y,T),D.needsSwap!==!1)){const x=y;y=P,P=x}}if(p!==E.outputColorSpace||h!==E.toneMapping){p=E.outputColorSpace,h=E.toneMapping,c.defines={},qe.getTransfer(p)===Qe&&(c.defines.SRGB_TRANSFER="");const A=zp[h];A&&(c.defines[A]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=y.texture,E.setRenderTarget(v),E.render(l,u),v=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){r.dispose(),a.dispose(),o.dispose(),c.dispose()}}const oc=new wt,Oa=new ts(1,1),lc=new ql,cc=new Jh,hc=new ec,il=[],sl=[],rl=new Float32Array(16),al=new Float32Array(9),ol=new Float32Array(4);function Ni(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=il[s];if(r===void 0&&(r=new Float32Array(s),il[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function gt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function _t(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function er(n,e){let t=sl[e];t===void 0&&(t=new Int32Array(e),sl[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function kp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Vp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;n.uniform2fv(this.addr,e),_t(t,e)}}function Hp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(gt(t,e))return;n.uniform3fv(this.addr,e),_t(t,e)}}function Wp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;n.uniform4fv(this.addr,e),_t(t,e)}}function Xp(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(gt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),_t(t,e)}else{if(gt(t,i))return;ol.set(i),n.uniformMatrix2fv(this.addr,!1,ol),_t(t,i)}}function jp(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(gt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),_t(t,e)}else{if(gt(t,i))return;al.set(i),n.uniformMatrix3fv(this.addr,!1,al),_t(t,i)}}function Yp(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(gt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),_t(t,e)}else{if(gt(t,i))return;rl.set(i),n.uniformMatrix4fv(this.addr,!1,rl),_t(t,i)}}function Zp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function qp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;n.uniform2iv(this.addr,e),_t(t,e)}}function $p(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(gt(t,e))return;n.uniform3iv(this.addr,e),_t(t,e)}}function Kp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;n.uniform4iv(this.addr,e),_t(t,e)}}function Jp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Qp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;n.uniform2uiv(this.addr,e),_t(t,e)}}function em(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(gt(t,e))return;n.uniform3uiv(this.addr,e),_t(t,e)}}function tm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;n.uniform4uiv(this.addr,e),_t(t,e)}}function nm(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Oa.compareFunction=t.isReversedDepthBuffer()?qa:Za,r=Oa):r=oc,t.setTexture2D(e||r,s)}function im(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||cc,s)}function sm(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||hc,s)}function rm(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||lc,s)}function am(n){switch(n){case 5126:return kp;case 35664:return Vp;case 35665:return Hp;case 35666:return Wp;case 35674:return Xp;case 35675:return jp;case 35676:return Yp;case 5124:case 35670:return Zp;case 35667:case 35671:return qp;case 35668:case 35672:return $p;case 35669:case 35673:return Kp;case 5125:return Jp;case 36294:return Qp;case 36295:return em;case 36296:return tm;case 35678:case 36198:case 36298:case 36306:case 35682:return nm;case 35679:case 36299:case 36307:return im;case 35680:case 36300:case 36308:case 36293:return sm;case 36289:case 36303:case 36311:case 36292:return rm}}function om(n,e){n.uniform1fv(this.addr,e)}function lm(n,e){const t=Ni(e,this.size,2);n.uniform2fv(this.addr,t)}function cm(n,e){const t=Ni(e,this.size,3);n.uniform3fv(this.addr,t)}function hm(n,e){const t=Ni(e,this.size,4);n.uniform4fv(this.addr,t)}function um(n,e){const t=Ni(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function dm(n,e){const t=Ni(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function fm(n,e){const t=Ni(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function pm(n,e){n.uniform1iv(this.addr,e)}function mm(n,e){n.uniform2iv(this.addr,e)}function gm(n,e){n.uniform3iv(this.addr,e)}function _m(n,e){n.uniform4iv(this.addr,e)}function xm(n,e){n.uniform1uiv(this.addr,e)}function vm(n,e){n.uniform2uiv(this.addr,e)}function Sm(n,e){n.uniform3uiv(this.addr,e)}function Mm(n,e){n.uniform4uiv(this.addr,e)}function Em(n,e,t){const i=this.cache,s=e.length,r=er(t,s);gt(i,r)||(n.uniform1iv(this.addr,r),_t(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=Oa:a=oc;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function ym(n,e,t){const i=this.cache,s=e.length,r=er(t,s);gt(i,r)||(n.uniform1iv(this.addr,r),_t(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||cc,r[a])}function bm(n,e,t){const i=this.cache,s=e.length,r=er(t,s);gt(i,r)||(n.uniform1iv(this.addr,r),_t(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||hc,r[a])}function Tm(n,e,t){const i=this.cache,s=e.length,r=er(t,s);gt(i,r)||(n.uniform1iv(this.addr,r),_t(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||lc,r[a])}function Am(n){switch(n){case 5126:return om;case 35664:return lm;case 35665:return cm;case 35666:return hm;case 35674:return um;case 35675:return dm;case 35676:return fm;case 5124:case 35670:return pm;case 35667:case 35671:return mm;case 35668:case 35672:return gm;case 35669:case 35673:return _m;case 5125:return xm;case 36294:return vm;case 36295:return Sm;case 36296:return Mm;case 35678:case 36198:case 36298:case 36306:case 35682:return Em;case 35679:case 36299:case 36307:return ym;case 35680:case 36300:case 36308:case 36293:return bm;case 36289:case 36303:case 36311:case 36292:return Tm}}class wm{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=am(t.type)}}class Rm{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Am(t.type)}}class Cm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const Gr=/(\w+)(\])?(\[|\.)?/g;function ll(n,e){n.seq.push(e),n.map[e.id]=e}function Pm(n,e,t){const i=n.name,s=i.length;for(Gr.lastIndex=0;;){const r=Gr.exec(i),a=Gr.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){ll(t,l===void 0?new wm(o,n,e):new Rm(o,n,e));break}else{let p=t.map[o];p===void 0&&(p=new Cm(o),ll(t,p)),t=p}}}class Hs{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);Pm(o,c,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function cl(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Dm=37297;let Im=0;function Lm(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const hl=new Oe;function Um(n){qe._getMatrix(hl,qe.workingColorSpace,n);const e=`mat3( ${hl.elements.map(t=>t.toFixed(4))} )`;switch(qe.getTransfer(n)){case Xs:return[e,"LinearTransferOETF"];case Qe:return[e,"sRGBTransferOETF"];default:return Ce("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function ul(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Lm(n.getShaderSource(e),o)}else return r}function Nm(n,e){const t=Um(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Fm={[Il]:"Linear",[Ll]:"Reinhard",[Ul]:"Cineon",[ka]:"ACESFilmic",[Fl]:"AgX",[Ol]:"Neutral",[Nl]:"Custom"};function Om(n,e){const t=Fm[e];return t===void 0?(Ce("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Us=new O;function Bm(){qe.getLuminanceCoefficients(Us);const n=Us.x.toFixed(4),e=Us.y.toFixed(4),t=Us.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function zm(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Xi).join(`
`)}function Gm(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function km(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Xi(n){return n!==""}function dl(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function fl(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Vm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ba(n){return n.replace(Vm,Wm)}const Hm=new Map;function Wm(n,e){let t=Be[e];if(t===void 0){const i=Hm.get(e);if(i!==void 0)t=Be[i],Ce('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Ba(t)}const Xm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function pl(n){return n.replace(Xm,jm)}function jm(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ml(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const Ym={[Bs]:"SHADOWMAP_TYPE_PCF",[Wi]:"SHADOWMAP_TYPE_VSM"};function Zm(n){return Ym[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const qm={[Qn]:"ENVMAP_TYPE_CUBE",[Ri]:"ENVMAP_TYPE_CUBE",[qs]:"ENVMAP_TYPE_CUBE_UV"};function $m(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":qm[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const Km={[Ri]:"ENVMAP_MODE_REFRACTION"};function Jm(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Km[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Qm={[Dl]:"ENVMAP_BLENDING_MULTIPLY",[gh]:"ENVMAP_BLENDING_MIX",[_h]:"ENVMAP_BLENDING_ADD"};function eg(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":Qm[n.combine]||"ENVMAP_BLENDING_NONE"}function tg(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function ng(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=Zm(t),l=$m(t),u=Jm(t),p=eg(t),h=tg(t),m=zm(t),g=Gm(r),v=s.createProgram();let f,d,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Xi).join(`
`),f.length>0&&(f+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Xi).join(`
`),d.length>0&&(d+=`
`)):(f=[ml(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Xi).join(`
`),d=[ml(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+p:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==rn?"#define TONE_MAPPING":"",t.toneMapping!==rn?Be.tonemapping_pars_fragment:"",t.toneMapping!==rn?Om("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Be.colorspace_pars_fragment,Nm("linearToOutputTexel",t.outputColorSpace),Bm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Xi).join(`
`)),a=Ba(a),a=dl(a,t),a=fl(a,t),o=Ba(o),o=dl(o,t),o=fl(o,t),a=pl(a),o=pl(o),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,f=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,d=["#define varying in",t.glslVersion===So?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===So?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const T=E+f+a,y=E+d+o,P=cl(s,s.VERTEX_SHADER,T),A=cl(s,s.FRAGMENT_SHADER,y);s.attachShader(v,P),s.attachShader(v,A),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function D(R){if(n.debug.checkShaderErrors){const B=s.getProgramInfoLog(v)||"",G=s.getShaderInfoLog(P)||"",X=s.getShaderInfoLog(A)||"",k=B.trim(),z=G.trim(),V=X.trim();let ee=!0,Q=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(ee=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,P,A);else{const ue=ul(s,P,"vertex"),pe=ul(s,A,"fragment");Ze("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+k+`
`+ue+`
`+pe)}else k!==""?Ce("WebGLProgram: Program Info Log:",k):(z===""||V==="")&&(Q=!1);Q&&(R.diagnostics={runnable:ee,programLog:k,vertexShader:{log:z,prefix:f},fragmentShader:{log:V,prefix:d}})}s.deleteShader(P),s.deleteShader(A),x=new Hs(s,v),M=km(s,v)}let x;this.getUniforms=function(){return x===void 0&&D(this),x};let M;this.getAttributes=function(){return M===void 0&&D(this),M};let Y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return Y===!1&&(Y=s.getProgramParameter(v,Dm)),Y},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Im++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=P,this.fragmentShader=A,this}let ig=0;class sg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new rg(e),t.set(e,i)),i}}class rg{constructor(e){this.id=ig++,this.code=e,this.usedTimes=0}}function ag(n,e,t,i,s,r){const a=new Ja,o=new sg,c=new Set,l=[],u=new Map,p=i.logarithmicDepthBuffer;let h=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return c.add(x),x===0?"uv":`uv${x}`}function v(x,M,Y,R,B){const G=R.fog,X=B.geometry,k=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?R.environment:null,z=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,V=e.get(x.envMap||k,z),ee=V&&V.mapping===qs?V.image.height:null,Q=m[x.type];x.precision!==null&&(h=i.getMaxPrecision(x.precision),h!==x.precision&&Ce("WebGLProgram.getParameters:",x.precision,"not supported, using",h,"instead."));const ue=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,pe=ue!==void 0?ue.length:0;let K=0;X.morphAttributes.position!==void 0&&(K=1),X.morphAttributes.normal!==void 0&&(K=2),X.morphAttributes.color!==void 0&&(K=3);let xe,Pe,Ve,Z;if(Q){const Je=tn[Q];xe=Je.vertexShader,Pe=Je.fragmentShader}else xe=x.vertexShader,Pe=x.fragmentShader,o.update(x),Ve=o.getVertexShaderID(x),Z=o.getFragmentShaderID(x);const ie=n.getRenderTarget(),ae=n.state.buffers.depth.getReversed(),Ie=B.isInstancedMesh===!0,Re=B.isBatchedMesh===!0,De=!!x.map,ut=!!x.matcap,He=!!V,Xe=!!x.aoMap,je=!!x.lightMap,Fe=!!x.bumpMap,rt=!!x.normalMap,C=!!x.displacementMap,ot=!!x.emissiveMap,Ye=!!x.metalnessMap,Ke=!!x.roughnessMap,Ee=x.anisotropy>0,b=x.clearcoat>0,_=x.dispersion>0,U=x.iridescence>0,w=x.sheen>0,I=x.transmission>0,F=Ee&&!!x.anisotropyMap,J=b&&!!x.clearcoatMap,$=b&&!!x.clearcoatNormalMap,oe=b&&!!x.clearcoatRoughnessMap,Se=U&&!!x.iridescenceMap,te=U&&!!x.iridescenceThicknessMap,se=w&&!!x.sheenColorMap,Me=w&&!!x.sheenRoughnessMap,me=!!x.specularMap,ge=!!x.specularColorMap,ze=!!x.specularIntensityMap,L=I&&!!x.transmissionMap,le=I&&!!x.thicknessMap,re=!!x.gradientMap,ve=!!x.alphaMap,ne=x.alphaTest>0,q=!!x.alphaHash,ye=!!x.extensions;let Le=rn;x.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(Le=n.toneMapping);const st={shaderID:Q,shaderType:x.type,shaderName:x.name,vertexShader:xe,fragmentShader:Pe,defines:x.defines,customVertexShaderID:Ve,customFragmentShaderID:Z,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:h,batching:Re,batchingColor:Re&&B._colorsTexture!==null,instancing:Ie,instancingColor:Ie&&B.instanceColor!==null,instancingMorph:Ie&&B.morphTexture!==null,outputColorSpace:ie===null?n.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:Pi,alphaToCoverage:!!x.alphaToCoverage,map:De,matcap:ut,envMap:He,envMapMode:He&&V.mapping,envMapCubeUVHeight:ee,aoMap:Xe,lightMap:je,bumpMap:Fe,normalMap:rt,displacementMap:C,emissiveMap:ot,normalMapObjectSpace:rt&&x.normalMapType===Sh,normalMapTangentSpace:rt&&x.normalMapType===jl,metalnessMap:Ye,roughnessMap:Ke,anisotropy:Ee,anisotropyMap:F,clearcoat:b,clearcoatMap:J,clearcoatNormalMap:$,clearcoatRoughnessMap:oe,dispersion:_,iridescence:U,iridescenceMap:Se,iridescenceThicknessMap:te,sheen:w,sheenColorMap:se,sheenRoughnessMap:Me,specularMap:me,specularColorMap:ge,specularIntensityMap:ze,transmission:I,transmissionMap:L,thicknessMap:le,gradientMap:re,opaque:x.transparent===!1&&x.blending===Ti&&x.alphaToCoverage===!1,alphaMap:ve,alphaTest:ne,alphaHash:q,combine:x.combine,mapUv:De&&g(x.map.channel),aoMapUv:Xe&&g(x.aoMap.channel),lightMapUv:je&&g(x.lightMap.channel),bumpMapUv:Fe&&g(x.bumpMap.channel),normalMapUv:rt&&g(x.normalMap.channel),displacementMapUv:C&&g(x.displacementMap.channel),emissiveMapUv:ot&&g(x.emissiveMap.channel),metalnessMapUv:Ye&&g(x.metalnessMap.channel),roughnessMapUv:Ke&&g(x.roughnessMap.channel),anisotropyMapUv:F&&g(x.anisotropyMap.channel),clearcoatMapUv:J&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:$&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:oe&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Se&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:te&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:se&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:Me&&g(x.sheenRoughnessMap.channel),specularMapUv:me&&g(x.specularMap.channel),specularColorMapUv:ge&&g(x.specularColorMap.channel),specularIntensityMapUv:ze&&g(x.specularIntensityMap.channel),transmissionMapUv:L&&g(x.transmissionMap.channel),thicknessMapUv:le&&g(x.thicknessMap.channel),alphaMapUv:ve&&g(x.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(rt||Ee),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!X.attributes.uv&&(De||ve),fog:!!G,useFog:x.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||X.attributes.normal===void 0&&rt===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:ae,skinning:B.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:pe,morphTextureStride:K,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&Y.length>0,shadowMapType:n.shadowMap.type,toneMapping:Le,decodeVideoTexture:De&&x.map.isVideoTexture===!0&&qe.getTransfer(x.map.colorSpace)===Qe,decodeVideoTextureEmissive:ot&&x.emissiveMap.isVideoTexture===!0&&qe.getTransfer(x.emissiveMap.colorSpace)===Qe,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===vn,flipSided:x.side===Ut,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:ye&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ye&&x.extensions.multiDraw===!0||Re)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return st.vertexUv1s=c.has(1),st.vertexUv2s=c.has(2),st.vertexUv3s=c.has(3),c.clear(),st}function f(x){const M=[];if(x.shaderID?M.push(x.shaderID):(M.push(x.customVertexShaderID),M.push(x.customFragmentShaderID)),x.defines!==void 0)for(const Y in x.defines)M.push(Y),M.push(x.defines[Y]);return x.isRawShaderMaterial===!1&&(d(M,x),E(M,x),M.push(n.outputColorSpace)),M.push(x.customProgramCacheKey),M.join()}function d(x,M){x.push(M.precision),x.push(M.outputColorSpace),x.push(M.envMapMode),x.push(M.envMapCubeUVHeight),x.push(M.mapUv),x.push(M.alphaMapUv),x.push(M.lightMapUv),x.push(M.aoMapUv),x.push(M.bumpMapUv),x.push(M.normalMapUv),x.push(M.displacementMapUv),x.push(M.emissiveMapUv),x.push(M.metalnessMapUv),x.push(M.roughnessMapUv),x.push(M.anisotropyMapUv),x.push(M.clearcoatMapUv),x.push(M.clearcoatNormalMapUv),x.push(M.clearcoatRoughnessMapUv),x.push(M.iridescenceMapUv),x.push(M.iridescenceThicknessMapUv),x.push(M.sheenColorMapUv),x.push(M.sheenRoughnessMapUv),x.push(M.specularMapUv),x.push(M.specularColorMapUv),x.push(M.specularIntensityMapUv),x.push(M.transmissionMapUv),x.push(M.thicknessMapUv),x.push(M.combine),x.push(M.fogExp2),x.push(M.sizeAttenuation),x.push(M.morphTargetsCount),x.push(M.morphAttributeCount),x.push(M.numDirLights),x.push(M.numPointLights),x.push(M.numSpotLights),x.push(M.numSpotLightMaps),x.push(M.numHemiLights),x.push(M.numRectAreaLights),x.push(M.numDirLightShadows),x.push(M.numPointLightShadows),x.push(M.numSpotLightShadows),x.push(M.numSpotLightShadowsWithMaps),x.push(M.numLightProbes),x.push(M.shadowMapType),x.push(M.toneMapping),x.push(M.numClippingPlanes),x.push(M.numClipIntersection),x.push(M.depthPacking)}function E(x,M){a.disableAll(),M.instancing&&a.enable(0),M.instancingColor&&a.enable(1),M.instancingMorph&&a.enable(2),M.matcap&&a.enable(3),M.envMap&&a.enable(4),M.normalMapObjectSpace&&a.enable(5),M.normalMapTangentSpace&&a.enable(6),M.clearcoat&&a.enable(7),M.iridescence&&a.enable(8),M.alphaTest&&a.enable(9),M.vertexColors&&a.enable(10),M.vertexAlphas&&a.enable(11),M.vertexUv1s&&a.enable(12),M.vertexUv2s&&a.enable(13),M.vertexUv3s&&a.enable(14),M.vertexTangents&&a.enable(15),M.anisotropy&&a.enable(16),M.alphaHash&&a.enable(17),M.batching&&a.enable(18),M.dispersion&&a.enable(19),M.batchingColor&&a.enable(20),M.gradientMap&&a.enable(21),x.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),x.push(a.mask)}function T(x){const M=m[x.type];let Y;if(M){const R=tn[M];Y=vu.clone(R.uniforms)}else Y=x.uniforms;return Y}function y(x,M){let Y=u.get(M);return Y!==void 0?++Y.usedTimes:(Y=new ng(n,M,x,s),l.push(Y),u.set(M,Y)),Y}function P(x){if(--x.usedTimes===0){const M=l.indexOf(x);l[M]=l[l.length-1],l.pop(),u.delete(x.cacheKey),x.destroy()}}function A(x){o.remove(x)}function D(){o.dispose()}return{getParameters:v,getProgramCacheKey:f,getUniforms:T,acquireProgram:y,releaseProgram:P,releaseShaderCache:A,programs:l,dispose:D}}function og(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,c){n.get(a)[o]=c}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function lg(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function gl(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function _l(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(h){let m=0;return h.isInstancedMesh&&(m+=2),h.isSkinnedMesh&&(m+=1),m}function o(h,m,g,v,f,d){let E=n[e];return E===void 0?(E={id:h.id,object:h,geometry:m,material:g,materialVariant:a(h),groupOrder:v,renderOrder:h.renderOrder,z:f,group:d},n[e]=E):(E.id=h.id,E.object=h,E.geometry=m,E.material=g,E.materialVariant=a(h),E.groupOrder=v,E.renderOrder=h.renderOrder,E.z=f,E.group=d),e++,E}function c(h,m,g,v,f,d){const E=o(h,m,g,v,f,d);g.transmission>0?i.push(E):g.transparent===!0?s.push(E):t.push(E)}function l(h,m,g,v,f,d){const E=o(h,m,g,v,f,d);g.transmission>0?i.unshift(E):g.transparent===!0?s.unshift(E):t.unshift(E)}function u(h,m){t.length>1&&t.sort(h||lg),i.length>1&&i.sort(m||gl),s.length>1&&s.sort(m||gl)}function p(){for(let h=e,m=n.length;h<m;h++){const g=n[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:c,unshift:l,finish:p,sort:u}}function cg(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new _l,n.set(i,[a])):s>=r.length?(a=new _l,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function hg(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new O,color:new We};break;case"SpotLight":t={position:new O,direction:new O,color:new We,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new O,color:new We,distance:0,decay:0};break;case"HemisphereLight":t={direction:new O,skyColor:new We,groundColor:new We};break;case"RectAreaLight":t={color:new We,position:new O,halfWidth:new O,halfHeight:new O};break}return n[e.id]=t,t}}}function ug(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let dg=0;function fg(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function pg(n){const e=new hg,t=ug(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new O);const s=new O,r=new at,a=new at;function o(l){let u=0,p=0,h=0;for(let M=0;M<9;M++)i.probe[M].set(0,0,0);let m=0,g=0,v=0,f=0,d=0,E=0,T=0,y=0,P=0,A=0,D=0;l.sort(fg);for(let M=0,Y=l.length;M<Y;M++){const R=l[M],B=R.color,G=R.intensity,X=R.distance;let k=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===Ci?k=R.shadow.map.texture:k=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)u+=B.r*G,p+=B.g*G,h+=B.b*G;else if(R.isLightProbe){for(let z=0;z<9;z++)i.probe[z].addScaledVector(R.sh.coefficients[z],G);D++}else if(R.isDirectionalLight){const z=e.get(R);if(z.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const V=R.shadow,ee=t.get(R);ee.shadowIntensity=V.intensity,ee.shadowBias=V.bias,ee.shadowNormalBias=V.normalBias,ee.shadowRadius=V.radius,ee.shadowMapSize=V.mapSize,i.directionalShadow[m]=ee,i.directionalShadowMap[m]=k,i.directionalShadowMatrix[m]=R.shadow.matrix,E++}i.directional[m]=z,m++}else if(R.isSpotLight){const z=e.get(R);z.position.setFromMatrixPosition(R.matrixWorld),z.color.copy(B).multiplyScalar(G),z.distance=X,z.coneCos=Math.cos(R.angle),z.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),z.decay=R.decay,i.spot[v]=z;const V=R.shadow;if(R.map&&(i.spotLightMap[P]=R.map,P++,V.updateMatrices(R),R.castShadow&&A++),i.spotLightMatrix[v]=V.matrix,R.castShadow){const ee=t.get(R);ee.shadowIntensity=V.intensity,ee.shadowBias=V.bias,ee.shadowNormalBias=V.normalBias,ee.shadowRadius=V.radius,ee.shadowMapSize=V.mapSize,i.spotShadow[v]=ee,i.spotShadowMap[v]=k,y++}v++}else if(R.isRectAreaLight){const z=e.get(R);z.color.copy(B).multiplyScalar(G),z.halfWidth.set(R.width*.5,0,0),z.halfHeight.set(0,R.height*.5,0),i.rectArea[f]=z,f++}else if(R.isPointLight){const z=e.get(R);if(z.color.copy(R.color).multiplyScalar(R.intensity),z.distance=R.distance,z.decay=R.decay,R.castShadow){const V=R.shadow,ee=t.get(R);ee.shadowIntensity=V.intensity,ee.shadowBias=V.bias,ee.shadowNormalBias=V.normalBias,ee.shadowRadius=V.radius,ee.shadowMapSize=V.mapSize,ee.shadowCameraNear=V.camera.near,ee.shadowCameraFar=V.camera.far,i.pointShadow[g]=ee,i.pointShadowMap[g]=k,i.pointShadowMatrix[g]=R.shadow.matrix,T++}i.point[g]=z,g++}else if(R.isHemisphereLight){const z=e.get(R);z.skyColor.copy(R.color).multiplyScalar(G),z.groundColor.copy(R.groundColor).multiplyScalar(G),i.hemi[d]=z,d++}}f>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=he.LTC_FLOAT_1,i.rectAreaLTC2=he.LTC_FLOAT_2):(i.rectAreaLTC1=he.LTC_HALF_1,i.rectAreaLTC2=he.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=p,i.ambient[2]=h;const x=i.hash;(x.directionalLength!==m||x.pointLength!==g||x.spotLength!==v||x.rectAreaLength!==f||x.hemiLength!==d||x.numDirectionalShadows!==E||x.numPointShadows!==T||x.numSpotShadows!==y||x.numSpotMaps!==P||x.numLightProbes!==D)&&(i.directional.length=m,i.spot.length=v,i.rectArea.length=f,i.point.length=g,i.hemi.length=d,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.pointShadow.length=T,i.pointShadowMap.length=T,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=E,i.pointShadowMatrix.length=T,i.spotLightMatrix.length=y+P-A,i.spotLightMap.length=P,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=D,x.directionalLength=m,x.pointLength=g,x.spotLength=v,x.rectAreaLength=f,x.hemiLength=d,x.numDirectionalShadows=E,x.numPointShadows=T,x.numSpotShadows=y,x.numSpotMaps=P,x.numLightProbes=D,i.version=dg++)}function c(l,u){let p=0,h=0,m=0,g=0,v=0;const f=u.matrixWorldInverse;for(let d=0,E=l.length;d<E;d++){const T=l[d];if(T.isDirectionalLight){const y=i.directional[p];y.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(f),p++}else if(T.isSpotLight){const y=i.spot[m];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(f),y.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(f),m++}else if(T.isRectAreaLight){const y=i.rectArea[g];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(f),a.identity(),r.copy(T.matrixWorld),r.premultiply(f),a.extractRotation(r),y.halfWidth.set(T.width*.5,0,0),y.halfHeight.set(0,T.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),g++}else if(T.isPointLight){const y=i.point[h];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(f),h++}else if(T.isHemisphereLight){const y=i.hemi[v];y.direction.setFromMatrixPosition(T.matrixWorld),y.direction.transformDirection(f),v++}}}return{setup:o,setupView:c,state:i}}function xl(n){const e=new pg(n),t=[],i=[];function s(u){l.camera=u,t.length=0,i.length=0}function r(u){t.push(u)}function a(u){i.push(u)}function o(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function mg(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new xl(n),e.set(s,[o])):r>=a.length?(o=new xl(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const gg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,_g=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,xg=[new O(1,0,0),new O(-1,0,0),new O(0,1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1)],vg=[new O(0,-1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1),new O(0,-1,0),new O(0,-1,0)],vl=new at,Hi=new O,kr=new O;function Sg(n,e,t){let i=new Qa;const s=new Ue,r=new Ue,a=new ct,o=new bu,c=new Tu,l={},u=t.maxTextureSize,p={[bn]:Ut,[Ut]:bn,[vn]:vn},h=new hn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ue},radius:{value:4}},vertexShader:gg,fragmentShader:_g}),m=h.clone();m.defines.HORIZONTAL_PASS=1;const g=new Dt;g.setAttribute("position",new $t(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new cn(g,h),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Bs;let d=this.type;this.render=function(A,D,x){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||A.length===0)return;this.type===Kc&&(Ce("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Bs);const M=n.getRenderTarget(),Y=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),B=n.state;B.setBlending(En),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const G=d!==this.type;G&&D.traverse(function(X){X.material&&(Array.isArray(X.material)?X.material.forEach(k=>k.needsUpdate=!0):X.material.needsUpdate=!0)});for(let X=0,k=A.length;X<k;X++){const z=A[X],V=z.shadow;if(V===void 0){Ce("WebGLShadowMap:",z,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const ee=V.getFrameExtents();s.multiply(ee),r.copy(V.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ee.x),s.x=r.x*ee.x,V.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ee.y),s.y=r.y*ee.y,V.mapSize.y=r.y));const Q=n.state.buffers.depth.getReversed();if(V.camera._reversedDepth=Q,V.map===null||G===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===Wi){if(z.isPointLight){Ce("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new an(s.x,s.y,{format:Ci,type:Tn,minFilter:At,magFilter:At,generateMipmaps:!1}),V.map.texture.name=z.name+".shadowMap",V.map.depthTexture=new ts(s.x,s.y,nn),V.map.depthTexture.name=z.name+".shadowMapDepth",V.map.depthTexture.format=An,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Et,V.map.depthTexture.magFilter=Et}else z.isPointLight?(V.map=new ac(s.x),V.map.depthTexture=new _u(s.x,on)):(V.map=new an(s.x,s.y),V.map.depthTexture=new ts(s.x,s.y,on)),V.map.depthTexture.name=z.name+".shadowMap",V.map.depthTexture.format=An,this.type===Bs?(V.map.depthTexture.compareFunction=Q?qa:Za,V.map.depthTexture.minFilter=At,V.map.depthTexture.magFilter=At):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Et,V.map.depthTexture.magFilter=Et);V.camera.updateProjectionMatrix()}const ue=V.map.isWebGLCubeRenderTarget?6:1;for(let pe=0;pe<ue;pe++){if(V.map.isWebGLCubeRenderTarget)n.setRenderTarget(V.map,pe),n.clear();else{pe===0&&(n.setRenderTarget(V.map),n.clear());const K=V.getViewport(pe);a.set(r.x*K.x,r.y*K.y,r.x*K.z,r.y*K.w),B.viewport(a)}if(z.isPointLight){const K=V.camera,xe=V.matrix,Pe=z.distance||K.far;Pe!==K.far&&(K.far=Pe,K.updateProjectionMatrix()),Hi.setFromMatrixPosition(z.matrixWorld),K.position.copy(Hi),kr.copy(K.position),kr.add(xg[pe]),K.up.copy(vg[pe]),K.lookAt(kr),K.updateMatrixWorld(),xe.makeTranslation(-Hi.x,-Hi.y,-Hi.z),vl.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),V._frustum.setFromProjectionMatrix(vl,K.coordinateSystem,K.reversedDepth)}else V.updateMatrices(z);i=V.getFrustum(),y(D,x,V.camera,z,this.type)}V.isPointLightShadow!==!0&&this.type===Wi&&E(V,x),V.needsUpdate=!1}d=this.type,f.needsUpdate=!1,n.setRenderTarget(M,Y,R)};function E(A,D){const x=e.update(v);h.defines.VSM_SAMPLES!==A.blurSamples&&(h.defines.VSM_SAMPLES=A.blurSamples,m.defines.VSM_SAMPLES=A.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new an(s.x,s.y,{format:Ci,type:Tn})),h.uniforms.shadow_pass.value=A.map.depthTexture,h.uniforms.resolution.value=A.mapSize,h.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(D,null,x,h,v,null),m.uniforms.shadow_pass.value=A.mapPass.texture,m.uniforms.resolution.value=A.mapSize,m.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(D,null,x,m,v,null)}function T(A,D,x,M){let Y=null;const R=x.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(R!==void 0)Y=R;else if(Y=x.isPointLight===!0?c:o,n.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0||D.alphaToCoverage===!0){const B=Y.uuid,G=D.uuid;let X=l[B];X===void 0&&(X={},l[B]=X);let k=X[G];k===void 0&&(k=Y.clone(),X[G]=k,D.addEventListener("dispose",P)),Y=k}if(Y.visible=D.visible,Y.wireframe=D.wireframe,M===Wi?Y.side=D.shadowSide!==null?D.shadowSide:D.side:Y.side=D.shadowSide!==null?D.shadowSide:p[D.side],Y.alphaMap=D.alphaMap,Y.alphaTest=D.alphaToCoverage===!0?.5:D.alphaTest,Y.map=D.map,Y.clipShadows=D.clipShadows,Y.clippingPlanes=D.clippingPlanes,Y.clipIntersection=D.clipIntersection,Y.displacementMap=D.displacementMap,Y.displacementScale=D.displacementScale,Y.displacementBias=D.displacementBias,Y.wireframeLinewidth=D.wireframeLinewidth,Y.linewidth=D.linewidth,x.isPointLight===!0&&Y.isMeshDistanceMaterial===!0){const B=n.properties.get(Y);B.light=x}return Y}function y(A,D,x,M,Y){if(A.visible===!1)return;if(A.layers.test(D.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&Y===Wi)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,A.matrixWorld);const G=e.update(A),X=A.material;if(Array.isArray(X)){const k=G.groups;for(let z=0,V=k.length;z<V;z++){const ee=k[z],Q=X[ee.materialIndex];if(Q&&Q.visible){const ue=T(A,Q,M,Y);A.onBeforeShadow(n,A,D,x,G,ue,ee),n.renderBufferDirect(x,null,G,ue,A,ee),A.onAfterShadow(n,A,D,x,G,ue,ee)}}}else if(X.visible){const k=T(A,X,M,Y);A.onBeforeShadow(n,A,D,x,G,k,null),n.renderBufferDirect(x,null,G,k,A,null),A.onAfterShadow(n,A,D,x,G,k,null)}}const B=A.children;for(let G=0,X=B.length;G<X;G++)y(B[G],D,x,M,Y)}function P(A){A.target.removeEventListener("dispose",P);for(const x in l){const M=l[x],Y=A.target.uuid;Y in M&&(M[Y].dispose(),delete M[Y])}}}function Mg(n,e){function t(){let L=!1;const le=new ct;let re=null;const ve=new ct(0,0,0,0);return{setMask:function(ne){re!==ne&&!L&&(n.colorMask(ne,ne,ne,ne),re=ne)},setLocked:function(ne){L=ne},setClear:function(ne,q,ye,Le,st){st===!0&&(ne*=Le,q*=Le,ye*=Le),le.set(ne,q,ye,Le),ve.equals(le)===!1&&(n.clearColor(ne,q,ye,Le),ve.copy(le))},reset:function(){L=!1,re=null,ve.set(-1,0,0,0)}}}function i(){let L=!1,le=!1,re=null,ve=null,ne=null;return{setReversed:function(q){if(le!==q){const ye=e.get("EXT_clip_control");q?ye.clipControlEXT(ye.LOWER_LEFT_EXT,ye.ZERO_TO_ONE_EXT):ye.clipControlEXT(ye.LOWER_LEFT_EXT,ye.NEGATIVE_ONE_TO_ONE_EXT),le=q;const Le=ne;ne=null,this.setClear(Le)}},getReversed:function(){return le},setTest:function(q){q?ie(n.DEPTH_TEST):ae(n.DEPTH_TEST)},setMask:function(q){re!==q&&!L&&(n.depthMask(q),re=q)},setFunc:function(q){if(le&&(q=Ph[q]),ve!==q){switch(q){case $r:n.depthFunc(n.NEVER);break;case Kr:n.depthFunc(n.ALWAYS);break;case Jr:n.depthFunc(n.LESS);break;case wi:n.depthFunc(n.LEQUAL);break;case Qr:n.depthFunc(n.EQUAL);break;case ea:n.depthFunc(n.GEQUAL);break;case ta:n.depthFunc(n.GREATER);break;case na:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ve=q}},setLocked:function(q){L=q},setClear:function(q){ne!==q&&(ne=q,le&&(q=1-q),n.clearDepth(q))},reset:function(){L=!1,re=null,ve=null,ne=null,le=!1}}}function s(){let L=!1,le=null,re=null,ve=null,ne=null,q=null,ye=null,Le=null,st=null;return{setTest:function(Je){L||(Je?ie(n.STENCIL_TEST):ae(n.STENCIL_TEST))},setMask:function(Je){le!==Je&&!L&&(n.stencilMask(Je),le=Je)},setFunc:function(Je,un,dn){(re!==Je||ve!==un||ne!==dn)&&(n.stencilFunc(Je,un,dn),re=Je,ve=un,ne=dn)},setOp:function(Je,un,dn){(q!==Je||ye!==un||Le!==dn)&&(n.stencilOp(Je,un,dn),q=Je,ye=un,Le=dn)},setLocked:function(Je){L=Je},setClear:function(Je){st!==Je&&(n.clearStencil(Je),st=Je)},reset:function(){L=!1,le=null,re=null,ve=null,ne=null,q=null,ye=null,Le=null,st=null}}}const r=new t,a=new i,o=new s,c=new WeakMap,l=new WeakMap;let u={},p={},h=new WeakMap,m=[],g=null,v=!1,f=null,d=null,E=null,T=null,y=null,P=null,A=null,D=new We(0,0,0),x=0,M=!1,Y=null,R=null,B=null,G=null,X=null;const k=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,V=0;const ee=n.getParameter(n.VERSION);ee.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(ee)[1]),z=V>=1):ee.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),z=V>=2);let Q=null,ue={};const pe=n.getParameter(n.SCISSOR_BOX),K=n.getParameter(n.VIEWPORT),xe=new ct().fromArray(pe),Pe=new ct().fromArray(K);function Ve(L,le,re,ve){const ne=new Uint8Array(4),q=n.createTexture();n.bindTexture(L,q),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ye=0;ye<re;ye++)L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY?n.texImage3D(le,0,n.RGBA,1,1,ve,0,n.RGBA,n.UNSIGNED_BYTE,ne):n.texImage2D(le+ye,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ne);return q}const Z={};Z[n.TEXTURE_2D]=Ve(n.TEXTURE_2D,n.TEXTURE_2D,1),Z[n.TEXTURE_CUBE_MAP]=Ve(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[n.TEXTURE_2D_ARRAY]=Ve(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Z[n.TEXTURE_3D]=Ve(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ie(n.DEPTH_TEST),a.setFunc(wi),Fe(!1),rt(po),ie(n.CULL_FACE),Xe(En);function ie(L){u[L]!==!0&&(n.enable(L),u[L]=!0)}function ae(L){u[L]!==!1&&(n.disable(L),u[L]=!1)}function Ie(L,le){return p[L]!==le?(n.bindFramebuffer(L,le),p[L]=le,L===n.DRAW_FRAMEBUFFER&&(p[n.FRAMEBUFFER]=le),L===n.FRAMEBUFFER&&(p[n.DRAW_FRAMEBUFFER]=le),!0):!1}function Re(L,le){let re=m,ve=!1;if(L){re=h.get(le),re===void 0&&(re=[],h.set(le,re));const ne=L.textures;if(re.length!==ne.length||re[0]!==n.COLOR_ATTACHMENT0){for(let q=0,ye=ne.length;q<ye;q++)re[q]=n.COLOR_ATTACHMENT0+q;re.length=ne.length,ve=!0}}else re[0]!==n.BACK&&(re[0]=n.BACK,ve=!0);ve&&n.drawBuffers(re)}function De(L){return g!==L?(n.useProgram(L),g=L,!0):!1}const ut={[qn]:n.FUNC_ADD,[Qc]:n.FUNC_SUBTRACT,[eh]:n.FUNC_REVERSE_SUBTRACT};ut[th]=n.MIN,ut[nh]=n.MAX;const He={[ih]:n.ZERO,[sh]:n.ONE,[rh]:n.SRC_COLOR,[Zr]:n.SRC_ALPHA,[uh]:n.SRC_ALPHA_SATURATE,[ch]:n.DST_COLOR,[oh]:n.DST_ALPHA,[ah]:n.ONE_MINUS_SRC_COLOR,[qr]:n.ONE_MINUS_SRC_ALPHA,[hh]:n.ONE_MINUS_DST_COLOR,[lh]:n.ONE_MINUS_DST_ALPHA,[dh]:n.CONSTANT_COLOR,[fh]:n.ONE_MINUS_CONSTANT_COLOR,[ph]:n.CONSTANT_ALPHA,[mh]:n.ONE_MINUS_CONSTANT_ALPHA};function Xe(L,le,re,ve,ne,q,ye,Le,st,Je){if(L===En){v===!0&&(ae(n.BLEND),v=!1);return}if(v===!1&&(ie(n.BLEND),v=!0),L!==Jc){if(L!==f||Je!==M){if((d!==qn||y!==qn)&&(n.blendEquation(n.FUNC_ADD),d=qn,y=qn),Je)switch(L){case Ti:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case mo:n.blendFunc(n.ONE,n.ONE);break;case go:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case _o:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Ze("WebGLState: Invalid blending: ",L);break}else switch(L){case Ti:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case mo:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case go:Ze("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case _o:Ze("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ze("WebGLState: Invalid blending: ",L);break}E=null,T=null,P=null,A=null,D.set(0,0,0),x=0,f=L,M=Je}return}ne=ne||le,q=q||re,ye=ye||ve,(le!==d||ne!==y)&&(n.blendEquationSeparate(ut[le],ut[ne]),d=le,y=ne),(re!==E||ve!==T||q!==P||ye!==A)&&(n.blendFuncSeparate(He[re],He[ve],He[q],He[ye]),E=re,T=ve,P=q,A=ye),(Le.equals(D)===!1||st!==x)&&(n.blendColor(Le.r,Le.g,Le.b,st),D.copy(Le),x=st),f=L,M=!1}function je(L,le){L.side===vn?ae(n.CULL_FACE):ie(n.CULL_FACE);let re=L.side===Ut;le&&(re=!re),Fe(re),L.blending===Ti&&L.transparent===!1?Xe(En):Xe(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),r.setMask(L.colorWrite);const ve=L.stencilWrite;o.setTest(ve),ve&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),ot(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ie(n.SAMPLE_ALPHA_TO_COVERAGE):ae(n.SAMPLE_ALPHA_TO_COVERAGE)}function Fe(L){Y!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),Y=L)}function rt(L){L!==qc?(ie(n.CULL_FACE),L!==R&&(L===po?n.cullFace(n.BACK):L===$c?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ae(n.CULL_FACE),R=L}function C(L){L!==B&&(z&&n.lineWidth(L),B=L)}function ot(L,le,re){L?(ie(n.POLYGON_OFFSET_FILL),(G!==le||X!==re)&&(G=le,X=re,a.getReversed()&&(le=-le),n.polygonOffset(le,re))):ae(n.POLYGON_OFFSET_FILL)}function Ye(L){L?ie(n.SCISSOR_TEST):ae(n.SCISSOR_TEST)}function Ke(L){L===void 0&&(L=n.TEXTURE0+k-1),Q!==L&&(n.activeTexture(L),Q=L)}function Ee(L,le,re){re===void 0&&(Q===null?re=n.TEXTURE0+k-1:re=Q);let ve=ue[re];ve===void 0&&(ve={type:void 0,texture:void 0},ue[re]=ve),(ve.type!==L||ve.texture!==le)&&(Q!==re&&(n.activeTexture(re),Q=re),n.bindTexture(L,le||Z[L]),ve.type=L,ve.texture=le)}function b(){const L=ue[Q];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function _(){try{n.compressedTexImage2D(...arguments)}catch(L){Ze("WebGLState:",L)}}function U(){try{n.compressedTexImage3D(...arguments)}catch(L){Ze("WebGLState:",L)}}function w(){try{n.texSubImage2D(...arguments)}catch(L){Ze("WebGLState:",L)}}function I(){try{n.texSubImage3D(...arguments)}catch(L){Ze("WebGLState:",L)}}function F(){try{n.compressedTexSubImage2D(...arguments)}catch(L){Ze("WebGLState:",L)}}function J(){try{n.compressedTexSubImage3D(...arguments)}catch(L){Ze("WebGLState:",L)}}function $(){try{n.texStorage2D(...arguments)}catch(L){Ze("WebGLState:",L)}}function oe(){try{n.texStorage3D(...arguments)}catch(L){Ze("WebGLState:",L)}}function Se(){try{n.texImage2D(...arguments)}catch(L){Ze("WebGLState:",L)}}function te(){try{n.texImage3D(...arguments)}catch(L){Ze("WebGLState:",L)}}function se(L){xe.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),xe.copy(L))}function Me(L){Pe.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),Pe.copy(L))}function me(L,le){let re=l.get(le);re===void 0&&(re=new WeakMap,l.set(le,re));let ve=re.get(L);ve===void 0&&(ve=n.getUniformBlockIndex(le,L.name),re.set(L,ve))}function ge(L,le){const ve=l.get(le).get(L);c.get(le)!==ve&&(n.uniformBlockBinding(le,ve,L.__bindingPointIndex),c.set(le,ve))}function ze(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},Q=null,ue={},p={},h=new WeakMap,m=[],g=null,v=!1,f=null,d=null,E=null,T=null,y=null,P=null,A=null,D=new We(0,0,0),x=0,M=!1,Y=null,R=null,B=null,G=null,X=null,xe.set(0,0,n.canvas.width,n.canvas.height),Pe.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ie,disable:ae,bindFramebuffer:Ie,drawBuffers:Re,useProgram:De,setBlending:Xe,setMaterial:je,setFlipSided:Fe,setCullFace:rt,setLineWidth:C,setPolygonOffset:ot,setScissorTest:Ye,activeTexture:Ke,bindTexture:Ee,unbindTexture:b,compressedTexImage2D:_,compressedTexImage3D:U,texImage2D:Se,texImage3D:te,updateUBOMapping:me,uniformBlockBinding:ge,texStorage2D:$,texStorage3D:oe,texSubImage2D:w,texSubImage3D:I,compressedTexSubImage2D:F,compressedTexSubImage3D:J,scissor:se,viewport:Me,reset:ze}}function Eg(n,e,t,i,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ue,u=new WeakMap;let p;const h=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,_){return m?new OffscreenCanvas(b,_):Qi("canvas")}function v(b,_,U){let w=1;const I=Ee(b);if((I.width>U||I.height>U)&&(w=U/Math.max(I.width,I.height)),w<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const F=Math.floor(w*I.width),J=Math.floor(w*I.height);p===void 0&&(p=g(F,J));const $=_?g(F,J):p;return $.width=F,$.height=J,$.getContext("2d").drawImage(b,0,0,F,J),Ce("WebGLRenderer: Texture has been resized from ("+I.width+"x"+I.height+") to ("+F+"x"+J+")."),$}else return"data"in b&&Ce("WebGLRenderer: Image in DataTexture is too big ("+I.width+"x"+I.height+")."),b;return b}function f(b){return b.generateMipmaps}function d(b){n.generateMipmap(b)}function E(b){return b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?n.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function T(b,_,U,w,I=!1){if(b!==null){if(n[b]!==void 0)return n[b];Ce("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let F=_;if(_===n.RED&&(U===n.FLOAT&&(F=n.R32F),U===n.HALF_FLOAT&&(F=n.R16F),U===n.UNSIGNED_BYTE&&(F=n.R8)),_===n.RED_INTEGER&&(U===n.UNSIGNED_BYTE&&(F=n.R8UI),U===n.UNSIGNED_SHORT&&(F=n.R16UI),U===n.UNSIGNED_INT&&(F=n.R32UI),U===n.BYTE&&(F=n.R8I),U===n.SHORT&&(F=n.R16I),U===n.INT&&(F=n.R32I)),_===n.RG&&(U===n.FLOAT&&(F=n.RG32F),U===n.HALF_FLOAT&&(F=n.RG16F),U===n.UNSIGNED_BYTE&&(F=n.RG8)),_===n.RG_INTEGER&&(U===n.UNSIGNED_BYTE&&(F=n.RG8UI),U===n.UNSIGNED_SHORT&&(F=n.RG16UI),U===n.UNSIGNED_INT&&(F=n.RG32UI),U===n.BYTE&&(F=n.RG8I),U===n.SHORT&&(F=n.RG16I),U===n.INT&&(F=n.RG32I)),_===n.RGB_INTEGER&&(U===n.UNSIGNED_BYTE&&(F=n.RGB8UI),U===n.UNSIGNED_SHORT&&(F=n.RGB16UI),U===n.UNSIGNED_INT&&(F=n.RGB32UI),U===n.BYTE&&(F=n.RGB8I),U===n.SHORT&&(F=n.RGB16I),U===n.INT&&(F=n.RGB32I)),_===n.RGBA_INTEGER&&(U===n.UNSIGNED_BYTE&&(F=n.RGBA8UI),U===n.UNSIGNED_SHORT&&(F=n.RGBA16UI),U===n.UNSIGNED_INT&&(F=n.RGBA32UI),U===n.BYTE&&(F=n.RGBA8I),U===n.SHORT&&(F=n.RGBA16I),U===n.INT&&(F=n.RGBA32I)),_===n.RGB&&(U===n.UNSIGNED_INT_5_9_9_9_REV&&(F=n.RGB9_E5),U===n.UNSIGNED_INT_10F_11F_11F_REV&&(F=n.R11F_G11F_B10F)),_===n.RGBA){const J=I?Xs:qe.getTransfer(w);U===n.FLOAT&&(F=n.RGBA32F),U===n.HALF_FLOAT&&(F=n.RGBA16F),U===n.UNSIGNED_BYTE&&(F=J===Qe?n.SRGB8_ALPHA8:n.RGBA8),U===n.UNSIGNED_SHORT_4_4_4_4&&(F=n.RGBA4),U===n.UNSIGNED_SHORT_5_5_5_1&&(F=n.RGB5_A1)}return(F===n.R16F||F===n.R32F||F===n.RG16F||F===n.RG32F||F===n.RGBA16F||F===n.RGBA32F)&&e.get("EXT_color_buffer_float"),F}function y(b,_){let U;return b?_===null||_===on||_===Ki?U=n.DEPTH24_STENCIL8:_===nn?U=n.DEPTH32F_STENCIL8:_===$i&&(U=n.DEPTH24_STENCIL8,Ce("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===on||_===Ki?U=n.DEPTH_COMPONENT24:_===nn?U=n.DEPTH_COMPONENT32F:_===$i&&(U=n.DEPTH_COMPONENT16),U}function P(b,_){return f(b)===!0||b.isFramebufferTexture&&b.minFilter!==Et&&b.minFilter!==At?Math.log2(Math.max(_.width,_.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?_.mipmaps.length:1}function A(b){const _=b.target;_.removeEventListener("dispose",A),x(_),_.isVideoTexture&&u.delete(_)}function D(b){const _=b.target;_.removeEventListener("dispose",D),Y(_)}function x(b){const _=i.get(b);if(_.__webglInit===void 0)return;const U=b.source,w=h.get(U);if(w){const I=w[_.__cacheKey];I.usedTimes--,I.usedTimes===0&&M(b),Object.keys(w).length===0&&h.delete(U)}i.remove(b)}function M(b){const _=i.get(b);n.deleteTexture(_.__webglTexture);const U=b.source,w=h.get(U);delete w[_.__cacheKey],a.memory.textures--}function Y(b){const _=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let w=0;w<6;w++){if(Array.isArray(_.__webglFramebuffer[w]))for(let I=0;I<_.__webglFramebuffer[w].length;I++)n.deleteFramebuffer(_.__webglFramebuffer[w][I]);else n.deleteFramebuffer(_.__webglFramebuffer[w]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[w])}else{if(Array.isArray(_.__webglFramebuffer))for(let w=0;w<_.__webglFramebuffer.length;w++)n.deleteFramebuffer(_.__webglFramebuffer[w]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let w=0;w<_.__webglColorRenderbuffer.length;w++)_.__webglColorRenderbuffer[w]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[w]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const U=b.textures;for(let w=0,I=U.length;w<I;w++){const F=i.get(U[w]);F.__webglTexture&&(n.deleteTexture(F.__webglTexture),a.memory.textures--),i.remove(U[w])}i.remove(b)}let R=0;function B(){R=0}function G(){const b=R;return b>=s.maxTextures&&Ce("WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+s.maxTextures),R+=1,b}function X(b){const _=[];return _.push(b.wrapS),_.push(b.wrapT),_.push(b.wrapR||0),_.push(b.magFilter),_.push(b.minFilter),_.push(b.anisotropy),_.push(b.internalFormat),_.push(b.format),_.push(b.type),_.push(b.generateMipmaps),_.push(b.premultiplyAlpha),_.push(b.flipY),_.push(b.unpackAlignment),_.push(b.colorSpace),_.join()}function k(b,_){const U=i.get(b);if(b.isVideoTexture&&Ye(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&U.__version!==b.version){const w=b.image;if(w===null)Ce("WebGLRenderer: Texture marked for update but no image data found.");else if(w.complete===!1)Ce("WebGLRenderer: Texture marked for update but image is incomplete");else{Z(U,b,_);return}}else b.isExternalTexture&&(U.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,U.__webglTexture,n.TEXTURE0+_)}function z(b,_){const U=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&U.__version!==b.version){Z(U,b,_);return}else b.isExternalTexture&&(U.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,U.__webglTexture,n.TEXTURE0+_)}function V(b,_){const U=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&U.__version!==b.version){Z(U,b,_);return}t.bindTexture(n.TEXTURE_3D,U.__webglTexture,n.TEXTURE0+_)}function ee(b,_){const U=i.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&U.__version!==b.version){ie(U,b,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture,n.TEXTURE0+_)}const Q={[qi]:n.REPEAT,[Mn]:n.CLAMP_TO_EDGE,[ia]:n.MIRRORED_REPEAT},ue={[Et]:n.NEAREST,[xh]:n.NEAREST_MIPMAP_NEAREST,[us]:n.NEAREST_MIPMAP_LINEAR,[At]:n.LINEAR,[hr]:n.LINEAR_MIPMAP_NEAREST,[Kn]:n.LINEAR_MIPMAP_LINEAR},pe={[Mh]:n.NEVER,[Ah]:n.ALWAYS,[Eh]:n.LESS,[Za]:n.LEQUAL,[yh]:n.EQUAL,[qa]:n.GEQUAL,[bh]:n.GREATER,[Th]:n.NOTEQUAL};function K(b,_){if(_.type===nn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===At||_.magFilter===hr||_.magFilter===us||_.magFilter===Kn||_.minFilter===At||_.minFilter===hr||_.minFilter===us||_.minFilter===Kn)&&Ce("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(b,n.TEXTURE_WRAP_S,Q[_.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,Q[_.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,Q[_.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,ue[_.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,ue[_.minFilter]),_.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,pe[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Et||_.minFilter!==us&&_.minFilter!==Kn||_.type===nn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const U=e.get("EXT_texture_filter_anisotropic");n.texParameterf(b,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function xe(b,_){let U=!1;b.__webglInit===void 0&&(b.__webglInit=!0,_.addEventListener("dispose",A));const w=_.source;let I=h.get(w);I===void 0&&(I={},h.set(w,I));const F=X(_);if(F!==b.__cacheKey){I[F]===void 0&&(I[F]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,U=!0),I[F].usedTimes++;const J=I[b.__cacheKey];J!==void 0&&(I[b.__cacheKey].usedTimes--,J.usedTimes===0&&M(_)),b.__cacheKey=F,b.__webglTexture=I[F].texture}return U}function Pe(b,_,U){return Math.floor(Math.floor(b/U)/_)}function Ve(b,_,U,w){const F=b.updateRanges;if(F.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,U,w,_.data);else{F.sort((te,se)=>te.start-se.start);let J=0;for(let te=1;te<F.length;te++){const se=F[J],Me=F[te],me=se.start+se.count,ge=Pe(Me.start,_.width,4),ze=Pe(se.start,_.width,4);Me.start<=me+1&&ge===ze&&Pe(Me.start+Me.count-1,_.width,4)===ge?se.count=Math.max(se.count,Me.start+Me.count-se.start):(++J,F[J]=Me)}F.length=J+1;const $=n.getParameter(n.UNPACK_ROW_LENGTH),oe=n.getParameter(n.UNPACK_SKIP_PIXELS),Se=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let te=0,se=F.length;te<se;te++){const Me=F[te],me=Math.floor(Me.start/4),ge=Math.ceil(Me.count/4),ze=me%_.width,L=Math.floor(me/_.width),le=ge,re=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,ze),n.pixelStorei(n.UNPACK_SKIP_ROWS,L),t.texSubImage2D(n.TEXTURE_2D,0,ze,L,le,re,U,w,_.data)}b.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,$),n.pixelStorei(n.UNPACK_SKIP_PIXELS,oe),n.pixelStorei(n.UNPACK_SKIP_ROWS,Se)}}function Z(b,_,U){let w=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(w=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(w=n.TEXTURE_3D);const I=xe(b,_),F=_.source;t.bindTexture(w,b.__webglTexture,n.TEXTURE0+U);const J=i.get(F);if(F.version!==J.__version||I===!0){t.activeTexture(n.TEXTURE0+U);const $=qe.getPrimaries(qe.workingColorSpace),oe=_.colorSpace===Sn?null:qe.getPrimaries(_.colorSpace),Se=_.colorSpace===Sn||$===oe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);let te=v(_.image,!1,s.maxTextureSize);te=Ke(_,te);const se=r.convert(_.format,_.colorSpace),Me=r.convert(_.type);let me=T(_.internalFormat,se,Me,_.colorSpace,_.isVideoTexture);K(w,_);let ge;const ze=_.mipmaps,L=_.isVideoTexture!==!0,le=J.__version===void 0||I===!0,re=F.dataReady,ve=P(_,te);if(_.isDepthTexture)me=y(_.format===Jn,_.type),le&&(L?t.texStorage2D(n.TEXTURE_2D,1,me,te.width,te.height):t.texImage2D(n.TEXTURE_2D,0,me,te.width,te.height,0,se,Me,null));else if(_.isDataTexture)if(ze.length>0){L&&le&&t.texStorage2D(n.TEXTURE_2D,ve,me,ze[0].width,ze[0].height);for(let ne=0,q=ze.length;ne<q;ne++)ge=ze[ne],L?re&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,ge.width,ge.height,se,Me,ge.data):t.texImage2D(n.TEXTURE_2D,ne,me,ge.width,ge.height,0,se,Me,ge.data);_.generateMipmaps=!1}else L?(le&&t.texStorage2D(n.TEXTURE_2D,ve,me,te.width,te.height),re&&Ve(_,te,se,Me)):t.texImage2D(n.TEXTURE_2D,0,me,te.width,te.height,0,se,Me,te.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){L&&le&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ve,me,ze[0].width,ze[0].height,te.depth);for(let ne=0,q=ze.length;ne<q;ne++)if(ge=ze[ne],_.format!==qt)if(se!==null)if(L){if(re)if(_.layerUpdates.size>0){const ye=$o(ge.width,ge.height,_.format,_.type);for(const Le of _.layerUpdates){const st=ge.data.subarray(Le*ye/ge.data.BYTES_PER_ELEMENT,(Le+1)*ye/ge.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,Le,ge.width,ge.height,1,se,st)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,0,ge.width,ge.height,te.depth,se,ge.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ne,me,ge.width,ge.height,te.depth,0,ge.data,0,0);else Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else L?re&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,0,ge.width,ge.height,te.depth,se,Me,ge.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ne,me,ge.width,ge.height,te.depth,0,se,Me,ge.data)}else{L&&le&&t.texStorage2D(n.TEXTURE_2D,ve,me,ze[0].width,ze[0].height);for(let ne=0,q=ze.length;ne<q;ne++)ge=ze[ne],_.format!==qt?se!==null?L?re&&t.compressedTexSubImage2D(n.TEXTURE_2D,ne,0,0,ge.width,ge.height,se,ge.data):t.compressedTexImage2D(n.TEXTURE_2D,ne,me,ge.width,ge.height,0,ge.data):Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):L?re&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,ge.width,ge.height,se,Me,ge.data):t.texImage2D(n.TEXTURE_2D,ne,me,ge.width,ge.height,0,se,Me,ge.data)}else if(_.isDataArrayTexture)if(L){if(le&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ve,me,te.width,te.height,te.depth),re)if(_.layerUpdates.size>0){const ne=$o(te.width,te.height,_.format,_.type);for(const q of _.layerUpdates){const ye=te.data.subarray(q*ne/te.data.BYTES_PER_ELEMENT,(q+1)*ne/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,q,te.width,te.height,1,se,Me,ye)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,se,Me,te.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,me,te.width,te.height,te.depth,0,se,Me,te.data);else if(_.isData3DTexture)L?(le&&t.texStorage3D(n.TEXTURE_3D,ve,me,te.width,te.height,te.depth),re&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,se,Me,te.data)):t.texImage3D(n.TEXTURE_3D,0,me,te.width,te.height,te.depth,0,se,Me,te.data);else if(_.isFramebufferTexture){if(le)if(L)t.texStorage2D(n.TEXTURE_2D,ve,me,te.width,te.height);else{let ne=te.width,q=te.height;for(let ye=0;ye<ve;ye++)t.texImage2D(n.TEXTURE_2D,ye,me,ne,q,0,se,Me,null),ne>>=1,q>>=1}}else if(ze.length>0){if(L&&le){const ne=Ee(ze[0]);t.texStorage2D(n.TEXTURE_2D,ve,me,ne.width,ne.height)}for(let ne=0,q=ze.length;ne<q;ne++)ge=ze[ne],L?re&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,se,Me,ge):t.texImage2D(n.TEXTURE_2D,ne,me,se,Me,ge);_.generateMipmaps=!1}else if(L){if(le){const ne=Ee(te);t.texStorage2D(n.TEXTURE_2D,ve,me,ne.width,ne.height)}re&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,se,Me,te)}else t.texImage2D(n.TEXTURE_2D,0,me,se,Me,te);f(_)&&d(w),J.__version=F.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function ie(b,_,U){if(_.image.length!==6)return;const w=xe(b,_),I=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+U);const F=i.get(I);if(I.version!==F.__version||w===!0){t.activeTexture(n.TEXTURE0+U);const J=qe.getPrimaries(qe.workingColorSpace),$=_.colorSpace===Sn?null:qe.getPrimaries(_.colorSpace),oe=_.colorSpace===Sn||J===$?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,oe);const Se=_.isCompressedTexture||_.image[0].isCompressedTexture,te=_.image[0]&&_.image[0].isDataTexture,se=[];for(let q=0;q<6;q++)!Se&&!te?se[q]=v(_.image[q],!0,s.maxCubemapSize):se[q]=te?_.image[q].image:_.image[q],se[q]=Ke(_,se[q]);const Me=se[0],me=r.convert(_.format,_.colorSpace),ge=r.convert(_.type),ze=T(_.internalFormat,me,ge,_.colorSpace),L=_.isVideoTexture!==!0,le=F.__version===void 0||w===!0,re=I.dataReady;let ve=P(_,Me);K(n.TEXTURE_CUBE_MAP,_);let ne;if(Se){L&&le&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ve,ze,Me.width,Me.height);for(let q=0;q<6;q++){ne=se[q].mipmaps;for(let ye=0;ye<ne.length;ye++){const Le=ne[ye];_.format!==qt?me!==null?L?re&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,ye,0,0,Le.width,Le.height,me,Le.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,ye,ze,Le.width,Le.height,0,Le.data):Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,ye,0,0,Le.width,Le.height,me,ge,Le.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,ye,ze,Le.width,Le.height,0,me,ge,Le.data)}}}else{if(ne=_.mipmaps,L&&le){ne.length>0&&ve++;const q=Ee(se[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ve,ze,q.width,q.height)}for(let q=0;q<6;q++)if(te){L?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,se[q].width,se[q].height,me,ge,se[q].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,ze,se[q].width,se[q].height,0,me,ge,se[q].data);for(let ye=0;ye<ne.length;ye++){const st=ne[ye].image[q].image;L?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,ye+1,0,0,st.width,st.height,me,ge,st.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,ye+1,ze,st.width,st.height,0,me,ge,st.data)}}else{L?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,me,ge,se[q]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,ze,me,ge,se[q]);for(let ye=0;ye<ne.length;ye++){const Le=ne[ye];L?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,ye+1,0,0,me,ge,Le.image[q]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,ye+1,ze,me,ge,Le.image[q])}}}f(_)&&d(n.TEXTURE_CUBE_MAP),F.__version=I.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function ae(b,_,U,w,I,F){const J=r.convert(U.format,U.colorSpace),$=r.convert(U.type),oe=T(U.internalFormat,J,$,U.colorSpace),Se=i.get(_),te=i.get(U);if(te.__renderTarget=_,!Se.__hasExternalTextures){const se=Math.max(1,_.width>>F),Me=Math.max(1,_.height>>F);I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY?t.texImage3D(I,F,oe,se,Me,_.depth,0,J,$,null):t.texImage2D(I,F,oe,se,Me,0,J,$,null)}t.bindFramebuffer(n.FRAMEBUFFER,b),ot(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,w,I,te.__webglTexture,0,C(_)):(I===n.TEXTURE_2D||I>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&I<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,w,I,te.__webglTexture,F),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ie(b,_,U){if(n.bindRenderbuffer(n.RENDERBUFFER,b),_.depthBuffer){const w=_.depthTexture,I=w&&w.isDepthTexture?w.type:null,F=y(_.stencilBuffer,I),J=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;ot(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,C(_),F,_.width,_.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,C(_),F,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,F,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,b)}else{const w=_.textures;for(let I=0;I<w.length;I++){const F=w[I],J=r.convert(F.format,F.colorSpace),$=r.convert(F.type),oe=T(F.internalFormat,J,$,F.colorSpace);ot(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,C(_),oe,_.width,_.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,C(_),oe,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,oe,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Re(b,_,U){const w=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,b),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const I=i.get(_.depthTexture);if(I.__renderTarget=_,(!I.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),w){if(I.__webglInit===void 0&&(I.__webglInit=!0,_.depthTexture.addEventListener("dispose",A)),I.__webglTexture===void 0){I.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,I.__webglTexture),K(n.TEXTURE_CUBE_MAP,_.depthTexture);const Se=r.convert(_.depthTexture.format),te=r.convert(_.depthTexture.type);let se;_.depthTexture.format===An?se=n.DEPTH_COMPONENT24:_.depthTexture.format===Jn&&(se=n.DEPTH24_STENCIL8);for(let Me=0;Me<6;Me++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,se,_.width,_.height,0,Se,te,null)}}else k(_.depthTexture,0);const F=I.__webglTexture,J=C(_),$=w?n.TEXTURE_CUBE_MAP_POSITIVE_X+U:n.TEXTURE_2D,oe=_.depthTexture.format===Jn?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===An)ot(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,oe,$,F,0,J):n.framebufferTexture2D(n.FRAMEBUFFER,oe,$,F,0);else if(_.depthTexture.format===Jn)ot(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,oe,$,F,0,J):n.framebufferTexture2D(n.FRAMEBUFFER,oe,$,F,0);else throw new Error("Unknown depthTexture format")}function De(b){const _=i.get(b),U=b.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==b.depthTexture){const w=b.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),w){const I=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,w.removeEventListener("dispose",I)};w.addEventListener("dispose",I),_.__depthDisposeCallback=I}_.__boundDepthTexture=w}if(b.depthTexture&&!_.__autoAllocateDepthBuffer)if(U)for(let w=0;w<6;w++)Re(_.__webglFramebuffer[w],b,w);else{const w=b.texture.mipmaps;w&&w.length>0?Re(_.__webglFramebuffer[0],b,0):Re(_.__webglFramebuffer,b,0)}else if(U){_.__webglDepthbuffer=[];for(let w=0;w<6;w++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[w]),_.__webglDepthbuffer[w]===void 0)_.__webglDepthbuffer[w]=n.createRenderbuffer(),Ie(_.__webglDepthbuffer[w],b,!1);else{const I=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,F=_.__webglDepthbuffer[w];n.bindRenderbuffer(n.RENDERBUFFER,F),n.framebufferRenderbuffer(n.FRAMEBUFFER,I,n.RENDERBUFFER,F)}}else{const w=b.texture.mipmaps;if(w&&w.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),Ie(_.__webglDepthbuffer,b,!1);else{const I=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,F=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,F),n.framebufferRenderbuffer(n.FRAMEBUFFER,I,n.RENDERBUFFER,F)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function ut(b,_,U){const w=i.get(b);_!==void 0&&ae(w.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),U!==void 0&&De(b)}function He(b){const _=b.texture,U=i.get(b),w=i.get(_);b.addEventListener("dispose",D);const I=b.textures,F=b.isWebGLCubeRenderTarget===!0,J=I.length>1;if(J||(w.__webglTexture===void 0&&(w.__webglTexture=n.createTexture()),w.__version=_.version,a.memory.textures++),F){U.__webglFramebuffer=[];for(let $=0;$<6;$++)if(_.mipmaps&&_.mipmaps.length>0){U.__webglFramebuffer[$]=[];for(let oe=0;oe<_.mipmaps.length;oe++)U.__webglFramebuffer[$][oe]=n.createFramebuffer()}else U.__webglFramebuffer[$]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){U.__webglFramebuffer=[];for(let $=0;$<_.mipmaps.length;$++)U.__webglFramebuffer[$]=n.createFramebuffer()}else U.__webglFramebuffer=n.createFramebuffer();if(J)for(let $=0,oe=I.length;$<oe;$++){const Se=i.get(I[$]);Se.__webglTexture===void 0&&(Se.__webglTexture=n.createTexture(),a.memory.textures++)}if(b.samples>0&&ot(b)===!1){U.__webglMultisampledFramebuffer=n.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let $=0;$<I.length;$++){const oe=I[$];U.__webglColorRenderbuffer[$]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,U.__webglColorRenderbuffer[$]);const Se=r.convert(oe.format,oe.colorSpace),te=r.convert(oe.type),se=T(oe.internalFormat,Se,te,oe.colorSpace,b.isXRRenderTarget===!0),Me=C(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,Me,se,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+$,n.RENDERBUFFER,U.__webglColorRenderbuffer[$])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(U.__webglDepthRenderbuffer=n.createRenderbuffer(),Ie(U.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(F){t.bindTexture(n.TEXTURE_CUBE_MAP,w.__webglTexture),K(n.TEXTURE_CUBE_MAP,_);for(let $=0;$<6;$++)if(_.mipmaps&&_.mipmaps.length>0)for(let oe=0;oe<_.mipmaps.length;oe++)ae(U.__webglFramebuffer[$][oe],b,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+$,oe);else ae(U.__webglFramebuffer[$],b,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);f(_)&&d(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(J){for(let $=0,oe=I.length;$<oe;$++){const Se=I[$],te=i.get(Se);let se=n.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(se=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(se,te.__webglTexture),K(se,Se),ae(U.__webglFramebuffer,b,Se,n.COLOR_ATTACHMENT0+$,se,0),f(Se)&&d(se)}t.unbindTexture()}else{let $=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&($=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture($,w.__webglTexture),K($,_),_.mipmaps&&_.mipmaps.length>0)for(let oe=0;oe<_.mipmaps.length;oe++)ae(U.__webglFramebuffer[oe],b,_,n.COLOR_ATTACHMENT0,$,oe);else ae(U.__webglFramebuffer,b,_,n.COLOR_ATTACHMENT0,$,0);f(_)&&d($),t.unbindTexture()}b.depthBuffer&&De(b)}function Xe(b){const _=b.textures;for(let U=0,w=_.length;U<w;U++){const I=_[U];if(f(I)){const F=E(b),J=i.get(I).__webglTexture;t.bindTexture(F,J),d(F),t.unbindTexture()}}}const je=[],Fe=[];function rt(b){if(b.samples>0){if(ot(b)===!1){const _=b.textures,U=b.width,w=b.height;let I=n.COLOR_BUFFER_BIT;const F=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,J=i.get(b),$=_.length>1;if($)for(let Se=0;Se<_.length;Se++)t.bindFramebuffer(n.FRAMEBUFFER,J.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Se,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,J.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Se,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,J.__webglMultisampledFramebuffer);const oe=b.texture.mipmaps;oe&&oe.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,J.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,J.__webglFramebuffer);for(let Se=0;Se<_.length;Se++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(I|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(I|=n.STENCIL_BUFFER_BIT)),$){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,J.__webglColorRenderbuffer[Se]);const te=i.get(_[Se]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,te,0)}n.blitFramebuffer(0,0,U,w,0,0,U,w,I,n.NEAREST),c===!0&&(je.length=0,Fe.length=0,je.push(n.COLOR_ATTACHMENT0+Se),b.depthBuffer&&b.resolveDepthBuffer===!1&&(je.push(F),Fe.push(F),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Fe)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,je))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),$)for(let Se=0;Se<_.length;Se++){t.bindFramebuffer(n.FRAMEBUFFER,J.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Se,n.RENDERBUFFER,J.__webglColorRenderbuffer[Se]);const te=i.get(_[Se]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,J.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Se,n.TEXTURE_2D,te,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,J.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&c){const _=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function C(b){return Math.min(s.maxSamples,b.samples)}function ot(b){const _=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function Ye(b){const _=a.render.frame;u.get(b)!==_&&(u.set(b,_),b.update())}function Ke(b,_){const U=b.colorSpace,w=b.format,I=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||U!==Pi&&U!==Sn&&(qe.getTransfer(U)===Qe?(w!==qt||I!==Gt)&&Ce("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ze("WebGLTextures: Unsupported texture color space:",U)),_}function Ee(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(l.width=b.naturalWidth||b.width,l.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(l.width=b.displayWidth,l.height=b.displayHeight):(l.width=b.width,l.height=b.height),l}this.allocateTextureUnit=G,this.resetTextureUnits=B,this.setTexture2D=k,this.setTexture2DArray=z,this.setTexture3D=V,this.setTextureCube=ee,this.rebindTextures=ut,this.setupRenderTarget=He,this.updateRenderTargetMipmap=Xe,this.updateMultisampleRenderTarget=rt,this.setupDepthRenderbuffer=De,this.setupFrameBufferTexture=ae,this.useMultisampledRTT=ot,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function yg(n,e){function t(i,s=Sn){let r;const a=qe.getTransfer(s);if(i===Gt)return n.UNSIGNED_BYTE;if(i===Ha)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Wa)return n.UNSIGNED_SHORT_5_5_5_1;if(i===kl)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Vl)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===zl)return n.BYTE;if(i===Gl)return n.SHORT;if(i===$i)return n.UNSIGNED_SHORT;if(i===Va)return n.INT;if(i===on)return n.UNSIGNED_INT;if(i===nn)return n.FLOAT;if(i===Tn)return n.HALF_FLOAT;if(i===Hl)return n.ALPHA;if(i===Wl)return n.RGB;if(i===qt)return n.RGBA;if(i===An)return n.DEPTH_COMPONENT;if(i===Jn)return n.DEPTH_STENCIL;if(i===Xl)return n.RED;if(i===Xa)return n.RED_INTEGER;if(i===Ci)return n.RG;if(i===ja)return n.RG_INTEGER;if(i===Ya)return n.RGBA_INTEGER;if(i===zs||i===Gs||i===ks||i===Vs)if(a===Qe)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===zs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Gs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ks)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Vs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===zs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Gs)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ks)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Vs)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===sa||i===ra||i===aa||i===oa)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===sa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ra)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===aa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===oa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===la||i===ca||i===ha||i===ua||i===da||i===fa||i===pa)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===la||i===ca)return a===Qe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===ha)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===ua)return r.COMPRESSED_R11_EAC;if(i===da)return r.COMPRESSED_SIGNED_R11_EAC;if(i===fa)return r.COMPRESSED_RG11_EAC;if(i===pa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===ma||i===ga||i===_a||i===xa||i===va||i===Sa||i===Ma||i===Ea||i===ya||i===ba||i===Ta||i===Aa||i===wa||i===Ra)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===ma)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ga)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===_a)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===xa)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===va)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Sa)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ma)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ea)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ya)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ba)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ta)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Aa)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===wa)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ra)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ca||i===Pa||i===Da)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Ca)return a===Qe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Pa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Da)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ia||i===La||i===Ua||i===Na)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Ia)return r.COMPRESSED_RED_RGTC1_EXT;if(i===La)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ua)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Na)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ki?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const bg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Tg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Ag{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new tc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new hn({vertexShader:bg,fragmentShader:Tg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new cn(new ss(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class wg extends ei{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,p=null,h=null,m=null,g=null;const v=typeof XRWebGLBinding<"u",f=new Ag,d={},E=t.getContextAttributes();let T=null,y=null;const P=[],A=[],D=new Ue;let x=null;const M=new Vt;M.viewport=new ct;const Y=new Vt;Y.viewport=new ct;const R=[M,Y],B=new Fu;let G=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let ie=P[Z];return ie===void 0&&(ie=new gr,P[Z]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(Z){let ie=P[Z];return ie===void 0&&(ie=new gr,P[Z]=ie),ie.getGripSpace()},this.getHand=function(Z){let ie=P[Z];return ie===void 0&&(ie=new gr,P[Z]=ie),ie.getHandSpace()};function k(Z){const ie=A.indexOf(Z.inputSource);if(ie===-1)return;const ae=P[ie];ae!==void 0&&(ae.update(Z.inputSource,Z.frame,l||a),ae.dispatchEvent({type:Z.type,data:Z.inputSource}))}function z(){s.removeEventListener("select",k),s.removeEventListener("selectstart",k),s.removeEventListener("selectend",k),s.removeEventListener("squeeze",k),s.removeEventListener("squeezestart",k),s.removeEventListener("squeezeend",k),s.removeEventListener("end",z),s.removeEventListener("inputsourceschange",V);for(let Z=0;Z<P.length;Z++){const ie=A[Z];ie!==null&&(A[Z]=null,P[Z].disconnect(ie))}G=null,X=null,f.reset();for(const Z in d)delete d[Z];e.setRenderTarget(T),m=null,h=null,p=null,s=null,y=null,Ve.stop(),i.isPresenting=!1,e.setPixelRatio(x),e.setSize(D.width,D.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,i.isPresenting===!0&&Ce("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,i.isPresenting===!0&&Ce("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Z){l=Z},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return p===null&&v&&(p=new XRWebGLBinding(s,t)),p},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(T=e.getRenderTarget(),s.addEventListener("select",k),s.addEventListener("selectstart",k),s.addEventListener("selectend",k),s.addEventListener("squeeze",k),s.addEventListener("squeezestart",k),s.addEventListener("squeezeend",k),s.addEventListener("end",z),s.addEventListener("inputsourceschange",V),E.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(D),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ae=null,Ie=null,Re=null;E.depth&&(Re=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ae=E.stencil?Jn:An,Ie=E.stencil?Ki:on);const De={colorFormat:t.RGBA8,depthFormat:Re,scaleFactor:r};p=this.getBinding(),h=p.createProjectionLayer(De),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),y=new an(h.textureWidth,h.textureHeight,{format:qt,type:Gt,depthTexture:new ts(h.textureWidth,h.textureHeight,Ie,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const ae={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,t,ae),s.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),y=new an(m.framebufferWidth,m.framebufferHeight,{format:qt,type:Gt,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Ve.setContext(s),Ve.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function V(Z){for(let ie=0;ie<Z.removed.length;ie++){const ae=Z.removed[ie],Ie=A.indexOf(ae);Ie>=0&&(A[Ie]=null,P[Ie].disconnect(ae))}for(let ie=0;ie<Z.added.length;ie++){const ae=Z.added[ie];let Ie=A.indexOf(ae);if(Ie===-1){for(let De=0;De<P.length;De++)if(De>=A.length){A.push(ae),Ie=De;break}else if(A[De]===null){A[De]=ae,Ie=De;break}if(Ie===-1)break}const Re=P[Ie];Re&&Re.connect(ae)}}const ee=new O,Q=new O;function ue(Z,ie,ae){ee.setFromMatrixPosition(ie.matrixWorld),Q.setFromMatrixPosition(ae.matrixWorld);const Ie=ee.distanceTo(Q),Re=ie.projectionMatrix.elements,De=ae.projectionMatrix.elements,ut=Re[14]/(Re[10]-1),He=Re[14]/(Re[10]+1),Xe=(Re[9]+1)/Re[5],je=(Re[9]-1)/Re[5],Fe=(Re[8]-1)/Re[0],rt=(De[8]+1)/De[0],C=ut*Fe,ot=ut*rt,Ye=Ie/(-Fe+rt),Ke=Ye*-Fe;if(ie.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Ke),Z.translateZ(Ye),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Re[10]===-1)Z.projectionMatrix.copy(ie.projectionMatrix),Z.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const Ee=ut+Ye,b=He+Ye,_=C-Ke,U=ot+(Ie-Ke),w=Xe*He/b*Ee,I=je*He/b*Ee;Z.projectionMatrix.makePerspective(_,U,w,I,Ee,b),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function pe(Z,ie){ie===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(ie.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let ie=Z.near,ae=Z.far;f.texture!==null&&(f.depthNear>0&&(ie=f.depthNear),f.depthFar>0&&(ae=f.depthFar)),B.near=Y.near=M.near=ie,B.far=Y.far=M.far=ae,(G!==B.near||X!==B.far)&&(s.updateRenderState({depthNear:B.near,depthFar:B.far}),G=B.near,X=B.far),B.layers.mask=Z.layers.mask|6,M.layers.mask=B.layers.mask&-5,Y.layers.mask=B.layers.mask&-3;const Ie=Z.parent,Re=B.cameras;pe(B,Ie);for(let De=0;De<Re.length;De++)pe(Re[De],Ie);Re.length===2?ue(B,M,Y):B.projectionMatrix.copy(M.projectionMatrix),K(Z,B,Ie)};function K(Z,ie,ae){ae===null?Z.matrix.copy(ie.matrixWorld):(Z.matrix.copy(ae.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(ie.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(ie.projectionMatrix),Z.projectionMatrixInverse.copy(ie.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=es*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(h===null&&m===null))return c},this.setFoveation=function(Z){c=Z,h!==null&&(h.fixedFoveation=Z),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=Z)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(B)},this.getCameraTexture=function(Z){return d[Z]};let xe=null;function Pe(Z,ie){if(u=ie.getViewerPose(l||a),g=ie,u!==null){const ae=u.views;m!==null&&(e.setRenderTargetFramebuffer(y,m.framebuffer),e.setRenderTarget(y));let Ie=!1;ae.length!==B.cameras.length&&(B.cameras.length=0,Ie=!0);for(let He=0;He<ae.length;He++){const Xe=ae[He];let je=null;if(m!==null)je=m.getViewport(Xe);else{const rt=p.getViewSubImage(h,Xe);je=rt.viewport,He===0&&(e.setRenderTargetTextures(y,rt.colorTexture,rt.depthStencilTexture),e.setRenderTarget(y))}let Fe=R[He];Fe===void 0&&(Fe=new Vt,Fe.layers.enable(He),Fe.viewport=new ct,R[He]=Fe),Fe.matrix.fromArray(Xe.transform.matrix),Fe.matrix.decompose(Fe.position,Fe.quaternion,Fe.scale),Fe.projectionMatrix.fromArray(Xe.projectionMatrix),Fe.projectionMatrixInverse.copy(Fe.projectionMatrix).invert(),Fe.viewport.set(je.x,je.y,je.width,je.height),He===0&&(B.matrix.copy(Fe.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),Ie===!0&&B.cameras.push(Fe)}const Re=s.enabledFeatures;if(Re&&Re.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){p=i.getBinding();const He=p.getDepthInformation(ae[0]);He&&He.isValid&&He.texture&&f.init(He,s.renderState)}if(Re&&Re.includes("camera-access")&&v){e.state.unbindTexture(),p=i.getBinding();for(let He=0;He<ae.length;He++){const Xe=ae[He].camera;if(Xe){let je=d[Xe];je||(je=new tc,d[Xe]=je);const Fe=p.getCameraImage(Xe);je.sourceTexture=Fe}}}}for(let ae=0;ae<P.length;ae++){const Ie=A[ae],Re=P[ae];Ie!==null&&Re!==void 0&&Re.update(Ie,ie,l||a)}xe&&xe(Z,ie),ie.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ie}),g=null}const Ve=new rc;Ve.setAnimationLoop(Pe),this.setAnimationLoop=function(Z){xe=Z},this.dispose=function(){}}}const jn=new ln,Rg=new at;function Cg(n,e){function t(f,d){f.matrixAutoUpdate===!0&&f.updateMatrix(),d.value.copy(f.matrix)}function i(f,d){d.color.getRGB(f.fogColor.value,nc(n)),d.isFog?(f.fogNear.value=d.near,f.fogFar.value=d.far):d.isFogExp2&&(f.fogDensity.value=d.density)}function s(f,d,E,T,y){d.isMeshBasicMaterial?r(f,d):d.isMeshLambertMaterial?(r(f,d),d.envMap&&(f.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(r(f,d),p(f,d)):d.isMeshPhongMaterial?(r(f,d),u(f,d),d.envMap&&(f.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(r(f,d),h(f,d),d.isMeshPhysicalMaterial&&m(f,d,y)):d.isMeshMatcapMaterial?(r(f,d),g(f,d)):d.isMeshDepthMaterial?r(f,d):d.isMeshDistanceMaterial?(r(f,d),v(f,d)):d.isMeshNormalMaterial?r(f,d):d.isLineBasicMaterial?(a(f,d),d.isLineDashedMaterial&&o(f,d)):d.isPointsMaterial?c(f,d,E,T):d.isSpriteMaterial?l(f,d):d.isShadowMaterial?(f.color.value.copy(d.color),f.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(f,d){f.opacity.value=d.opacity,d.color&&f.diffuse.value.copy(d.color),d.emissive&&f.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(f.map.value=d.map,t(d.map,f.mapTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,t(d.alphaMap,f.alphaMapTransform)),d.bumpMap&&(f.bumpMap.value=d.bumpMap,t(d.bumpMap,f.bumpMapTransform),f.bumpScale.value=d.bumpScale,d.side===Ut&&(f.bumpScale.value*=-1)),d.normalMap&&(f.normalMap.value=d.normalMap,t(d.normalMap,f.normalMapTransform),f.normalScale.value.copy(d.normalScale),d.side===Ut&&f.normalScale.value.negate()),d.displacementMap&&(f.displacementMap.value=d.displacementMap,t(d.displacementMap,f.displacementMapTransform),f.displacementScale.value=d.displacementScale,f.displacementBias.value=d.displacementBias),d.emissiveMap&&(f.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,f.emissiveMapTransform)),d.specularMap&&(f.specularMap.value=d.specularMap,t(d.specularMap,f.specularMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest);const E=e.get(d),T=E.envMap,y=E.envMapRotation;T&&(f.envMap.value=T,jn.copy(y),jn.x*=-1,jn.y*=-1,jn.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(jn.y*=-1,jn.z*=-1),f.envMapRotation.value.setFromMatrix4(Rg.makeRotationFromEuler(jn)),f.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=d.reflectivity,f.ior.value=d.ior,f.refractionRatio.value=d.refractionRatio),d.lightMap&&(f.lightMap.value=d.lightMap,f.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,f.lightMapTransform)),d.aoMap&&(f.aoMap.value=d.aoMap,f.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,f.aoMapTransform))}function a(f,d){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,d.map&&(f.map.value=d.map,t(d.map,f.mapTransform))}function o(f,d){f.dashSize.value=d.dashSize,f.totalSize.value=d.dashSize+d.gapSize,f.scale.value=d.scale}function c(f,d,E,T){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,f.size.value=d.size*E,f.scale.value=T*.5,d.map&&(f.map.value=d.map,t(d.map,f.uvTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,t(d.alphaMap,f.alphaMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest)}function l(f,d){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,f.rotation.value=d.rotation,d.map&&(f.map.value=d.map,t(d.map,f.mapTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,t(d.alphaMap,f.alphaMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest)}function u(f,d){f.specular.value.copy(d.specular),f.shininess.value=Math.max(d.shininess,1e-4)}function p(f,d){d.gradientMap&&(f.gradientMap.value=d.gradientMap)}function h(f,d){f.metalness.value=d.metalness,d.metalnessMap&&(f.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,f.metalnessMapTransform)),f.roughness.value=d.roughness,d.roughnessMap&&(f.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,f.roughnessMapTransform)),d.envMap&&(f.envMapIntensity.value=d.envMapIntensity)}function m(f,d,E){f.ior.value=d.ior,d.sheen>0&&(f.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),f.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(f.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,f.sheenColorMapTransform)),d.sheenRoughnessMap&&(f.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,f.sheenRoughnessMapTransform))),d.clearcoat>0&&(f.clearcoat.value=d.clearcoat,f.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(f.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,f.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(f.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Ut&&f.clearcoatNormalScale.value.negate())),d.dispersion>0&&(f.dispersion.value=d.dispersion),d.iridescence>0&&(f.iridescence.value=d.iridescence,f.iridescenceIOR.value=d.iridescenceIOR,f.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(f.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,f.iridescenceMapTransform)),d.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),d.transmission>0&&(f.transmission.value=d.transmission,f.transmissionSamplerMap.value=E.texture,f.transmissionSamplerSize.value.set(E.width,E.height),d.transmissionMap&&(f.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,f.transmissionMapTransform)),f.thickness.value=d.thickness,d.thicknessMap&&(f.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=d.attenuationDistance,f.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(f.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(f.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=d.specularIntensity,f.specularColor.value.copy(d.specularColor),d.specularColorMap&&(f.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,f.specularColorMapTransform)),d.specularIntensityMap&&(f.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,f.specularIntensityMapTransform))}function g(f,d){d.matcap&&(f.matcap.value=d.matcap)}function v(f,d){const E=e.get(d).light;f.referencePosition.value.setFromMatrixPosition(E.matrixWorld),f.nearDistance.value=E.shadow.camera.near,f.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Pg(n,e,t,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(E,T){const y=T.program;i.uniformBlockBinding(E,y)}function l(E,T){let y=s[E.id];y===void 0&&(g(E),y=u(E),s[E.id]=y,E.addEventListener("dispose",f));const P=T.program;i.updateUBOMapping(E,P);const A=e.render.frame;r[E.id]!==A&&(h(E),r[E.id]=A)}function u(E){const T=p();E.__bindingPointIndex=T;const y=n.createBuffer(),P=E.__size,A=E.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,P,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,y),y}function p(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return Ze("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(E){const T=s[E.id],y=E.uniforms,P=E.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let A=0,D=y.length;A<D;A++){const x=Array.isArray(y[A])?y[A]:[y[A]];for(let M=0,Y=x.length;M<Y;M++){const R=x[M];if(m(R,A,M,P)===!0){const B=R.__offset,G=Array.isArray(R.value)?R.value:[R.value];let X=0;for(let k=0;k<G.length;k++){const z=G[k],V=v(z);typeof z=="number"||typeof z=="boolean"?(R.__data[0]=z,n.bufferSubData(n.UNIFORM_BUFFER,B+X,R.__data)):z.isMatrix3?(R.__data[0]=z.elements[0],R.__data[1]=z.elements[1],R.__data[2]=z.elements[2],R.__data[3]=0,R.__data[4]=z.elements[3],R.__data[5]=z.elements[4],R.__data[6]=z.elements[5],R.__data[7]=0,R.__data[8]=z.elements[6],R.__data[9]=z.elements[7],R.__data[10]=z.elements[8],R.__data[11]=0):(z.toArray(R.__data,X),X+=V.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,B,R.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(E,T,y,P){const A=E.value,D=T+"_"+y;if(P[D]===void 0)return typeof A=="number"||typeof A=="boolean"?P[D]=A:P[D]=A.clone(),!0;{const x=P[D];if(typeof A=="number"||typeof A=="boolean"){if(x!==A)return P[D]=A,!0}else if(x.equals(A)===!1)return x.copy(A),!0}return!1}function g(E){const T=E.uniforms;let y=0;const P=16;for(let D=0,x=T.length;D<x;D++){const M=Array.isArray(T[D])?T[D]:[T[D]];for(let Y=0,R=M.length;Y<R;Y++){const B=M[Y],G=Array.isArray(B.value)?B.value:[B.value];for(let X=0,k=G.length;X<k;X++){const z=G[X],V=v(z),ee=y%P,Q=ee%V.boundary,ue=ee+Q;y+=Q,ue!==0&&P-ue<V.storage&&(y+=P-ue),B.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=y,y+=V.storage}}}const A=y%P;return A>0&&(y+=P-A),E.__size=y,E.__cache={},this}function v(E){const T={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(T.boundary=4,T.storage=4):E.isVector2?(T.boundary=8,T.storage=8):E.isVector3||E.isColor?(T.boundary=16,T.storage=12):E.isVector4?(T.boundary=16,T.storage=16):E.isMatrix3?(T.boundary=48,T.storage=48):E.isMatrix4?(T.boundary=64,T.storage=64):E.isTexture?Ce("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ce("WebGLRenderer: Unsupported uniform value type.",E),T}function f(E){const T=E.target;T.removeEventListener("dispose",f);const y=a.indexOf(T.__bindingPointIndex);a.splice(y,1),n.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function d(){for(const E in s)n.deleteBuffer(s[E]);a=[],s={},r={}}return{bind:c,update:l,dispose:d}}const Dg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Qt=null;function Ig(){return Qt===null&&(Qt=new du(Dg,16,16,Ci,Tn),Qt.name="DFG_LUT",Qt.minFilter=At,Qt.magFilter=At,Qt.wrapS=Mn,Qt.wrapT=Mn,Qt.generateMipmaps=!1,Qt.needsUpdate=!0),Qt}class Lg{constructor(e={}){const{canvas:t=Rh(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:h=!1,outputBufferType:m=Gt}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;const v=m,f=new Set([Ya,ja,Xa]),d=new Set([Gt,on,$i,Ki,Ha,Wa]),E=new Uint32Array(4),T=new Int32Array(4);let y=null,P=null;const A=[],D=[];let x=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=rn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const M=this;let Y=!1;this._outputColorSpace=zt;let R=0,B=0,G=null,X=-1,k=null;const z=new ct,V=new ct;let ee=null;const Q=new We(0);let ue=0,pe=t.width,K=t.height,xe=1,Pe=null,Ve=null;const Z=new ct(0,0,pe,K),ie=new ct(0,0,pe,K);let ae=!1;const Ie=new Qa;let Re=!1,De=!1;const ut=new at,He=new O,Xe=new ct,je={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Fe=!1;function rt(){return G===null?xe:1}let C=i;function ot(S,N){return t.getContext(S,N)}try{const S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ga}`),t.addEventListener("webglcontextlost",ye,!1),t.addEventListener("webglcontextrestored",Le,!1),t.addEventListener("webglcontextcreationerror",st,!1),C===null){const N="webgl2";if(C=ot(N,S),C===null)throw ot(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw Ze("WebGLRenderer: "+S.message),S}let Ye,Ke,Ee,b,_,U,w,I,F,J,$,oe,Se,te,se,Me,me,ge,ze,L,le,re,ve;function ne(){Ye=new Lp(C),Ye.init(),le=new yg(C,Ye),Ke=new Tp(C,Ye,e,le),Ee=new Mg(C,Ye),Ke.reversedDepthBuffer&&h&&Ee.buffers.depth.setReversed(!0),b=new Fp(C),_=new og,U=new Eg(C,Ye,Ee,_,Ke,le,b),w=new Ip(M),I=new Gu(C),re=new yp(C,I),F=new Up(C,I,b,re),J=new Bp(C,F,I,re,b),ge=new Op(C,Ke,U),se=new Ap(_),$=new ag(M,w,Ye,Ke,re,se),oe=new Cg(M,_),Se=new cg,te=new mg(Ye),me=new Ep(M,w,Ee,J,g,c),Me=new Sg(M,J,Ke),ve=new Pg(C,b,Ke,Ee),ze=new bp(C,Ye,b),L=new Np(C,Ye,b),b.programs=$.programs,M.capabilities=Ke,M.extensions=Ye,M.properties=_,M.renderLists=Se,M.shadowMap=Me,M.state=Ee,M.info=b}ne(),v!==Gt&&(x=new Gp(v,t.width,t.height,s,r));const q=new wg(M,C);this.xr=q,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const S=Ye.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Ye.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return xe},this.setPixelRatio=function(S){S!==void 0&&(xe=S,this.setSize(pe,K,!1))},this.getSize=function(S){return S.set(pe,K)},this.setSize=function(S,N,j=!0){if(q.isPresenting){Ce("WebGLRenderer: Can't change size while VR device is presenting.");return}pe=S,K=N,t.width=Math.floor(S*xe),t.height=Math.floor(N*xe),j===!0&&(t.style.width=S+"px",t.style.height=N+"px"),x!==null&&x.setSize(t.width,t.height),this.setViewport(0,0,S,N)},this.getDrawingBufferSize=function(S){return S.set(pe*xe,K*xe).floor()},this.setDrawingBufferSize=function(S,N,j){pe=S,K=N,xe=j,t.width=Math.floor(S*j),t.height=Math.floor(N*j),this.setViewport(0,0,S,N)},this.setEffects=function(S){if(v===Gt){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let N=0;N<S.length;N++)if(S[N].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}x.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(z)},this.getViewport=function(S){return S.copy(Z)},this.setViewport=function(S,N,j,W){S.isVector4?Z.set(S.x,S.y,S.z,S.w):Z.set(S,N,j,W),Ee.viewport(z.copy(Z).multiplyScalar(xe).round())},this.getScissor=function(S){return S.copy(ie)},this.setScissor=function(S,N,j,W){S.isVector4?ie.set(S.x,S.y,S.z,S.w):ie.set(S,N,j,W),Ee.scissor(V.copy(ie).multiplyScalar(xe).round())},this.getScissorTest=function(){return ae},this.setScissorTest=function(S){Ee.setScissorTest(ae=S)},this.setOpaqueSort=function(S){Pe=S},this.setTransparentSort=function(S){Ve=S},this.getClearColor=function(S){return S.copy(me.getClearColor())},this.setClearColor=function(){me.setClearColor(...arguments)},this.getClearAlpha=function(){return me.getClearAlpha()},this.setClearAlpha=function(){me.setClearAlpha(...arguments)},this.clear=function(S=!0,N=!0,j=!0){let W=0;if(S){let H=!1;if(G!==null){const de=G.texture.format;H=f.has(de)}if(H){const de=G.texture.type,_e=d.has(de),fe=me.getClearColor(),be=me.getClearAlpha(),Ae=fe.r,Ne=fe.g,Ge=fe.b;_e?(E[0]=Ae,E[1]=Ne,E[2]=Ge,E[3]=be,C.clearBufferuiv(C.COLOR,0,E)):(T[0]=Ae,T[1]=Ne,T[2]=Ge,T[3]=be,C.clearBufferiv(C.COLOR,0,T))}else W|=C.COLOR_BUFFER_BIT}N&&(W|=C.DEPTH_BUFFER_BIT),j&&(W|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W!==0&&C.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ye,!1),t.removeEventListener("webglcontextrestored",Le,!1),t.removeEventListener("webglcontextcreationerror",st,!1),me.dispose(),Se.dispose(),te.dispose(),_.dispose(),w.dispose(),J.dispose(),re.dispose(),ve.dispose(),$.dispose(),q.dispose(),q.removeEventListener("sessionstart",io),q.removeEventListener("sessionend",so),zn.stop()};function ye(S){S.preventDefault(),Eo("WebGLRenderer: Context Lost."),Y=!0}function Le(){Eo("WebGLRenderer: Context Restored."),Y=!1;const S=b.autoReset,N=Me.enabled,j=Me.autoUpdate,W=Me.needsUpdate,H=Me.type;ne(),b.autoReset=S,Me.enabled=N,Me.autoUpdate=j,Me.needsUpdate=W,Me.type=H}function st(S){Ze("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Je(S){const N=S.target;N.removeEventListener("dispose",Je),un(N)}function un(S){dn(S),_.remove(S)}function dn(S){const N=_.get(S).programs;N!==void 0&&(N.forEach(function(j){$.releaseProgram(j)}),S.isShaderMaterial&&$.releaseShaderCache(S))}this.renderBufferDirect=function(S,N,j,W,H,de){N===null&&(N=je);const _e=H.isMesh&&H.matrixWorld.determinant()<0,fe=mc(S,N,j,W,H);Ee.setMaterial(W,_e);let be=j.index,Ae=1;if(W.wireframe===!0){if(be=F.getWireframeAttribute(j),be===void 0)return;Ae=2}const Ne=j.drawRange,Ge=j.attributes.position;let we=Ne.start*Ae,et=(Ne.start+Ne.count)*Ae;de!==null&&(we=Math.max(we,de.start*Ae),et=Math.min(et,(de.start+de.count)*Ae)),be!==null?(we=Math.max(we,0),et=Math.min(et,be.count)):Ge!=null&&(we=Math.max(we,0),et=Math.min(et,Ge.count));const ht=et-we;if(ht<0||ht===1/0)return;re.setup(H,W,fe,j,be);let lt,tt=ze;if(be!==null&&(lt=I.get(be),tt=L,tt.setIndex(lt)),H.isMesh)W.wireframe===!0?(Ee.setLineWidth(W.wireframeLinewidth*rt()),tt.setMode(C.LINES)):tt.setMode(C.TRIANGLES);else if(H.isLine){let yt=W.linewidth;yt===void 0&&(yt=1),Ee.setLineWidth(yt*rt()),H.isLineSegments?tt.setMode(C.LINES):H.isLineLoop?tt.setMode(C.LINE_LOOP):tt.setMode(C.LINE_STRIP)}else H.isPoints?tt.setMode(C.POINTS):H.isSprite&&tt.setMode(C.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)js("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),tt.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(Ye.get("WEBGL_multi_draw"))tt.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const yt=H._multiDrawStarts,Te=H._multiDrawCounts,Ft=H._multiDrawCount,$e=be?I.get(be).bytesPerElement:1,Ht=_.get(W).currentProgram.getUniforms();for(let Kt=0;Kt<Ft;Kt++)Ht.setValue(C,"_gl_DrawID",Kt),tt.render(yt[Kt]/$e,Te[Kt])}else if(H.isInstancedMesh)tt.renderInstances(we,ht,H.count);else if(j.isInstancedBufferGeometry){const yt=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,Te=Math.min(j.instanceCount,yt);tt.renderInstances(we,ht,Te)}else tt.render(we,ht)};function no(S,N,j){S.transparent===!0&&S.side===vn&&S.forceSinglePass===!1?(S.side=Ut,S.needsUpdate=!0,as(S,N,j),S.side=bn,S.needsUpdate=!0,as(S,N,j),S.side=vn):as(S,N,j)}this.compile=function(S,N,j=null){j===null&&(j=S),P=te.get(j),P.init(N),D.push(P),j.traverseVisible(function(H){H.isLight&&H.layers.test(N.layers)&&(P.pushLight(H),H.castShadow&&P.pushShadow(H))}),S!==j&&S.traverseVisible(function(H){H.isLight&&H.layers.test(N.layers)&&(P.pushLight(H),H.castShadow&&P.pushShadow(H))}),P.setupLights();const W=new Set;return S.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const de=H.material;if(de)if(Array.isArray(de))for(let _e=0;_e<de.length;_e++){const fe=de[_e];no(fe,j,H),W.add(fe)}else no(de,j,H),W.add(de)}),P=D.pop(),W},this.compileAsync=function(S,N,j=null){const W=this.compile(S,N,j);return new Promise(H=>{function de(){if(W.forEach(function(_e){_.get(_e).currentProgram.isReady()&&W.delete(_e)}),W.size===0){H(S);return}setTimeout(de,10)}Ye.get("KHR_parallel_shader_compile")!==null?de():setTimeout(de,10)})};let tr=null;function pc(S){tr&&tr(S)}function io(){zn.stop()}function so(){zn.start()}const zn=new rc;zn.setAnimationLoop(pc),typeof self<"u"&&zn.setContext(self),this.setAnimationLoop=function(S){tr=S,q.setAnimationLoop(S),S===null?zn.stop():zn.start()},q.addEventListener("sessionstart",io),q.addEventListener("sessionend",so),this.render=function(S,N){if(N!==void 0&&N.isCamera!==!0){Ze("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(Y===!0)return;const j=q.enabled===!0&&q.isPresenting===!0,W=x!==null&&(G===null||j)&&x.begin(M,G);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(x===null||x.isCompositing()===!1)&&(q.cameraAutoUpdate===!0&&q.updateCamera(N),N=q.getCamera()),S.isScene===!0&&S.onBeforeRender(M,S,N,G),P=te.get(S,D.length),P.init(N),D.push(P),ut.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Ie.setFromProjectionMatrix(ut,sn,N.reversedDepth),De=this.localClippingEnabled,Re=se.init(this.clippingPlanes,De),y=Se.get(S,A.length),y.init(),A.push(y),q.enabled===!0&&q.isPresenting===!0){const _e=M.xr.getDepthSensingMesh();_e!==null&&nr(_e,N,-1/0,M.sortObjects)}nr(S,N,0,M.sortObjects),y.finish(),M.sortObjects===!0&&y.sort(Pe,Ve),Fe=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,Fe&&me.addToRenderList(y,S),this.info.render.frame++,Re===!0&&se.beginShadows();const H=P.state.shadowsArray;if(Me.render(H,S,N),Re===!0&&se.endShadows(),this.info.autoReset===!0&&this.info.reset(),(W&&x.hasRenderPass())===!1){const _e=y.opaque,fe=y.transmissive;if(P.setupLights(),N.isArrayCamera){const be=N.cameras;if(fe.length>0)for(let Ae=0,Ne=be.length;Ae<Ne;Ae++){const Ge=be[Ae];ao(_e,fe,S,Ge)}Fe&&me.render(S);for(let Ae=0,Ne=be.length;Ae<Ne;Ae++){const Ge=be[Ae];ro(y,S,Ge,Ge.viewport)}}else fe.length>0&&ao(_e,fe,S,N),Fe&&me.render(S),ro(y,S,N)}G!==null&&B===0&&(U.updateMultisampleRenderTarget(G),U.updateRenderTargetMipmap(G)),W&&x.end(M),S.isScene===!0&&S.onAfterRender(M,S,N),re.resetDefaultState(),X=-1,k=null,D.pop(),D.length>0?(P=D[D.length-1],Re===!0&&se.setGlobalState(M.clippingPlanes,P.state.camera)):P=null,A.pop(),A.length>0?y=A[A.length-1]:y=null};function nr(S,N,j,W){if(S.visible===!1)return;if(S.layers.test(N.layers)){if(S.isGroup)j=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(N);else if(S.isLight)P.pushLight(S),S.castShadow&&P.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Ie.intersectsSprite(S)){W&&Xe.setFromMatrixPosition(S.matrixWorld).applyMatrix4(ut);const _e=J.update(S),fe=S.material;fe.visible&&y.push(S,_e,fe,j,Xe.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Ie.intersectsObject(S))){const _e=J.update(S),fe=S.material;if(W&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Xe.copy(S.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),Xe.copy(_e.boundingSphere.center)),Xe.applyMatrix4(S.matrixWorld).applyMatrix4(ut)),Array.isArray(fe)){const be=_e.groups;for(let Ae=0,Ne=be.length;Ae<Ne;Ae++){const Ge=be[Ae],we=fe[Ge.materialIndex];we&&we.visible&&y.push(S,_e,we,j,Xe.z,Ge)}}else fe.visible&&y.push(S,_e,fe,j,Xe.z,null)}}const de=S.children;for(let _e=0,fe=de.length;_e<fe;_e++)nr(de[_e],N,j,W)}function ro(S,N,j,W){const{opaque:H,transmissive:de,transparent:_e}=S;P.setupLightsView(j),Re===!0&&se.setGlobalState(M.clippingPlanes,j),W&&Ee.viewport(z.copy(W)),H.length>0&&rs(H,N,j),de.length>0&&rs(de,N,j),_e.length>0&&rs(_e,N,j),Ee.buffers.depth.setTest(!0),Ee.buffers.depth.setMask(!0),Ee.buffers.color.setMask(!0),Ee.setPolygonOffset(!1)}function ao(S,N,j,W){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;if(P.state.transmissionRenderTarget[W.id]===void 0){const we=Ye.has("EXT_color_buffer_half_float")||Ye.has("EXT_color_buffer_float");P.state.transmissionRenderTarget[W.id]=new an(1,1,{generateMipmaps:!0,type:we?Tn:Gt,minFilter:Kn,samples:Math.max(4,Ke.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qe.workingColorSpace})}const de=P.state.transmissionRenderTarget[W.id],_e=W.viewport||z;de.setSize(_e.z*M.transmissionResolutionScale,_e.w*M.transmissionResolutionScale);const fe=M.getRenderTarget(),be=M.getActiveCubeFace(),Ae=M.getActiveMipmapLevel();M.setRenderTarget(de),M.getClearColor(Q),ue=M.getClearAlpha(),ue<1&&M.setClearColor(16777215,.5),M.clear(),Fe&&me.render(j);const Ne=M.toneMapping;M.toneMapping=rn;const Ge=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),P.setupLightsView(W),Re===!0&&se.setGlobalState(M.clippingPlanes,W),rs(S,j,W),U.updateMultisampleRenderTarget(de),U.updateRenderTargetMipmap(de),Ye.has("WEBGL_multisampled_render_to_texture")===!1){let we=!1;for(let et=0,ht=N.length;et<ht;et++){const lt=N[et],{object:tt,geometry:yt,material:Te,group:Ft}=lt;if(Te.side===vn&&tt.layers.test(W.layers)){const $e=Te.side;Te.side=Ut,Te.needsUpdate=!0,oo(tt,j,W,yt,Te,Ft),Te.side=$e,Te.needsUpdate=!0,we=!0}}we===!0&&(U.updateMultisampleRenderTarget(de),U.updateRenderTargetMipmap(de))}M.setRenderTarget(fe,be,Ae),M.setClearColor(Q,ue),Ge!==void 0&&(W.viewport=Ge),M.toneMapping=Ne}function rs(S,N,j){const W=N.isScene===!0?N.overrideMaterial:null;for(let H=0,de=S.length;H<de;H++){const _e=S[H],{object:fe,geometry:be,group:Ae}=_e;let Ne=_e.material;Ne.allowOverride===!0&&W!==null&&(Ne=W),fe.layers.test(j.layers)&&oo(fe,N,j,be,Ne,Ae)}}function oo(S,N,j,W,H,de){S.onBeforeRender(M,N,j,W,H,de),S.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),H.onBeforeRender(M,N,j,W,S,de),H.transparent===!0&&H.side===vn&&H.forceSinglePass===!1?(H.side=Ut,H.needsUpdate=!0,M.renderBufferDirect(j,N,W,H,S,de),H.side=bn,H.needsUpdate=!0,M.renderBufferDirect(j,N,W,H,S,de),H.side=vn):M.renderBufferDirect(j,N,W,H,S,de),S.onAfterRender(M,N,j,W,H,de)}function as(S,N,j){N.isScene!==!0&&(N=je);const W=_.get(S),H=P.state.lights,de=P.state.shadowsArray,_e=H.state.version,fe=$.getParameters(S,H.state,de,N,j),be=$.getProgramCacheKey(fe);let Ae=W.programs;W.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?N.environment:null,W.fog=N.fog;const Ne=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;W.envMap=w.get(S.envMap||W.environment,Ne),W.envMapRotation=W.environment!==null&&S.envMap===null?N.environmentRotation:S.envMapRotation,Ae===void 0&&(S.addEventListener("dispose",Je),Ae=new Map,W.programs=Ae);let Ge=Ae.get(be);if(Ge!==void 0){if(W.currentProgram===Ge&&W.lightsStateVersion===_e)return co(S,fe),Ge}else fe.uniforms=$.getUniforms(S),S.onBeforeCompile(fe,M),Ge=$.acquireProgram(fe,be),Ae.set(be,Ge),W.uniforms=fe.uniforms;const we=W.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(we.clippingPlanes=se.uniform),co(S,fe),W.needsLights=_c(S),W.lightsStateVersion=_e,W.needsLights&&(we.ambientLightColor.value=H.state.ambient,we.lightProbe.value=H.state.probe,we.directionalLights.value=H.state.directional,we.directionalLightShadows.value=H.state.directionalShadow,we.spotLights.value=H.state.spot,we.spotLightShadows.value=H.state.spotShadow,we.rectAreaLights.value=H.state.rectArea,we.ltc_1.value=H.state.rectAreaLTC1,we.ltc_2.value=H.state.rectAreaLTC2,we.pointLights.value=H.state.point,we.pointLightShadows.value=H.state.pointShadow,we.hemisphereLights.value=H.state.hemi,we.directionalShadowMatrix.value=H.state.directionalShadowMatrix,we.spotLightMatrix.value=H.state.spotLightMatrix,we.spotLightMap.value=H.state.spotLightMap,we.pointShadowMatrix.value=H.state.pointShadowMatrix),W.currentProgram=Ge,W.uniformsList=null,Ge}function lo(S){if(S.uniformsList===null){const N=S.currentProgram.getUniforms();S.uniformsList=Hs.seqWithValue(N.seq,S.uniforms)}return S.uniformsList}function co(S,N){const j=_.get(S);j.outputColorSpace=N.outputColorSpace,j.batching=N.batching,j.batchingColor=N.batchingColor,j.instancing=N.instancing,j.instancingColor=N.instancingColor,j.instancingMorph=N.instancingMorph,j.skinning=N.skinning,j.morphTargets=N.morphTargets,j.morphNormals=N.morphNormals,j.morphColors=N.morphColors,j.morphTargetsCount=N.morphTargetsCount,j.numClippingPlanes=N.numClippingPlanes,j.numIntersection=N.numClipIntersection,j.vertexAlphas=N.vertexAlphas,j.vertexTangents=N.vertexTangents,j.toneMapping=N.toneMapping}function mc(S,N,j,W,H){N.isScene!==!0&&(N=je),U.resetTextureUnits();const de=N.fog,_e=W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial?N.environment:null,fe=G===null?M.outputColorSpace:G.isXRRenderTarget===!0?G.texture.colorSpace:Pi,be=W.isMeshStandardMaterial||W.isMeshLambertMaterial&&!W.envMap||W.isMeshPhongMaterial&&!W.envMap,Ae=w.get(W.envMap||_e,be),Ne=W.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,Ge=!!j.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),we=!!j.morphAttributes.position,et=!!j.morphAttributes.normal,ht=!!j.morphAttributes.color;let lt=rn;W.toneMapped&&(G===null||G.isXRRenderTarget===!0)&&(lt=M.toneMapping);const tt=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,yt=tt!==void 0?tt.length:0,Te=_.get(W),Ft=P.state.lights;if(Re===!0&&(De===!0||S!==k)){const xt=S===k&&W.id===X;se.setState(W,S,xt)}let $e=!1;W.version===Te.__version?(Te.needsLights&&Te.lightsStateVersion!==Ft.state.version||Te.outputColorSpace!==fe||H.isBatchedMesh&&Te.batching===!1||!H.isBatchedMesh&&Te.batching===!0||H.isBatchedMesh&&Te.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&Te.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&Te.instancing===!1||!H.isInstancedMesh&&Te.instancing===!0||H.isSkinnedMesh&&Te.skinning===!1||!H.isSkinnedMesh&&Te.skinning===!0||H.isInstancedMesh&&Te.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Te.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Te.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Te.instancingMorph===!1&&H.morphTexture!==null||Te.envMap!==Ae||W.fog===!0&&Te.fog!==de||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==se.numPlanes||Te.numIntersection!==se.numIntersection)||Te.vertexAlphas!==Ne||Te.vertexTangents!==Ge||Te.morphTargets!==we||Te.morphNormals!==et||Te.morphColors!==ht||Te.toneMapping!==lt||Te.morphTargetsCount!==yt)&&($e=!0):($e=!0,Te.__version=W.version);let Ht=Te.currentProgram;$e===!0&&(Ht=as(W,N,H));let Kt=!1,Gn=!1,ti=!1;const it=Ht.getUniforms(),Mt=Te.uniforms;if(Ee.useProgram(Ht.program)&&(Kt=!0,Gn=!0,ti=!0),W.id!==X&&(X=W.id,Gn=!0),Kt||k!==S){Ee.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),it.setValue(C,"projectionMatrix",S.projectionMatrix),it.setValue(C,"viewMatrix",S.matrixWorldInverse);const Rn=it.map.cameraPosition;Rn!==void 0&&Rn.setValue(C,He.setFromMatrixPosition(S.matrixWorld)),Ke.logarithmicDepthBuffer&&it.setValue(C,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&it.setValue(C,"isOrthographic",S.isOrthographicCamera===!0),k!==S&&(k=S,Gn=!0,ti=!0)}if(Te.needsLights&&(Ft.state.directionalShadowMap.length>0&&it.setValue(C,"directionalShadowMap",Ft.state.directionalShadowMap,U),Ft.state.spotShadowMap.length>0&&it.setValue(C,"spotShadowMap",Ft.state.spotShadowMap,U),Ft.state.pointShadowMap.length>0&&it.setValue(C,"pointShadowMap",Ft.state.pointShadowMap,U)),H.isSkinnedMesh){it.setOptional(C,H,"bindMatrix"),it.setOptional(C,H,"bindMatrixInverse");const xt=H.skeleton;xt&&(xt.boneTexture===null&&xt.computeBoneTexture(),it.setValue(C,"boneTexture",xt.boneTexture,U))}H.isBatchedMesh&&(it.setOptional(C,H,"batchingTexture"),it.setValue(C,"batchingTexture",H._matricesTexture,U),it.setOptional(C,H,"batchingIdTexture"),it.setValue(C,"batchingIdTexture",H._indirectTexture,U),it.setOptional(C,H,"batchingColorTexture"),H._colorsTexture!==null&&it.setValue(C,"batchingColorTexture",H._colorsTexture,U));const wn=j.morphAttributes;if((wn.position!==void 0||wn.normal!==void 0||wn.color!==void 0)&&ge.update(H,j,Ht),(Gn||Te.receiveShadow!==H.receiveShadow)&&(Te.receiveShadow=H.receiveShadow,it.setValue(C,"receiveShadow",H.receiveShadow)),(W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial)&&W.envMap===null&&N.environment!==null&&(Mt.envMapIntensity.value=N.environmentIntensity),Mt.dfgLUT!==void 0&&(Mt.dfgLUT.value=Ig()),Gn&&(it.setValue(C,"toneMappingExposure",M.toneMappingExposure),Te.needsLights&&gc(Mt,ti),de&&W.fog===!0&&oe.refreshFogUniforms(Mt,de),oe.refreshMaterialUniforms(Mt,W,xe,K,P.state.transmissionRenderTarget[S.id]),Hs.upload(C,lo(Te),Mt,U)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Hs.upload(C,lo(Te),Mt,U),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&it.setValue(C,"center",H.center),it.setValue(C,"modelViewMatrix",H.modelViewMatrix),it.setValue(C,"normalMatrix",H.normalMatrix),it.setValue(C,"modelMatrix",H.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const xt=W.uniformsGroups;for(let Rn=0,ni=xt.length;Rn<ni;Rn++){const ho=xt[Rn];ve.update(ho,Ht),ve.bind(ho,Ht)}}return Ht}function gc(S,N){S.ambientLightColor.needsUpdate=N,S.lightProbe.needsUpdate=N,S.directionalLights.needsUpdate=N,S.directionalLightShadows.needsUpdate=N,S.pointLights.needsUpdate=N,S.pointLightShadows.needsUpdate=N,S.spotLights.needsUpdate=N,S.spotLightShadows.needsUpdate=N,S.rectAreaLights.needsUpdate=N,S.hemisphereLights.needsUpdate=N}function _c(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return B},this.getRenderTarget=function(){return G},this.setRenderTargetTextures=function(S,N,j){const W=_.get(S);W.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),_.get(S.texture).__webglTexture=N,_.get(S.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:j,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,N){const j=_.get(S);j.__webglFramebuffer=N,j.__useDefaultFramebuffer=N===void 0};const xc=C.createFramebuffer();this.setRenderTarget=function(S,N=0,j=0){G=S,R=N,B=j;let W=null,H=!1,de=!1;if(S){const fe=_.get(S);if(fe.__useDefaultFramebuffer!==void 0){Ee.bindFramebuffer(C.FRAMEBUFFER,fe.__webglFramebuffer),z.copy(S.viewport),V.copy(S.scissor),ee=S.scissorTest,Ee.viewport(z),Ee.scissor(V),Ee.setScissorTest(ee),X=-1;return}else if(fe.__webglFramebuffer===void 0)U.setupRenderTarget(S);else if(fe.__hasExternalTextures)U.rebindTextures(S,_.get(S.texture).__webglTexture,_.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Ne=S.depthTexture;if(fe.__boundDepthTexture!==Ne){if(Ne!==null&&_.has(Ne)&&(S.width!==Ne.image.width||S.height!==Ne.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");U.setupDepthRenderbuffer(S)}}const be=S.texture;(be.isData3DTexture||be.isDataArrayTexture||be.isCompressedArrayTexture)&&(de=!0);const Ae=_.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ae[N])?W=Ae[N][j]:W=Ae[N],H=!0):S.samples>0&&U.useMultisampledRTT(S)===!1?W=_.get(S).__webglMultisampledFramebuffer:Array.isArray(Ae)?W=Ae[j]:W=Ae,z.copy(S.viewport),V.copy(S.scissor),ee=S.scissorTest}else z.copy(Z).multiplyScalar(xe).floor(),V.copy(ie).multiplyScalar(xe).floor(),ee=ae;if(j!==0&&(W=xc),Ee.bindFramebuffer(C.FRAMEBUFFER,W)&&Ee.drawBuffers(S,W),Ee.viewport(z),Ee.scissor(V),Ee.setScissorTest(ee),H){const fe=_.get(S.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+N,fe.__webglTexture,j)}else if(de){const fe=N;for(let be=0;be<S.textures.length;be++){const Ae=_.get(S.textures[be]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+be,Ae.__webglTexture,j,fe)}}else if(S!==null&&j!==0){const fe=_.get(S.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,fe.__webglTexture,j)}X=-1},this.readRenderTargetPixels=function(S,N,j,W,H,de,_e,fe=0){if(!(S&&S.isWebGLRenderTarget)){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=_.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&_e!==void 0&&(be=be[_e]),be){Ee.bindFramebuffer(C.FRAMEBUFFER,be);try{const Ae=S.textures[fe],Ne=Ae.format,Ge=Ae.type;if(S.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+fe),!Ke.textureFormatReadable(Ne)){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ke.textureTypeReadable(Ge)){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=S.width-W&&j>=0&&j<=S.height-H&&C.readPixels(N,j,W,H,le.convert(Ne),le.convert(Ge),de)}finally{const Ae=G!==null?_.get(G).__webglFramebuffer:null;Ee.bindFramebuffer(C.FRAMEBUFFER,Ae)}}},this.readRenderTargetPixelsAsync=async function(S,N,j,W,H,de,_e,fe=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let be=_.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&_e!==void 0&&(be=be[_e]),be)if(N>=0&&N<=S.width-W&&j>=0&&j<=S.height-H){Ee.bindFramebuffer(C.FRAMEBUFFER,be);const Ae=S.textures[fe],Ne=Ae.format,Ge=Ae.type;if(S.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+fe),!Ke.textureFormatReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ke.textureTypeReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const we=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,we),C.bufferData(C.PIXEL_PACK_BUFFER,de.byteLength,C.STREAM_READ),C.readPixels(N,j,W,H,le.convert(Ne),le.convert(Ge),0);const et=G!==null?_.get(G).__webglFramebuffer:null;Ee.bindFramebuffer(C.FRAMEBUFFER,et);const ht=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await Ch(C,ht,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,we),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,de),C.deleteBuffer(we),C.deleteSync(ht),de}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,N=null,j=0){const W=Math.pow(2,-j),H=Math.floor(S.image.width*W),de=Math.floor(S.image.height*W),_e=N!==null?N.x:0,fe=N!==null?N.y:0;U.setTexture2D(S,0),C.copyTexSubImage2D(C.TEXTURE_2D,j,0,0,_e,fe,H,de),Ee.unbindTexture()};const vc=C.createFramebuffer(),Sc=C.createFramebuffer();this.copyTextureToTexture=function(S,N,j=null,W=null,H=0,de=0){let _e,fe,be,Ae,Ne,Ge,we,et,ht;const lt=S.isCompressedTexture?S.mipmaps[de]:S.image;if(j!==null)_e=j.max.x-j.min.x,fe=j.max.y-j.min.y,be=j.isBox3?j.max.z-j.min.z:1,Ae=j.min.x,Ne=j.min.y,Ge=j.isBox3?j.min.z:0;else{const Mt=Math.pow(2,-H);_e=Math.floor(lt.width*Mt),fe=Math.floor(lt.height*Mt),S.isDataArrayTexture?be=lt.depth:S.isData3DTexture?be=Math.floor(lt.depth*Mt):be=1,Ae=0,Ne=0,Ge=0}W!==null?(we=W.x,et=W.y,ht=W.z):(we=0,et=0,ht=0);const tt=le.convert(N.format),yt=le.convert(N.type);let Te;N.isData3DTexture?(U.setTexture3D(N,0),Te=C.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(U.setTexture2DArray(N,0),Te=C.TEXTURE_2D_ARRAY):(U.setTexture2D(N,0),Te=C.TEXTURE_2D),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,N.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,N.unpackAlignment);const Ft=C.getParameter(C.UNPACK_ROW_LENGTH),$e=C.getParameter(C.UNPACK_IMAGE_HEIGHT),Ht=C.getParameter(C.UNPACK_SKIP_PIXELS),Kt=C.getParameter(C.UNPACK_SKIP_ROWS),Gn=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,lt.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,lt.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Ae),C.pixelStorei(C.UNPACK_SKIP_ROWS,Ne),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Ge);const ti=S.isDataArrayTexture||S.isData3DTexture,it=N.isDataArrayTexture||N.isData3DTexture;if(S.isDepthTexture){const Mt=_.get(S),wn=_.get(N),xt=_.get(Mt.__renderTarget),Rn=_.get(wn.__renderTarget);Ee.bindFramebuffer(C.READ_FRAMEBUFFER,xt.__webglFramebuffer),Ee.bindFramebuffer(C.DRAW_FRAMEBUFFER,Rn.__webglFramebuffer);for(let ni=0;ni<be;ni++)ti&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,_.get(S).__webglTexture,H,Ge+ni),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,_.get(N).__webglTexture,de,ht+ni)),C.blitFramebuffer(Ae,Ne,_e,fe,we,et,_e,fe,C.DEPTH_BUFFER_BIT,C.NEAREST);Ee.bindFramebuffer(C.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(H!==0||S.isRenderTargetTexture||_.has(S)){const Mt=_.get(S),wn=_.get(N);Ee.bindFramebuffer(C.READ_FRAMEBUFFER,vc),Ee.bindFramebuffer(C.DRAW_FRAMEBUFFER,Sc);for(let xt=0;xt<be;xt++)ti?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Mt.__webglTexture,H,Ge+xt):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Mt.__webglTexture,H),it?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,wn.__webglTexture,de,ht+xt):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,wn.__webglTexture,de),H!==0?C.blitFramebuffer(Ae,Ne,_e,fe,we,et,_e,fe,C.COLOR_BUFFER_BIT,C.NEAREST):it?C.copyTexSubImage3D(Te,de,we,et,ht+xt,Ae,Ne,_e,fe):C.copyTexSubImage2D(Te,de,we,et,Ae,Ne,_e,fe);Ee.bindFramebuffer(C.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else it?S.isDataTexture||S.isData3DTexture?C.texSubImage3D(Te,de,we,et,ht,_e,fe,be,tt,yt,lt.data):N.isCompressedArrayTexture?C.compressedTexSubImage3D(Te,de,we,et,ht,_e,fe,be,tt,lt.data):C.texSubImage3D(Te,de,we,et,ht,_e,fe,be,tt,yt,lt):S.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,de,we,et,_e,fe,tt,yt,lt.data):S.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,de,we,et,lt.width,lt.height,tt,lt.data):C.texSubImage2D(C.TEXTURE_2D,de,we,et,_e,fe,tt,yt,lt);C.pixelStorei(C.UNPACK_ROW_LENGTH,Ft),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,$e),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Ht),C.pixelStorei(C.UNPACK_SKIP_ROWS,Kt),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Gn),de===0&&N.generateMipmaps&&C.generateMipmap(Te),Ee.unbindTexture()},this.initRenderTarget=function(S){_.get(S).__webglFramebuffer===void 0&&U.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?U.setTextureCube(S,0):S.isData3DTexture?U.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?U.setTexture2DArray(S,0):U.setTexture2D(S,0),Ee.unbindTexture()},this.resetState=function(){R=0,B=0,G=null,Ee.reset(),re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return sn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=qe._getUnpackColorSpace()}}const Sl={type:"change"},to={type:"start"},uc={type:"end"},Ns=new Ks,Ml=new Nn,Ug=Math.cos(70*Zl.DEG2RAD),pt=new O,Lt=2*Math.PI,nt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Vr=1e-6;class Ng extends Bu{constructor(e,t=null){super(e,t),this.state=nt.NONE,this.target=new O,this.cursor=new O,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:bi.ROTATE,MIDDLE:bi.DOLLY,RIGHT:bi.PAN},this.touches={ONE:Mi.ROTATE,TWO:Mi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new O,this._lastQuaternion=new Bn,this._lastTargetPosition=new O,this._quat=new Bn().setFromUnitVectors(e.up,new O(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new qo,this._sphericalDelta=new qo,this._scale=1,this._panOffset=new O,this._rotateStart=new Ue,this._rotateEnd=new Ue,this._rotateDelta=new Ue,this._panStart=new Ue,this._panEnd=new Ue,this._panDelta=new Ue,this._dollyStart=new Ue,this._dollyEnd=new Ue,this._dollyDelta=new Ue,this._dollyDirection=new O,this._mouse=new Ue,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Og.bind(this),this._onPointerDown=Fg.bind(this),this._onPointerUp=Bg.bind(this),this._onContextMenu=Xg.bind(this),this._onMouseWheel=kg.bind(this),this._onKeyDown=Vg.bind(this),this._onTouchStart=Hg.bind(this),this._onTouchMove=Wg.bind(this),this._onMouseDown=zg.bind(this),this._onMouseMove=Gg.bind(this),this._interceptControlDown=jg.bind(this),this._interceptControlUp=Yg.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Sl),this.update(),this.state=nt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;pt.copy(t).sub(this.target),pt.applyQuaternion(this._quat),this._spherical.setFromVector3(pt),this.autoRotate&&this.state===nt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=Lt:i>Math.PI&&(i-=Lt),s<-Math.PI?s+=Lt:s>Math.PI&&(s-=Lt),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(pt.setFromSpherical(this._spherical),pt.applyQuaternion(this._quatInverse),t.copy(this.target).add(pt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=pt.length();a=this._clampDistance(o*this._scale);const c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const o=new O(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new O(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=pt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Ns.origin.copy(this.object.position),Ns.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ns.direction))<Ug?this.object.lookAt(this.target):(Ml.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ns.intersectPlane(Ml,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Vr||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Vr||this._lastTargetPosition.distanceToSquared(this.target)>Vr?(this.dispatchEvent(Sl),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Lt/60*this.autoRotateSpeed*e:Lt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){pt.setFromMatrixColumn(t,0),pt.multiplyScalar(-e),this._panOffset.add(pt)}_panUp(e,t){this.screenSpacePanning===!0?pt.setFromMatrixColumn(t,1):(pt.setFromMatrixColumn(t,0),pt.crossVectors(this.object.up,pt)),pt.multiplyScalar(e),this._panOffset.add(pt)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;pt.copy(s).sub(this.target);let r=pt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=e-i.left,r=t-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Lt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Lt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Lt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Lt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Lt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Lt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Lt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Lt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Ue,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function Fg(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Og(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function Bg(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(uc),this.state=nt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function zg(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case bi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=nt.DOLLY;break;case bi.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=nt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=nt.ROTATE}break;case bi.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=nt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=nt.PAN}break;default:this.state=nt.NONE}this.state!==nt.NONE&&this.dispatchEvent(to)}function Gg(n){switch(this.state){case nt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case nt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case nt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function kg(n){this.enabled===!1||this.enableZoom===!1||this.state!==nt.NONE||(n.preventDefault(),this.dispatchEvent(to),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(uc))}function Vg(n){this.enabled!==!1&&this._handleKeyDown(n)}function Hg(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Mi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=nt.TOUCH_ROTATE;break;case Mi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=nt.TOUCH_PAN;break;default:this.state=nt.NONE}break;case 2:switch(this.touches.TWO){case Mi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=nt.TOUCH_DOLLY_PAN;break;case Mi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=nt.TOUCH_DOLLY_ROTATE;break;default:this.state=nt.NONE}break;default:this.state=nt.NONE}this.state!==nt.NONE&&this.dispatchEvent(to)}function Wg(n){switch(this._trackPointer(n),this.state){case nt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case nt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case nt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case nt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=nt.NONE}}function Xg(n){this.enabled!==!1&&n.preventDefault()}function jg(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Yg(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Zg="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+CiAgPHJlY3Qgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIGZpbGw9IiMxMTE4MjEiLz4KICA8cGF0aCBkPSJNMCAwSDUxMlYxMjhMMTI4IDUxMkgwWiIgZmlsbD0iIzFiMzM0MiIvPgogIDxwYXRoIGQ9Ik01MTIgNTEySDEyOEw1MTIgMTI4WiIgZmlsbD0iIzNhMjYzOSIvPgogIDxwYXRoIGQ9Ik0wIDBIMjU2TDAgMjU2WiIgZmlsbD0iIzIxNGQ0NiIvPgogIDxwYXRoIGQ9Ik01MTIgMFYyNTZMMjU2IDBaIiBmaWxsPSIjNDkzYjFkIi8+CgogIDxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzcxODA5NCIgc3Ryb2tlLXdpZHRoPSI0Ij4KICAgIDxwYXRoIGQ9Ik0yIDJINTEwVjUxMEgyWiIvPgogICAgPHBhdGggZD0iTTI1NiAwVjUxMk0wIDI1Nkg1MTIiIHN0cm9rZS1kYXNoYXJyYXk9IjEyIDEyIiBvcGFjaXR5PSIuNTUiLz4KICA8L2c+CgogIDxnIHN0cm9rZT0iI2ZmY2Y0MCIgc3Ryb2tlLXdpZHRoPSIxNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj4KICAgIDxwYXRoIGQ9Ik0xMTIgMzA0SDQyNiIvPgogICAgPHBhdGggZD0iTTQyNiAzMDRMMzkwIDI3OE00MjYgMzA0TDM5MCAzMzAiLz4KICA8L2c+CiAgPGcgc3Ryb2tlPSIjM2VlOGZmIiBzdHJva2Utd2lkdGg9IjE0IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgogICAgPHBhdGggZD0iTTExMiAzMDRWNzIiLz4KICAgIDxwYXRoIGQ9Ik0xMTIgNzJMODYgMTA4TTExMiA3MkwxMzggMTA4Ii8+CiAgPC9nPgoKICA8ZyBmb250LWZhbWlseT0idWktbW9ub3NwYWNlLCBTRk1vbm8tUmVndWxhciwgTWVubG8sIG1vbm9zcGFjZSIgZm9udC13ZWlnaHQ9IjgwMCI+CiAgICA8dGV4dCB4PSIzMjIiIHk9IjI3OCIgZmlsbD0iI2ZmY2Y0MCIgZm9udC1zaXplPSI0NiI+K1g8L3RleHQ+CiAgICA8dGV4dCB4PSIxNDQiIHk9IjEwNCIgZmlsbD0iIzNlZThmZiIgZm9udC1zaXplPSI0NiI+4oiSWjwvdGV4dD4KICAgIDx0ZXh0IHg9IjI1NiIgeT0iMzkyIiBmaWxsPSIjZjNmN2ZiIiBmb250LXNpemU9IjI4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj4xNiBTVFVEIFRJTEU8L3RleHQ+CiAgICA8dGV4dCB4PSIyNTYiIHk9IjQyOCIgZmlsbD0iI2FhYjZjNSIgZm9udC1zaXplPSIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VSDihpIgIC8gIFYg4oaRPC90ZXh0PgogIDwvZz4KCiAgPGcgZm9udC1mYW1pbHk9InVpLW1vbm9zcGFjZSwgU0ZNb25vLVJlZ3VsYXIsIE1lbmxvLCBtb25vc3BhY2UiIGZvbnQtc2l6ZT0iNTQiIGZvbnQtd2VpZ2h0PSI5MDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPgogICAgPGNpcmNsZSBjeD0iNTUiIGN5PSI1NSIgcj0iMzgiIGZpbGw9IiMxNzIxMmMiIHN0cm9rZT0iIzNlZThmZiIgc3Ryb2tlLXdpZHRoPSI1Ii8+CiAgICA8dGV4dCB4PSI1NSIgeT0iNzQiIGZpbGw9IiNmM2Y3ZmIiPjQ8L3RleHQ+CiAgICA8Y2lyY2xlIGN4PSI0NTciIGN5PSI1NSIgcj0iMzgiIGZpbGw9IiMxNzIxMmMiIHN0cm9rZT0iI2ZmY2Y0MCIgc3Ryb2tlLXdpZHRoPSI1Ii8+CiAgICA8dGV4dCB4PSI0NTciIHk9Ijc0IiBmaWxsPSIjZjNmN2ZiIj4zPC90ZXh0PgogICAgPGNpcmNsZSBjeD0iNTUiIGN5PSI0NTciIHI9IjM4IiBmaWxsPSIjMTcyMTJjIiBzdHJva2U9IiNiZDdjZmYiIHN0cm9rZS13aWR0aD0iNSIvPgogICAgPHRleHQgeD0iNTUiIHk9IjQ3NiIgZmlsbD0iI2YzZjdmYiI+MTwvdGV4dD4KICAgIDxjaXJjbGUgY3g9IjQ1NyIgY3k9IjQ1NyIgcj0iMzgiIGZpbGw9IiMxNzIxMmMiIHN0cm9rZT0iI2ZmNmY5MSIgc3Ryb2tlLXdpZHRoPSI1Ii8+CiAgICA8dGV4dCB4PSI0NTciIHk9IjQ3NiIgZmlsbD0iI2YzZjdmYiI+MjwvdGV4dD4KICA8L2c+Cjwvc3ZnPgo=";function Zi(n,e){const[t,i]=e,s=n/Math.sqrt(3);return[[t+2*s,i],[t+s,i+n],[t-s,i+n],[t-2*s,i],[t-s,i-n],[t+s,i-n]]}function dc(n){const e=n.getAttribute("position"),t=new Float32Array(e.count*2);for(let i=0;i<e.count;i+=1)t[i*2]=e.getX(i),t[i*2+1]=-e.getZ(i);return n.setAttribute("uv",new $t(t,2)),n}function fc(n,e){const t=n.toNonIndexed();return n.dispose(),t.clearGroups(),t.addGroup(0,e,0),t.addGroup(e,t.getAttribute("position").count-e,1),dc(t),t.computeVertexNormals(),t}function Hr(n,e,t){const i=n.length;if(i<3)throw new Error("A prism needs at least three X/Z vertices");const s=[];for(const[c,l]of n)s.push(c,t,l);for(const[c,l]of n)s.push(c,e,l);const r=[];for(let c=1;c<i-1;c+=1)r.push(0,c+1,c);const a=r.length;for(let c=1;c<i-1;c+=1)r.push(i,i+c,i+c+1);for(let c=0;c<i;c+=1){const l=(c+1)%i;r.push(c,i+l,i+c),r.push(c,l,i+l)}const o=new Dt;return o.setAttribute("position",new Nt(s,3)),o.setIndex(r),fc(o,a)}function Wr(n,e,t,i,s){const r=Zi(e,t),a=Zi(n,t),o=[];for(const[p,h]of r)o.push(p,s,h);for(const[p,h]of a)o.push(p,s,h);for(const[p,h]of r)o.push(p,i,h);for(const[p,h]of a)o.push(p,i,h);const c=[];for(let p=0;p<6;p+=1){const h=(p+1)%6,m=p,g=h,v=6+p,f=6+h;c.push(m,f,g,m,v,f)}const l=c.length;for(let p=0;p<6;p+=1){const h=(p+1)%6,m=p,g=h,v=6+p,f=6+h,d=12+p,E=12+h,T=18+p,y=18+h;c.push(d,E,y,d,y,T),c.push(d,g,E,d,m,g),c.push(T,y,f,T,f,v)}const u=new Dt;return u.setAttribute("position",new Nt(o,3)),u.setIndex(c),fc(u,l)}function El(n,e,t,i,s,r){const a=e*Math.PI/180,o=[Math.cos(a),Math.sin(a)],c=[-Math.sin(a),Math.cos(a)],l=(u,p)=>[n[0]+o[0]*u+c[0]*p,n[1]+o[1]*u+c[1]*p];return[l(t,s),l(i,s),l(i,r),l(t,r)]}function yl(n,e,t){const i=(o,c,l)=>{const u=[];if(o.length===0)return u;for(let p=0;p<o.length;p+=1){const h=o[p],m=o[(p+o.length-1)%o.length],g=c(h),v=c(m);g?(v||u.push(l(m,h)),u.push(h)):v&&u.push(l(m,h))}return u},s=o=>(c,l)=>{const u=(o-c[0])/(l[0]-c[0]);return[o,c[1]+(l[1]-c[1])*u]},r=o=>(c,l)=>{const u=(o-c[1])/(l[1]-c[1]);return[c[0]+(l[0]-c[0])*u,o]};let a=n;return a=i(a,o=>o[0]>=e[0],s(e[0])),a=i(a,o=>o[0]<=e[1],s(e[1])),a=i(a,o=>o[1]>=t[0],r(t[0])),a=i(a,o=>o[1]<=t[1],r(t[1])),a}function qg(n,e,t,i){const s=[];if(Math.abs(e[0])>1e-6){const a=((e[0]>0?t[1]:t[0])-n[0])/e[0];a>0&&s.push(a)}if(Math.abs(e[1])>1e-6){const a=((e[1]>0?i[1]:i[0])-n[1])/e[1];a>0&&s.push(a)}if(s.length===0)throw new Error("Approach ray does not intersect the view bounds");return Math.min(...s)}function $g(n,e){const t=[],{minor:i,major:s,super:r}=n.grid,[a,o]=n.origin,c=Math.round(r/i),l=Math.round(s/i),u=f=>f%c===0?"super":f%l===0?"major":"minor",p=Math.ceil((n.boundsX[0]-a)/i),h=Math.floor((n.boundsX[1]-a)/i);for(let f=p;f<=h;f+=1){if(u(f)!==e)continue;const d=a+f*i;t.push(d,-.06,n.boundsZ[0],d,-.06,n.boundsZ[1])}const m=Math.ceil((n.boundsZ[0]-o)/i),g=Math.floor((n.boundsZ[1]-o)/i);for(let f=m;f<=g;f+=1){if(u(f)!==e)continue;const d=o+f*i;t.push(n.boundsX[0],-.06,d,n.boundsX[1],-.06,d)}const v=new Dt;return v.setAttribute("position",new Nt(t,3)),v}function bl(n,e){const t=[...n,n[0]];return new Dt().setFromPoints(t.map(([i,s])=>new O(i,e,s)))}function Fs(n,e){return new Dt().setFromPoints(n.map(([t,i])=>new O(t,e,i)))}const Kg=new Map([["spatial-orientation-diagnostic",Zg]]),Ii=["grid","core","sidewalks","road","approaches","annotations"];function Jg(){const n=()=>new yu({roughness:.82,metalness:.02,side:bn});return{surfaces:Object.fromEntries(vi.map(t=>[t,{top:n(),solid:n()}])),annotation:new Au({dashSize:5,gapSize:4,transparent:!0,opacity:.92}),annotationSolid:new Fn({transparent:!0,opacity:.9}),gridMinor:new Fn({transparent:!0,opacity:.34}),gridMajor:new Fn({transparent:!0,opacity:.58}),gridSuper:new Fn({transparent:!0,opacity:.84}),axisX:new Fn({transparent:!0,opacity:.92}),axisZ:new Fn({transparent:!0,opacity:.92})}}function en(n,e){const t=getComputedStyle(document.documentElement).getPropertyValue(n).trim(),i=new We;return i.setStyle(t||e),i}function za(n){n.traverse(e=>{e.geometry?.dispose()})}function Qg(n){for(const e of Object.values(n.surfaces))e.top.dispose(),e.solid.dispose();n.annotation.dispose(),n.annotationSolid.dispose(),n.gridMinor.dispose(),n.gridMajor.dispose(),n.gridSuper.dispose(),n.axisX.dispose(),n.axisZ.dispose()}function Yn(n,e,t,i){const s=new cn(n,e);return t&&(s.userData.selectKey=t,s.userData.detail=i),s}function Tl(n,e){const t=new yi(n,e);return t.computeLineDistances(),t}function Os(n,e,t,i){const s=e*Math.PI/180,r=[Math.cos(s),Math.sin(s)],a=[-Math.sin(s),Math.cos(s)];return[n[0]+r[0]*t+a[0]*i,n[1]+r[1]*t+a[1]*i]}function Al(n,e){const t=new Ei;t.name="spatial-grid-world";const i=Object.fromEntries(Ii.map(r=>{const a=new Ei;return a.name=r,t.add(a),[r,a]})),s=[];try{const r=n.boundsX[1]-n.boundsX[0],a=n.boundsZ[1]-n.boundsZ[0],o=new ss(r,a);o.rotateX(-Math.PI/2),o.translate((n.boundsX[0]+n.boundsX[1])/2,-.12,(n.boundsZ[0]+n.boundsZ[1])/2),dc(o),t.add(Yn(o,e.surfaces.ground.top));const c={minor:e.gridMinor,major:e.gridMajor,super:e.gridSuper};for(const T of["minor","major","super"])i.grid.add(new gu($g(n,T),c[T]));i.grid.add(new yi(Fs([[n.boundsX[0],n.origin[1]],[n.boundsX[1],n.origin[1]]],-.035),e.axisX),new yi(Fs([[n.origin[0],n.boundsZ[0]],[n.origin[0],n.boundsZ[1]]],-.035),e.axisZ));const l=`Core · ${(n.hex.coreA*2).toFixed(0)} studs flat-to-flat`,u=Yn(Hr(Zi(n.hex.coreA,n.origin),0,1.35),[e.surfaces.core.top,e.surfaces.core.solid],"core",l);i.core.add(u),s.push(u);const p=`Sidewalks · ${(n.hex.innerA-n.hex.coreA).toFixed(0)} studs edge-normal`,h=Yn(Wr(n.hex.coreA,n.hex.innerA,n.origin,0,.88),[e.surfaces["sidewalk.inner"].top,e.surfaces["sidewalk.inner"].solid],"sidewalks",p),m=Yn(Wr(n.hex.roadOuterA,n.hex.outerA,n.origin,0,.88),[e.surfaces["sidewalk.outer"].top,e.surfaces["sidewalk.outer"].solid],"sidewalks",p);i.sidewalks.add(h,m),s.push(h,m);const g=`Ring road · ${(n.hex.roadOuterA-n.hex.innerA).toFixed(0)} studs total`,v=Yn(Wr(n.hex.innerA,n.hex.roadOuterA,n.origin,-.02,.14),[e.surfaces["road.ring"].top,e.surfaces["road.ring"].solid],"road",g);i.road.add(v),s.push(v);const f=`Approaches · ${n.approaches.roadWidth.toFixed(0)}-stud road + ${n.approaches.sidewalkWidth.toFixed(0)}-stud sidewalk per side`;for(const T of n.approaches.angles){const y=T*Math.PI/180,P=[Math.cos(y),Math.sin(y)],A=qg(n.origin,P,n.boundsX,n.boundsZ),D=A+n.approaches.totalWidth*2,x=n.approaches.roadWidth/2,M=yl(El(n.origin,T,n.hex.roadOuterA,D,-x,x),n.boundsX,n.boundsZ),Y=Yn(Hr(M,-.02,.14),[e.surfaces["road.approach"].top,e.surfaces["road.approach"].solid],"approaches",f);i.approaches.add(Y),s.push(Y);const R=[[x,x+n.approaches.sidewalkWidth],[-x-n.approaches.sidewalkWidth,-x]];for(const[k,z]of R){if(k===z)continue;const V=yl(El(n.origin,T,n.hex.outerA,D,k,z),n.boundsX,n.boundsZ),ee=Yn(Hr(V,0,.88),[e.surfaces["sidewalk.approach"].top,e.surfaces["sidewalk.approach"].solid],"approaches",f);i.approaches.add(ee),s.push(ee)}const B=Tl(Fs([Os(n.origin,T,n.hex.roadOuterA,0),Os(n.origin,T,A,0)],.19),e.annotation);i.annotations.add(B);const G=n.hex.roadOuterA,X=G+n.approaches.crosswalkDepth;for(const k of[G,X])i.annotations.add(new yi(Fs([Os(n.origin,T,k,-x),Os(n.origin,T,k,x)],.2),e.annotationSolid))}const d=Tl(bl(Zi(n.hex.centerA,n.origin),.2),e.annotation),E=new yi(bl(Zi(n.hex.outerA,n.origin),.21),e.annotationSolid);return i.annotations.add(d,E),{group:t,groups:i,selectables:s}}catch(r){throw za(t),r}}function e_(n,e,t,i){const s=new Lg({canvas:n,antialias:!0,alpha:!1,powerPreference:"high-performance"});s.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),s.shadowMap.enabled=!1,s.toneMapping=ka,s.toneMappingExposure=1;const r=new au,a=Jg(),o=new Du(16777215,1118481,1.75),c=new Uu(16777215,2.25);c.position.set(180,360,220),r.add(o,c);const l=new Vt(38,1,.1,1e4),u=new Js(-1,1,1,-1,.1,1e4);let p=l,h="perspective",m=t,g=4,v=1,f=!1;const d=Object.fromEntries(Ii.map(w=>[w,!0])),E=window.matchMedia("(prefers-reduced-motion: reduce)"),T=w=>new O((w.boundsX[0]+w.boundsX[1])/2,0,(w.boundsZ[0]+w.boundsZ[1])/2),y=w=>{const I=T(w),F=Math.max(w.size[0],w.size[1]);l.near=Math.max(.05,F/2e4),l.far=F*12,l.position.set(I.x+F*.65,F*.58,I.z+F*.78),l.up.set(0,1,0),l.lookAt(I),l.updateProjectionMatrix()},P=w=>{const I=Math.max(w.size[1]/2,w.size[0]/(2*v))*1.08;u.left=-I*v,u.right=I*v,u.top=I,u.bottom=-I,u.updateProjectionMatrix()},A=w=>{const I=T(w),F=Math.max(w.size[0],w.size[1]);u.near=Math.max(.05,F/2e4),u.far=F*6,u.zoom=1,u.position.set(I.x,F*2,I.z),u.up.set(0,0,-1),u.lookAt(I),P(w)},D=w=>{const I=new Ng(w,n);if(I.target.copy(T(m)),I.enableDamping=!E.matches,I.dampingFactor=.075,I.enableRotate=w===l,I.enablePan=!0,I.screenSpacePanning=!0,w===l){const F=Math.max(m.size[0],m.size[1]);I.minDistance=F*.14,I.maxDistance=F*4,I.maxPolarAngle=Math.PI*.49}else I.minZoom=.4,I.maxZoom=20;return I.update(),I};y(m),A(m);let x=D(p),M=Al(t,a);M.group.scale.y=g,r.add(M.group);const Y=(...w)=>w.flatMap(I=>[a.surfaces[I].top,a.surfaces[I].solid]),R={core:Y("core"),sidewalks:Y("sidewalk.inner","sidewalk.outer"),road:Y("road.ring"),approaches:Y("road.approach","sidewalk.approach")};let B=null;const G=w=>{B=w;for(const[I,F]of Object.entries(R))for(const J of F)J.emissiveIntensity=I===w?.46:0},X={ground:["--tcl-bg","#0a0d12"],core:["--tcl-accent","#d4af37"],"sidewalk.inner":["--tcl-status-info","#44ddff"],"sidewalk.outer":["--tcl-status-info","#44ddff"],"road.ring":["--tcl-text-faint","#5a6371"],"road.approach":["--tcl-text-faint","#5a6371"],"sidewalk.approach":["--tcl-status-info","#44ddff"]},k=new Pu,z=new Set,V=Math.max(1,Math.min(8,s.capabilities.getMaxAnisotropy()));let ee=0,Q=!1;const ue=()=>{for(const w of Object.values(a.surfaces))for(const I of[w.top,w.solid]){const F=!!(I.map||I.normalMap||I.roughnessMap||I.metalnessMap);I.map=null,I.normalMap=null,I.roughnessMap=null,I.metalnessMap=null,F&&(I.needsUpdate=!0)}},pe=()=>{ue();for(const w of z)w.dispose();z.clear()},K=()=>{for(const w of vi){const[I,F]=X[w],J=en(I,F),$=a.surfaces[w];for(const oe of[$.top,$.solid])oe.color.copy(J),oe.roughness=.82,oe.metalness=.02,oe.normalScale.set(1,1)}},xe=w=>{const I=new Map(w.surfaceDefinitions.map(F=>[F.id,F]));for(const F of w.surfaceBindings){const J=I.get(F.surfaceId);if(!J)continue;const $=a.surfaces[F.geometryRole];for(const oe of[$.top,$.solid])oe.color.setStyle(J.preview.fallbackColor),oe.roughness=J.preview.roughness,oe.metalness=J.preview.metalness,oe.normalScale.set(J.preview.normalStrength,J.preview.normalStrength)}},Pe=w=>{const I=new Map(w.textureAssets.map($=>[$.id,$])),F=new Map;for(const $ of w.surfaceBindings){const oe=F.get($.surfaceId)??[];oe.push($.geometryRole),F.set($.surfaceId,oe)}const J=[];for(const $ of w.surfaceDefinitions){const oe=F.get($.id);if(oe?.length)for(const[Se,te]of Object.entries($.maps)){const se=I.get(te);se&&J.push({asset:se,definition:$,role:Se,surfaceRoles:oe})}}return J},Ve=(w,I,F)=>{const{tileStuds:J,offsetStuds:$}=I.definition.mapping,[oe,Se]=F.projection.anchor;w.name=`${I.definition.id}:${I.role}:${I.asset.id}`,w.colorSpace=I.role==="color"?zt:Sn,w.wrapS=qi,w.wrapT=qi,w.repeat.set(1/J[0],1/J[1]),w.offset.set((-oe+$[0])/J[0],(Se+$[1])/J[1]),w.rotation=0,w.anisotropy=V,w.needsUpdate=!0},Z=(w,I)=>{for(const F of I.surfaceRoles){const J=a.surfaces[F].top;I.role==="color"?(J.map=w,J.color.set(16777215)):I.role==="normal"?(J.normalMap=w,J.normalScale.set(I.definition.preview.normalStrength,I.definition.preview.normalStrength)):I.role==="roughness"?(J.roughnessMap=w,J.roughness=1):(J.metalnessMap=w,J.metalness=1),J.needsUpdate=!0}},ie=w=>{const I=++ee;pe();const F=w.appearance;if(Q=!!F,!F){K(),i.onAppearanceState({status:w.appearanceWarning?"warning":"fallback",message:w.appearanceWarning??"No preview appearance is declared; using theme fallback materials.",requestedMaps:0,loadedMaps:0,fallbackMaps:0});return}xe(F);const J=Pe(F);if(J.length===0){i.onAppearanceState({status:"fallback",message:"Preview appearance uses declared fallback materials; no texture maps were requested.",requestedMaps:0,loadedMaps:0,fallbackMaps:0});return}i.onAppearanceState({status:"loading",message:`Loading ${J.length} bundled preview map${J.length===1?"":"s"}…`,requestedMaps:J.length,loadedMaps:0,fallbackMaps:0}),Promise.all(J.map(async $=>{const oe=Kg.get($.asset.sourceKey);if(!oe)return{loaded:!1,optional:$.asset.optional,label:$.asset.sourceKey};try{const Se=await k.loadAsync(oe);return f||I!==ee?(Se.dispose(),{loaded:!1,optional:$.asset.optional,label:$.asset.sourceKey}):(Ve(Se,$,F),z.add(Se),Z(Se,$),{loaded:!0,optional:$.asset.optional,label:$.asset.sourceKey})}catch{return{loaded:!1,optional:$.asset.optional,label:$.asset.sourceKey}}})).then($=>{if(f||I!==ee)return;const oe=$.filter(me=>me.loaded).length,Se=$.filter(me=>!me.loaded),te=Se.length;if(te===0){i.onAppearanceState({status:"ready",message:`${oe} bundled preview map${oe===1?"":"s"} ready.`,requestedMaps:J.length,loadedMaps:oe,fallbackMaps:0});return}const se=Se.every(me=>me.optional),Me=[...new Set(Se.map(me=>me.label))].join(", ");i.onAppearanceState({status:"warning",message:`${oe}/${J.length} bundled preview maps loaded; ${te} ${se?"optional ":""}map${te===1?"":"s"} using declared fallback (${Me}).`,requestedMaps:J.length,loadedMaps:oe,fallbackMaps:te})})},ae=()=>{const w=en("--tcl-surface-sunken","#14181e");r.background=w,s.setClearColor(w,1),Q||K(),a.annotation.color.copy(en("--tcl-text","#e6edf3")),a.annotationSolid.color.copy(en("--tcl-text","#e6edf3")),a.gridMinor.color.copy(en("--tcl-border-soft","#1f242c")),a.gridMajor.color.copy(en("--tcl-border-strong","#3a4350")),a.gridSuper.color.copy(en("--tcl-status-info","#44ddff")),a.axisX.color.copy(en("--tcl-status-danger","#ff4444")),a.axisZ.color.copy(en("--tcl-status-info","#44ddff"));const I=en("--tcl-text","#e6edf3");for(const F of Object.values(R))for(const J of F)J.emissive.copy(I);o.color.set(16777215),o.groundColor.copy(w),c.color.set(16777215),G(B)},Ie=w=>{f||(h=w,x.dispose(),w==="top"?(A(m),p=u):(y(m),p=l),x=D(p))},Re=(w,I)=>{d[w]=I,M.groups[w].visible=I,B&&{core:"core",sidewalks:"sidewalks",road:"road",approaches:"approaches"}[B]===w&&(G(null),i.onSelection(null))},De=w=>{if(f)return;const I=Al(w,a);for(const J of Ii)I.groups[J].visible=d[J];I.group.scale.y=g,ie(w);const F=M;M=I,m=w,r.add(I.group),r.remove(F.group),za(F.group),G(null),i.onSelection(null),Ie(h)},ut=w=>{Number.isFinite(w)&&(g=Zl.clamp(w,1,8),M.group.scale.y=g)},He=new Ou,Xe=new Ue;let je=null;const Fe=w=>{let I=w;for(;I;){if(!I.visible)return!1;if(I===M.group)return!0;I=I.parent}return!1},rt=w=>{je={x:w.clientX,y:w.clientY}},C=w=>{if(!je)return;const I=Math.hypot(w.clientX-je.x,w.clientY-je.y);if(je=null,I>5)return;const F=n.getBoundingClientRect();if(F.width<=0||F.height<=0)return;Xe.x=(w.clientX-F.left)/F.width*2-1,Xe.y=-((w.clientY-F.top)/F.height)*2+1,He.setFromCamera(Xe,p);const J=He.intersectObjects(M.selectables,!1).find(Se=>Fe(Se.object));if(!J){G(null),i.onSelection(null);return}const $=J.object.userData.selectKey,oe=J.object.userData.detail;G($),i.onSelection({key:$,detail:oe})},ot=(w,I)=>{w<=0||I<=0||(v=w/I,s.setSize(w,I,!1),l.aspect=v,l.updateProjectionMatrix(),P(m))},Ye=new ResizeObserver(w=>{const I=w[0]?.contentRect;I&&ot(I.width,I.height)});Ye.observe(e);const Ke=e.getBoundingClientRect();ot(Ke.width||960,Ke.height||600);const Ee=()=>{x.enableDamping=!E.matches};E.addEventListener("change",Ee);const b=new MutationObserver(ae);b.observe(document.documentElement,{attributes:!0,attributeFilter:["class","style","data-theme"]});const _=w=>{w.preventDefault(),i.onError("The 3D context was lost. Reload the Command Center to restore it.")},U=()=>i.onError(null);return n.addEventListener("pointerdown",rt),n.addEventListener("pointerup",C),n.addEventListener("webglcontextlost",_),n.addEventListener("webglcontextrestored",U),ae(),ie(t),s.setAnimationLoop(()=>{x.update(),s.render(r,p)}),{replaceSpec:De,setLayerVisible:Re,setView:Ie,setYScale:ut,dispose:()=>{f||(f=!0,ee+=1,s.setAnimationLoop(null),Ye.disconnect(),b.disconnect(),E.removeEventListener("change",Ee),n.removeEventListener("pointerdown",rt),n.removeEventListener("pointerup",C),n.removeEventListener("webglcontextlost",_),n.removeEventListener("webglcontextrestored",U),x.dispose(),r.remove(M.group),za(M.group),pe(),Qg(a),s.dispose(),s.forceContextLoss())}}}const t_={grid:{label:"Unit grid",detail:"4 / 16 / 64 studs",tone:"grid"},core:{label:"City core",detail:"flat-top hex",tone:"core"},sidewalks:{label:"Sidewalk rings",detail:"inner + outer",tone:"sidewalk"},road:{label:"Ring road",detail:"two-lane band",tone:"road"},approaches:{label:"Six approaches",detail:"road + walks",tone:"approach"},annotations:{label:"Plan marks",detail:"centerlines + crossings",tone:"annotation"}},wl=Object.fromEntries(Ii.map(n=>[n,!0]));function Yt(n){return Number.isInteger(n)?n.toFixed(0):n.toFixed(2)}function Xr(n){return n instanceof Error?n.message:"The grid spec could not be loaded"}function n_(n){return n.appearance?{status:"loading",message:"Preparing the declared bundled preview appearance…",requestedMaps:0,loadedMaps:0,fallbackMaps:0}:{status:n.appearanceWarning?"warning":"fallback",message:n.appearanceWarning??"No preview appearance is declared; using theme fallback materials.",requestedMaps:0,loadedMaps:0,fallbackMaps:0}}function i_({message:n}){return ce.jsx("section",{className:"cc-section cc-spatial",children:ce.jsxs(Rl,{tone:"danger",title:"Spatial grid unavailable",children:["The bundled measured draft failed validation: ",n,". The other Command Center lenses remain unaffected."]})})}function s_({initialSpec:n}){const e=Rt.useRef(null),t=Rt.useRef(null),i=Rt.useRef(null),[s,r]=Rt.useState(n),[a,o]=Rt.useState(wl),[c,l]=Rt.useState("perspective"),[u,p]=Rt.useState(4),[h,m]=Rt.useState(null),[g,v]=Rt.useState(!1),[f,d]=Rt.useState(),[E,T]=Rt.useState(),[y,P]=Rt.useState(()=>n_(n)),[A,D]=Rt.useState("Bundled measured draft"),[x,M]=Rt.useState("Measured X/Z draft ready · no Studio or promotion state implied");Rt.useEffect(()=>{const K=t.current;if(!K)return;const xe=document.createElement("canvas");xe.className="cc-spatial__canvas",xe.setAttribute("role","img"),xe.setAttribute("aria-label",`${n.title}, 3D X/Z preview. ${Yt(n.size[0])} by ${Yt(n.size[1])} studs. North is ${n.north}. Layer names and dimensions are listed beside this preview.`),K.prepend(xe),e.current=xe;try{const Pe=e_(xe,K,n,{onSelection:m,onError:Ve=>d(Ve??void 0),onAppearanceState:P});return i.current=Pe,v(!0),d(void 0),()=>{i.current=null,e.current=null,Pe.dispose(),xe.remove()}}catch(Pe){e.current=null,xe.remove(),v(!1),d(Xr(Pe));return}},[n]);const Y=(K,xe)=>{o(Pe=>({...Pe,[K]:xe})),i.current?.setLayerVisible(K,xe)},R=K=>{l(K),i.current?.setView(K),M(K==="top"?"Orthographic top view · north is −Z · X/Z scale remains undistorted":"Perspective orbit · drag to rotate, secondary-drag to pan, scroll to zoom")},B=K=>{p(K),i.current?.setYScale(K)},G=(K,xe)=>{const Pe=i.current;if(!Pe)throw new Error("The 3D scene is not ready yet");Pe.replaceSpec(K),r(K),e.current?.setAttribute("aria-label",`${K.title}, 3D X/Z preview. ${Yt(K.size[0])} by ${Yt(K.size[1])} studs. North is ${K.north}. Layer names and dimensions are listed beside this preview.`),m(null),D(xe),M(`${K.title} loaded locally · nothing was uploaded or persisted`)},X=async K=>{const xe=K.currentTarget,Pe=xe.files?.[0];if(Pe)try{if(Pe.size>Cl)throw new Error("Grid spec exceeds the 2 MiB local-file limit");const Ve=await Pe.text(),Z=Zc(Ve,Pe.size);G(Z,`Local file · ${Pe.name}`),T(void 0)}catch(Ve){T(Xr(Ve)),M("Local file rejected · the last valid scene is still active")}finally{xe.value=""}},k=()=>{try{G(n,"Bundled measured draft"),o(wl);for(const K of Ii)i.current?.setLayerVisible(K,!0);l("perspective"),i.current?.setView("perspective"),p(4),i.current?.setYScale(4),T(void 0),M("Bundled measured X/Z draft restored · no promotion state implied")}catch(K){d(Xr(K))}},z=Object.entries(s.promotionGates),V=z.filter(([,K])=>K).length,ee=s.hex.innerA-s.hex.coreA,Q=s.hex.roadOuterA-s.hex.innerA,ue=y.status==="ready"?`appearance ${y.loadedMaps}/${y.requestedMaps}`:y.status==="loading"?"appearance loading":y.status==="warning"?"appearance warning":"appearance fallback",pe=y.status==="ready"?"success":y.status==="loading"?"info":y.status==="warning"?"warning":"neutral";return ce.jsxs("section",{className:"cc-section cc-spatial",children:[ce.jsxs("div",{className:"cc-spatial__intro",children:[ce.jsxs("div",{className:"cc-spatial__heading",children:[ce.jsx("p",{className:"cc-spatial__eyebrow",children:"Spatial grid laboratory"}),ce.jsx("h2",{children:s.title}),ce.jsx("p",{children:"A live 3D reading of the measured X/Z contract. Horizontal renderer units map one-to-one to Roblox studs."})]}),ce.jsxs("div",{className:"cc-spatial__badges","aria-label":"Grid status",children:[ce.jsx(os,{tone:"warning",variant:"soft",dot:!0,children:s.status}),ce.jsx(os,{tone:"info",variant:"outline",children:"1 unit = 1 stud"}),ce.jsx(os,{tone:"neutral",variant:"outline",children:"local only"}),ce.jsx(os,{tone:pe,variant:"outline",children:ue})]})]}),ce.jsxs("dl",{className:"cc-spatial__metrics","aria-label":"Measured dimensions",children:[ce.jsxs("div",{children:[ce.jsx("dt",{children:"Measured view"}),ce.jsxs("dd",{children:[Yt(s.size[0])," × ",Yt(s.size[1])," studs"]})]}),ce.jsxs("div",{children:[ce.jsx("dt",{children:"Core"}),ce.jsxs("dd",{children:[Yt(s.hex.coreA*2)," studs flat-to-flat"]})]}),ce.jsxs("div",{children:[ce.jsx("dt",{children:"Ring road"}),ce.jsxs("dd",{children:[Yt(Q)," studs edge-normal"]})]}),ce.jsxs("div",{children:[ce.jsx("dt",{children:"Sidewalk"}),ce.jsxs("dd",{children:[Yt(ee)," studs per band"]})]}),ce.jsxs("div",{children:[ce.jsx("dt",{children:"Approach"}),ce.jsxs("dd",{children:[Yt(s.approaches.roadWidth)," road +"," ",Yt(s.approaches.sidewalkWidth)," each side"]})]})]}),ce.jsxs("div",{className:"cc-spatial__commandbar",children:[ce.jsx(Mc,{type:"file",accept:"application/json,.json",label:"Load another grid spec",description:"Read locally while this lens is open; only bundled appearance keys resolve.",error:E,onChange:K=>{X(K)},containerClassName:"cc-spatial__file"}),ce.jsxs("div",{className:"cc-spatial__camera",children:[ce.jsx("span",{className:"cc-spatial__control-label",children:"Camera"}),ce.jsx(ls,{"aria-label":"Camera view",className:"cc-spatial__camera-toolbar",children:ce.jsxs(ls.Group,{children:[ce.jsx(ls.Button,{type:"button",tone:c==="perspective"?"accent":"neutral","aria-pressed":c==="perspective",onClick:()=>R("perspective"),children:"Perspective"}),ce.jsx(ls.Button,{type:"button",tone:c==="top"?"accent":"neutral","aria-pressed":c==="top",onClick:()=>R("top"),children:"Top · north-up"})]})})]}),ce.jsx(Ec,{type:"button",variant:"outline",tone:"neutral",size:"sm",onPress:k,className:"cc-spatial__reset",children:"Reset measured draft"})]}),ce.jsxs(cs,{className:"cc-spatial__card",children:[ce.jsxs(cs.Header,{className:"cc-spatial__cardhead",children:[ce.jsxs("div",{children:[ce.jsx("span",{className:"cc-spatial__source",children:A}),ce.jsxs("span",{className:"cc-spatial__revision",children:["rev ",s.revision," · ",s.date]})]}),ce.jsxs("span",{className:"cc-spatial__authority",title:s.authority,children:["X/Z authority · ",s.north," north"]})]}),ce.jsxs(cs.Body,{className:"cc-spatial__cardbody",children:[ce.jsxs("aside",{className:"cc-spatial__controls","aria-label":"Spatial layers",children:[ce.jsxs("fieldset",{children:[ce.jsx("legend",{children:"Layers"}),Ii.map(K=>{const xe=t_[K];return ce.jsx(yc,{id:`spatial-layer-${K}`,checked:a[K],onChange:Pe=>Y(K,Pe.currentTarget.checked),label:ce.jsxs("span",{className:"cc-spatial__switch-label",children:[ce.jsx("span",{className:"cc-spatial__swatch","data-tone":xe.tone,"aria-hidden":"true"}),ce.jsxs("span",{children:[ce.jsx("strong",{children:xe.label}),ce.jsx("small",{children:xe.detail})]})]})},K)})]}),ce.jsxs("div",{className:"cc-spatial__height",children:[ce.jsxs("label",{htmlFor:"spatial-y-scale",children:["Illustrative Y ",ce.jsxs("output",{htmlFor:"spatial-y-scale",children:["×",u]})]}),ce.jsx("input",{id:"spatial-y-scale",type:"range",min:"1",max:"8",step:"1",value:u,onChange:K=>B(Number(K.currentTarget.value))}),ce.jsx("p",{children:"Separates layers visually. It does not define Roblox height."})]})]}),ce.jsxs("div",{ref:t,className:"cc-spatial__stage","data-ready":g&&!f,children:[ce.jsxs("div",{className:"cc-spatial__compass","aria-hidden":"true",children:[ce.jsx("span",{children:"N · −Z"}),ce.jsx("span",{children:"+X →"})]}),!g&&!f?ce.jsx("div",{className:"cc-spatial__stage-message",role:"status",children:"Preparing spatial renderer…"}):null,f?ce.jsxs("div",{className:"cc-spatial__stage-message",role:"alert",children:[ce.jsx("strong",{children:"3D view unavailable"}),ce.jsx("span",{children:f})]}):null]})]}),ce.jsxs(cs.Footer,{className:"cc-spatial__cardfoot",children:[ce.jsxs("p",{className:"cc-spatial__selection","aria-live":"polite",children:[ce.jsx("strong",{children:h?.detail??"Select a visible plan layer"}),ce.jsx("span",{children:h?" · horizontal renderer units remain Roblox studs":" · click geometry for its measured role"})]}),ce.jsx("p",{className:"cc-spatial__gesture",children:c==="top"?"Drag to pan · scroll to zoom":"Drag to orbit · secondary-drag to pan · scroll to zoom"})]})]}),ce.jsx("p",{className:f||E?"cc-spatial__status is-error":"cc-spatial__status","aria-live":"polite",children:x}),ce.jsxs("p",{className:"cc-spatial__status","aria-live":"polite",children:["Appearance · ",y.message]}),ce.jsxs(Rl,{tone:"warning",title:"Measured footprint; illustrative height",children:["Y extrusion is a readability aid only. This lens does not import, save, publish, upload, register, or commit anything in Roblox Studio. Appearance maps are viewer-only `_BLK` diagnostics and do not imply Roblox asset IDs or Studio materials."," ",z.length?`${V} of ${z.length} recorded promotion gates are complete.`:"This loaded file declares no promotion gates."]})]})}function a_(){return or.ok?ce.jsx(s_,{initialSpec:or.spec}):ce.jsx(i_,{message:or.message})}export{a_ as default};
