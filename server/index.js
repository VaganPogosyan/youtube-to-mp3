const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

var YoutubeMp3Downloader = require("youtube-mp3-downloader");

// Init Middleware
app.use(express.json({ extended: false })); // JSON body parser to parse req.body

app.post("/api/convert", (req, res) => {
  //Configure YoutubeMp3Downloader with your settings
  var YD = new YoutubeMp3Downloader({
    ffmpegPath: "/opt/local/bin/ffmpeg", // FFmpeg binary location
    // outputPath: "/vaganpogosyan", // Output file location (default: the home directory)
    youtubeVideoQuality: "highestaudio", // Desired video quality (default: highestaudio)
    queueParallelism: 2, // Download parallelism (default: 1)
    progressTimeout: 2000, // Interval in ms for the progress reports (default: 1000)
    allowWebm: false, // Enable download from WebM sources (default: false)
  });

  function getStringAfterEqualSign(inputString) {
    const splitArray = inputString.split("=");
    if (splitArray.length === 2) {
      return splitArray[1].trim();
    } else {
      // If there is no equal sign or multiple equal signs, return an empty string.
      return "";
    }
  }

  const link = req.body.link;
  const videoID = getStringAfterEqualSign(link);
  console.log(videoID);

  //   Download video and save as MP3 file
  YD.download(videoID);

  YD.on("finished", function (err, data) {
    console.log("FINISHED!");
    res.json({ message: data.videoTitle });
  });

  YD.on("error", function (error) {
    console.error(error);
  });

  YD.on("progress", function (progress) {
    console.log(JSON.stringify(progress));
  });
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
