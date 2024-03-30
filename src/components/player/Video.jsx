import React, { useState, useRef, useEffect } from "react";
import { findDOMNode } from "react-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import ReactPlayer from "react-player";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import VolumeUp from "@material-ui/icons/VolumeUp";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeMute from "@material-ui/icons/VolumeOff";
import FullScreen from "@material-ui/icons/Fullscreen";
import Popover from "@material-ui/core/Popover";
import screenful from "screenfull";
import Controls from "./Controls";

const useStyles = makeStyles((theme) => ({
  playerWrapper: {
    width: "100%",

    position: "relative",
    // "&:hover": {
    //   "& $controlsWrapper": {
    //     visibility: "visible",
    //   },
    // },
  },

  controlsWrapper: {
    visibility: "hidden",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  topControls: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(2),
  },
  middleControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomWrapper: {
    display: "flex",
    flexDirection: "column",

    // background: "rgba(0,0,0,0.6)",
    // height: 60,
    padding: theme.spacing(2),
  },

  bottomControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    // height:40,
  },

  button: {
    margin: theme.spacing(1),
  },
  controlIcons: {
    color: "#777",

    fontSize: 50,
    transform: "scale(0.9)",
    "&:hover": {
      color: "#fff",
      transform: "scale(1)",
    },
  },

  bottomIcons: {
    color: "#999",
    "&:hover": {
      color: "#fff",
    },
  },

  volumeSlider: {
    width: 100,
  },
}));

const PrettoSlider = withStyles({
  root: {
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

const format = (seconds) => {
  if (isNaN(seconds)) {
    return `00:00`;
  }
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  }
  return `${mm}:${ss}`;
};

let count = 0;

function App() {
  const classes = useStyles();
  const [showControls, setShowControls] = useState(false);
  // const [count, setCount] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [timeDisplayFormat, setTimeDisplayFormat] = React.useState("normal");
  const [bookmarks, setBookmarks] = useState([]);
  const [state, setState] = useState({
    pip: false,
    playing: true,
    controls: false,
    light: false,

    muted: true,
    played: 0,
    duration: 0,
    playbackRate: 1.0,
    volume: 1,
    loop: false,
    seeking: false,
    //   quality : "auto"
  });

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsRef = useRef(null);
  const canvasRef = useRef(null);
  const {
    playing,
    controls,
    light,

    muted,
    loop,
    playbackRate,
    pip,
    played,
    seeking,
    volume,
    //  quality
  } = state;

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleProgress = (changeState) => {
    if (count > 3) {
      controlsRef.current.style.visibility = "hidden";
      count = 0;
    }
    if (controlsRef.current.style.visibility == "visible") {
      count += 1;
    }
    if (!state.seeking) {
      setState({ ...state, ...changeState });
    }
  };

  const handleSeekChange = (e, newValue) => {
    console.log({ newValue });
    setState({ ...state, played: parseFloat(newValue / 100) });
  };

  const handleSeekMouseDown = (e) => {
    setState({ ...state, seeking: true });
  };

  const handleSeekMouseUp = (e, newValue) => {
    console.log({ value: e.target });
    setState({ ...state, seeking: false });
    // console.log(sliderRef.current.value)
    playerRef.current.seekTo(newValue / 100, "fraction");
  };

  const handleDuration = (duration) => {
    setState({ ...state, duration });
  };

  const handleVolumeSeekDown = (e, newValue) => {
    setState({ ...state, seeking: false, volume: parseFloat(newValue / 100) });
  };
  const handleVolumeChange = (e, newValue) => {
    // console.log(newValue);
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const toggleFullScreen = () => {
    screenful.toggle(playerContainerRef.current);
  };

  const handleMouseMove = () => {
    // console.log("mousemove");
    controlsRef.current.style.visibility = "visible";
    count = 0;
  };

  const hanldeMouseLeave = () => {
    controlsRef.current.style.visibility = "hidden";
    count = 0;
  };

  const handleDisplayFormat = () => {
    setTimeDisplayFormat(
      timeDisplayFormat == "normal" ? "remaining" : "normal"
    );
  };

  const handlePlaybackRate = (rate) => {
    setState({ ...state, playbackRate: rate });
  };

  const hanldeMute = () => {
    setState({ ...state, muted: !state.muted });
  };
  const [buffering, setBuffering] = useState(false);

  const handleBuffer = () => {
    setBuffering(true);
  };

  const handleBufferEnd = () => {
    setBuffering(false);
  };
  const [quality, setQuality] = useState("auto");
  const [videoUrl, setVideoUrl] = useState(
  `http://10.145.80.49:8080/video?filename=premium_720p.mp4&token=${localStorage.getItem("token")}`
  );

  const handleQualityChange = (quality) => {
    let newVideoUrl = "";
    let currentTime = 0; // Default to 0 if playerRef or getCurrentTime is not available
    setQuality(quality); // Update quality state
    // Get the current playback time if playerRef is available
    if (playerRef && playerRef.current) {
      currentTime = playerRef.current.getCurrentTime();
    }

    switch (quality) {
      
      case "360p":
        newVideoUrl = `http://10.145.80.49:8080/video?filename=premium_360p.mp4&token=${localStorage.getItem("token")}`;
        break;
      case "480p":
        newVideoUrl =
          `http://10.145.80.49:8080/video?filename=premium_480p.mp4&token=${localStorage.getItem("token")}`;
        break;
      case "720p":
        newVideoUrl = `http://10.145.80.49:8080/video?filename=premium_720p.mp4&token=${localStorage.getItem("token")}`;
        break;
      case "1080p":
        newVideoUrl =
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
        console.log("1080p clicked");
        // console.log("in 1080p" + videoUrl)
        break;
      default:
        newVideoUrl = videoUrl; // Keep the current URL if quality is not specified
        console.log("default is runned");
    }
    setVideoUrl(newVideoUrl); // Update video URL state
    console.log("outside  " + videoUrl);

    if (playerRef && playerRef.current && videoUrl !== newVideoUrl) {
      setState({ ...state, seeking: true }); // Set seeking to true temporarily
      setTimeout(() => {
        playerRef.current.seekTo(currentTime);
        setState({ ...state, seeking: false }); // Set seeking back to false after seeking
      }, 1000); // Delay the seek operation to ensure the new video is loaded
    }
  };

  // const addBookmark = () => {
  //   const canvas = canvasRef.current;
  //   canvas.width = 160;
  //   canvas.height = 90;
  //   const ctx = canvas.getContext("2d");

  //   ctx.drawImage(
  //     playerRef.current.getInternalPlayer(),
  //     0,
  //     0,
  //     canvas.width,
  //     canvas.height
  //   );
  //   const dataUri = canvas.toDataURL();
  //   canvas.width = 0;
  //   canvas.height = 0;
  //   const bookmarksCopy = [...bookmarks];
  //   bookmarksCopy.push({
  //     time: playerRef.current.getCurrentTime(),
  //     display: format(playerRef.current.getCurrentTime()),
  //     image: dataUri,
  //   });
  //   setBookmarks(bookmarksCopy);
  // };

  const currentTime =
    playerRef && playerRef.current
      ? playerRef.current.getCurrentTime()
      : "00:00";

  const duration =
    playerRef && playerRef.current ? playerRef.current.getDuration() : "00:00";
  const elapsedTime =
    timeDisplayFormat == "normal"
      ? format(currentTime)
      : `-${format(duration - currentTime)}`;

  const totalDuration = format(duration);

  return (
    <>
      <Container maxWidth="md">
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={hanldeMouseLeave}
          ref={playerContainerRef}
          className={classes.playerWrapper}
        >
          <ReactPlayer
            style={{ backgroundColor: "grey" }}
            ref={playerRef}
            width="100%"
            height="100%"
            // url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
            url={videoUrl}
            pip={pip}
            playing={playing}
            controls={false}
            light={light}
            loop={loop}
            playbackRate={playbackRate}
            //         quality = {quality}
            volume={volume}
            muted={muted}
            onProgress={handleProgress}
            // onReady={() => console.log('onReady')} // Optional: You can use onReady to track when the video is ready to play
            // onBuffer={() => console.log('onBuffer')}
            onBuffer={handleBuffer}
            onBufferEnd={handleBufferEnd}
            config={{
              file: {
                attributes: {
                  crossorigin: "anonymous",
                },
              },

              youtube: {
                playerVars: { showinfo: 1 },
              },
              vimeo: {
                playerOptions: { controls: true },
              },
              dailymotion: {
                params: { controls: true },
              },
              soundcloud: {
                options: { show_artwork: true },
              },
              facebook: {
                appId: "12345",
              },
              // Add custom config for seeking to previous playback time
              file: {
                forceVideo: true,
              },
            }}
          />

          {buffering && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#fff",
                fontSize: 24,
              }}
            >
              {/* Loading... */}
              <iframe
                src="https://giphy.com/embed/uIJBFZoOaifHf52MER"
                width="480"
                height="439"
                frameBorder="0"
                class="giphy-embed"
                allowFullScreen
              ></iframe>
              <p>
                <a href="https://giphy.com/gifs/UniversalMusicIndia-elvish-dg-immortals-bawli-uIJBFZoOaifHf52MER"></a>
              </p>
            </div>
          )}

          <Controls
            ref={controlsRef}
            onSeek={handleSeekChange}
            onSeekMouseDown={handleSeekMouseDown}
            onSeekMouseUp={handleSeekMouseUp}
            onDuration={handleDuration}
            onRewind={handleRewind}
            onPlayPause={handlePlayPause}
            onFastForward={handleFastForward}
            playing={playing}
            played={played}
            elapsedTime={elapsedTime}
            totalDuration={totalDuration}
            onMute={hanldeMute}
            muted={muted}
            onVolumeChange={handleVolumeChange}
            onVolumeSeekDown={handleVolumeSeekDown}
            onChangeDispayFormat={handleDisplayFormat}
            playbackRate={playbackRate}
            onPlaybackRateChange={handlePlaybackRate}
            // quality = {quality}
            // onQualityChange = {handleQuality}
            onToggleFullScreen={toggleFullScreen}
            volume={volume}
            // onBookmark={addBookmark}
            isFullScreen={screenful.isFullscreen}
            playerContainerRef={playerContainerRef}
            quality={quality}
            onQualityChange={handleQualityChange}
            videoUrl={videoUrl}
          />
        </div>

        {/* <Grid container style={{ marginTop: 20 }} spacing={3}>
          {bookmarks.map((bookmark, index) => (
            <Grid key={index} item>
              <Paper
                onClick={() => {
                  playerRef.current.seekTo(bookmark.time);
                  controlsRef.current.style.visibility = "visible";

                  setTimeout(() => {
                    controlsRef.current.style.visibility = "hidden";
                  }, 1000);
                }}
                elevation={3}
              >
                <img crossOrigin="anonymous" src={bookmark.image} />
                <Typography variant="body2" align="center">
                  bookmark at {bookmark.display}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid> */}
        <canvas ref={canvasRef} />
      </Container>
    </>
  );
}

export default App;
