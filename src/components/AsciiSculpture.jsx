import {useEffect,useRef} from 'react'

const GLYPHS='LK01<>/*{}[]+–·:;^#'

export default function AsciiSculpture(){
  const canvasRef=useRef(null)
  useEffect(()=>{
    const canvas=canvasRef.current,ctx=canvas.getContext('2d')
    let raf=0,time=0,width=0,height=0,dpr=1
    const pointer={x:0,y:0,tx:0,ty:0},points=[]
    const add=(x,y,z,g)=>points.push({x,y,z,g:g||GLYPHS[points.length%GLYPHS.length]})
    const ellipsoid=(cx,cy,cz,rx,ry,rz,nu,nv)=>{for(let i=0;i<nu;i++)for(let j=1;j<nv;j++){const u=i/nu*Math.PI*2,v=j/nv*Math.PI;add(cx+rx*Math.sin(v)*Math.cos(u),cy+ry*Math.cos(v),cz+rz*Math.sin(v)*Math.sin(u))}}
    const capsule=(a,b,r,n=10,steps=12)=>{for(let k=0;k<=steps;k++){const t=k/steps,cx=a[0]+(b[0]-a[0])*t,cy=a[1]+(b[1]-a[1])*t,cz=a[2]+(b[2]-a[2])*t;for(let i=0;i<n;i++){const u=i/n*Math.PI*2;add(cx+r*Math.cos(u),cy+r*Math.sin(u),cz+r*.72*Math.sin(u))}}}
    const triangle=(a,b,c,rows=17)=>{for(let i=0;i<=rows;i++)for(let j=0;j<=rows-i;j++){const u=i/rows,v=j/rows,w=1-u-v;add(a[0]*w+b[0]*u+c[0]*v,a[1]*w+b[1]*u+c[1]*v,a[2]*w+b[2]*u+c[2]*v)}}
    // Upright dragon body, chest, head and blunt snout
    ellipsoid(0,.15,0,.55,1.15,.42,18,14);ellipsoid(0,1.2,0,.42,.42,.38,15,10);ellipsoid(0,1.17,-.38,.32,.22,.3,12,8)
    // horns, digitigrade legs, feet and arms
    capsule([-.18,1.48,0],[-.38,1.88,.04],.055,6,7);capsule([.18,1.48,0],[.38,1.88,.04],.055,6,7)
    capsule([-.3,-.55,0],[-.42,-1.42,.05],.18,9,11);capsule([.3,-.55,0],[.42,-1.42,.05],.18,9,11)
    capsule([-.42,-1.42,.05],[-.62,-1.68,-.25],.14,8,7);capsule([.42,-1.42,.05],[.62,-1.68,-.25],.14,8,7)
    capsule([-.42,.55,0],[-.78,-.1,-.05],.11,8,8);capsule([.42,.55,0],[.78,-.1,-.05],.11,8,8)
    // folded angular wings
    triangle([-.35,.9,.08],[-1.6,.45,.12],[-.78,-.65,.08],20);triangle([.35,.9,.08],[1.6,.45,.12],[.78,-.65,.08],20)
    triangle([-.42,.85,.11],[-1.25,1.42,.05],[-1.6,.45,.12],13);triangle([.42,.85,.11],[1.25,1.42,.05],[1.6,.45,.12],13)
    // long curling tail built from tapered capsule segments
    const tail=[[0,-.72,.18],[.35,-1.02,.2],[.78,-1.28,.15],[1.2,-1.42,.02],[1.48,-1.22,-.08],[1.62,-.9,-.12]]
    tail.slice(0,-1).forEach((p,i)=>capsule(p,tail[i+1],.16-i*.022,7,7))
    const resize=()=>{const r=canvas.getBoundingClientRect();dpr=Math.min(devicePixelRatio||1,2);width=r.width;height=r.height;canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0)}
    const move=e=>{const r=canvas.getBoundingClientRect();pointer.tx=(e.clientX-r.left)/r.width-.5;pointer.ty=(e.clientY-r.top)/r.height-.5}
    const leave=()=>{pointer.tx=pointer.ty=0}
    const draw=()=>{time+=.004;pointer.x+=(pointer.tx-pointer.x)*.035;pointer.y+=(pointer.ty-pointer.y)*.035;ctx.clearRect(0,0,width,height)
      const ay=time+pointer.x*.45,ax=pointer.y*.2,cy=Math.cos(ay),sy=Math.sin(ay),cx=Math.cos(ax),sx=Math.sin(ax)
      const q=points.map(p=>{const x=p.x*cy-p.z*sy,z=p.x*sy+p.z*cy,y=p.y*cx-z*sx,z2=p.y*sx+z*cx,k=5.4/(6-z2),scale=Math.min(width,height)*.155*k;return{x:width/2+x*scale,y:height*.51-y*scale,z:z2,k,g:p.g}}).sort((a,b)=>a.z-b.z)
      ctx.textAlign='center';ctx.textBaseline='middle'
      q.forEach(p=>{const d=Math.max(0,Math.min(1,(p.z+1.8)/3.6));ctx.globalAlpha=.12+d*.88;ctx.fillStyle='#63e6ff';ctx.font=`${Math.max(6,7+p.k*3+d*2)}px ui-monospace,SFMono-Regular,Menlo,monospace`;ctx.fillText(p.g,p.x,p.y)})
      ctx.globalAlpha=1;raf=requestAnimationFrame(draw)}
    resize();addEventListener('resize',resize);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerleave',leave);draw()
    return()=>{cancelAnimationFrame(raf);removeEventListener('resize',resize);canvas.removeEventListener('pointermove',move);canvas.removeEventListener('pointerleave',leave)}
  },[])
  return <section className="dragon-anchor"><p className="eyebrow">Formed from code</p><div className="ascii-sculpture" aria-label="Rotating typographic dragon sculpture"><canvas ref={canvasRef}/><span className="ascii-caption">Dragon study · glyph point mesh</span></div></section>
}
