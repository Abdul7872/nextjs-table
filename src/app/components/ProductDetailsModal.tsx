import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Typography from '@mui/material/Typography';
import { ProductType } from './TableData';
import Image, { ImageLoader } from 'next/image';
import { ImageListItem, Rating } from '@mui/material';

const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ProductDetailsModal({ open, productData, onClose}:Props) {
  // const [open, setOpen] = React.useState(false);


  return (
      <CustomDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth='sm'
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Product Details
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
        <ImageListItem sx={{ height: 120, width: 160, marginBottom: 4}}>
          <Image 
            alt='product_img' 
            src={productData.image} 
            height={120} width={160} 
          />
        </ImageListItem>
          <Typography variant='h5' gutterBottom>
            {productData.title}
          </Typography>
          <Typography fontWeight={600} gutterBottom>
            <CurrencyRupeeIcon fontSize='small'/>{productData.price}
          </Typography>
          <Typography color='gray' className="flex items-center gap-2" gutterBottom>
            <Rating size='small' className='' precision={0.1} value={productData?.rating?.rate} readOnly />
            {productData?.rating?.count} Ratings
          </Typography>
          <Typography gutterBottom>
            {productData.description}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose}>
            Close
          </Button>
        </DialogActions>
      </CustomDialog>
  );
}

type Props={
  open: boolean,
  productData: ProductType,
  onClose:  () => void,
}
