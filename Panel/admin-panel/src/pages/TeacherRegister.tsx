import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import '../components/UI/Register/TeacherRegister.css';

interface TeacherForm {
  name: string;
  email: string;
  password: string;
  phone: string;
}

const TeacherRegister: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TeacherForm>();

  const onSubmit = async (data: TeacherForm) => {
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post(
        "https://campus-connect-dag0d0dzfphceser.centralindia-01.azurewebsites.net/api/v1/auth/teacher/register",
        data
      );
      setSuccessMessage("Teacher registered successfully!");
      reset();
    } catch (error) {
      console.error("Error registering teacher", error);
      setErrorMessage("Failed to register teacher. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="teacher-register-container">
      <div className="teacher-register-form-card">
        <h2 className="teacher-register-title">
          Register Teacher
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="teacher-register-form">
          <div className="teacher-register-form-group">
            <label className="teacher-register-label">
              Full Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              className="teacher-register-input"
            />
            {errors.name && (
              <p className="teacher-register-error">{errors.name.message}</p>
            )}
          </div>
  
          <div className="teacher-register-form-group">
            <label className="teacher-register-label">
              Email Address
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="teacher-register-input"
            />
            {errors.email && (
              <p className="teacher-register-error">
                {errors.email.message}
              </p>
            )}
          </div>
  
          <div className="teacher-register-form-group">
            <label className="teacher-register-label">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="teacher-register-input"
            />
            {errors.password && (
              <p className="teacher-register-error">
                {errors.password.message}
              </p>
            )}
          </div>
  
          <div className="teacher-register-form-group">
            <label className="teacher-register-label">
              Phone Number
            </label>
            <input
              type="tel"
              {...register("phone", { required: "Phone number is required" })}
              className="teacher-register-input"
            />
            {errors.phone && (
              <p className="teacher-register-error">
                {errors.phone.message}
              </p>
            )}
          </div>
  
          <button
            type="submit"
            disabled={isLoading}
            className="teacher-register-button"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
  
        {successMessage && (
          <div className="teacher-register-success-message">
            {successMessage}
          </div>
        )}
  
        {errorMessage && (
          <div className="teacher-register-error-message">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default TeacherRegister;
