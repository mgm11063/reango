import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { WithContext as ReactTags } from "react-tag-input";
import { RoomTag } from "./RoomTag";
import styled from "styled-components";
import { createRoom } from "../../api/api";
import { IRoomForm } from "../../api/types";
const RoomForm = styled.form``;

const RoomInputItem = styled.div`
  display: flex;
`;
const RoomInput = styled.input``;
const InputDescription = styled.span``;

const suggestions = RoomTag.map((tag: string) => {
  return {
    id: tag,
    text: tag,
  };
});

function RoomCreate() {
  const [tags, setTags] = useState([{ id: "default", text: "default" }]);
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
    const room_tag = [];

    for (let i = 0; i < tags.length; i++) {
      room_tag.push({ name: tags[i].text });
    }
    const formData: IRoomForm = {
      ...data,
      room_tag,
    };
    mutate(formData);
  };

  const handleDelete = (i: number) => {
    setTags(tags.filter((_, index: number) => index !== i));
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
        <RoomInputItem>
          <InputDescription>방 이름</InputDescription>
          <RoomInput type="text" {...register("name")} />
        </RoomInputItem>
        <RoomInputItem>
          <InputDescription>주소</InputDescription>
          <RoomInput type="text" {...register("address")} />
        </RoomInputItem>
        <RoomInputItem>
          <InputDescription>가격</InputDescription>
          <RoomInput type="number" {...register("price")} />
        </RoomInputItem>
        <RoomInputItem>
          <InputDescription>침대 개수</InputDescription>
          <RoomInput type="number" {...register("beds")} />
        </RoomInputItem>
        <RoomInputItem>
          <InputDescription>위도</InputDescription>
          <RoomInput type="number" {...register("lat")} />
        </RoomInputItem>
        <RoomInputItem>
          <InputDescription>경도</InputDescription>
          <RoomInput type="number" {...register("lng")} />
        </RoomInputItem>
        <RoomInputItem>
          <InputDescription>침실</InputDescription>
          <RoomInput type="number" {...register("bedrooms")} />
        </RoomInputItem>
        <RoomInputItem>
          <InputDescription>화장실</InputDescription>
          <RoomInput type="number" {...register("bathrooms")} />
        </RoomInputItem>
        <RoomInputItem>
          <InputDescription>몰라 체크해 말아</InputDescription>
          <RoomInput type="checkbox" {...register("instant_book")} />
        </RoomInputItem>
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
