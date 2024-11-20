"use client";
import React, { useState } from "react";
import { Tag, Radio } from "antd";
import DashboardTable from "@/components/Table/DashboardTable";
import { Space, Tooltip } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import AddModal from "@/components/Modal/AddModal";
import EditModal from "@/components/Modal/EditModal";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import ButtonWithModal from "@/components/Button/ButtonWithModal";
import { setIsDeleteModalOpen, setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import DeleteModal from "@/components/Modal/DeleteModal";
import { useDeleteProductMutation, useGetProductQuery } from "@/redux/Feature/Admin/product/productApi";
import AddProduct from "./AddProduct/AddProduct";
import EditProduct from "./EditProduct/EditProduct";
import ProductsReportAsCSV from "./ProductsReportAsCSV";
import ProductExcelFile from "./ProductExcelFile";

const Product = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading: productIsLoading } = useGetProductQuery();
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector((state) => state.modal);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [filterStatus, setFilterStatus] = useState("all"); // Add state for filtering

  const [deleteProduct, { isLoading: dPIsLoading, isError, isSuccess, data: dPData, error: dPError }] = useDeleteProductMutation();

  // Mapping product data
  const productData = data?.data?.map((product, index) => ({
    key: index,
    id: product.ID,
    productKey: product?.productKey,
    name: product?.name,
    status: product?.status,
  }));

  // Filtering products based on the selected filter
  const filteredData =
    filterStatus === "sold"
      ? productData?.filter((product) => product.status === "sold")
      : filterStatus === "unsold"
      ? productData?.filter((product) => product.status === "unsold")
      : productData;

  const handleEditProduct = (productData) => {
    setSelectedProduct(productData);
    dispatch(setIsEditModalOpen());
  };

  const handleDeleteConfirmation = (productData) => {
    setSelectedProduct(productData);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDeleteProduct = () => {
    deleteProduct(selectedProduct?.id);
  };

  // Columns for product data
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Key",
      dataIndex: "productKey",
      key: "productKey",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "sold" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEditProduct(record)}>
            <Tooltip title="Edit" placement="top">
              <CiEdit size={20} />
            </Tooltip>
          </a>
          <a onClick={() => handleDeleteConfirmation(record)}>
            <Tooltip title="Delete" placement="top">
              <AiOutlineDelete size={20} />
            </Tooltip>
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div>
        <ProductExcelFile />
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between my-5">
        <div className="font-bold mt-4">Key: {productData?.length}</div>
        <div className="font-bold mt-4"> Sold: {productData?.filter(product => product.status === 'sold').length}</div>
        <div className="font-bold mt-4"> Unsold: {productData?.filter(product => product.status === 'unsold').length}</div>

        {/* Filter for Sold/Unsold */}
        <div className="mt-4">
          <Radio.Group
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <Radio.Button value="all">All</Radio.Button>
            <Radio.Button value="sold">Sold</Radio.Button>
            <Radio.Button value="unsold">Unsold</Radio.Button>
          </Radio.Group>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-2">
          <ProductsReportAsCSV data={data} />
          <ButtonWithModal title="Add Product Key"></ButtonWithModal>
        </div>
      </div>

      <DashboardTable columns={columns} data={filteredData} loading={productIsLoading} /> {/* Use filtered data */}

      {/* AddModal Component */}
      <AddModal isAddModalOpen={isAddModalOpen} title="Add New Product Key">
        <AddProduct />
      </AddModal>

      {/* EditModal Component */}
      <EditModal isEditModalOpen={isEditModalOpen} title="Edit Product">
        <EditProduct selectedProduct={selectedProduct} />
      </EditModal>

      {/* DeleteModal Component */}
      <DeleteModal
        data={dPData}
        error={dPError}
        isLoading={dPIsLoading}
        isSuccess={isSuccess}
        title="Delete Product"
        onDelete={handleDeleteProduct}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
        description={"Deleting this product will remove all associated data."}
      ></DeleteModal>
    </>
  );
};

export default Product;
