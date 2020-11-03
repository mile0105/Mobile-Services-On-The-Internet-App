import {default as React, useEffect, useState} from "react";
import {Text, View} from "../components/Themed";
import {getAllProducts} from "../api/apis";
import {Product} from "../api/models";
import {ProductItem} from "../components/ProductItem";
import {ScrollView} from "react-native";

interface ProductRequest {
    products: Product[],
    loading: boolean,
}

export default function WarehouseScreen() {

    const [productsRequest, setProductsRequest] = useState<ProductRequest>({
        products: [],
        loading: false,
    });

    useEffect(() => {

        const fetchData = async () => {
            console.log('running...');
            const currentProducts = productsRequest.products;

            setProductsRequest({
                products: currentProducts,
                loading: true,
            });

            try {
                const productsResponse = await getAllProducts();
                console.log(productsResponse);
                setProductsRequest({
                    products: productsResponse,
                    loading: false,
                });
                console.log(productsRequest)
            } catch (err) {
                console.log(err);
                setProductsRequest({
                    products: currentProducts,
                    loading: false
                })
            }
        };
        fetchData();

    }, []);


    return (
        <View>
            {productsRequest.loading ? (
                <Text>
                    Loading
                </Text>
            ) : (
                <ScrollView>
                    {productsRequest.products.map((product, index) =>
                        <ProductItem key={index} product={product}/>
                    )}
                </ScrollView>
            )}
        </View>
    )
}
