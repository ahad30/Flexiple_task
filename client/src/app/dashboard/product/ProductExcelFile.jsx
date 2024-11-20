"use client";
import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx"; 
import Papa from "papaparse";
import { useAddProductMutation } from "@/redux/Feature/Admin/product/productApi";
import { toast } from "sonner";

function ProductExcelFile() {
  const [createProduct, { isLoading, isError, isSuccess }] = useAddProductMutation();
  const [file, setFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFile = (e) => {
    let fileTypes = [
      "application/vnd.ms-excel", 
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv"
    ];
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        setFile(selectedFile);
      } else {
        setTypeError("Please select a valid CSV or Excel file");
        setFile(null);
      }
    } else {
      console.log("Please select your file");
    }
  };

  // Parse file based on type (CSV or XLSX)
  const parseFile = async (file) => {
    if (file.type === "text/csv") {
      // Parse CSV file
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setParsedData(result.data);
        },
      });
    } else {
      // Parse XLSX file
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setParsedData(jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // Submit form to parse and upload data
  const handleFileSubmit = async (e) => {
    e.preventDefault();
    if (file !== null) {
      await parseFile(file);

      // Send each parsed product to the API
      if (parsedData) {
        for (const product of parsedData) {
          await createProduct(product);
        }
      }
    }
  };

  useEffect(() => {
    if (isLoading || isSuccess || isError) {
      if (isLoading) {
        toast.loading("Uploading...", { id: 1 });
      }
      if (isSuccess) {
        toast.success("Product keys created successfully", { id: 1 });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
      if (isError) {
        toast.error("Error uploading products", { id: 1 });
      }
    }
  }, [isSuccess, isLoading, isError]);

  return (
    <div className="justify-start lg:w-[50%] w-full">
      <h2 className="lg:text-xl font-semibold mb-5 mt-5 text-start">Product Key Upload by Excel(.csv, .xlsx) file</h2>
      {/* form */}
      <form className="" onSubmit={handleFileSubmit}>
        <div className="border-primary border p-2">
          <input
            ref={fileInputRef}
            type="file"
            className="form-control"
            required
            onChange={handleFile}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="border bg-primary mb-3 px-12 text-white py-1 mt-4 hover:bg-green-500 rounded-md font-semibold transition-all duration-300"
          >
            {isLoading ? "Uploading..." : "UPLOAD"}
          </button>
        </div>
        {typeError && (
          <div className="text-red-500 font-bold text-center" role="alert">
            {typeError}
          </div>
        )}
      </form>

      {/* View uploaded data */}
      {/* {parsedData && (
        <div>
          <h3>Uploaded Products</h3>
          <ul>
            {parsedData.map((product, index) => (
              <li key={index}>
                {product.name} - {product.productKey} - {product.status}
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
}

export default ProductExcelFile;
