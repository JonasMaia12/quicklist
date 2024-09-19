const button = document.getElementById("button")
const item = document.getElementById("item")
const list = document.getElementById("list")
const deletedItemList = document.getElementById("deletedListItem")

button.addEventListener("click", addItem)

// Carrega a lista de itens do localStorage quando a página é carregada
document.addEventListener("DOMContentLoaded", loadItems)

function addItem() {
  const text = item.value

  if (text === "") {
    return
  }

  const newItem = createListItem(text)
  list.appendChild(newItem)

  // Salva a lista no localStorage
  saveItems()

  item.value = ""
}

function createListItem(text) {
  const li = document.createElement("li")

  const checkLink = document.createElement("span")
  checkLink.classList.add("check")
  checkLink.addEventListener("click", () => {
    checkLink.classList.toggle("checked")
    // Salva a lista no localStorage sempre que um item é marcado/desmarcado
    saveItems()
  })

  const textItem = document.createElement("p")
  textItem.textContent = text

  const deleteIcon = document.createElement("img")
  deleteIcon.src = "assets/delete.svg"
  deleteIcon.alt = "Deletar item"
  deleteIcon.addEventListener("click", () => {
    list.removeChild(li)
    const delItem = createDeletedItemWarning()
    deletedItemList.appendChild(delItem)

    // Salva a lista no localStorage após remoção
    saveItems()
  })

  li.appendChild(checkLink)
  li.appendChild(textItem)
  li.appendChild(deleteIcon)

  return li
}

function createDeletedItemWarning() {
  const div = document.createElement("div")

  const imgWarning = document.createElement("img")
  imgWarning.src = "assets/warning.svg"

  const textWarning = document.createElement("p")
  textWarning.textContent = "O item foi removido da lista"

  const closeIcon = document.createElement("img")
  closeIcon.src = "assets/close.svg"

  closeIcon.addEventListener("click", () => {
    deletedItemList.removeChild(div)
  })

  setTimeout(() => {
    if (deletedItemList.contains(div)) {
      deletedItemList.removeChild(div)
    }
  }, 2000)

  div.appendChild(imgWarning)
  div.appendChild(textWarning)
  div.appendChild(closeIcon)

  return div
}

// Função para salvar a lista no localStorage
function saveItems() {
  const items = []
  list.querySelectorAll("li").forEach((li) => {
    const text = li.querySelector("p").textContent
    const isChecked = li.querySelector("span").classList.contains("checked")
    items.push({ text, isChecked })
  })

  localStorage.setItem("shoppingList", JSON.stringify(items))
}

// Função para carregar os itens do localStorage
function loadItems() {
  const savedItems = localStorage.getItem("shoppingList")

  if (savedItems) {
    const items = JSON.parse(savedItems)
    items.forEach((item) => {
      const newItem = createListItem(item.text)
      if (item.isChecked) {
        newItem.querySelector("span").classList.add("checked")
      }
      list.appendChild(newItem)
    })
  }
}
