import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

const links=[['/','Home'],['/about','About'],['/skills','Skills'],['/projects','Projects'],['/education','Education'],['/courses','Courses'],['/publications','Publications'],['/contact','Let’s Talk']]

export function Magnetic({children,className='',...props}){
 const ref=useRef(null), reduced=useReducedMotion()
 const move=e=>{if(reduced)return;const r=ref.current.getBoundingClientRect();ref.current.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.12}px)`}
 const reset=()=>{if(ref.current)ref.current.style.transform='translate(0,0)'}
 return <a ref={ref} onPointerMove={move} onPointerLeave={reset} className={className} {...props}>{children}</a>
}

function Nav(){return <header className="site-header"><NavLink className="logo" to="/" aria-label="Lakshya Khanna home">LK<span>.</span></NavLink><nav aria-label="Primary navigation">{links.map(([to,label])=><NavLink key={to} end={to==='/'} to={to} className={({isActive})=>isActive?'active':''}><span>{label}</span></NavLink>)}</nav><NavLink className="nav-talk" to="/contact">Let’s talk</NavLink></header>}

export default function Layout({children}){const location=useLocation(),reduced=useReducedMotion();useEffect(()=>{window.scrollTo(0,0)},[location.pathname]);return <><a className="skip" href="#main">Skip to content</a><Nav/><AnimatePresence mode="wait"><motion.main id="main" key={location.pathname} initial={reduced?false:{opacity:0,y:20,scale:.992}} animate={{opacity:1,y:0,scale:1}} exit={reduced?{}:{opacity:0,y:-12,scale:1.008}} transition={{duration:.48,ease:[.22,.8,.2,1]}}>{children}</motion.main></AnimatePresence><motion.div className="route-curtain" key={`curtain-${location.pathname}`} initial={{scaleX:1}} animate={{scaleX:0}} transition={{duration:.7,ease:[.76,0,.24,1]}}/></>}
