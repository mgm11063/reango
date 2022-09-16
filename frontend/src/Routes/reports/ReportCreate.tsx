import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import "./Switch.css";
import { createRoom } from "../../api/api";
import { IReportForm } from "../../api/types";
import {
  overlay,
  Overlay,
  RaterOption,
  RaterWrap,
  RoomForm,
  RoomInput,
  RoomInputItem,
  AddBtn,
  CloseBtn,
  RoomTextarea,
  ModalBox,
  Box,
  ModalInputSubtitle,
  ModalInputMaintitle,
  ModalFlexBox,
  ModalInputWrap,
  ModalInputSwitch,
  ModalInputSwitchLabelSpan,
  ModalGridBox,
  ModalInputText,
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
      <script
        src="https://kit.fontawesome.com/fa53e4fb73.js"
        crossOrigin="anonymous"
      ></script>
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
        <ModalBox onClick={() => setId("1")} key={"1"} layoutId={"1"} />
        {id ? (
          <Overlay
            variants={overlay}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ModalBox layoutId={id} style={{ width: 800, minHeight: 900 }}>
              {fields.map((field, index) => {
                return (
                  <Box>
                    <div key={field.id}>
                      <ModalFlexBox>
                        <ModalInputMaintitle>
                          주요 작업 내용 {index + 1}
                        </ModalInputMaintitle>
                        <button type="button" onClick={() => remove(index)}>
                          삭제
                        </button>
                      </ModalFlexBox>
                      <section className={"section"} key={field.id}>
                        <ModalFlexBox>
                          <ModalInputWrap>
                            <ModalInputSubtitle htmlFor={index + "work"}>
                              Work
                            </ModalInputSubtitle>
                            <RoomInput
                              id={index + "work"}
                              inputSize="280"
                              placeholder="work"
                              type="text"
                              {...register(
                                `report_content.${index}.work` as const,
                                {
                                  required: true,
                                }
                              )}
                            />
                          </ModalInputWrap>
                          <ModalInputWrap>
                            <ModalInputSubtitle htmlFor={index + "overload"}>
                              Overload
                            </ModalInputSubtitle>
                            <RoomInput
                              id={index + "overload"}
                              placeholder="overload"
                              type="number"
                              {...register(
                                `report_content.${index}.overload` as const,
                                {
                                  required: true,
                                  valueAsNumber: true,
                                }
                              )}
                            />
                          </ModalInputWrap>
                          <ModalInputWrap>
                            <ModalInputSubtitle htmlFor={index + "frequency"}>
                              Frequency
                            </ModalInputSubtitle>
                            <RoomInput
                              placeholder="frequency"
                              type="number"
                              {...register(
                                `report_content.${index}.frequency` as const,
                                {
                                  required: true,
                                  valueAsNumber: true,
                                }
                              )}
                            />
                          </ModalInputWrap>
                        </ModalFlexBox>
                        <RoomTextarea
                          id={index + "content"}
                          placeholder="content"
                          {...register(
                            `report_content.${index}.content` as const,
                            {
                              required: true,
                            }
                          )}
                        />
                        <ModalGridBox>
                          <ModalInputWrap>
                            <ModalInputText>1.No</ModalInputText>
                            <ModalInputSwitch
                              type="checkbox"
                              id={index + "switch1"}
                              className="switchCommon"
                              {...register(
                                `report_content.${index}.no1` as const,
                                {
                                  required: true,
                                }
                              )}
                            />
                            <ModalInputSubtitle
                              htmlFor={index + "switch1"}
                              className="switch_label"
                            >
                              <ModalInputSwitchLabelSpan className="onf_btn"></ModalInputSwitchLabelSpan>
                            </ModalInputSubtitle>
                          </ModalInputWrap>
                          <ModalInputWrap>
                            <ModalInputText>2.No</ModalInputText>
                            <ModalInputSwitch
                              type="checkbox"
                              id={index + "switch2"}
                              className="switchCommon"
                              {...register(
                                `report_content.${index}.no2` as const,
                                {
                                  required: true,
                                }
                              )}
                            />
                            <ModalInputSubtitle
                              htmlFor={index + "switch2"}
                              className="switch_label"
                            >
                              <ModalInputSwitchLabelSpan className="onf_btn"></ModalInputSwitchLabelSpan>
                            </ModalInputSubtitle>
                          </ModalInputWrap>
                          <ModalInputWrap>
                            <ModalInputText>3.No</ModalInputText>
                            <ModalInputSwitch
                              type="checkbox"
                              id={index + "switch3"}
                              className="switchCommon"
                              {...register(
                                `report_content.${index}.no3` as const,
                                {
                                  required: true,
                                }
                              )}
                            />
                            <ModalInputSubtitle
                              htmlFor={index + "switch3"}
                              className="switch_label"
                            >
                              <ModalInputSwitchLabelSpan className="onf_btn"></ModalInputSwitchLabelSpan>
                            </ModalInputSubtitle>
                          </ModalInputWrap>
                          <ModalInputWrap>
                            <ModalInputText>4.No</ModalInputText>
                            <ModalInputSwitch
                              type="checkbox"
                              id={index + "switch4"}
                              className="switchCommon"
                              {...register(
                                `report_content.${index}.no4` as const,
                                {
                                  required: true,
                                }
                              )}
                            />
                            <ModalInputSubtitle
                              htmlFor={index + "switch4"}
                              className="switch_label"
                            >
                              <ModalInputSwitchLabelSpan className="onf_btn"></ModalInputSwitchLabelSpan>
                            </ModalInputSubtitle>
                          </ModalInputWrap>
                          <ModalInputWrap>
                            <ModalInputText>5.No</ModalInputText>
                            <ModalInputSwitch
                              type="checkbox"
                              id={index + "switch5"}
                              className="switchCommon"
                              {...register(
                                `report_content.${index}.no5` as const,
                                {
                                  required: true,
                                }
                              )}
                            />
                            <ModalInputSubtitle
                              htmlFor={index + "switch5"}
                              className="switch_label"
                            >
                              <ModalInputSwitchLabelSpan className="onf_btn"></ModalInputSwitchLabelSpan>
                            </ModalInputSubtitle>
                          </ModalInputWrap>
                          <ModalInputWrap>
                            <ModalInputText>6.No</ModalInputText>
                            <ModalInputSwitch
                              type="checkbox"
                              id={index + "switch6"}
                              className="switchCommon"
                              {...register(
                                `report_content.${index}.no6` as const,
                                {
                                  required: true,
                                }
                              )}
                            />
                            <ModalInputSubtitle
                              htmlFor={index + "switch6"}
                              className="switch_label"
                            >
                              <ModalInputSwitchLabelSpan className="onf_btn"></ModalInputSwitchLabelSpan>
                            </ModalInputSubtitle>
                          </ModalInputWrap>
                          <ModalInputWrap>
                            <ModalInputText>7.No</ModalInputText>
                            <ModalInputSwitch
                              type="checkbox"
                              id={index + "switch7"}
                              className="switchCommon"
                              {...register(
                                `report_content.${index}.no7` as const,
                                {
                                  required: true,
                                }
                              )}
                            />
                            <ModalInputSubtitle
                              htmlFor={index + "switch7"}
                              className="switch_label"
                            >
                              <ModalInputSwitchLabelSpan className="onf_btn"></ModalInputSwitchLabelSpan>
                            </ModalInputSubtitle>
                          </ModalInputWrap>
                          <ModalInputWrap>
                            <ModalInputText>8.No</ModalInputText>
                            <ModalInputSwitch
                              type="checkbox"
                              id={index + "switch8"}
                              className="switchCommon"
                              {...register(
                                `report_content.${index}.no8` as const,
                                {
                                  required: true,
                                }
                              )}
                            />
                            <ModalInputSubtitle
                              htmlFor={index + "switch8"}
                              className="switch_label"
                            >
                              <ModalInputSwitchLabelSpan className="onf_btn"></ModalInputSwitchLabelSpan>
                            </ModalInputSubtitle>
                          </ModalInputWrap>
                          <ModalInputWrap>
                            <ModalInputText>9.No</ModalInputText>
                            <ModalInputSwitch
                              type="checkbox"
                              id={index + "switch9"}
                              className="switchCommon"
                              {...register(
                                `report_content.${index}.no9` as const,
                                {
                                  required: true,
                                }
                              )}
                            />
                            <ModalInputSubtitle
                              htmlFor={index + "switch9"}
                              className="switch_label"
                            >
                              <ModalInputSwitchLabelSpan className="onf_btn"></ModalInputSwitchLabelSpan>
                            </ModalInputSubtitle>
                          </ModalInputWrap>
                          <ModalInputWrap>
                            <ModalInputText>10.No</ModalInputText>
                            <ModalInputSwitch
                              type="checkbox"
                              id={index + "switch10"}
                              className="switchCommon"
                              {...register(
                                `report_content.${index}.no10` as const,
                                {
                                  required: true,
                                }
                              )}
                            />
                            <ModalInputSubtitle
                              htmlFor={index + "switch10"}
                              className="switch_label"
                            >
                              <ModalInputSwitchLabelSpan className="onf_btn"></ModalInputSwitchLabelSpan>
                            </ModalInputSubtitle>
                          </ModalInputWrap>
                          <ModalInputWrap>
                            <ModalInputText>11.No</ModalInputText>
                            <ModalInputSwitch
                              type="checkbox"
                              id={index + "switch11"}
                              className="switchCommon"
                              {...register(
                                `report_content.${index}.no11` as const,
                                {
                                  required: true,
                                }
                              )}
                            />
                            <ModalInputSubtitle
                              htmlFor={index + "switch11"}
                              className="switch_label"
                            >
                              <ModalInputSwitchLabelSpan className="onf_btn"></ModalInputSwitchLabelSpan>
                            </ModalInputSubtitle>
                          </ModalInputWrap>
                        </ModalGridBox>
                        <ModalInputWrap>
                          <ModalInputSubtitle htmlFor={index + "image"}>
                            image
                          </ModalInputSubtitle>
                          <RoomInput
                            placeholder="image"
                            type="file"
                            {...register(
                              `report_content.${index}.image` as const,
                              {
                                required: true,
                                valueAsNumber: true,
                              }
                            )}
                          />
                        </ModalInputWrap>
                      </section>
                    </div>
                  </Box>
                );
              })}

              <AddBtn
                onClick={() =>
                  append({
                    work: "",
                    content: "",
                    overload: null,
                    frequency: null,
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
            </ModalBox>
          </Overlay>
        ) : null}
        <button>Add</button>
      </RoomForm>
    </div>
  );
}
export default RoomCreate;
