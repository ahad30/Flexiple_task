import { array } from "prop-types";
import { BsFiletypeCsv } from "react-icons/bs";
import { CSVLink } from "react-csv";

const ProductsReportAsCSV = ({ data }) => {
  const csvData = data?.data?.map((item) => ({
    "name": item?.name,
    "productKey": item?.productKey,
    "status": item?.status
  }));

  return (
    <>
      <CSVLink
        data={data ? csvData : []}
        filename="Products Report.csv"
        className="flex justify-center items-center gap-x-2 border border-primary text-primary mt-4 px-2 py-1 text-sm rounded-md w-full sm:w-fit cursor-pointer"
      >
        <BsFiletypeCsv size={20} /> Download as Excl
      </CSVLink>
    </>
  );
};

ProductsReportAsCSV.propTypes = {
  data: array,
};

export default ProductsReportAsCSV;
