import React, { forwardRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
// import BookmarkIcon from "@material-ui/icons/Bookmark";
import FastRewindIcon from "@material-ui/icons/FastRewind";
import FastForwardIcon from "@material-ui/icons/FastForward";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import VolumeUp from "@material-ui/icons/VolumeUp";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeMute from "@material-ui/icons/VolumeOff";
import FullScreen from "@material-ui/icons/Fullscreen";
import Popover from "@material-ui/core/Popover";

const useStyles = makeStyles((theme) => ({
  controlsWrapper: {
    visibility: "hidden",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
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

const Controls = forwardRef(
  (
    {
      onSeek,
      onSeekMouseDown,
      onSeekMouseUp,
      onDuration,
      onRewind,
      onPlayPause,
      onFastForward,
      playing,
      played,
      loaded,
      elapsedTime,
      film,
      totalDuration,
      onMute,
      muted,
      onVolumeSeekDown,
      onChangeDispayFormat,
      plan,
      playbackRate,
      onPlaybackRateChange,
      onToggleFullScreen,
      volume,
      onVolumeChange,
      onBookmark,
      isFullScreen,
      playerContainerRef,
      onQualityChange, // Function to handle quality change
      quality, // Current quality
      videoUrl, // Current video URL
    },
    ref
  ) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    // QUALITY CODE
    const [qualityAnchorEl, setQualityAnchorEl] = React.useState(null);
    const handleQualityClick = (event) => {
      setQualityAnchorEl(event.currentTarget);
    };
    const handleQualityClose = () => {
      setQualityAnchorEl(null);
    };

    const handleQualitySelect = (quality) => {
      // Change video quality based on user selection
      console.log("Selected quality:", quality);
      onQualityChange(quality);
      handleQualityClose(); // Close the quality popover
    };

    const qualityOpen = Boolean(qualityAnchorEl);
    const qualityId = qualityOpen ? "quality-popover" : undefined;
    const [qualityOptions, setQualityOptions] = useState([
      "360p",
      "480p",
      "720p",
    ]);
    useEffect(() => {
      if (localStorage.getItem("plan").toLowerCase() === "free") {
        setQualityOptions(["360p", "480p", "720p"]);
      } else if (localStorage.getItem("plan").toLowerCase() === "pro") {
        setQualityOptions(["360p", "480p", "720p", "1080p"]);
      } else if (localStorage.getItem("plan").toLowerCase() === "premium") {
        setQualityOptions(["360p", "480p", "720p", "1080p", "4K"]);
      }
    }, []);

    return (
      <div ref={ref} className={classes.controlsWrapper}>
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          style={{ flexGrow: 1 }}
        >
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            // style
            style={{ padding: 16 }}
          >
            <Grid item>
              <Typography variant="h5" style={{ color: "#fff" }}>
                {film?.title || "Movie"}
              </Typography>
            </Grid>
            {/* <Grid item>
              <Button
                onClick={onBookmark}
                variant="contained"
                color="primary"
                startIcon={<BookmarkIcon />}
              >
                Bookmark
              </Button>
            </Grid> */}
          </Grid>
          <Grid container direction="row" alignItems="center" justifyContent="center">
            <IconButton
              onClick={onRewind}
              className={classes.controlIcons}
              aria-label="rewind"
            >
              <FastRewindIcon
                className={classes.controlIcons}
                fontSize="inherit"
              />
            </IconButton>
            <IconButton
              onClick={onPlayPause}
              className={classes.controlIcons}
              aria-label="play"
            >
              {playing ? (
                <PauseIcon fontSize="inherit" />
              ) : (
                <PlayArrowIcon fontSize="inherit" />
              )}
            </IconButton>
            <IconButton
              onClick={onFastForward}
              className={classes.controlIcons}
              aria-label="forward"
            >
              <FastForwardIcon fontSize="inherit" />
            </IconButton>
          </Grid>
          {/* bottom controls */}
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            style={{ padding: 16 }}
          >
            <Grid container spacing={2} style={{ position: 'relative' }}>

                <Grid item xs={12} style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}>
                    <PrettoSlider
                        disabled
                        min={0}
                        max={100}
                        ValueLabelComponent={(props) => (
                            <ValueLabelComponent {...props} value={elapsedTime} />
                        )}
                        aria-label="custom thumb label"
                        value={loaded * 100}
                        onChange={onSeek}
                        onMouseDown={onSeekMouseDown}
                        onChangeCommitted={onSeekMouseUp}
                        // This slider will represent the loaded progress
                        // Use the 'loaded' variable to determine the value
                        // You may want to style it differently to indicate it's not interactive
                        style={{ opacity: 0.5 }} // Adjust opacity as needed
                    />
                </Grid>

                <Grid item xs={12} style={{ position: 'relative' }}>
                    <PrettoSlider
                        min={0}
                        max={100}
                        ValueLabelComponent={(props) => (
                            <ValueLabelComponent {...props} value={elapsedTime} />
                        )}
                        aria-label="custom thumb label"
                        value={played * 100}
                        onChange={onSeek}
                        onMouseDown={onSeekMouseDown}
                        onChangeCommitted={onSeekMouseUp}
                        style={{ opacity: 0.7 }} // Adjust opacity as needed
                        // onDuration={onDuration}
                    />
                </Grid>
            </Grid>

            <Grid item>
              <Grid container alignItems="center">
                <IconButton
                  onClick={onPlayPause}
                  className={classes.bottomIcons}
                >
                  {playing ? (
                    <PauseIcon fontSize="large" />
                  ) : (
                    <PlayArrowIcon fontSize="large" />
                  )}
                </IconButton>

                <IconButton
                  // onClick={() => setState({ ...state, muted: !state.muted })}
                  onClick={onMute}
                  className={`${classes.bottomIcons} ${classes.volumeButton}`}
                >
                  {muted ? (
                    <VolumeMute fontSize="large" />
                  ) : volume > 0.5 ? (
                    <VolumeUp fontSize="large" />
                  ) : (
                    <VolumeDown fontSize="large" />
                  )}
                </IconButton>

                <Slider
                  min={0}
                  max={100}
                  value={muted ? 0 : volume * 100}
                  onChange={onVolumeChange}
                  aria-labelledby="input-slider"
                  className={classes.volumeSlider}
                  onMouseDown={onSeekMouseDown}
                  onChangeCommitted={onVolumeSeekDown}
                />
                <Button
                  variant="text"
                  onClick={
                    onChangeDispayFormat
                    //     () =>
                    //   setTimeDisplayFormat(
                    //     timeDisplayFormat == "normal" ? "remaining" : "normal"
                    //   )
                  }
                >
                  <Typography
                    variant="body1"
                    style={{ color: "#fff", marginLeft: 16 }}
                  >
                    {elapsedTime}/{totalDuration}
                  </Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid item>
              <Button
                onClick={handleQualityClick}
                aria-describedby={qualityId}
                className={classes.bottomIcons}
                variant="text"
              >
                <Typography>Quality {quality}</Typography>
              </Button>
              <Popover
                open={qualityOpen}
                anchorEl={qualityAnchorEl}
                onClose={handleQualityClose}
                id={qualityId}
                container={isFullScreen ? playerContainerRef.current : null}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Grid container direction="column-reverse">
                  {qualityOptions.map((option) => (
                    <Button
                      key={option}
                      onClick={() => handleQualitySelect(option)}
                      variant="text"
                    >
                      <Typography>{option}</Typography>
                    </Button>
                  ))}
                </Grid>
              </Popover>

              <Button
                onClick={handleClick}
                aria-describedby={id}
                className={classes.bottomIcons}
                variant="text"
              >
                <Typography>{playbackRate}X</Typography>
              </Button>

              <Popover
                container={ref.current}
                open={open}
                id={id}
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Grid container direction="column-reverse">
                  {[0.5, 1, 1.5, 2].map((rate) => (
                    <Button
                      key={rate}
                      //   onClick={() => setState({ ...state, playbackRate: rate })}
                      onClick={() => onPlaybackRateChange(rate)}
                      variant="text"
                    >
                      <Typography
                        color={rate === playbackRate ? "secondary" : "inherit"}
                      >
                        {rate}X
                      </Typography>
                    </Button>
                  ))}
                </Grid>
              </Popover>
              <IconButton
                onClick={onToggleFullScreen}
                className={classes.bottomIcons}
              >
                <FullScreen fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
);

Controls.propTypes = {
  onSeek: PropTypes.func,
  onSeekMouseDown: PropTypes.func,
  onSeekMouseUp: PropTypes.func,
  onDuration: PropTypes.func,
  onRewind: PropTypes.func,
  onPlayPause: PropTypes.func,
  onFastForward: PropTypes.func,
  onVolumeSeekDown: PropTypes.func,
  onChangeDispayFormat: PropTypes.func,
  onPlaybackRateChange: PropTypes.func,
  onToggleFullScreen: PropTypes.func,
  onMute: PropTypes.func,
  playing: PropTypes.bool,
  played: PropTypes.number,
  loaded: PropTypes.number,
  elapsedTime: PropTypes.string,
  totalDuration: PropTypes.string,
  muted: PropTypes.bool,
  playbackRate: PropTypes.number,
  isFullScreen: PropTypes.bool,
  playerContainerRef: PropTypes.object,
  onQualityChange: PropTypes.func,
  videoUrl: PropTypes.string,
};
export default Controls;
