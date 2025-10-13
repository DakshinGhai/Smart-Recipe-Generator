import React from 'react'
export default function RecipeCard({ r, onRate }){
return (
<div className="bg-white rounded p-4 shadow">
<h3 className="font-semibold">{r.title}</h3>
<p className="text-sm text-slate-600">{r.cuisine} • {r.time} mins • {r.difficulty}</p>
<p className="mt-2 text-sm">Match: {(r.matchScore||0).toFixed(2)} • Missing: {(r.missing||[]).slice(0,3).join(', ')}</p>
<div className="mt-3 flex gap-2">
<button onClick={() => onRate(r.id, 5)} className="px-2 py-1 rounded bg-green-500 text-white text-sm">Rate 5</button>
</div>
</div>
)
}