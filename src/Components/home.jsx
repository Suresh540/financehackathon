import React, { useState } from 'react';
import axios from 'axios';
import Table from './Table';
import ChatWindow from './ChatWindow';

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;
  const columns =  [
      {
        Header: "VendorName",
        accessor: "vendor_name", // accessor is the "key" in the data
      },
      {
        Header: "ContractId",
        accessor: "contract_id",
      },
      {
        Header: "StartDate",
        accessor: "start_date",
      },
      {
        Header: "EndDate",
        accessor: "end_date",
      },
      {
        Header: "TermOfContract",
        accessor: "term_of_contract",
      },
      {
        Header: "NextRenewalYear",
        accessor: "next_renewal_year",
      },
      {
        Header: "Scope",
        accessor: "scope",
      },
      {
        Header: "TypeOfContract",
        accessor: "type_of_contract",
      },
      {
        Header: "ContractType",
        accessor: "contract_type",
      },
      {
        Header: "NumberOfLicensesInContract",
        accessor: "number_of_licenses_in_contract",
      },
      {
        Header: "CostPerLicense",
        accessor: "cost_per_license",
      },
      {
        Header: "TotalLicenseCost",
        accessor: "total_license_cost",
      },
      {
        Header: "RenewalCost",
        accessor: "renewal_cost",
      },
      {
        Header: "MaintenanceCost",
        accessor: "maintenance_cost",
      },
      {
        Header: "AnyOtherCost",
        accessor: "any_other_cost",
      },
      {
        Header: "AnyOneTimeCostOrMiscCost",
        accessor: "any_one_time_cost_or_misc_cost",
      },
      {
        Header: "TotalContractValue",
        accessor: "total_contract_value",
      },
      {
        Header: "AnnualContractValue",
        accessor: "annual_contract_value",
      },
      {
        Header: "FirstYearP&Limpact",
        accessor: "First_Year_P&L_impact",
      },
      {
        Header: "SecondYearP&LImpact",
        accessor: "Second_Year_P&L_impact",
      },
      {
        Header: "ThirdYearP&Limpact",
        accessor: "Third_Year_P&L_impact",
      },
      {
        Header: "Fourth_Year_P&L_impact",
        accessor: "Fourth_Year_P&L_impact",
      },
      {
        Header: "Fifth_Year_P&L_impact",
        accessor: "Fifth_Year_P&L_impact",
      },
      {
        Header: "First_year_Cash_payments",
        accessor: "First_year_Cash_payments",
      },
      {
        Header: "Second_year_Cash_payments",
        accessor: "Second_year_Cash_payments",
      },
      {
        Header: "Third_year_Cash_payments",
        accessor: "Third_year_Cash_payments",
      },
      {
        Header: "Fourth_year_Cash_payments",
        accessor: "Fourth_year_Cash_payments",
      },
      {
        Header: "Fifth_year_Cash_payments",
        accessor: "Fifth_year_Cash_payments",
      },
      {
        Header: "Change_in_scope_with_respect_to_years",
        accessor: "change_in_scope_with_respect_to_years",
      },
      {
        Header: "change_in_scope_in_$$_terms",
        accessor: "change_in_scope_in_$$_terms",
      },
      {
        Header: "whether_YoY_change_in_scope_is_volume_driven",
        accessor: "whether_YoY_change_in_scope_is_volume_driven",
      },
      {
        Header: "YoY_change_in_active_months_of_contract",
        accessor: "YoY_change_in_active_months_of_contract",
      },
      {
        Header: "Increase_in_the_cost_of_product_service_as_agreed_to_in_the_contract_with_vendor_CPI_impact_%",
        accessor: "Increase_in_the_cost_of_product_service_as_agreed_to_in_the_contract_with_vendor_CPI_impact_%",
      },
      {
        Header: "Increase_in_the_cost_of_product_service_as_agreed_to_in_the_contract_with_vendor_CPI_impact_$$",
        accessor: "Increase_in_the_cost_of_product_service_as_agreed_to_in_the_contract_with_vendor_CPI_impact_$$",
      },
      {
        Header: "If_there_is_a_change_in_rate_expense_mentioned_in_the_contract_for_next_year",
        accessor: "If_there_is_a_change_in_rate_expense_mentioned_in_the_contract_for_next_year",
      },
    ];
    
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append('files', selectedFile);

    try {
      let url = apiUrl + "/extract";
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      let datas = [];
      datas.push(response.data);
      setData(datas);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
        {data != null ? <Table columns={columns} data={data} /> : <></>}
      </form>
      <ChatWindow />
    </>
  );
}

export default Home;
