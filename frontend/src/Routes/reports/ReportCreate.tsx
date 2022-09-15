import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { createRoom } from "../../api/api";
import { IReportForm } from "../../api/types";
import {
  Box,
  overlay,
  Overlay,
  RaterOption,
  RaterWrap,
  RoomForm,
  RoomInput,
  RoomInputItem,
  AddBtn,
  CloseBtn,
} from "../../StyledComponents";

function RoomCreate() {
  const { register, control, handleSubmit } = useForm({});
  const { fields, append, remove } = useFieldArray({
    name: "report_content",
    control,
  });

  const navigate = useNavigate();
  const [id, setId] = useState<null | string>(null);
  const { mutate } = useMutation(createRoom, {
    onSuccess: () => {
      navigate("/reports");
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
  const onSubmit = (data: any) => {
    data["rater"] = data["rater"].map((r: string) => Number(r));
    const formData: IReportForm = {
      ...data,
    };
    mutate(formData);
  };
  return (
    <div>
      <RoomForm onSubmit={handleSubmit(onSubmit)}>
        <RoomInputItem>
          <RoomInput type="text" placeholder="title" {...register("title")} />
        </RoomInputItem>
        <RoomInputItem>
          <RoomInput
            type="text"
            placeholder="department"
            {...register("department")}
          />
        </RoomInputItem>
        <RoomInputItem>
          <RoomInput type="text" placeholder="place" {...register("place")} />
        </RoomInputItem>
        <RoomInputItem>
          <RoomInput type="checkbox" {...register("is_equipment")} />
        </RoomInputItem>
        <RoomInputItem>
          <RoomInput type="checkbox" {...register("is_amount")} />
        </RoomInputItem>
        <RoomInputItem>
          <RoomInput type="checkbox" {...register("is_speed")} />
        </RoomInputItem>
        <RoomInputItem>
          <RoomInput type="checkbox" {...register("is_change")} />
        </RoomInputItem>
        <RoomInputItem>
          <RaterWrap {...register("rater")} multiple>
            <RaterOption value={1}>김성민</RaterOption>
            <RaterOption value={2}>문경민</RaterOption>
            <RaterOption value={3}>fucckk</RaterOption>
          </RaterWrap>
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
              {fields.map((field, index) => {
                return (
                  <div key={field.id}>
                    <section className={"section"} key={field.id}>
                      <RoomInput
                        placeholder="work"
                        type="text"
                        {...register(`report_content.${index}.work` as const, {
                          required: true,
                        })}
                      />
                      <RoomInput
                        placeholder="content"
                        type="text"
                        {...register(
                          `report_content.${index}.content` as const,
                          {
                            required: true,
                          }
                        )}
                      />
                      <RoomInput
                        placeholder="overload"
                        type="number"
                        inputSize="50"
                        {...register(
                          `report_content.${index}.overload` as const,
                          {
                            required: true,
                            valueAsNumber: true,
                          }
                        )}
                      />
                      <RoomInput
                        placeholder="frequency"
                        type="number"
                        inputSize="50"
                        {...register(
                          `report_content.${index}.frequency` as const,
                          {
                            required: true,
                            valueAsNumber: true,
                          }
                        )}
                      />
                      <button type="button" onClick={() => remove(index)}>
                        DELETE
                      </button>
                    </section>
                  </div>
                );
              })}
              <AddBtn
                onClick={() =>
                  append({
                    name: "",
                    content: "",
                    overload: 0,
                    frequency: 0,
                    no1: false,
                    no2: false,
                    no3: false,
                    no4: false,
                    no5: false,
                    no6: false,
                    no7: false,
                    no8: false,
                    no9: false,
                    no10: false,
                    no11: false,
                  })
                }
              >
                추가
              </AddBtn>
              <CloseBtn onClick={() => setId(null)}>저장</CloseBtn>
            </Box>
          </Overlay>
        ) : null}
        <button>Add</button>
      </RoomForm>
    </div>
  );
}
export default RoomCreate;
