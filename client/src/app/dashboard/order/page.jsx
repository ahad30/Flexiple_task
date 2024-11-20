"use client";
import React, { useState } from "react";
import { Button, Tag } from "antd";
import DashboardTable from "@/components/Table/DashboardTable";
import { Space, Tooltip } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import ButtonWithModal from "@/components/Button/ButtonWithModal";
import { setIsDeleteModalOpen, setIsViewModalOpen } from "@/redux/Modal/ModalSlice";
import DeleteModal from "@/components/Modal/DeleteModal";
import moment from "moment"; 
import { useDeleteOrderMutation, useGetOrderQuery } from "@/redux/Feature/Admin/order/orderApi";
import ViewModal from "@/components/Modal/ViewModal";
import ViewOrder from "./ViewOrder/page";

const Order = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading: orderIsLoading } = useGetOrderQuery();
  const { isDeleteModalOpen , isViewModalOpen } = useAppSelector((state) => state.modal);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [deleteOrder, { isLoading: dOIsLoading, isError, isSuccess, data: dOData, error: dOError }] = useDeleteOrderMutation();
  
  // Mapping order data
  const orderData = data?.data?.map((order, index) => ({
    key: index,
    id: order.ID,
    name: order?.name,
    email: order?.email,
    phone: order?.phone,
    address: order?.address,
    productName: order?.productName,
    price: order?.price,
    transactionID: order?.transactionID,
    paymentStatus: order?.paymentStatus,
    createdAt: moment(order?.createdAt).format("LLL")
  }));


  const handleViewModule = (orderData) => {
    setSelectedOrder(orderData);
    dispatch(setIsViewModalOpen());
  };

  const handleDeleteConfirmation = (orderData) => {
    setSelectedOrder(orderData);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDeleteOrder = () => {
    deleteOrder(selectedOrder?.id); // Call the delete mutation with selected order ID
  };

  // Columns for order data
  const columns = [

    {
      title: " Date",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Product",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price} Tk`, // Add currency
    },
    // {
    //   title: "Transaction ID",
    //   dataIndex: "transactionID",
    //   key: "transactionID",
    // },
    {
      title: "Payment",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status) => (
        <Tag color={status === 'successed' ? 'green' : 'red'}>{status}</Tag> // Display payment status with color
      ),
    },
    
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleDeleteConfirmation(record)}>
            <Tooltip title="Delete" placement="top">
              <AiOutlineDelete size={20} />
            </Tooltip>
          </a>
          <a onClick={() => handleViewModule(record)}>
            <Tooltip title="View Order " placement="top">
            <Button type="dashed">Details</Button>
            </Tooltip>
          </a>
        </Space>
      ),
    },
  ];


  if(error){
    return <div>Error loading data</div>
  }

  return (
    <>
      <div className="flex flex-col font-bold lg:flex-row items-center gap-x-2 justify-start my-5">
       Total Order : {orderData?.length}
             </div>

      <DashboardTable columns={columns} data={orderData} loading={orderIsLoading} /> {/* Updated to use order data */}
    
     <ViewModal isViewModalOpen={isViewModalOpen} width={600}>
      <ViewOrder selectedOrder={selectedOrder}/>
     </ViewModal>




      {/* DeleteModal Component */}
      <DeleteModal
        data={dOData}
        error={dOError}
        isLoading={dOIsLoading}
        isSuccess={isSuccess}
        title="Delete Order" // Adjust title
        onDelete={handleDeleteOrder}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
        description={"Deleting this order will remove all associated data."} // Updated message for order
      ></DeleteModal>
    </>
  );
};

export default Order;
