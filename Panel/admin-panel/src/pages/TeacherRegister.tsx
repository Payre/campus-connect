import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Register Teacher
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              {...register("phone", { required: "Phone number is required" })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 text-white text-lg font-medium rounded-lg transition duration-200 ${
              isLoading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        {successMessage && (
          <div className="mt-4 p-3 text-green-700 bg-green-100 border border-green-400 rounded-lg">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mt-4 p-3 text-red-700 bg-red-100 border border-red-400 rounded-lg">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherRegister;
