import React from 'react';
import { Link } from 'react-router-dom';
import FileUpload from '@material-ui/icons/FileUpload';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';
import { graphql, compose } from 'react-apollo';
import {
  GET_ALL_SCHOOLS,
  EDIT_JOB,
} from '../../../queries/jobFormQueries.js';

class SchoolJobRequestEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      schoolId: this.props.location.state.schoolId,
      school: this.props.location.state.schoolName,
      subject: this.props.location.state.subject,
      grade: this.props.location.state.grade,
      jobDescription: this.props.location.state.description,
      startDate: this.props.location.state.startDate,
      startTime: this.props.location.state.startTime,
      endDate: this.props.location.state.endDate,
      endTime: this.props.location.state.endTime,
      additionalInformation: '',
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  submitForm(event) {
    const {
      schoolId, subject, grade, jobDescription, startDate,
      startTime, endDate, endTime, additionalInformation,
    } = this.state;

    this.props.mutate({
      variables: {
        input: {
          schoolId,
          subject,
          grade,
          jobDescription,
          startDate,
          endDate,
          startTime,
          endTime,
          additionalInformation,
        },
      },
    });

    this.setState({
      school: '',
      subject: '',
      grade: '',
      jobDescription: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      additionalInformation: '',
    });

    this.props.history.push('/school');
  }

  render() {
    const { classes } = this.props;

    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2.5%', paddingTop: '2.5%',
      }}>
        <form>
          <Grid container spacing={8}>
            <Paper className={classes.paper}>
              <Grid item xs={12}>
                <Typography variant="display1">Substitute Teacher Request Form</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required={true}
                  label="Subject"
                  className={classes.textField}
                  margin="normal"
                  name="subject"
                  value={this.state.subject}
                  onChange={this.handleChange.bind(this)}
                  style={{ width: '65%' }}
                />
                <FormControl required={true} className={classes.formControl} style={{ width: '23%', textAlign: 'left' }}>
                  <InputLabel>Grade</InputLabel>
                  <Select
                    name="grade"
                    value={this.state.grade}
                    onChange={this.handleChange.bind(this)}
                  >
                    <MenuItem value="Pre-K">Pre-K</MenuItem>
                    <MenuItem value="K">K</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                    <MenuItem value="5">5</MenuItem>
                    <MenuItem value="6">6</MenuItem>
                    <MenuItem value="7">7</MenuItem>
                    <MenuItem value="8">8</MenuItem>
                    <MenuItem value="9">9</MenuItem>
                    <MenuItem value="10">10</MenuItem>
                    <MenuItem value="11">11</MenuItem>
                    <MenuItem value="12">12</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required={true}
                  label="Job Description"
                  className={classes.textField}
                  type="jobDescription"
                  margin="normal"
                  name="jobDescription"
                  value={this.state.jobDescription}
                  onChange={this.handleChange.bind(this)}
                  style={{ width: '90%', marginBottom: '5%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required={true}
                  label="Start Date"
                  type="date"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="startDate"
                  value={this.state.startDate}
                  onChange={this.handleChange.bind(this)}
                  style={{ width: '28.5%' }}
                />
                <TextField
                  required={true}
                  label="Start Time"
                  className={classes.textField}
                  name="startTime"
                  value={this.state.startTime}
                  onChange={this.handleChange.bind(this)}
                  style={{ width: '13%' }}
                />
                <TextField
                  required={true}
                  label="End Date"
                  type="date"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="endDate"
                  value={this.state.endDate}
                  onChange={this.handleChange.bind(this)}
                  style={{ width: '28%' }}
                />
                <TextField
                  required={true}
                  label="End Time"
                  className={classes.textField}
                  name="endTime"
                  value={this.state.endTime}
                  onChange={this.handleChange.bind(this)}
                  style={{ width: '13%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Additional Information"
                  margin="normal"
                  multiline
                  rows="4"
                  className={classes.textField}
                  name="additionalInformation"
                  value={this.state.additionalInformation}
                  onChange={this.handleChange.bind(this)}
                  style={{ width: '71%' }}
                />
                <input
                  accept="image/*"
                  className={classes.input}
                  id="flat-button-file"
                  multiple
                  type="file"
                />
                <label htmlFor="flat-button-file">
                  <Button component="span" color="primary" className={classes.button}>
                  Upload
                    <FileUpload className={classes.rightIcon} />
                  </Button>
                </label>
              </Grid>
              <Grid item xs={12}>
                <Link to={{ pathname: '/school' }}>
                  <Button variant="contained" color="primary" className={classes.button}>
                  Cancel
                  </Button>
                </Link>
                <Button variant="contained" color="primary" className={classes.button} onClick={this.submitForm.bind(this)}>
                Update
                </Button>
              </Grid>
            </Paper>
          </Grid>
        </form>
      </div>
    );
  }
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  input: {
    display: 'none',
  },
  menu: {
    width: 200,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  root: {
    flexGrow: 1,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

export default compose(
  graphql(EDIT_JOB),
  graphql(GET_ALL_SCHOOLS),
  withStyles(styles),
)(SchoolJobRequestEdit);
