import ytdl from "ytdl-core"
import fs from "fs"


export const download = (videoId) => new Promise ((resolve, reject) =>{
  const urlVideo = "https://www.youtube.com/shorts/" + videoId
  console.log("Realizando o download do video:" + videoId)

  ytdl(urlVideo, { quality: "lowestaudio", filter: "audioonly" })
    .on("info", (info) => {
      const seconds = info.formats[0].approxDurationMs / 1000

      if (seconds > 300) {
        throw new Error(
          "A duração desse vídeo é maior que 5 minutos, não é possivél fazer o download. :("
        )
      }
    })
    .on("end", () => {
      console.log("Download finalizado")
      resolve()
    })
    .on("error", (error) => {
      console.log(
        "Não foi possivél fazer o download do vídeo. Detalhes do erro:",
        error
      )
      reject(error)
    })
    .pipe(fs.createWriteStream("./tmp/audio.mp4"))
})
// https://www.youtube.com/shorts/ZLTyta0Wqew
