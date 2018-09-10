import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText,
  Divider, AppBar, Toolbar, Typography, Button,
} from '@material-ui/core';
import {
  Dashboard, Schedule, People, LocationCity, Work, Create,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Login from '../Home/Login.jsx';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: '2vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  flex: {
    flex: 1,
    justify: 'flex-start',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: '1vw',
  },
  list: {
    minWidth: 150,
    maxWidth: 250,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  fullList: {
    width: 'auto',
  },
  sideBar: {
    minWidth: 230,
    maxWidth: '30vw',
    backgroundColor: theme.palette.background.paper,
  },
  drawerPaper: {
    position: 'relative',
    width: 'drawerWidth',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0,
  },
  toolbar: theme.mixins.toolbar,
});

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  handleToggle(open) {
    this.setState({
      isOpen: open,
    });
  }

  renderAdminSideBar() {
    const { classes } = this.props;
    return (
      <div>
        <List component="nav">
          {this.props.isLoggedIn && this.props.option === 'admin'
            ? <List>
              <Link to={'/admin'}>
                <ListItem button>
                  <ListItemIcon>
                    <Dashboard/>
                  </ListItemIcon>
                  <ListItemText primary="Dashboard"/>
                </ListItem>
              </Link>
              <Link to={'/admin/schedule'}>
                <ListItem button>
                  <ListItemIcon>
                    <Schedule/>
                  </ListItemIcon>
                  <ListItemText primary="Schedule"/>
                </ListItem>
              </Link>
              <Link to={'/admin/subs'}>
                <ListItem button>
                  <ListItemIcon>
                    <People/>
                  </ListItemIcon>
                  <ListItemText primary="Substitutes"/>
                </ListItem>
              </Link>
              <Link to={'/admin/schools'}>
                <ListItem button>
                  <ListItemIcon>
                    <LocationCity/>
                  </ListItemIcon>
                  <ListItemText primary="Schools"/>
                </ListItem>
              </Link>
              <Link to={'/jobs/create'}>
                <ListItem button>
                  <ListItemIcon>
                    <Work/>
                  </ListItemIcon>
                  <ListItemText primary="Create Job"/>
                </ListItem>
              </Link>
              <Divider />
            </List>
            : <div></div>}
          {this.props.isLoggedIn && this.props.option === 'school'
            ? <List>
              <Link to={'/school'}>
                <ListItem button>
                  <ListItemIcon>
                    <Dashboard/>
                  </ListItemIcon>
                  <ListItemText primary="Dashboard"/>
                </ListItem>
              </Link>
              <Link to={'/school/job/create'}>
                <ListItem button>
                  <ListItemIcon>
                    <Create/>
                  </ListItemIcon>
                  <ListItemText primary="New Request"/>
                </ListItem>
              </Link>
              <Divider />
            </List>
            : <div></div>}
          {this.props.isLoggedIn && this.props.option === 'sub'
            ? <List>
              <Link to={'/sub'}>
                <ListItem button>
                  <ListItemIcon>
                    <Dashboard/>
                  </ListItemIcon>
                  <ListItemText primary="Dashboard"/>
                </ListItem>
              </Link>
              <Divider />
            </List>
            : <div></div>}
        </List>
      </div>
    );
  }

  render() {
    console.log('this navbar.jsx', this.props);
    const { classes } = this.props;
    return (
      <div>
        <AppBar className={classes.appBar} color="default" position="absolute">
          <Toolbar>
            <Link to={'/'} className={classes.flex}>
              <Typography variant="title" style={{ color: '#6200ea', textShadow: '2px 2px 4px #fffff0' }} >
                <i><b>Postaff</b></i>
              </Typography>
            </Link>
            {!this.props.isLoggedIn
              ? <Login clickLogout={this.props.clickLogout} onLogin={this.props.onLogin} />
              : <div>
                <Grid container spacing={8} alignItems="center" justify="flex-start">
                  <Grid item xs={6} >
                    <Typography variant="subheading">{`Hello, ${this.props.username}!`}</Typography>
                  </Grid>
                  <Grid item xs={2} >
                    <Link to={{ pathname: '/', state: { clicked: false } }}>
                      <Tooltip id="tooltip-left" title="Sign out of your account" placement="left">
                        <Button color="inherit" onClick={() => this.props.clickLogout()}>
                          <Typography variant="title" style={{ color: '#606060' }}>Logout</Typography>
                        </Button>
                      </Tooltip>
                    </Link>
                  </Grid>
                </Grid>
              </div>
            }
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classes.drawerPaper}
          style={{ zIndex: 0 }}
        >
          <div style={{ marginTop: '64px' }}/>
          <div
            tabIndex={0}
            role="button"
            onClick={() => this.handleToggle(false)}
            onKeyDown={() => this.handleToggle(false)}
          >
            {this.renderAdminSideBar()}
            <List component="nav">
              <ListItem button>
                <ListItemText primary="About"/>
              </ListItem>
              <ListItem button>
                <ListItemText primary="Contact"/>
              </ListItem>
              <ListItem button>
                <ListItemText primary="Careers"/>
              </ListItem>
              <ListItem button>
                <ListItemText primary="Terms"/>
              </ListItem>
            </List>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(NavBar);
