export const styles = {
  articleContentContainer: {
    display: 'flex'
  },
  verticalTextLeft: {
    transform: 'translate(0px, 150px) rotate(-90deg)',
    fontSize: '24px',
    fontWeight: 'bold',
    fontFamily: 'Bookman',
    whiteSpace: 'pre'
  },
  verticalTextRight: {
    transform: 'translate(0px, 100px) rotate(90deg)',
    fontSize: '24px',
    fontWeight: 'bold',
    fontFamily: 'Bookman',
    whiteSpace: 'pre'
  },
  appWrapper : {
    display: 'flex',
    justifyContent: 'flex-start',
    flexGrow: 1
  },
  leftSideContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "10vw",
    height: "90vh",
    backgroundColor: "#000000",
    color: "#FFFFFF"
  },
  rightSideContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "10vw",
    height: "90vh",
    backgroundColor: "#000000",
    color: "#FFFFFF"
  },
  applicationContainer: {
    width: "80vw",
    height: "90vh",
    overflowY: 'scroll',
    overflowX: 'hidden'
  },
  layout: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    flexGrow: 1
  },
  submitArticleContainer: {
    width: "60%",
    marginLeft: "auto",
    marginRight: "auto",
    flexGrow: 1
  },
  toolbarMain: {
    borderBottom: "2px solid #000000"
  },
  toolbarTitle: {
    flex: 1
  },
  toolbarMainSecondary: {
    justifyContent: "space-between",
    borderBottom: "1px solid #000000"
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    marginBottom: '10px'
  },
  mainFeaturedPost: {
    backgroundColor: "#000000",
    color: "#FFFFFF",
    marginBottom: "4px"
  },
  mainFeaturedPostContent: {
    padding: "6px",
    flexGrow: 1
  },
  chosenArticlePaper: {
    backgroundColor: "#000000",
    color: "#FFFFFF",
    marginBottom: "4px"
  },
  choseArticleContent: {
    color: "#FFFFFF",
    marginTop: "6px",
    padding: "6px",
    flexGrow: 1
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
    backgroundColor: "#000000",
    color: "#FFFFFF"
  },
  sidebarSection: {
    marginTop: '3px'
  },
  footer: {
    backgroundColor: "#000000",
    color: "#FFFFFF",
    position: "absolute",
    width: "100%",
    height: "10%",
    marginTop: "15px",
    flexGrow: 1,
    flex: 1,
    bottom: 0,
    left: 0
  },
  spinner: {
    width: "100%",
    height: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    flexGrow: 1
  }
};
