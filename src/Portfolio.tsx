import './Portfolio.css'
import {Grid} from "@material-ui/core";
import {faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import App from "./App";
import {Helmet} from "react-helmet";

function Portfolio() {

    // The second grid with xs=5 is needed, cause the first one doent work..?
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Lucas Winther Portfolio</title>
            </Helmet>
            <Grid container spacing={0}>
                <Grid item xs={5} id={"headerContainer"}>
                    <header>
                        <img alt={"Lucas Winther"} src='images/avatar.png' />
                        <p>
                            <strong>My name is Lucas</strong>, a student <br />
                            at Aarhus University with <br />
                            passion for development.
                        </p>
                        <div id={"icons"}>
                            <a href={"https://www.linkedin.com/in/lucas-winther/"}><FontAwesomeIcon icon={faLinkedin} /></a>
                            <a href={"mailto:lucas@lucaswinther.info"}><FontAwesomeIcon icon={faEnvelope} /></a>
                            <a href={"https://github.com/StereotypicalCat"}><FontAwesomeIcon icon={faGithub} /></a>
                        </div>
                    </header>
                </Grid>
                {/* I dont know why this grid is needed, but the first grid apparently doesn't register correctly.*/}
                <Grid item xs={5}>
                </Grid>
                <Grid item xs={7} id={"appContainer"}>
                    <App />
                </Grid>

            </Grid>
        </div>
    )

}

export default Portfolio;