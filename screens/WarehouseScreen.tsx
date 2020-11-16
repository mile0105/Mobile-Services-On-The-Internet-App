import {default as React, useEffect, useState} from "react";
import {Text, View} from "../components/Themed";
import {getAllProducts} from "../api/apis";
import {Product} from "../api/models";
import {ProductItem} from "../components/ProductItem";
import {Modal, ScrollView, TouchableOpacity} from "react-native";
import {AddProductView} from "../components/AddProductView";
import {styles} from "../constants/styles";
import {AuthContext} from "../context/context";
import {removeAccessToken} from "../storage/store";

export default function WarehouseScreen() {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setIsLoading] = useState(false);
    const [addProductModalVisible, setAddProductModalVisible] = useState(false);

    // @ts-ignore
    const {signOut} = React.useContext(AuthContext);

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

    const addProductToState = (product: Product) => {
        const newProducts = [...products, product];
        setProducts(newProducts);
    };

    const deleteProductFromState = (productId: bigint) => {
        const newProducts = products.filter(product => product.id !== productId);
        setProducts(newProducts);
    };

    const editProductInState = (updatedProduct: Product) => {
        const newProducts = [...products.filter(product => product.id !== updatedProduct.id), updatedProduct];
        setProducts(newProducts);
    };

    return (
        <ScrollView style={styles.scrollView}>
            <View>
                {loading ? (
                    <Text>
                        Loading
                    </Text>
                ) : (
                    <View>
                        <ScrollView>
                            {products.map((product, index) =>
                                <ProductItem key={index}
                                             product={product}
                                             deleteProductFromState={deleteProductFromState}
                                             editProductInState={editProductInState}/>
                            )}
                        </ScrollView>

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={addProductModalVisible}
                            onRequestClose={() => {
                                setAddProductModalVisible(!addProductModalVisible)
                            }}
                        >
                            <AddProductView addProductToState={addProductToState}
                                            setModal={setAddProductModalVisible}/>
                        </Modal>


                        <View style={styles.container}>
                            <TouchableOpacity style={styles.submitBtn} onPress={() => {
                                setAddProductModalVisible(!addProductModalVisible)
                            }}>
                                <Text style={styles.submitText}>
                                    Add product
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.container}>
                            <TouchableOpacity style={styles.submitBtn} onPress={() => {
                                removeAccessToken().then(() => {
                                        signOut();
                                    }
                                ).catch(err => {
                                        console.log(err);
                                        alert('Could not sign out');
                                    }
                                );
                            }}>
                                <Text style={styles.submitText}>
                                    Logout
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                )}
            </View>
        </ScrollView>
    )
};
