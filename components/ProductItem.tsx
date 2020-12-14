import {Product} from "../api/models";
import React, {useState} from "react";
import {ListItem} from "react-native-elements";
import {Alert, Button, Modal} from "react-native";
import {deleteProduct} from "../api/apis"
import {EditProductView} from "./EditProductView";
import {UpdateQuantityView} from "./UpdateQuantityView";

export interface ProductItemProps {
    product: Product,
    deleteProductFromState: any,
    editProductInState: any,
}

export const ProductItem = (props: ProductItemProps) => {

    const {product, deleteProductFromState, editProductInState} = props;

    const [editProductModalVisible, setEditProductModalVisible] = useState(false);
    const [updateQuantityModalVisible, setUpdateQuantityModalVisible] = useState(false);

    const productName = `${product.manufacturerName} - ${product.modelName}`;
    const productNameAndPrice = `${productName} : ${product.price} PLN`;
    const quantity = `In storage: ${product.quantity} items`;

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
                    <Button color={'#465881'} title={'Update Quantity'} onPress={() => {
                        setUpdateQuantityModalVisible(true);
                    }}/>
                    <Button color={'#fb5b5a'} title={'Delete'} onPress={
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
                <ListItem.Chevron color={'#000000'} onPress={() => {
                    setEditProductModalVisible(true)
                }}/>

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
