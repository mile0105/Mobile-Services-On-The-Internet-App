import {Product} from "../api/models";
import React, {useState} from "react";
import {ListItem} from "react-native-elements";
import {Alert, Button, Modal} from "react-native";
import {deleteProduct} from "../api/apis"
import {EditProductView} from "./EditProductView";
import {UpdateQuantityView} from "./UpdateQuantityView";

export interface ProductItemProps {
    product: Product,
    language: 'ENGLISH' | 'FRENCH',
    deleteProductFromState: any,
    editProductInState: any,
}

export const ProductItem = (props: ProductItemProps) => {

    const {product, deleteProductFromState, editProductInState, language} = props;

    const [editProductModalVisible, setEditProductModalVisible] = useState(false);
    const [updateQuantityModalVisible, setUpdateQuantityModalVisible] = useState(false);

    const productName = `${product.manufacturerName} - ${product.modelName}`;

    const productNameAndPriceUSD = `${productName} : ${product.price.toFixed(2)} USD`;
    const productNameAndPriceEUR = `${productName} : ${product.priceInEur.toFixed(2)} EUR`;
    const quantity = `${product.quantity} items`;

    const productNameAndPrice = language === 'ENGLISH'? productNameAndPriceUSD : productNameAndPriceEUR;

    const deleteCurrentProduct = () => {
        const productId = product.id;
        deleteProduct(product).then(
            () => {
                deleteProductFromState(productId);
            }
        ).catch(err => {
            if (err.error === 'Forbidden') {
                alert('You do not have permission to do that');
            } else {
                console.log(err.error);
            }
        })
    };

    return (
        <>
            <ListItem bottomDivider={true}>
                <ListItem.Content>
                    <ListItem.Title style={{
                        fontWeight: 'bold'
                    }}>{productNameAndPrice}</ListItem.Title>
                    <ListItem.Title>{quantity}</ListItem.Title>
                    <Button color={'#aaaaaa'} title={'Change Quantity'} onPress={() => {
                        setUpdateQuantityModalVisible(true);
                    }}/>
                    <Button color={'#aaaaaa'} title={'Edit Product details'} onPress={() => {
                        setEditProductModalVisible(true);
                    }}/>
                    <Button color={'#777777'} title={'Delete Product'} onPress={
                        () => {
                            Alert.alert('Confirmation',
                                `Are you sure that you want to delete ${productName}?`,
                                [{
                                    text: 'No',
                                    style: 'cancel',
                                }, {
                                    text: 'Yes',
                                    onPress:  () => {deleteCurrentProduct()}
                                }
                                ]);
                        }
                    }/>
                </ListItem.Content>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={editProductModalVisible}
                    onRequestClose={() => {
                        setEditProductModalVisible(!editProductModalVisible)
                    }}
                >
                    <EditProductView editProductState={editProductInState}
                                     oldProduct={product}
                                     setModal={setEditProductModalVisible}/>
                </Modal>


                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={updateQuantityModalVisible}
                    onRequestClose={() => {
                        setUpdateQuantityModalVisible(!updateQuantityModalVisible)
                    }}
                >
                    <UpdateQuantityView setModal={setUpdateQuantityModalVisible}
                                        editProductInState={editProductInState}
                                        product={product}
                    />
                </Modal>

            </ListItem>
        </>
    )
};
