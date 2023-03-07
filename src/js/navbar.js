const hambuger = document.querySelector(".hamburger")
const navbar = document.querySelector(".navbar")

hambuger.onclick = () => {
  navbar.classList.toggle("active")
}

(() => {
  let values = {
    color: "#FF786E",
    size: 18,
    trailColor: "#4f5a53",
    trailTime: 300,
  }
  const cursor = document.createElement("div")
  const pointer = document.createElement("div")
  cursor.appendChild(pointer)
  document.body.appendChild(cursor)

  cursor.style.position = "absolute"
  cursor.style.width = `${values.size}px`
  cursor.style.height = `${values.size}px`
  cursor.style.border = `3px solid ${values.color}`
  cursor.style.borderRadius = "50%"
  cursor.style.display = "flex"
  cursor.style.justifyContent = "center"
  cursor.style.alignItems = "center"
  cursor.style.pointerEvents = "none"
  cursor.style.zIndex = "10"

  pointer.style.position = "absolute"
  pointer.style.width = `${values.size * 0.8}px`
  pointer.style.height = `${values.size * 0.8}px`
  pointer.style.borderRadius = "50%"
  pointer.style.backgroundColor = values.trailColor
  pointer.style.opacity = "0.6"
  pointer.style.zIndex = "10"

  document.addEventListener("mousemove", (e) => {
    cursor.style.top = `${e.pageY - values.size / 2}px`
    cursor.style.left = `${e.pageX - values.size / 2}px`
    const trail = document.createElement("div")

    setTimeout(() => {
      trail.style.backgroundColor = values.trailColor
      trail.style.width = `${values.size * 0.6}px`
      trail.style.height = `${values.size * 0.6}px`
      trail.style.position = "absolute"
      trail.style.borderRadius = "50%"
      trail.style.top = `${e.pageY - (values.size * 0.6) / 2}px`
      trail.style.left = `${e.pageX - (values.size * 0.6) / 2}px`
      trail.style.pointerEvents = "none"
      trail.style.opacity = "0.6"
      trail.style.zIndex = "9"
      document.body.appendChild(trail)
    }, 50)

      

      setTimeout(() => {
        document.body.removeChild(trail)
      }, 400)
  })
})()