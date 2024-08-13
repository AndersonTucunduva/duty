// components/AnimatedTitle.js
import React from 'react'

const AnimatedTitle = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-muted">
      <h1 className="text-6xl font-bold text-white">
        <span className="animate-fadeIn">D</span>
        <span className="delay-[0.1s] animate-fadeIn">u</span>
        <span className="delay-[0.2s] animate-fadeIn">t</span>
        <span className="delay-[0.3s] animate-fadeIn">y</span>
        <span className="delay-[0.4s] animate-fadeIn"> </span>
        <span className="delay-[0.5s] animate-fadeIn">M</span>
        <span className="delay-[0.6s] animate-fadeIn">a</span>
        <span className="delay-[0.7s] animate-fadeIn">k</span>
        <span className="delay-[0.8s] animate-fadeIn">e</span>
        <span className="delay-[0.9s] animate-fadeIn">r</span>
      </h1>
    </div>
  )
}

export default AnimatedTitle
