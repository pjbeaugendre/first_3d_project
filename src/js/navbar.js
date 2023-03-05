const hambuger = document.querySelector(".hamburger")
const navbar = document.querySelector(".navbar")

hambuger.onclick = () => {
  navbar.classList.toggle("active")
}