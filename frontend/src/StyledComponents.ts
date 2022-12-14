import styled from "styled-components";
import { motion } from "framer-motion";

// Test Com

export const Box = styled.div`
  padding-bottom: 30px;
  margin-bottom: 50px;
  border-bottom: 1px solid #ddd;
`;

export const ModalFlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-top: 20px;
  h6:before {
    position: absolute;
  }
  button {
  }
`;

export const ModalGridBox = styled.div`
  display: grid;
  margin-top: 20px;
  grid-template-columns: repeat(6, minmax(0, 1fr));
`;

export const ModalInputWrap = styled.div``;

export const ModalInputSwitch = styled.input``;
export const ModalInputSwitchLabel = styled.label``;
export const ModalInputSwitchLabelSpan = styled.span``;

export const ModalInputMaintitle = styled.h6`
  display: block;
  font-size: 23px;
  font-weight: 600;
`;

export const ModalInputText = styled.p`
  display: block;
  font-size: 15px;
  margin-bottom: 10px;
`;

export const ModalInputSubtitle = styled.label`
  display: block;
  font-size: 15px;
  margin-bottom: 10px;
`;

// Report List ==================================================================

export const Container = styled.div`
  padding: 0px 20px;
`;
export const Title = styled.h1`
  font-size: 48px;
`;
export const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const RoomList = styled.ul``;
export const Room = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: block;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

// Report Create ==================================================================

export const RoomForm = styled.form``;
export const RoomInputItem = styled.div`
  display: flex;
  align-items: center;
`;
export const RoomInput = styled.input<{ inputSize?: string }>`
  width: ${(props) => props.inputSize + "px" || "200px"};
  height: 33px;
  border: 1px solid #ddd;
  padding: 4px 23px;
  outline: none !important;
`;

export const RoomTextarea = styled.textarea`
  width: 100%;
  height: 120px;
  border: none !important;
  outline: none !important;
  border-radius: 20px;
  background-color: #f6f6f6;
  padding: 15px 20px;
  outline: none !important;
  resize: none;
  margin-top: 20px;

  box-sizing: border-box;
`;

export const RaterWrap = styled.select``;
export const RaterOption = styled.option``;
export const ModalBox = styled(motion.div)`
  background-color: rgb(254, 254, 254);
  border-radius: 30px;
  height: 50px;
  width: 50px;
  position: relative;
  padding: 55px 70px;
  border: 1px solid #ddd;
`;
export const Overlay = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: absolute;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const CloseBtn = styled.p`
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
export const AddBtn = styled.p`
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
export const overlay = {
  hidden: { backgroundColor: "rgba(229, 233, 239, 0)" },
  visible: { backgroundColor: "rgba(229, 233, 239, 1)" },
  exit: { backgroundColor: "rgba(229, 233, 239, 0)" },
};

// Report Detail ==================================================================

export const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
