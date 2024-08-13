// components/AnimatedTitle.js
import React from 'react'

const AnimatedTitle = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-muted">
      <h1 className="text-6xl font-bold text-white">
        <span className="animate-fadeIn">D</span>
        <span className="animate-fadeIn delay-[0.1s]">u</span>
        <span className="animate-fadeIn delay-[0.2s]">t</span>
        <span className="animate-fadeIn delay-[0.3s]">y</span>
        <span className="animate-fadeIn delay-[0.4s]"> </span>
        <span className="animate-fadeIn delay-[0.5s]">M</span>
        <span className="animate-fadeIn delay-[0.6s]">a</span>
        <span className="animate-fadeIn delay-[0.7s]">k</span>
        <span className="animate-fadeIn delay-[0.8s]">e</span>
        <span className="animate-fadeIn delay-[0.9s]">r</span>
      </h1>
    </div>
  )
}

export default AnimatedTitle
