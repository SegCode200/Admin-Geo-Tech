import { useState } from "react";
import { useStates } from "../../hooks/userHooks";
import Select from "react-select";
import { createInternalUser } from "../../api/authApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ReviewerSettings = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    ministry: "",
    function: "",
    department: "",
    position: "",
    state: "",
    signatureRequired: false,
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors]: any = useState({}); // new state for validation errors
  const navigate = useNavigate()

  const { error, isLoading, states } = useStates();

  const validateFields = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      ministry: "",
      function: "",
      department: "",
      position: "",
      state: "",
      signatureRequired: false,
      role: "",
    };

    // Required field checks
    if (!userData.name.trim()) newErrors.name = "Name is required";
    if (!userData.email.trim()) newErrors.email = "Email is required";
    if (!userData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!userData.department.trim())
      newErrors.department = "Department is required";
    if (userData.role === "GOVERNOR" && !userData.position.trim()) {
      newErrors.position = "Position number is required for Governors";
    }
    if (!userData.ministry.trim()) newErrors.ministry = "Ministry is required";
    if (!userData.function.trim())
      newErrors.function = "Function of workflow is required";
    if (!userData.state.trim()) newErrors.state = "Please select a state";
    if (!userData.role.trim()) newErrors.role = "Please select a role";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // returns true if no errors
  };

  // ✅ Handle state select
  const handleStateChange = (selectedOption: any) => {
    setUserData({
      ...userData,
      state: selectedOption ? selectedOption.value : "",
    });
  };

  // ✅ Handle Input Changes
  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setUserData({
      ...userData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ✅ Save Settings
  const saveSettings = async () => {
    setLoading(true);
        console.log(userData)
    if (validateFields()) {
      Swal.fire({
        icon: "error",
        title: "Field Required",
        text: "Please fill all required fields before saving.",
      });
      setLoading(false);
      return;
    }

    createInternalUser({
      name: userData.name,
      email: userData.email,
      department: userData.department,
      function: userData.function,
      ministry: userData.ministry,
      phone: userData.phone,
      approvingPosition: Number(userData.position),
      role: userData.role === "APPROVER" ? "APPROVER" : "GOVERNOR",
      requiresSignature: userData.signatureRequired,
      stateId: userData.state,
    }).then(() => {
      Swal.fire({
         icon: "success",
         title:"Successfully registered an Internal User",
         text: "Remember to tell the user that they should verify the account by going to the email they used to register"
      }).then(()=>{
        navigate("/dashboard/user-management")
      })

    }).catch((error)=>{
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Failed to register InternalUser",
        text: error.message
      })
    }).finally(()=>setLoading(false))
  };
  const stateOptions = isLoading
    ? [{ value: "", label: "Loading states..." }]
    : states?.state?.map((state: any) => ({
        value: state.id,
        label: state.name,
        id: state.id,
      })) || [];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Add Approver/ Governor
        </h1>
        <div className="bg-white shadow overflow-hidden rounded-lg p-6">
          {/* Profile Information */}
          <div className="mb-6">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              Profile Information
            </h2>

            <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-3 px-2"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-3 px-2"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-3 px-2"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={userData.department}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-3 px-2"
                />
                {errors.department && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.department}
                  </p>
                )}
              </div>

              {/* Ministry */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ministry
                </label>
                <input
                  type="text"
                  name="ministry"
                  value={userData.ministry}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-3 px-2"
                />
                {errors.ministry && (
                  <p className="text-red-500 text-xs mt-1">{errors.ministry}</p>
                )}
              </div>

              {/* Function */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Function of Workflow
                </label>
                <input
                  type="text"
                  name="function"
                  value={userData.function}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-3 px-2"
                />
                {errors.function && (
                  <p className="text-red-500 text-xs mt-1">{errors.function}</p>
                )}
              </div>

              {/* ✅ State Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <Select
                  options={stateOptions}
                  value={
                    stateOptions.find(
                      (option: any) => option.value === userData.state
                    ) || null
                  }
                  onChange={handleStateChange}
                  placeholder="Select or search a state..."
                  isClearable
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderColor: "#d1d5db", // Tailwind border-gray-300
                      boxShadow: "none",
                      padding: "4px",
                      borderRadius: "0.375rem",
                      fontSize: "0.875rem",
                    }),
                  }}
                />
                {errors.state && (
                  <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  name="role"
                  value={userData.role}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-3 px-2"
                >
                  <option value="">Select Role</option>
                  <option value="APPROVER">Approver</option>
                  <option value="GOVERNOR">Governor</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-xs mt-1">{errors.role}</p>
                )}
              </div>
            </div>

            {/* Position — only show if role is GOVERNOR */}
            {userData.role === "GOVERNOR" && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Position (Number)
                </label>
                <input
                  type="number"
                  name="position"
                  value={userData.position}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-3 px-2"
                  min="1"
                  placeholder="Enter position number"
                />
                {errors.position && (
                  <p className="text-red-500 text-xs mt-1">{errors.position}</p>
                )}
              </div>
            )}
          </div>

          {/* Signature Upload */}
          <div className="mb-6">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              Signature Requirement
            </h2>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="signatureRequired"
                checked={userData.signatureRequired}
                onChange={handleInputChange}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">
                Signature required for approval tasks
              </span>
            </label>
          </div>

          {/* Save Button */}
          <div>
            <button
              onClick={saveSettings}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? "Saving..." : "Add Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewerSettings;
