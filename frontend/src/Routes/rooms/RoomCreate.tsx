import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { Tag, WithContext as ReactTags } from "react-tag-input";
import { RoomTags } from "./RoomTag";
import styled from "styled-components";
import { createRoom } from "../../api/api";
import { IRoomForm } from "../../api/types";

const RoomForm = styled.form``;
const RoomInputItem = styled.div`
  display: flex;
`;
const RoomInput = styled.input``;
const InputDescription = styled.span``;

function RoomCreate() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [tags, setTags] = useState([{ id: "default", text: "default" }]);
  const { mutate } = useMutation(createRoom, {
    onSuccess: (data: any) => {
      console.log(data);
      navigate("/rooms");
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const suggestions = RoomTags().map((tag: any) => {
    return {
      id: tag,
      text: tag,
    };
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

  const handleAddition = (tag: Tag) => {
    setTags([...tags, tag]);
  };

  return (
    <div>
      <RoomForm onSubmit={handleSubmit(onSubmit)}>
        <RoomInputItem>
          <InputDescription>방 이름</InputDescription>
          <RoomInput type="text" placeholder="방 이름" {...register("name")} />
        </RoomInputItem>
        <RoomInputItem>
          <InputDescription>주소</InputDescription>
          <RoomInput type="text" placeholder="주소" {...register("address")} />
        </RoomInputItem>
        <RoomInputItem>
          <InputDescription>가격</InputDescription>
          <RoomInput type="number" placeholder="가격" {...register("price")} />
        </RoomInputItem>
        <RoomInputItem>
          <InputDescription>침대 개수</InputDescription>
          <RoomInput
            type="number"
            placeholder="침대 개수"
            {...register("beds")}
          />
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
          inputFieldPosition="top"
          autocomplete
        />
        <button>Add</button>
      </RoomForm>
    </div>
  );
}
export default RoomCreate;
