/* eslint-disable */
import { React , useEffect, useState } from "react";
import { Box, makeStyles, ThemeProvider, Button, Typography } from "@material-ui/core";
import theme from "../../../themes/theme.jsx";
import Footer from "../../../layouts/LandingPage/Footer.jsx";
// import UserNavBar from "../../../layouts/UserPage/UserNavbar";
import CreatePreference from "./CreatePreference.jsx";
import { useNavigate } from "react-router-dom";
import { postAmbiancePreference } from "../../../api/customerPreference.js";
import { ambiances } from "../../../api/constants.js";


const useStyles = makeStyles(() => ({
    paperContainer: {
        background: theme.palette.secondary.main,
        height: "120vh",
        position: "relative",
        overflow: "hidden",
        objectFit: "cover",
        padding: "10%",
        justifyContent: "center"
    },
    formContainer: {
        minHeight: 'auto',
        // minWidth: "50vw",
        borderRadius: 10,
        background: "#FDF0D5",
        padding: 10
    },
    buttonContainer: {
        display: "flex",
        padding: 10,
        objectFit: "cover",
        justifyContent: "center"
    },
    iconRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 20
    },
    text: {
        color: theme.palette.beige.main,
    },
    button: {
        color: theme.palette.secondary.main,
        fontSize: 20,
        border: "2px solid",
        borderColor: theme.palette.secondary.main
    }
}));

// color1: f75342
// color2: 763333
// color3: ffffff
// fira sans code

const Ambiance = () => {
    const classes = useStyles();
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate();
    const [prefState, setPrefState] = useState();
    const [foodPreferences, setFoodPreferences] = useState(null);


    const handlePreferenceChange = (preference, isChecked) => {
        setPrefState((prevState) => ({
            ...prevState,
            [preference]: isChecked
        }));
    };

    const handleClick = () => {
        // eslint-disable-next-line no-console
        postAmbiancePreference(prefState);

        navigate("/user/newuser/flavor");
    };

    const renderPreferences = () => {
        try {
            return foodPreferences.map((preference, index) => {
                return <CreatePreference key={index} name={preference} 
                    onPreferenceChange={handlePreferenceChange} />;
            })
        } catch(error) {
            console.error(error);
        }
    };

    useEffect(()=> {
        setFoodPreferences(ambiances);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            {/* <UserNavBar /> */}
            <Box className={classes.paperContainer}>
                <Typography variant="h3" className={classes.text} >Tell us about your ambiance preferences!</Typography>
                <Box className={classes.formContainer}>
                    {renderPreferences()}
                    <Box className={classes.buttonContainer}>
                        <Button className={classes.button} onClick={handleClick}>
              Submit Preferences
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </ThemeProvider>
    );
};

export default Ambiance;