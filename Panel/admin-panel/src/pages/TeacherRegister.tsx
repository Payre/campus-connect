import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

interface TeacherForm {
  name: string;
  email: string;
  password: string;
  phone: string;
}

const TeacherRegister: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeacherForm>();

  const onSubmit = async (data: TeacherForm) => {
    try {
      const response = await axios.post(
        "https://campus-connect-dag0d0dzfphceser.centralindia-01.azurewebsites.net/api/v1/auth/teacher/register",
        data
      );
      console.log(response)
      alert("Teacher registered successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error registering teacher", error);
      alert("Failed to register teacher.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Register Teacher</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Name:</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Email:</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Password:</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Phone:</label>
          <input
            type="tel"
            {...register("phone", { required: "Phone number is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default TeacherRegister;
