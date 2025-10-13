import React from 'react'

export default function Header() {
  return (
    <header className="p-4 bg-white shadow">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold">Smart Recipe Generator</h1>
        <nav>
          <a href="#" className="text-sm text-slate-600">About</a>
        </nav>
      </div>
    </header>
  )
}