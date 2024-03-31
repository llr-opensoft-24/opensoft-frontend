import React, { useState, useRef, useEffect } from "react";
import Container from "@material-ui/core/Container";
import ReactPlayer from "react-player";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import screenful from "screenfull";
import Controls from "./Controls";
import { useMovie } from "../../context/MovieContext";
import { useSearch } from "../../context/SearchContext";
import { useLocation, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  playerWrapper: {
    width: "100%",
    position: "relative",
    marginTop: "4.5%"
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
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    volume: 1,
    loop: false,
    seeking: false,
    //   quality : "auto"
  });


  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const id = params.get("id");
  const {filmData}=useMovie();
  const film = (filmData.find((movie)=> movie.imdb.id==id));

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
    loaded,
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
  const [quality, setQuality] = useState("720p");
  const [videoUrl, setVideoUrl] = useState(
  `http://4.247.166.168/video?filename=${film?.plan || "free"}_480p.mp4&token=${localStorage.getItem("token")}`
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
        newVideoUrl = `http://4.247.166.168/video?filename=${film.plan}_360p.mp4&token=${localStorage.getItem("token")}`;
        break;
      case "480p":
        newVideoUrl =
          `http://4.247.166.168/video?filename=${film.plan}_480p.mp4&token=${localStorage.getItem("token")}`;
        break;
      case "720p":
        newVideoUrl = `http://4.247.166.168/video?filename=${film.plan}_720p.mp4&token=${localStorage.getItem("token")}`;
        break;
      case "1080p":
        newVideoUrl =
          `http://4.247.166.168/video?filename=${film.plan}_1080p.mp4&token=${localStorage.getItem("token")}`;
        break;
      case "4K":
        newVideoUrl =
          `http://4.247.166.168/video?filename=${film.plan}_4K.mp4&token=${localStorage.getItem("token")}`;
        break;
      default:
        newVideoUrl = videoUrl; 
        console.log("default is runned");
    }
    setVideoUrl(newVideoUrl); 
    console.log("outside  " + videoUrl);

    if (playerRef && playerRef.current && videoUrl !== newVideoUrl) {
      setState({ ...state, seeking: true });
      setTimeout(() => {
        playerRef.current.seekTo(currentTime);
        setState({ ...state, seeking: false }); 
      }, 1000);
    }
  };

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
      <Container style={{display: "contents"}} className="background_video" maxWidth="md">
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
                width="100"
                height="109"
                frameBorder="0"
                className="giphy-embed"
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
            loaded={loaded}
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
            film={film}
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
