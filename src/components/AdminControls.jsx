import React, { useState } from "react";
import {
  MdLibraryAdd,
  MdCategory,
  MdImage,
  MdOutlinePriceChange,
  MdDeleteForever,
} from "react-icons/md";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import Loader from "./LoadingCircle";
import { categories } from "../utils/categoryData";
import { storage } from "../firebase.config.js";
import { addItem } from "../utils/firebaseFunctions";

function AdminControls() {
  const [itemName, setItemName] = useState(``);
  const [itemPrice, setItemPrice] = useState(``);
  const [itemCategory, setItemCategory] = useState(``);
  const [itemImage, setItemImage] = useState(null);
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
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setIsFieldEmpty(true);
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
          setTimeout(() => {
            setIsFieldEmpty(false);
          }, 4000);
        });
      }
    );
  }

  function removeUploadedImage() {
    setIsLoading(true);
    const removeRef = ref(storage, itemImage);
    deleteObject(removeRef)
      .then(() => {
        setItemImage(null);
        setIsLoading(false);
        setIsFieldEmpty(true);
        setTimeout(() => {
          setIsFieldEmpty(false);
        }, 4000);
      })
      .catch((error) => {
        console.log(error);
        setIsFieldEmpty(true);
        setTimeout(() => {
          setIsFieldEmpty(false);
          setIsLoading(false);
        }, 4000);
      });
  }

  function saveItemDetails() {
    setIsLoading(true);
    try {
      if (!itemName || !itemPrice || !itemCategory || !itemImage) {
        setIsFieldEmpty(true);
        setTimeout(() => {
          setIsFieldEmpty(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const item = {
          id: `${Date.now()}`,
          name: itemName,
          price: itemPrice,
          category: itemCategory,
          imageURL: itemImage,
          quantity: 1,
        };
        addItem(item);
        setIsLoading(false);
        setIsFieldEmpty(true);
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
    setItemCategory(``);
    setItemImage(null);
  }

  return (
    <div className="w-full px-8 mt-24">
      <div className="flex flex-col justify-center items-center gap-4">
        {isFieldEmpty ? (
          <p className="h-16">Please fill all the fields.</p>
        ) : (
          <p className="h-16">Add item details</p>
        )}

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
            <option value="other">Select a category</option>
            {categories &&
              categories.map((category) => {
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
              <MdImage />
              <p>Image upload</p>
              {!itemImage ? (
                <input
                  onChange={(e) => uploadImage(e)}
                  type="file"
                  accept="image/*"
                />
              ) : (
                <>
                  <img
                    className="w-full h-full object-cover"
                    src={itemImage}
                    alt="uploaded-image"
                  />
                  <button onClick={() => removeUploadedImage()} type="button">
                    <MdDeleteForever className="text-xl" />
                  </button>
                </>
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
