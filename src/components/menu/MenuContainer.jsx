import React, { useContext } from "react";
import {
  Button,
  Typography,
  IconButton,
  Toolbar,
  CssBaseline,
  CardContent,
  Card,
  Paper,
  Grid
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { StateContext } from "../context/index";

export const MenuContainer = () => {
  const { state, dispatch } = useContext(StateContext);
  let featuredArticles = [...state.articles];
  
  if (state.selectedTopic) {
    featuredArticles = featuredArticles.filter(article => article.topic === state.selectedTopic);
  }

  const styles = {
    layout: {
      width: "80%",
      marginLeft: "auto",
      marginRight: "auto"
    },
    toolbarMain: {
      borderBottom: "2px solid #000000"
    },
    toolbarTitle: {
      flex: 1
    },
    toolbarSecondary: {
      justifyContent: "space-between",
      marginBottom: '10px'
    },
    mainFeaturedPost: {
      backgroundColor: "#808080",
      color: "#FFFFFF",
      marginBottom: "4px"
    },
    mainFeaturedPostContent: {
      padding: "6px"
    },
    mainGrid: {
      marginTop: "3px"
    },
    card: {
      display: "flex",
      width: '100%'
    },
    cardDetails: {
      flex: 1,
      flexGrow: 1
    },
    sidebarAboutBox: {
      padding: "2px",
      backgroundColor: "#d3d3d3"
    },
    sidebarSection: {
      marginTop: '3px'
    }
  };

  const sections = [...state.topics];

  // dispatch({type: 'setSelectedTopic', selectedTopic: e.target.value})

  const social = ["GitHub", "Twitter", "Facebook"];

  return (
    <React.Fragment>
      <CssBaseline />
      <div style={styles.layout}>
        <Toolbar style={styles.toolbarMain}>
          <Button size="small">Subscribe</Button>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            style={styles.toolbarTitle}
          >
            Blog
          </Typography>
          <IconButton>
            <Search />
          </IconButton>
          <Button variant="outlined" size="small">
            Sign up
          </Button>
        </Toolbar>
        <Toolbar variant="dense" style={styles.toolbarSecondary}>
          {sections.map(section => (
            <Typography color="inherit" noWrap key={section}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  if (section === 'React Hooks') {
                    dispatch({type: 'setSelectedTopic', selectedTopic: 'React Hooks'})
                  }
                  if (section === 'Reactjs') {
                    dispatch({type: 'setSelectedTopic', selectedTopic: 'Reactjs'})
                  }
                  if (section === 'GraphQL') {
                    dispatch({type: 'setSelectedTopic', selectedTopic: 'GraphQL'})
                  }
                  if (section === 'Material UI') {
                    dispatch({type: 'setSelectedTopic', selectedTopic: 'Material UI'})
                  }
                }}
              >
                {section}
              </Button>
            </Typography>
          ))}
        </Toolbar>
        <main>
          {/* Main featured post */}
          <Paper style={styles.mainFeaturedPost}>
            <Grid container spacing={16}>
              <Grid item md={"auto"}>
                <div style={styles.mainFeaturedPostContent}>
                  <Typography
                    component="h1"
                    variant="h3"
                    color="inherit"
                    gutterBottom
                  >
                    Title of a longer featured blog post
                  </Typography>
                  <Typography variant="h5" color="inherit" paragraph  gutterBottom>
                    Multiple lines of text that form the lede, informing new
                    readers quickly and efficiently about what&apos;s most
                    interesting in this post&apos;s contents…
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Paper>
          {/* End main featured post */}
          {/* Sub featured posts */}
          <Grid container spacing={16}>
            {featuredArticles.map(post => (
              <Grid item key={post.id} xs={12} md={6}>
                <Card style={styles.card}>
                  <div style={styles.cardDetails}>
                    <CardContent>
                      <Typography component="h2" variant="h5" color="primary" gutterBottom>
                        {post.title}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                        {post.author}
                      </Typography>
                      <Typography variant="subtitle1" paragraph gutterBottom>
                        {post.description}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                        {post.topic}
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => {
                            console.log('launch full article on its on page');
                          }}
                        >
                          Continue reading...
                        </Button>
                      </Typography>
                    </CardContent>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
          {/* Sidebar */}
          <Grid item xs={12} md={"auto"}>
            <Paper elevation={0} style={styles.sidebarAboutBox}>
              <Typography variant="h6" gutterBottom>
                About
              </Typography>
              <Typography gutterBottom>
                Etiam porta sem malesuada magna mollis euismod. Cras mattis
                consectetur purus sit amet fermentum. Aenean lacinia bibendum
                nulla sed consectetur.
              </Typography>
            </Paper>
            <Typography
              variant="h6"
              gutterBottom
              style={styles.sidebarSection}
            >
              Social
            </Typography>
            {social.map(network => (
              <Typography key={network} gutterBottom>{network}</Typography>
            ))}
          </Grid>
        </main>
      </div>
    </React.Fragment>
  );
};
