import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

interface SubjectForm {
  faculty: string;
  semester: string;
  name: string;
  subjectCode: string;
}

const AddSubject: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectForm>();

  const onSubmit = async (data: SubjectForm) => {
    try {
      const response = await axios.post(
        "https://campus-connect-dag0d0dzfphceser.centralindia-01.azurewebsites.net/api/v1/subject/add",
        data
      ).then((data) => {console.log(data)});
      alert("Subject added successfully!");
      // console.log(response.data);
    } catch (error) {
      console.error("Error adding subject", error);
      alert("Failed to add subject.");
    }
  };
  console.log(onSubmit)
  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Add Subject</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Faculty:</label>
          <input
            {...register("faculty", { required: "Faculty is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.faculty && <p className="text-red-500">{errors.faculty.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Semester:</label>
          <input
            type="text"
            {...register("semester", { required: "Semester is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.semester && <p className="text-red-500">{errors.semester.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Subject Name:</label>
          <input
            type="text"
            {...register("name", { required: "Subject name is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Subject Code:</label>
          <input
            type="text"
            {...register("subjectCode", { required: "Subject code is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.subjectCode && <p className="text-red-500">{errors.subjectCode.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Subject
        </button>
      </form>
    </div>
  );
};

export default AddSubject;
