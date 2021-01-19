import {default as React, useCallback, useEffect, useState} from "react";
import {Text, View} from "../components/Themed";
import {getAllProducts} from "../api/apis";
import {Product} from "../api/models";
import {ProductItem} from "../components/ProductItem";
import {Modal, RefreshControl, ScrollView, ToastAndroid, TouchableOpacity} from "react-native";
import {AddProductView} from "../components/AddProductView";
import {styles} from "../constants/styles";
import {AuthContext} from "../context/context";
import {removeAccessToken} from "../storage/store";
import {sync} from "../network/sync";
import {isConnected} from "../network/utils";

const ENGLISH = 'ENGLISH';
const FRENCH = 'FRENCH';


export default function WarehouseScreen() {


    const [products, setProducts] = useState<Product[]>([]);
    const [language, setLanguage] = useState<typeof ENGLISH | typeof FRENCH>(FRENCH);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [addProductModalVisible, setAddProductModalVisible] = useState(false);

    // @ts-ignore
    const {signOut} = React.useContext(AuthContext);

    useEffect(() => {

        const fetchData = async () => {
            const connected = await isConnected();

            if (connected) {
                setLoading(true);
                await sync();
                try {
                    const productsResponse = await getAllProducts();
                    console.log(productsResponse)
                    setProducts(productsResponse);
                } catch (err) {
                    console.log(err);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();

    }, []);

    const refreshData = useCallback(async () => {

        const connected = await isConnected();

        if (connected) {
            setRefreshing(true);
            await sync();
            try {
                const productsResponse = await getAllProducts();
                setProducts(productsResponse);
            } catch (err) {
                console.log(err);
            } finally {
                setRefreshing(false);
            }
        } else {
            ToastAndroid.show('No internet', ToastAndroid.SHORT)
        }

    }, []);

    const addProductToState = (product: Product) => {
        const newProducts = [...products, product];
        setProducts(newProducts);
    };

    const deleteProductFromState = (productId: number) => {
        const newProducts = products.filter(product => product.id !== productId);
        setProducts(newProducts);
    };

    const editProductInState = (updatedProduct: Product) => {
        const newProducts = [...products.filter(product => product.id !== updatedProduct.id), updatedProduct];
        setProducts(newProducts);
    };

    return (
        <ScrollView
            style={styles.scrollView}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshData}/>}
         >
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
                                             language={language}
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
                            <TouchableOpacity style={styles.submitBtn} onPress={async () => {
                                await sync();
                            }}>
                                <Text style={styles.submitText}>
                                    Synchronize
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


                        <View style={styles.container}>
                            <TouchableOpacity style={styles.submitBtn} onPress={() => {
                                if(language === 'ENGLISH') {
                                    setLanguage('FRENCH')
                                } else {
                                    setLanguage('ENGLISH')
                                }
                            }}>
                                <Text style={styles.submitText}>
                                    {language === 'ENGLISH' && (
                                      <>
                                          Change to french
                                      </>
                                    )}
                                    {language === 'FRENCH' && (
                                      <>
                                          Change to english
                                      </>
                                    )}
                                </Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                )}
            </View>
        </ScrollView>
    )
};
