import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import '../components/UI/Register/StudentRegister.css';

interface StudentForm {
  name: string;
  email: string;
  phone: string;
  semester: string;
  section: "AB" | "CD" | "EF";
  faculty:
    | "COMPUTER"
    | "CIVIL"
    | "MECHANICAL"
    | "ELECTRICAL"
    | "AGRICULTURE"
    | "ELECTRONICS"
    | "ARCHITECTURE";
}

const StudentRegister: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StudentForm>();

  const onSubmit = async (data: StudentForm) => {
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post(
        "https://campus-connect-dag0d0dzfphceser.centralindia-01.azurewebsites.net/api/v1/auth/student/register",
        data
      );
      setSuccessMessage("Student registered successfully!");
      reset();
    } catch (error) {
      console.error("Error registering student", error);
      setErrorMessage("Failed to register student. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="student-register-container">
      <div className="student-register-form-card">
        <h2 className="student-register-title">
          Register Student
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="student-register-form">
          <div className="student-register-form-group">
            <label htmlFor="name" className="student-register-label">Name</label>
            <input
              id="name"
              {...register("name", { required: "Name is required" })}
              className="student-register-input student-register-input-first"
              placeholder="Full Name"
            />
            {errors.name && (
              <p className="student-register-error">{errors.name.message}</p>
            )}
          </div>
          
          <div className="student-register-form-group">
            <label htmlFor="email" className="student-register-label">Email address</label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              className="student-register-input"
              placeholder="Email address"
            />
            {errors.email && (
              <p className="student-register-error">{errors.email.message}</p>
            )}
          </div>
          
          <div className="student-register-form-group">
            <label htmlFor="phone" className="student-register-label">Phone number</label>
            <input
              id="phone"
              type="tel"
              {...register("phone", { required: "Phone number is required" })}
              className="student-register-input"
              placeholder="Phone number"
            />
            {errors.phone && (
              <p className="student-register-error">{errors.phone.message}</p>
            )}
          </div>
          
          <div className="student-register-form-group">
            <label htmlFor="semester" className="student-register-label">Semester</label>
            <input
              id="semester"
              type="text"
              {...register("semester", { required: "Semester is required" })}
              className="student-register-input"
              placeholder="Semester"
            />
            {errors.semester && (
              <p className="student-register-error">{errors.semester.message}</p>
            )}
          </div>
          
          <div className="student-register-form-group">
            <label htmlFor="section" className="student-register-label">Section</label>
            <select
              id="section"
              {...register("section", { required: "Section is required" })}
              className="student-register-input student-register-select"
            >
              <option value="">Select Section</option>
              <option value="AB">AB</option>
              <option value="CD">CD</option>
              <option value="EF">EF</option>
            </select>
            {errors.section && (
              <p className="student-register-error">{errors.section.message}</p>
            )}
          </div>
          
          <div className="student-register-form-group">
            <label htmlFor="faculty" className="student-register-label">Faculty</label>
            <select
              id="faculty"
              {...register("faculty", { required: "Faculty is required" })}
              className="student-register-input student-register-select student-register-input-last"
            >
              <option value="">Select Faculty</option>
              <option value="COMPUTER">Computer</option>
              <option value="CIVIL">Civil</option>
              <option value="MECHANICAL">Mechanical</option>
              <option value="ELECTRICAL">Electrical</option>
              <option value="AGRICULTURE">Agriculture</option>
              <option value="ELECTRONICS">Electronics</option>
              <option value="ARCHITECTURE">Architecture</option>
            </select>
            {errors.faculty && (
              <p className="student-register-error">{errors.faculty.message}</p>
            )}
          </div>
  
          <button
            type="submit"
            disabled={isLoading}
            className="student-register-button"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
  
        {successMessage && (
          <div className="student-register-success-message">
            {successMessage}
          </div>
        )}
  
        {errorMessage && (
          <div className="student-register-error-message">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentRegister;
