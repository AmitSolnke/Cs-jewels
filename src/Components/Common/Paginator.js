import { Pagination } from '@mui/material'
import React from 'react'

export const Paginator = ({ totalPage, currentPage, handleChangePage }) => {
  return (
    <div className='pagination'>
      <Pagination
        count={totalPage}
        page={currentPage}
        onChange={handleChangePage}
        color="primary"
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          '& .Mui-selected': {
            background: 'transparent',
            fontWeight: 'bolder',
            backgroundColor: '#00000014 !important',
            color: '#000 !important'
          },
        }}
      />
    </div>
  )
}
