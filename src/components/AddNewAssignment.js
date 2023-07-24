import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import {SERVER_URL} from '../constants.js'

class AddNewAssignment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            assignmentName: '',
            dueDate: '',
            courseId: '', 
        };
    };

    /* Planning on returning the list of courses to populate a dropdown
    menu for the instructor to use, may need a new API to do this
    componentDidMount(){
        this.fetchCourses();
    }

    fetchCourses = () => {
        fetch get etc...

    }
    */

    handleFormSubmit = (event) => {
        event.preventDefault();

        const { assignmentName, dueDate, courseId } = this.state;
        // need to add + import {BACKEND_URL} to constants.js
        // also need to get the courseId from the getCourses method
        // to pass into this URL, it is hardcoded to the course with id 123456 for now
        fetch('http://localhost:8081/gradebook', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            assignmentName,
            dueDate,
            courseId,
            }),
        })
            .then((response) => {
            if (response.ok) {
                console.log('Assignment added successfully.');
            } else {
                const errorMessage = response.statusText || 'Unknown error occurred';
                console.error('Failed to add assignment:', response.status, errorMessage);
            }
            })
            .catch((error) => {
            console.error('Error submitting form data:', error);
            });

            // Reset the fields to empty for adding another assignment
            this.setState({
                assignmentName: '',
                dueDate: '',
                courseId: '',
            });

    };

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    render() {

        const { assignmentName, dueDate, courseId } = this.state;

        return (
            <div align="left" style={{margin: 10}}>
                <h4>Add Assignment</h4>
                <form onSubmit={this.handleFormSubmit}>
                    <label htmlFor="aname">Assignment Name:</label><br />
                    <input
                        type="text"
                        id="aname"
                        name="assignmentName"
                        value={assignmentName}
                        required
                        onChange={this.handleInputChange}
                    /><br />

                    <label htmlFor="duedate">Due Date:</label><br />
                    <input
                        type="date"
                        id="duedate"
                        name="dueDate"
                        placeholder="YYYY-MM-DD"
                        value={dueDate}
                        required
                        onChange={this.handleInputChange}
                    /><br />

                    <label htmlFor="cID">Course ID:</label><br />
                    <input
                        type="text"
                        id="cID"
                        name="courseId"
                        value={courseId}
                        placeholder='123456'
                        onChange={this.handleInputChange}
                        required
                    /><br /><br />

                <button id='submit' type="submit">Add New Assignment</button>
                </form>

                <Link to="/">Back to Assignment List</Link>
            </div>
        )
    }

}
export default AddNewAssignment;