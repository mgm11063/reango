import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { Tag, WithContext as ReactTags } from "react-tag-input";
import { RoomTags } from "./ReportTag";
import styled from "styled-components";
import { createRoom } from "../../api/api";
import { IRoomForm } from "../../api/types";
import { motion } from "framer-motion";

const RoomForm = styled.form``;
const RoomInputItem = styled.div`
  display: flex;
  align-items: center;
`;
const RoomInput = styled.input`
  width: 200px;
  height: 25px;
  border: 1px solid #ddd;
  padding: 5px 20px;
  outline: none !important;
`;
const RoomSubtitle = styled.h5`
  font-size: 15px;
  letter-spacing: -0.3px;
`;

const Box = styled(motion.div)`
  background-color: rgb(254, 254, 254);
  border-radius: 30px;
  height: 50px;
  width: 50px;
  position: relative;
  padding: 25px 30px;
  border: 1px solid #ddd;
`;
const Overlay = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: absolute;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  div div:first-child {
    margin-top: 0;
  }
  div div {
    margin-top: 35px;
  }
  div div input {
    margin-left: 30px;
  }
`;

const CloseBtn = styled.p`
  display: inline-block;
  margin: 0 auto;
  padding: 20px 40px;
  background-color: rgb(241 245 249);
  text-align: center;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    color: white;
    background-color: rgb(16 185 129);
  }
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

function RoomCreate() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [tags, setTags] = useState([{ id: "default", text: "default" }]);
  const [id, setId] = useState<null | string>(null);
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
          <RoomInput type="text" placeholder="방 이름" {...register("name")} />
        </RoomInputItem>
        <RoomInputItem>
          <RoomInput type="text" placeholder="주소" {...register("address")} />
        </RoomInputItem>
        <RoomInputItem>
          <RoomInput type="number" placeholder="가격" {...register("price")} />
        </RoomInputItem>
        <RoomInputItem>
          <RoomInput
            type="number"
            placeholder="침대 개수"
            {...register("beds")}
          />
        </RoomInputItem>
        <RoomInputItem>
          <RoomInput placeholder="위도" type="number" {...register("lat")} />
        </RoomInputItem>
        <RoomInputItem>
          <RoomInput placeholder="경도" type="number" {...register("lng")} />
        </RoomInputItem>
        <RoomInputItem>
          <RoomInput
            placeholder="주방 수"
            type="number"
            {...register("bedrooms")}
          />
        </RoomInputItem>
        <RoomInputItem>
          <RoomInput
            placeholder="화장실 수"
            type="number"
            {...register("bathrooms")}
          />
        </RoomInputItem>
        <RoomInputItem>
          <RoomInput type="checkbox" {...register("instant_book")} />
        </RoomInputItem>
        <Box onClick={() => setId("1")} key={"1"} layoutId={"1"} />
        {id ? (
          <Overlay
            variants={overlay}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Box layoutId={id} style={{ width: 800, height: 900 }}>
              <RoomInputItem>
                <RoomSubtitle>Modal Input</RoomSubtitle>
                <RoomInput
                  type="text"
                  placeholder="모달"
                  {...register("modal")}
                />
                <RoomInput
                  type="text"
                  placeholder="모달2"
                  {...register("modal2")}
                />
              </RoomInputItem>
              <CloseBtn onClick={() => setId(null)}>저장</CloseBtn>
            </Box>
          </Overlay>
        ) : null}
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
