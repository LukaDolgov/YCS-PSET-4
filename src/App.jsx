import React, { useState } from 'react';
import "./App.css"

const courses = [
  { id: 1, name: "Introduction to Computer Science", code: "CPSC 201", credits: 4, timeSlot: "MWF 10:00-11:00" },
  { id: 2, name: "Data Structures and Programming Techniques", code: "CPSC 223", credits: 4, timeSlot: "MWF 11:00-12:00" },
  { id: 3, name: "Mathematical Tools for Computer Science", code: "CPSC 202", credits: 3, timeSlot: "TTh 10:00-11:30" },
  { id: 4, name: "Introduction to Systems Programming and Computer Organization", code: "CPSC 323", credits: 4, timeSlot: "MWF 10:00-11:00" },
  { id: 5, name: "Artificial Intelligence", code: "CPSC 470", credits: 3, timeSlot: "TTh 11:30-1:00" },
];

const MAX_CREDITS = 18;

function App() {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  const totalCredits = selectedCourses.reduce((sum, course) => sum + course.credits, 0);


  function addCourse(course) {
    const conflict = selectedCourses.some((c) => c.timeSlot === course.timeSlot);
    if (totalCredits + course.credits > MAX_CREDITS) {
      alert("Cannot add more than 18 credit hours.");
    } else if (conflict) {
      alert("This course conflicts with an existing course in your schedule.");
    } else if (!selectedCourses.find((c) => c.id === course.id)) {
      setSelectedCourses([...selectedCourses, course]);
    }
  }


  function removeCourse(courseId) {
    setSelectedCourses(selectedCourses.filter((course) => course.id !== courseId));
  }

 
  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.credits.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px', textAlign: 'center' }}>
      <h1>Yale Course Scheduler</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search courses"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '8px', width: '200px', marginBottom: '20px' }}
      />

      <div style={{ margin: '20px' }}>
        <h2>Available Courses</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {filteredCourses.map((course) => {
            const isConflict = selectedCourses.some((c) => c.timeSlot === course.timeSlot);
            return (
              <li key={course.id} style={{ marginBottom: '10px', color: isConflict ? 'red' : 'black' }}>
                <span>
                  {course.name} ({course.code}) - {course.credits} credits
                </span>
                <button style={{ marginLeft: '10px', padding: '5px 10px' }} onClick={() => addCourse(course)}>
                  Add
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div style={{ margin: '20px' }}>
        <h2>My Schedule</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {selectedCourses.map((course) => (
            <li key={course.id} style={{ marginBottom: '10px' }}>
              <span>
                {course.name} ({course.code}) - {course.credits} credits - {course.timeSlot}
              </span>
              <button
                style={{ marginLeft: '10px', padding: '5px 10px' }}
                onClick={() => removeCourse(course.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <p><strong>Total Credits:</strong> {totalCredits}</p>
      </div>
    </div>
  );
}

export default App;
