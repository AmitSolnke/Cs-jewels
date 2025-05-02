import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductList from "../../Common/ProductList";
import { getProducts } from "../../../services/FrontApp/index.service";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Paginator } from "../../Common/Paginator";

const Collection = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams] = useSearchParams();
  const collectionMasterId = searchParams?.get("collectionId");
  const page = searchParams.get("page") ? searchParams.get("page") : 1;
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      const requestParams = new FormData();

      if (collectionMasterId) {
        requestParams.append("collection_master_id", collectionMasterId);
      }

      requestParams.append("page", page);
      const limit = searchParams.get("limit") ? searchParams.get("limit") : 12;
      requestParams.append("limit", limit);
      setIsLoading(true);
      const { data } = await getProducts(requestParams);

      setTotalPages(data.data.last_page);
      setProducts(data?.data?.data);
    } catch (error) {
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };
  const handleChangePage = (event, newPage) => {
    const pageNumber = Number(newPage) || 1;

    navigate(
      `/collection?collectionId=${collectionMasterId}&page=${pageNumber}`
    );
  };
  useEffect(() => {
    getData();
  }, [searchParams?.get("collectionId"), searchParams?.get("page")]);
  return (
    <Stack gap={2} className="product-catalogues">
      <Box>
        <ProductList products={products} isLoading={isLoading} />
      </Box>
      {products?.length > 0 && !isLoading ? (
        <Paginator
          currentPage={page}
          totalPage={totalPages}
          handleChangePage={handleChangePage}
        />
      ) : (
        ""
      )}
    </Stack>
  );
};

export default Collection;
