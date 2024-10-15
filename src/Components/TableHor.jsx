import React from 'react';
import './TableHor.css';
import * as XLSX from "xlsx";

const ContractDetailsTable = ({ data }) => {
    const handleExport = () => {
        // Convert data to worksheet
        let e = []

        data[0].results.map(x => {
            e.push(x.contract_details);
        })

        const worksheet = XLSX.utils.json_to_sheet(e);

        // Create a new workbook
        const workbook = XLSX.utils.book_new();

        // Append worksheet to workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        // Export the workbook to Excel file
        XLSX.writeFile(workbook, "DataSheet.xlsx");
    }

    let columns = [
        { label: 'File Name(s)', key: 'file_name' },
        { label: 'Vendor Name', key: 'vendor_name' },
        { label: 'Contract ID', key: 'contract_id' },
        { label: 'Start Date', key: 'start_date' },
        { label: 'End Date', key: 'end_date' },
        { label: 'Term of Contract', key: 'term_of_contract' },
        { label: 'Next Renewal Year', key: 'next_renewal_year' },
        { label: 'Scope', key: 'scope' },
        { label: 'Type of Contract', key: 'type_of_contract' },
        { label: 'Contract Type', key: 'contract_type' },
        { label: 'Number of Licenses in Contract', key: 'number_of_licenses_in_contract' },
        { label: 'Cost per License', key: 'cost_per_license' },
        { label: 'Total License Cost', key: 'total_license_cost' },
        { label: 'Renewal Cost', key: 'renewal_cost' },
        { label: 'Maintenance Cost', key: 'maintenance_cost' },
        { label: 'Any Other Cost', key: 'any_other_cost' },
        { label: 'One-Time or Misc. Cost', key: 'any_one_time_cost_or_misc_cost' },
        { label: 'Total Contract Value', key: 'total_contract_value' },
        { label: 'Annual Contract Value', key: 'annual_contract_value' },
        { label: 'First Year Cash Payments', key: 'First_year_Cash_payments' },
        { label: 'Second Year Cash Payments', key: 'Second_year_Cash_payments' },
        { label: 'Third Year Cash Payments', key: 'Third_year_Cash_payments' },
        { label: 'Fourth Year Cash Payments', key: 'Fourth_year_Cash_payments' },
        { label: 'Fifth Year Cash Payments', key: 'Fifth_year_Cash_payments' },
        { label: 'Change in Scope Over Years', key: 'change_in_scope_with_respect_to_years' },
        { label: 'Change in Scope ($$ Terms)', key: 'change_in_scope_in_$$_terms' },
        { label: 'Volume-Driven YoY Scope Change?', key: 'whether_YoY_change_in_scope_is_volume_driven' },
        { label: 'YoY Change in Active Months', key: 'YoY_change_in_active_months_of_contract' },
        { label: 'CPI Impact on Product/Service Cost', key: 'Increase_in_the_cost_of_product_service_as_agreed_to_in_the_contract_with_vendor_CPI_impact_$' },
        { label: "Change in Next Year's Rate/Expense", key: 'If_there_is_a_change_in_rate_expense_mentioned_in_the_contract_for_next_year' },
    ];
    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                <h2 style={{ margin: "0", color: "#6A5ACD" }}>Contract Information</h2>

                <div style={{ display: "flex", gap: "20px", fontSize: "24px", color: "#333" }}>
                    <i className="fas fa-envelope"
                        style={{ cursor: "pointer", color: "#FF6347", transition: "color 0.3s" }}
                        onClick={() => console.log("Email icon clicked!")}
                        onMouseEnter={(e) => e.currentTarget.style.color = "#FF4500"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "#FF6347"}></i>
                    <i className="fas fa-file-excel"
                        style={{ cursor: "pointer", color: "#32CD32", transition: "color 0.3s" }}
                        onClick={handleExport}
                        onMouseEnter={(e) => e.currentTarget.style.color = "#228B22"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "#32CD32"}></i>
                </div>
            </div>
            <div className="table-wrapper">
                <table className="scrollable-table">
                    <thead>
                        <tr style={{ backgroundColor: 'red', color: 'white' }}>
                            <td style={{ padding: '15px', fontWeight: 'bold' }}>Serial No.</td>
                            {columns.map((item, index) => (
                                <td key={index} style={{ padding: '15px', fontWeight: 'bold', borderBottom: '2px solid #ddd' }}>
                                    {item.label}
                                </td>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, itemIndex) => (
                            item.results.map((result, resultIndex) => (
                                <tr
                                    key={`${itemIndex}-${resultIndex}`}
                                    style={{
                                        backgroundColor: resultIndex % 2 === 0 ? '#FFFAF0' : '#F0F8FF',
                                        transition: 'background-color 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E6E6FA'} // Light purple on hover
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = resultIndex % 2 === 0 ? '#FFFAF0' : '#F0F8FF'} // Revert on mouse leave
                                >
                                    <td style={{ padding: '12px', textAlign: 'center' }}>{resultIndex + 1}</td>
                                    {columns.map((column, colIndex) => (
                                        <td key={colIndex} style={{ padding: '12px', textAlign: 'left', color: '#333', borderBottom: '1px solid #ddd' }}>
                                            {column.key !== 'file_name' ? result.contract_details[column.key] : result.file_name}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            </div>
        </>

    );
};

export default ContractDetailsTable;
