import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { WithContext as ReactTags } from "react-tag-input";
import { RoomTag } from "./RoomTag";
import styled from "styled-components";
import { createRoom } from "../../api/api";

const RoomForm = styled.form``;

const suggestions = RoomTag.map((tag: string) => {
  return {
    id: tag,
    text: tag,
  };
});

function RoomCreate() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { mutate } = useMutation(createRoom, {
    onSuccess: (data: any) => {
      console.log(data);
      navigate("/rooms");
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const onSubmit = (data: any) => {
    console.log("Action!");
    console.log(tags);
    const formData = {
      ...data,
      tags,
    };
    console.log(formData);
    mutate(formData);
  };
  // ===============================

  const [tags, setTags] = useState([{ id: "default", text: "default" }]);

  const handleDelete = (i: any) => {
    setTags(tags.filter((tag: any, index: any) => index !== i));
  };

  const handleAddition = (tag: any) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag: any, currPos: any, newPos: any) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  return (
    <div>
      <RoomForm onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("name")} />
        <input type="text" {...register("address")} />
        <input type="number" {...register("price")} />
        <input type="number" {...register("beds")} />
        <input type="number" {...register("lat")} />
        <input type="number" {...register("lng")} />
        <input type="number" {...register("bedrooms")} />
        <input type="number" {...register("bathrooms")} />
        <input type="date" {...register("check_in")} />
        <input type="date" {...register("check_out")} />
        <input type="checkbox" {...register("instant_book")} />
        <ReactTags
          tags={tags}
          suggestions={suggestions}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          inputFieldPosition="top"
          autocomplete
        />
        <button>Add</button>
      </RoomForm>
    </div>
  );
}
export default RoomCreate;
