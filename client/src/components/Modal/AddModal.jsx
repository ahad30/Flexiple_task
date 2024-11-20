"use client"
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsAddModalOpen } from "@/redux/Modal/ModalSlice";
import { Modal } from "antd";


const AddModal = ({ children, isAddModalOpen, title, width }) => {
  const dispatch = useAppDispatch();
  const handleCancel = () => {
    dispatch(setIsAddModalOpen());
  };
  return (
    <>
      <Modal
        title={title}
        centered
        open={isAddModalOpen}
        width={width ? width : 500}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div className="mt-7">
        {children}
        </div>
      </Modal>
    </>
  );
};

export default AddModal;
