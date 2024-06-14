

/*import React from 'react';
import { useParams } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Box from '@mui/material/Box';
import AntecedentComponent from "./AntecedentComponent";
import TreatmentComponent from './TreatmentComponent';
import DiagnosisComponent from './DiagnosisComponent';
import ExamenesComponent from './ExamenesComponent';

const Consultation = () => {
    const { n_dossier, nom, prenom } = useParams();

    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const TabPanel = (props) => {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
                {...other}
                sx={{
                    bgcolor: '#45c1b3',
                    height: 'calc(100vh - 64px)',
                    overflow: 'auto',
                    display: value === index ? 'block' : 'none',
                }}
            >
                {value === index && (
                    <Box sx={{ p: 3, height: '100%' }}>
                        {index === 0 && <AntecedentComponent />}
                        {index === 1 && <ExamenesComponent />}
                        {index === 2 && <TreatmentComponent />}
                        {index === 3 && <DiagnosisComponent />}
                    </Box>
                )}
            </div>
        );
    };

    const a11yProps = (index) => {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    };

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                        sx={{ bgcolor: '#45c1b3' }}
                    >
                        <Tab label="Antecedent" {...a11yProps(0)} />
                        <Tab label="exámenes" {...a11yProps(2)} />
                        <Tab label="Treatment" {...a11yProps(1)} />
                        <Tab label="Diagnosis" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction} />
                    <TabPanel value={value} index={1} dir={theme.direction} />
                    <TabPanel value={value} index={2} dir={theme.direction} />
                    <TabPanel value={value} index={3} dir={theme.direction} />
                </SwipeableViews>
            </Box>
        </div>
    );
};

export default Consultation;*/
import React from 'react';
import { useParams } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AntecedentComponent from "./AntecedentComponent";
import OrdonnanceComponent from './OrdonnanceComponent';
import Compte_renduComponent from './Compte_renduComponent';
import ConsultationComponent from './ConsultationComponent';
import Conduite_a_tenirComponent from './Conduite_a_tenirComponent';
import CertificatComponent from './CertificatComponent';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
            style={{
                bgcolor: '#45c1b3',
                height: 'calc(100vh - 64px)',
                overflow: 'auto',
                display: value === index ? 'block' : 'none',
            }}
        >
            {value === index && (
                <Box sx={{ p: 3, height: '100%' }}>
                    {children}
                </Box>
            )}
        </div>
    );
};

const a11yProps = (index) => {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
};

const Consultation = () => {
    const { n_dossier, nom, prenom } = useParams();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                        sx={{ bgcolor: '#45c1b3' }}
                    >
                        <Tab label="Antecedent" {...a11yProps(0)} />
                        <Tab label="Consultation" {...a11yProps(1)} />
                        <Tab label="Ordonnance" {...a11yProps(2)} />
                        <Tab label="Compte rendu" {...a11yProps(3)} />
                        <Tab label="Conduite à tenir" {...a11yProps(4)} />
                        <Tab label="Certificat" {...a11yProps(5)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <AntecedentComponent nDossier={n_dossier} />
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <ConsultationComponent nDossier={n_dossier} />
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        <OrdonnanceComponent nDossier={n_dossier} />
                    </TabPanel>
                    <TabPanel value={value} index={3} dir={theme.direction}>
                        <Compte_renduComponent nDossier={n_dossier} />
                    </TabPanel>
                    <TabPanel value={value} index={4} dir={theme.direction}>
                        <Conduite_a_tenirComponent nDossier={n_dossier} />
                    </TabPanel>
                    <TabPanel value={value} index={5} dir={theme.direction}>
                        <CertificatComponent nDossier={n_dossier} />
                    </TabPanel>
                </SwipeableViews>
            </Box>
        </div>
    );
};

export default Consultation;


