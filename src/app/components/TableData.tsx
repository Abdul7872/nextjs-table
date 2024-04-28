'use client'
import * as React from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Rating } from '@mui/material';
import RenderCellExpand from './RenderCellExpand';
import ProductDetailsModal from './ProductDetailsModal';

export interface ProductType {
  id: number,
  title: string,
  price: number,
  description: string,
  category:string,
  image: string,
  rating: {
    rate: number,
    count: number
  }
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'title', 
    headerName: 'Title', 
    width: 260, 
    renderCell:(params: GridRenderCellParams<any, string>)=> <RenderCellExpand value={params?.value || ''} width={params?.colDef?.computedWidth} />
   },
  { field: 'description', 
    headerName: 'Description', 
    width: 380, 
    renderCell:(params: GridRenderCellParams<any, string>)=> <RenderCellExpand value={params?.value || ''} width={params?.colDef?.computedWidth} />
  },
  { field: 'price', headerName: 'Price (₹)', type: 'number', width: 120, sortingOrder: ['asc', 'desc', 'asc'] },
  { field: 'category', headerName: 'Category', width: 140 },
  {
    field: 'rating',
    headerName: 'Rating',
    width: 180,
    sortingOrder: ['asc', 'desc', 'asc'],
    valueGetter: (value:{rate: number})=> value.rate,
    renderCell: ({value}: GridRenderCellParams<any, number>) => <Rating size='large' precision={0.1} value={value} readOnly />,
  },
];

export default function TableData({data}:Props) {
  const [showChild, setShowChild] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<ProductType>();


  React.useEffect(() => setShowChild(true), []);
  if (!showChild) return null;

  const handleClose = () => {
    setSelectedProduct(undefined);
  };


  return (
    <div style={{ height: 550, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        sx={{cursor: 'pointer'}}
        rowSelection={false}
        pageSizeOptions={[5, 10, 15, 20]}
        onRowClick={({row})=> setSelectedProduct(row)}
        // onCellClick={({row})=> setSelectedProduct(row)}
      />
      {selectedProduct && <ProductDetailsModal open={Boolean(selectedProduct)} productData={selectedProduct} onClose={handleClose} />}
    </div>
  );
}

type Props = {
  data: ProductType[]
}