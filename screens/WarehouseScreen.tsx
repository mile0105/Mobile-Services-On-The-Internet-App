import {default as React, useEffect, useState} from "react";
import {Text, View} from "../components/Themed";
import {getAllProducts} from "../api/apis";
import {Product} from "../api/models";
import {ProductItem} from "../components/ProductItem";
import {Button, ScrollView} from "react-native";
import {Overlay} from "react-native-elements";


export default function WarehouseScreen() {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setIsLoading] = useState(false);
    const [overlayVisible, setOverlayVisible] = useState(false);

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

    console.log(overlayVisible);

    return (
        <View>
            {loading ? (
                <Text>
                    Loading
                </Text>
            ) : (
                <View>
                    <ScrollView>
                        {products.map((product, index) =>
                            <ProductItem key={index} product={product}/>
                        )}
                    </ScrollView>
                    <Overlay isVisible={false} fullScreen={true} accessibilityViewIsModal={true}>
                        <Text>yo</Text>
                    </Overlay>
                    <Button title={'Add Product'} onPress={() => {setOverlayVisible(true)}}/>

                </View>
            )}
        </View>
    )
}
