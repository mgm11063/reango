import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { createRoom } from "../../api/api";

const RoomForm = styled.form``;

function RoomCreate() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { mutate } = useMutation(createRoom, {
    onSuccess: (data) => {
      console.log(data);
      navigate("/rooms");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (data: any) => {
    const formData = {
      ...data,
    };
    console.log(formData);
    mutate(formData);
  };

  return (
    // {...register("name"),{type:"text"}} 타입같은거 넣는 순간 onSubmit 데이터에서 undefined 로 나옴;
    <div>
      <RoomForm onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} />
        <input {...register("address")} />
        <input {...register("price")} />
        <input {...register("beds")} />
        <input {...register("lat")} />
        <input {...register("lng")} />
        <input {...register("bedrooms")} />
        <input {...register("bathrooms")} />
        <input {...register("check_in")} />
        <input {...register("check_out")} />
        <input type="checkbox" {...register("instant_book")} />
        <button>Add</button>
      </RoomForm>
    </div>
  );
}
export default RoomCreate;
