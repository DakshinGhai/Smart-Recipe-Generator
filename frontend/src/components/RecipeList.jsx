import React, { useState } from 'react'
import RecipeCard from './RecipeCard'


export default function RecipeList({ recipes, onRate }){
if(!recipes || recipes.length===0) return <p className="p-4">No recipes found.</p>
return (
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
{recipes.map(r => <RecipeCard key={r.id} r={r} onRate={onRate} />)}
</div>
)
}