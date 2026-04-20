import React, { useActionState, useOptimistic } from 'react'

const createAction = async (currentState: any, formData: FormData) => {
  const title = formData.get("title") as string
  if (!title) return { error: "Title is required" }
  if (title === "hello") return { error: "hello keyword can not allow", title }

  const res = await fetch("http://localhost:5000/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, vote: 0, id: Date.now().toString() })
  })
  const data = await res.json()
  return { ...data, success: true }
}

const voteAction = async (currentState: any, formData: FormData) => {
  const id = formData.get("id")
  const currentVote = parseInt(formData.get("vote") as string || "0")
  const delta = parseInt(formData.get("delta") as string || "0")

  const res = await fetch(`http://localhost:5000/posts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ vote: Math.max(0, currentVote + delta) })
  })
  return await res.json()
}

const App = () => {
  const [state, createFormAction, isPending] = useActionState(createAction, null)

  const [voteState, voteFormAction, voteIsPending] = useActionState(voteAction, null)


  const currentItem = voteState || state;
  const [optimisticVote, setOptimisticVote] = useOptimistic(currentItem?.vote || 0, (state, delta: number) => state + delta)
  const handleVote = async (formData: FormData) => {
    const delta = parseInt(formData.get("delta") as string || "0")
    setOptimisticVote(delta)
    await voteFormAction(formData)
  }
  // Use voteState if it exists (meaning the post was just updated), otherwise fallback to the initial post state


  return (
    <div className="p-10 space-y-6">
      <form action={createFormAction} className="space-y-2">
        <h1 className="text-2xl font-bold">React Dive</h1>
        <input
          key={state?.success ? "reset" : "stay"}
          type="text"
          name="title"
          className="border p-2 rounded block"
          placeholder="New post title"
          defaultValue={state?.error ? state.title : ""}
        />
        <button
          disabled={isPending}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
        >
          {isPending ? "Adding..." : "Add Post"}
        </button>
      </form>

      {state?.error && <p className="text-red-500 font-medium">{state.error}</p>}

      {currentItem && !state?.error && (
        <div className="mt-4 p-6 border rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Post Details</h2>
          <p className="text-lg text-slate-600">Title: <strong className="text-slate-900">{currentItem.title}</strong></p>
          <p className="text-md mb-4 text-slate-600">Vote Count: <span className="text-blue-600 text-xl font-bold">{optimisticVote}</span></p>

          <div className="flex gap-4">
            {/* Both buttons now use the same voteFormAction with a 'delta' to distinguish direction */}
            <form action={handleVote}>
              <input type="hidden" name="id" value={currentItem.id} />
              <input type="hidden" name="vote" value={currentItem.vote} />
              <input type="hidden" name="delta" value="1" />
              <button
                disabled={voteIsPending}
                className="bg-green-600 text-white px-6 py-2 rounded font-bold hover:bg-green-700 disabled:bg-green-300 shadow-sm active:scale-95 transition-all"
              >
                {voteIsPending ? "..." : "Upvote"}
              </button>
            </form>

            <form action={handleVote}>
              <input type="hidden" name="id" value={currentItem.id} />
              <input type="hidden" name="vote" value={currentItem.vote} />
              <input type="hidden" name="delta" value="-1" />
              <button
                disabled={voteIsPending}
                className="bg-red-600 text-white px-6 py-2 rounded font-bold hover:bg-red-700 disabled:bg-red-300 shadow-sm active:scale-95 transition-all"
              >
                {voteIsPending ? "..." : "Downvote"}
              </button>
            </form>
          </div>
          {voteIsPending && <p className="text-xs text-slate-400 mt-2 animate-pulse">Syncing with database...</p>}
        </div>
      )}
    </div>
  )
}


export default App