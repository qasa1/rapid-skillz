import React from 'react';
import './App.css';
import Graph from './Components/graph.component';
import Header from './Components/Layout/header.component'
import { 
  FormControl,
  Select,
  MenuItem,
  makeStyles } from '@material-ui/core';


  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(3),
      minWidth: 160,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));



function App() {
  const classes = useStyles();

  const [skill, setSkill] = React.useState('');
  console.log(skill);
  return (
    <div className="App">
      <Header/>
      <div>
      <FormControl className={classes.formControl}>
          {/* <InputLabel id="skills-input-label">Please select a skill...</InputLabel> */}
          <Select
            labelId="skills-label"
            id="skills-dropdown"
            value={skill}
            onChange={(event) => setSkill(event.target.value)}
          >
            <MenuItem value="default-selection">
              Please select a skill...
            </MenuItem>
            <MenuItem value="basic-frontend">Basic Frontend Developer</MenuItem>
            <MenuItem value="intermediate-frontend">Intermediate Frontend Developer</MenuItem>
            <MenuItem value="basic-backend">Basic Backend Developer</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Graph skill={skill}/>
    </div>
  );
}

export default App;
