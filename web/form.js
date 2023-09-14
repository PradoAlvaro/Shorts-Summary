// import { text } from "body-parser"
import { server } from "./server.js"
const form = document.querySelector("form")
const input = document.querySelector("input")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")

  const urlVideo = input.value

  if (!urlVideo.includes("shorts")) {
    return (content.textContent = "Esse video não é um short")
  }
  const [_, params] = urlVideo.split("/shorts/")
  const [videoId] = params.split("?si")

  content.textContent = "Obtendo o texto do áudio..."

  const transcription = await server.get("/summary/" + videoId)

  content.textContent = "Realizando o resumo..."

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })
  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})
