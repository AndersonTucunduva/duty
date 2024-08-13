// components/AnimatedTitle.js
import React from 'react'

const AnimatedTitle = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-muted">
      <h1 className="text-6xl font-bold text-white">
        <span className="animate-fadeIn">D</span>
        <span className="delay-&lsqb;0.1s&rsqb animate-fadeIn">u</span>
        <span className="delay-&lsqb;0.2s&rsqb animate-fadeIn">t</span>
        <span className="delay-&lsqb;0.3s&rsqb animate-fadeIn">y</span>
        <span className="delay-&lsqb;0.4s&rsqb animate-fadeIn"> </span>
        <span className="delay-&lsqb;0.5s&rsqb animate-fadeIn">M</span>
        <span className="delay-&lsqb;0.6s&rsqb animate-fadeIn">a</span>
        <span className="delay-&lsqb;0.7s&rsqb animate-fadeIn">k</span>
        <span className="delay-&lsqb;0.8s&rsqb animate-fadeIn">e</span>
        <span className="delay-&lsqb;0.9s&rsqb animate-fadeIn">r</span>
      </h1>
    </div>
  )
}

export default AnimatedTitle
