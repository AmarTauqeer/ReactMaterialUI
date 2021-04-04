import React from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  InputBase,
  IconButton,
  Badge,
  makeStyles,
} from "@material-ui/core";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#fff",

  },
  searchInput: {
    opacity: "0.6",
    padding: "0px 8px",
    fontSize: "0.8rem",
    "&:hover": {
      backgroundColor: "#f2f2f2",
    },
    "& .MuiSvgIcon-root": {
      marginRight: "8px",
    },
  },
});

export default function Header() {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item>
              <InputBase
                placeholder="Search topics"
                className={classes.searchInput}
                startAdornment={<SearchIcon fontsize="small" />}
              />
            </Grid>
            <Grid item sm></Grid>
            <Grid>
              <IconButton>
                <Badge content={4} color="secondary">
                  <NotificationsNoneIcon fontsize="small" />
                </Badge>
              </IconButton>
              <IconButton>
                <Badge content={3} color="primary">
                  <ChatBubbleOutlineIcon fontsize="small" />
                </Badge>
              </IconButton>
              <IconButton>
                <PowerSettingsNewIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
