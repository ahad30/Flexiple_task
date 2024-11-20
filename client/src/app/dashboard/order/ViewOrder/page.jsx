import React from 'react';
import moment from 'moment'; // If you're using moment for date formatting

const ViewOrder = ({ selectedOrder }) => {
  if (!selectedOrder) return <div>No order selected</div>;

  // Function to dynamically apply color based on payment status
  const getPaymentStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'text-yellow-700 bg-yellow-100 inline-block rounded p-1'; // Yellow for pending
      case 'cancelled':
        return 'text-red-700 bg-red-100 inline-block rounded p-2'; // Red for cancelled
      case 'failed':
        return 'text-gray-700 bg-gray-100 inline-block rounded p-2'; // Gray for failed
      case 'successed':
        return 'text-green-700 bg-green-100 inline-block rounded p-2'; // Green for successed
      default:
        return 'text-black bg-gray-200 inline-block rounded p-2'; // Default color and background
    }
  };

  return (
    <div className=" md:p-6 bg-white md:shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">Order Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="font-semibold text-gray-700">Order ID:</p>
          <p className="text-red-500">{selectedOrder.id}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">Name:</p>
          <p className="text-green-600">{selectedOrder.name}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">Email:</p>
          <p className="text-blue-500">{selectedOrder.email}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">Phone:</p>
          <p className="text-purple-600">{selectedOrder.phone}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">Address:</p>
          <p className="text-yellow-600">{selectedOrder.address}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">Product Name:</p>
          <p className="text-indigo-500">{selectedOrder.productName}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">Price:</p>
          <p className="text-red-500">{selectedOrder.price} Tk/-</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">Transaction ID:</p>
          <p className="text-teal-500">{selectedOrder.transactionID}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700 mb-2">Payment Status:</p>
          {/* Apply color dynamically based on payment status */}
          <p className={getPaymentStatusStyles(selectedOrder.paymentStatus)}>
            {selectedOrder.paymentStatus}
          </p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">Created At:</p>
          <p className="text-pink-500">{moment(selectedOrder.createdAt).format("LLL")}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
