import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register Student
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                {...register("name", { required: "Name is required" })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">
                Phone number
              </label>
              <input
                id="phone"
                type="tel"
                {...register("phone", { required: "Phone number is required" })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Phone number"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="semester" className="sr-only">
                Semester
              </label>
              <input
                id="semester"
                type="text"
                {...register("semester", { required: "Semester is required" })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Semester"
              />
              {errors.semester && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.semester.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="section" className="sr-only">
                Section
              </label>
              <select
                id="section"
                {...register("section", { required: "Section is required" })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                <option value="">Select Section</option>
                <option value="AB">AB</option>
                <option value="CD">CD</option>
                <option value="EF">EF</option>
              </select>
              {errors.section && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.section.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="faculty" className="sr-only">
                Faculty
              </label>
              <select
                id="faculty"
                {...register("faculty", { required: "Faculty is required" })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                <p className="text-red-500 text-xs mt-1">
                  {errors.faculty.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading
                  ? "bg-indigo-400"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        {successMessage && (
          <div
            className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div
            className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentRegister;
