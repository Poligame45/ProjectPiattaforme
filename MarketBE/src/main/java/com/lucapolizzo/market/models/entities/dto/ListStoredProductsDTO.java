package com.lucapolizzo.market.models.entities.dto;

import com.lucapolizzo.market.models.entities.StoredProduct;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ListStoredProductsDTO {
    List<StoredProductDTO> storedProductList;
    int totProdotti;

    public ListStoredProductsDTO(List<StoredProductDTO> storedProductList, int totProdotti) {
        this.storedProductList = new ArrayList<>(storedProductList);
        this.totProdotti = totProdotti;
    }

    public ListStoredProductsDTO() {
        this.storedProductList = new ArrayList<>();
        this.totProdotti = 0;
    }


}
