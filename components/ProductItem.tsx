import {Product} from "../api/models";
import React, {useState} from "react";
import {ListItem} from "react-native-elements";
import {Button, Modal} from "react-native";
import {deleteProduct} from "../api/apis"
import {EditProductView} from "./EditProductView";

export interface ProductItemProps {
    product: Product,
    deleteProductFromState: any,
    editProductInState: any,
}

export const ProductItem = (props: ProductItemProps) => {

    const {product, deleteProductFromState, editProductInState} = props;

    const [editProductModalVisible, setEditProductModalVisible] = useState(false);

    const productName = `${product.manufacturerName} - ${product.modelName} : ${product.price} PLN`;
    const quantity = `In storage: ${product.quantity} items`;

    const deleteCurrentProduct = () => {
        const productId = product.id;
        deleteProduct(product.id).then(
            data => {
                 deleteProductFromState(productId);
            }
        ).catch(err => {
            if (err.error === 'access_denied') {
                alert('You do not have permission to do that');
            } else {
                console.log(err.error);
            }
        })
    };

    return (
        <>
            <ListItem>
                <ListItem.Content>
                    <ListItem.Title>{productName}</ListItem.Title>
                    <ListItem.Subtitle>{quantity}</ListItem.Subtitle>
                    <Button title={'Delete'} onPress={deleteCurrentProduct}/>
                </ListItem.Content>
                <ListItem.Chevron onPress={() => {setEditProductModalVisible(true)}}/>

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

            </ListItem>
        </>
    )
};
