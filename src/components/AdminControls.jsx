import React, { useState } from "react";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  MdLibraryAdd,
  MdCategory,
  MdImage,
  MdOutlinePriceChange,
  MdDeleteForever,
} from "react-icons/md";

import Loader from "./LoadingCircle";
import { storage } from "../firebase.config";
import { categories } from "../utils/categoryData";
import { saveItem } from "../utils/firebaseFunctions";

function AdminControls() {
  const [itemName, setItemName] = useState(``);
  const [itemPrice, setItemPrice] = useState(``);
  const [itemCategory, setItemCategory] = useState(null);
  const [itemImage, setItemImage] = useState(null);
  const [message, setMessage] = useState(null);
  const [isFieldEmpty, setIsFieldEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function uploadImage(e) {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot);
      },
      (error) => {
        console.log(error);
        setIsFieldEmpty(true);
        setMessage(`Error while uploading. Try again.`);
        setTimeout(() => {
          setIsFieldEmpty(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setItemImage(downloadURL);
          setIsLoading(false);
          setIsFieldEmpty(true);
          setMessage(`Image uploaded successfully.`);
          setTimeout(() => {
            setIsFieldEmpty(false);
          }, 4000);
        });
      }
    );
  }

  function removeUploadedImage() {
    setIsLoading(true);

    const deleteRef = ref(storage, itemImage);

    deleteObject(deleteRef)
      .then(() => {
        setItemImage(null);
        setIsLoading(false);
        setIsFieldEmpty(true);
        setMessage(`Image deleted successfully`);
        setTimeout(() => {
          setIsFieldEmpty(false);
        }, 4000);
      })
      .catch((error) => {
        console.log(error);
        setIsFieldEmpty(true);
        setMessage(`Error while deleting. Try again.`);
        setTimeout(() => {
          setIsFieldEmpty(false);
          setIsLoading(false);
        }, 4000);
      });
  }

  function saveItemDetails() {
    setIsLoading(true);

    try {
      if ((!itemName && !itemPrice && !itemCategory, !itemImage)) {
        setIsFieldEmpty(true);
        setMessage(`Fields can't be empty.`);
        setTimeout(() => {
          setIsFieldEmpty(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: itemName,
          price: itemPrice,
          category: itemCategory,
          imageURL: itemImage,
          qty: 1,
        };

        saveItem(data);

        setIsLoading(false);
        setIsFieldEmpty(true);
        setMessage(`Data uploaded successfully.`);
        setTimeout(() => {
          setIsFieldEmpty(false);
        }, 4000);

        clearData();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function clearData() {
    setItemName(``);
    setItemPrice(``);
    setItemCategory(`Select a category`);
    setItemImage(null);
  }

  return (
    <div className="w-full px-8 mt-24">
      <div className="flex flex-col justify-center items-center gap-4">
        {isFieldEmpty && <p className="text-center">{message}</p>}

        <div className="h-14 w-96 flex justify-center items-center gap-3 p-2 border rounded-md border-solid border-red-500">
          <MdLibraryAdd />
          <input
            className="p-1 border border-solid"
            onChange={(e) => setItemName(e.target.value)}
            type="text"
            value={itemName}
            placeholder="Give a name for the item"
            required
          />
        </div>

        <div className="h-14 w-96 flex justify-center items-center gap-3 p-2 border rounded-md border-solid border-red-500">
          <MdOutlinePriceChange />
          <input
            className="p-1 border border-solid"
            onChange={(e) => setItemPrice(e.target.value)}
            type="text"
            value={itemPrice}
            placeholder="What will be price of this item?"
            required
          />
        </div>

        <div className="h-14 w-96 flex justify-center items-center gap-3 p-2 border rounded-md border-solid border-red-500">
          <MdCategory />
          <select onCanPlay={(e) => setItemCategory(e.target.value)}>
            <option className="bg-white" value="other">
              Select a category
            </option>
            {categories.map((category) => {
              return (
                <option key={category.id} value={category.urlParamName}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="h-56 w-96 flex flex-col justify-center items-center gap-3 p-2 border rounded-md border-solid border-red-500">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!itemImage ? (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <MdImage className="text-gray-500 group-hover:text-gray-700 text-3xl" />
                    <p className="text-gray-500 group-hover:text-gray-700">
                      Upload an image
                    </p>
                  </div>
                  <input
                    type="file"
                    name="upload-image"
                    accept="image/*"
                    onChange={(e) => uploadImage(e)}
                    className="w-0 h-0"
                  />
                </label>
              ) : (
                <div className="relative h-full">
                  <img
                    src={itemImage}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl
                  cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                    onClick={() => removeUploadedImage()}
                  >
                    <MdDeleteForever className="text-white" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <button
          className=" bg-red-500 p-2 px-4 rounded-full text-white"
          onClick={() => saveItemDetails()}
          type="button"
        >
          Submit
        </button>

        <button
          className=" bg-red-500 p-2 px-4 rounded-full text-white"
          onClick={() => clearData()}
          type="button"
        >
          Clear
        </button>
      </div>

      <div className="flex md:hidden">Mobile</div>
    </div>
  );
}

export default AdminControls;
