import {useEffect,useRef} from 'react'

const GLYPHS='LK01<>/*{}[]+–·:;'
export default function AsciiOrb(){
  const ref=useRef(null)
  useEffect(()=>{
    const canvas=ref.current,ctx=canvas.getContext('2d');let raf=0,t=0,w=0,h=0,dpr=1
    const mouse={x:0,y:0,tx:0,ty:0},points=[]
    for(let i=0;i<42;i++)for(let j=0;j<15;j++){const u=i/42*Math.PI*2,v=j/15*Math.PI*2,R=1.35,r=.56;points.push({x:(R+r*Math.cos(v))*Math.cos(u),y:r*Math.sin(v),z:(R+r*Math.cos(v))*Math.sin(u),g:GLYPHS[(i*3+j*5)%GLYPHS.length]})}
    const resize=()=>{const b=canvas.getBoundingClientRect();dpr=Math.min(devicePixelRatio||1,2);w=b.width;h=b.height;canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}
    const move=e=>{const b=canvas.getBoundingClientRect();mouse.tx=(e.clientX-b.left)/b.width-.5;mouse.ty=(e.clientY-b.top)/b.height-.5}
    const leave=()=>mouse.tx=mouse.ty=0
    const draw=()=>{t+=.006;mouse.x+=(mouse.tx-mouse.x)*.04;mouse.y+=(mouse.ty-mouse.y)*.04;ctx.clearRect(0,0,w,h);const ay=t+mouse.x*.7,ax=-.28+mouse.y*.45,cy=Math.cos(ay),sy=Math.sin(ay),cx=Math.cos(ax),sx=Math.sin(ax)
      points.map(p=>{const x=p.x*cy-p.z*sy,z=p.x*sy+p.z*cy,y=p.y*cx-z*sx,z2=p.y*sx+z*cx,k=4.8/(5.4-z2),s=Math.min(w,h)*.17*k;return{x:w/2+x*s,y:h/2+y*s,z:z2,k,g:p.g}}).sort((a,b)=>a.z-b.z).forEach(p=>{const d=Math.max(0,Math.min(1,(p.z+2.1)/4.2));ctx.globalAlpha=.13+d*.82;ctx.fillStyle='#63e6ff';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`${Math.max(7,8+p.k*4+d*2)}px ui-monospace,SFMono-Regular,Menlo,monospace`;ctx.fillText(p.g,p.x,p.y)});ctx.globalAlpha=1;raf=requestAnimationFrame(draw)}
    resize();addEventListener('resize',resize);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerleave',leave);draw()
    return()=>{cancelAnimationFrame(raf);removeEventListener('resize',resize);canvas.removeEventListener('pointermove',move);canvas.removeEventListener('pointerleave',leave)}
  },[])
  return <div className="ascii-orb reveal" aria-label="Rotating ASCII sculpture"><canvas ref={ref}/><span>Ideas in motion</span></div>
}
