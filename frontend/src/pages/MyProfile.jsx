import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
// import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);
  const address =
    typeof userData.address === "string"
      ? JSON.parse(userData.address)
      : userData.address || { line1: "", line2: "" };

  //console.log(address);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    userData && (
      <>
        <div className="max-w-lg flex flex-col gap-2 text-sm">
          {isEdit ? (
            <label htmlFor="image">
              <div className="inline-block cursor-pointer relative">
                <img
                  className="w-36 rounded opacity-75"
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt=""
                />
                <img
                  className="w-10 absolute bottom-12 right-12"
                  src={image ? "" : assets.upload_icon}
                  alt=""
                />
              </div>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </label>
          ) : (
            <img src={userData.image} alt="" className="w-36 rounded" />
          )}

          {isEdit ? (
            <input
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="bg-gray-100 text-3xl font-medium max-w-60 mt-4"
            />
          ) : (
            <p className="font-medium text-3xl mt-4 text-neutral-800">
              {userData.name}
            </p>
          )}

          <hr className="bg-zinc-400 h-[1px] border-none" />

          <div>
            <p className="text-neutral-500 underline mt-3">
              CONTACT INFORMATION
            </p>

            <div className="grid grid-cols-1 grid-cols-2 gap-y-2.5 mt-3 text-neutral-700">
              <p className="font-medium">Email Id: </p>
              <p className="text-blue-500">{userData.email}</p>

              <p className="font-medium">Phone: </p>
              {isEdit ? (
                <input
                  type="text"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="bg-gray-100 max-w-52 "
                />
              ) : (
                <p className="text-blue-400">{userData.phone}</p>
              )}

              <p className="font-medium">Address</p>
              {isEdit ? (
                <p>
                  <input
                    type="text"
                    value={address.line1}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: {
                          ...address,
                          line1: e.target.value,
                        },
                      }))
                    }
                    className="bg-gray-100 max-w-52 "
                  />
                  <br />
                  <input
                    type="text"
                    value={address.line2}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: {
                          ...address,
                          line2: e.target.value,
                        },
                      }))
                    }
                    className="bg-gray-100 max-w-52 "
                  />
                </p>
              ) : (
                <p className="text-gray-500">
                  {address.line1}
                  <br />
                  {address.line2}
                </p>
              )}
            </div>
          </div>

          <div>
            <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
            <div className="grid grid-cols-1 grid-cols-2 gap-y-2.5 mt-3 text-neutral-700">
              <p className="font-medium">Gender :</p>
              {isEdit ? (
                <select
                  name=""
                  id=""
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  className="max-w-20 bg-gray-100"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p className="text-gray-500">{userData.gender}</p>
              )}
              <p className="font-medium">Birthday: </p>
              {isEdit ? (
                <input
                  type="date"
                  value={userData.dob}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                  className="max-w-20 bg-gray-100"
                />
              ) : (
                <p className="text-gray-500">{userData.dob}</p>
              )}
            </div>
          </div>

          <div className="mt-10 ">
            {isEdit ? (
              <button
                className="border border-[#5f6fff] px-8 py-2 rounded hover:bg-[#5f6fff] hover:text-white transition-all "
                onClick={updateProfileData}
              >
                Save Information
              </button>
            ) : (
              <button
                className="border border-[#5f6fff] px-8 py-2 rounded hover:bg-[#5f6fff] hover:text-white transition-all "
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </>
    )
  );
};

export default MyProfile;
