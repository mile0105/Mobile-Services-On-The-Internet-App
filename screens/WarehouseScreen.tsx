import {default as React, useEffect, useState} from "react";
import {Text, View} from "../components/Themed";
import {getAllProducts} from "../api/apis";
import {Product} from "../api/models";
import {ProductItem} from "../components/ProductItem";
import {ScrollView} from "react-native";


export default function WarehouseScreen() {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setIsLoading] = useState(false);

    useEffect(() => {

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const productsResponse = await getAllProducts();
                setProducts(productsResponse);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();

    }, []);


    return (
        <View>
            {loading ? (
                <Text>
                    Loading
                </Text>
            ) : (
                <ScrollView>
                    {products.map((product, index) =>
                        <ProductItem key={index} product={product}/>
                    )}
                </ScrollView>
            )}
        </View>
    )
}
