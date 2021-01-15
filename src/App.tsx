import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import IProject from './IProject';
import Fuse from 'fuse.js';
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {faGlobe, faGraduationCap} from "@fortawesome/free-solid-svg-icons";
import './App.css'
import {
    Box, Button, ButtonGroup,
    Card,
    CardActions,
    CardContent,
    createMuiTheme,
    Grid, IconButton,
    MuiThemeProvider,
    TextField,
    Typography
} from "@material-ui/core";

function App() {

    const darkTheme = createMuiTheme({
        palette: {
            type: 'dark',
            background: {
                paper: "inherit",
            },
        },
    });

    const [isLoaded, setIsLoaded] = useState<Boolean>(false);
    const [projects, setProjects] = useState<IProject[]>([]);
    const [searchBoxValue, setSearchBoxValue] = useState<string>("");
    const [projectsToShow, setProjectsToShow] = useState<IProject[]>([]);

    // ['description', 'title', 'tags']
    const searchOptions = {
        keys: [
            {
                name: 'title',
                weight: 1
            },
            {
                name: 'tags',
                weight: 0.7
            },
            {
                name: "description",
                weight: 0.3
            }
        ]
    }

    let performSearch = (searchTerm: string): IProject[] => {
        if (searchTerm === ""){
            console.log("Nothing was searched")
            return projects;
        }

        const fuse = new Fuse(projects, searchOptions);
        const result = fuse.search(searchTerm)

        // Results from FUSE are nested.
        const realResult = result.map(r => r.item);
        return realResult;
    }

    const handleSearchBox = (e: any) => {
        setSearchBoxValue(e.target.value);
        const result = performSearch(e.target.value);
        setProjectsToShow(result);
    }

    useEffect(() => {
        if (!isLoaded) {
            fetch("/info.json")
                .then(res => res.json())
                .then(
                    (result) => {
                        let formattedResult: IProject[] = [];
                        Object.values(result).forEach(entry => {
                            formattedResult.push(entry as IProject);
                        })
                        setIsLoaded(true);
                        setProjects(formattedResult);
                        setProjectsToShow(formattedResult);
                        console.log("Loaded data");
                    }
                )
        }
    })

    let openLinkInNewTab = (link: string | undefined) => {
        window.open(link, '_blank');
    }

    let getHTMLForProjLinks = (proj: IProject) => {
        return (
            <CardActions disableSpacing>
                {proj.github ? (
                    <IconButton onClick={() => openLinkInNewTab(proj.github)}>
                    <FontAwesomeIcon icon={faGithub} />
                    </IconButton>
                    ) : null}
                {proj.livedemo ? (
                    <IconButton onClick={() => openLinkInNewTab(proj.livedemo)}>
                        <FontAwesomeIcon icon={faGlobe} />
                    </IconButton>
                ) : null}
                {proj.academics ? (
                    <IconButton onClick={() => openLinkInNewTab(proj.academics)}>
                        <FontAwesomeIcon icon={faGraduationCap} />
                    </IconButton>
                ) : null}
            </CardActions>
        )
    }

    let changeSearchTerm = (term: string) => {
        setProjectsToShow(performSearch(term));
        setSearchBoxValue(term);
    }

    if (!isLoaded) {
        return (
            <div></div>
        );
    } else {
        return (
            <div id={"appContainer"}>
                <MuiThemeProvider theme={darkTheme}>
                    <Box id={"search"}>
                        <h1>My Projects</h1>
                        <TextField id="standard-basic" label="about" onChange={handleSearchBox} value={searchBoxValue}/>
                    </Box>


            <Grid container>
                {projectsToShow.length > 0 ? projectsToShow.map(proj => (
                    <Grid xs={5} item id={"projectsContainer"}>
                        <Card >
                            <img src={'/images/' + proj.title + ".jpg"} alt="Project" />
                            <CardContent>
                                <Typography variant={"h5"} gutterBottom={true}>
                                    {proj.title}
                                </Typography>
                                <Typography>
                                    {proj.description}
                                </Typography>
                                <Typography>
                                        <ButtonGroup size="small" color="primary" aria-label="large outlined primary button group">
                                            {   proj.tags.map(tag => (
                                                <Button onClick={() => changeSearchTerm(tag)}>{tag}</Button>
                                            ))}
                                            </ButtonGroup>
                                </Typography>
                                {getHTMLForProjLinks(proj)}
                            </CardContent>
                        </Card>
                    </Grid>
                )) : null}

            </Grid>
                </MuiThemeProvider>
            </div>


        );
    }


}

export default App;