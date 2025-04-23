import React from 'react';

import { StyledDataTableColumn, StyledDataTableRow } from './style';
import { StyledTable } from './RateCard/style';
import { CircularProgress } from '@mui/material';

const DataTable = ({ haveHeader = false, data = [], isLoading = false }) => {
  const isValidData = Array.isArray(data) && data.length > 0;
  const headers = isValidData ? Object.keys(data?.[0]) : [];

  return (
    <StyledTable className="table-responsive">
      <table className="table table-bordered  table-hover w-100 mb-0">
        {haveHeader && isValidData  && (
          <thead>
            <StyledDataTableRow>
              {headers.map((key, ind) => (
                <th key={ind}>{key}</th>
              ))}
            </StyledDataTableRow>
          </thead>
        )}

        <tbody>
          {isLoading ? (
            <tr>
              <StyledDataTableColumn colSpan="100%" className="text-center py-4">
                <CircularProgress size={20}  />
                <div className="mt-2">Loading data...</div>
              </StyledDataTableColumn>
            </tr>
          ) : !isValidData ? (
            <tr>
              <StyledDataTableColumn colSpan="100%" className="text-center text-light">
                No data available
              </StyledDataTableColumn>
            </tr>
          ) : (
            data.map(
              (row, rowIndex) =>
                row && (
                  <StyledDataTableRow key={rowIndex}>
                    {headers.map((key, colIndex) => (
                      <StyledDataTableColumn
                        key={colIndex}
                        className='text-truncate text-start'
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={row?.[key] || '--'}
                      >
                        {row?.[key] || '--'}
                      </StyledDataTableColumn>
                    ))}
                  </StyledDataTableRow>
                )
            )
          )}
        </tbody>
      </table>
    </StyledTable>
  );
};

export default DataTable;
