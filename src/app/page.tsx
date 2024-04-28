import axios from "axios"
import TableData, { ProductType } from "@/components/TableData";
import { Container, Typography } from "@mui/material";

export const revalidate = 3600;
const API_PRODUCT = 'https://fakestoreapi.com/products';

async function getData() {
  const res = await axios.get<ProductType[]>(API_PRODUCT);
  if (!res.status) {
    throw new Error('Failed to fetch data')
  }
  return res.data;
}
 
export default async function Page() {
  const data = await getData()
   
  return <main>
    <Container maxWidth="lg">
      <Typography align="center" variant="h3" fontWeight={700} color={"darkgray"} m={2}>
        Product List
      </Typography>
        
      <TableData data={data} />
    </Container>

  </main>
}
