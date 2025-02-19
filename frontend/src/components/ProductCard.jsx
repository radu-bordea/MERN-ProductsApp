import { Box, Heading, Image } from "@chakra-ui/react";
import { transform } from "framer-motion";
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit={"cover"}
      />

      <Box p={4}>
        <Heading as="h3" size={"md"} mb={2}></Heading>
      </Box>
    </Box>
  );
};

export default ProductCard;
ProductCard;
