
document.addEventListener("click", (e)=>{
    const { target } = e
    if (target.dataset.type === "remove") {
        const id = target.dataset.id
        
        remove(id).then(()=>{
            target.closest("li").remove()
        })
    }
    if(target.dataset.type === "edit") {
        const txt = target.closest("li").children[0]
        const editedNote = prompt("Введите новое название",txt.innerText)

        const send = {id:target.dataset.id, title: editedNote}
        if (editedNote && txt !== editedNote) {
            edit(send).then(()=>{
                txt.innerText = editedNote
            })
        }
    }
})

async function remove(id) {
    await fetch(`/${id}`,{
        method: "DELETE"
    })
}

async function edit(data) {
    await fetch("/", {
        method:"PUT",
        body:JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}