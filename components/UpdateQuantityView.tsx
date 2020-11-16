import {Text, View} from "./Themed";
import {styles} from "../constants/styles";
import {ScrollView, TextInput, TouchableOpacity} from "react-native";
import * as React from "react";
import {Product} from "../api/models";
import {useState} from "react";
import {changeQuantity} from "../api/apis";

export interface UpdateQuantityViewProps {
    product: Product,
    editProductInState: any;
    setModal: any;
}

export const UpdateQuantityView = ({editProductInState, setModal, product}: UpdateQuantityViewProps) => {

    const [quantityState, setQuantityState] = useState<number>(0);

    const submitQuantity = (quantity: number) => {

        const bigQuantity: bigint = BigInt(quantity).valueOf();

        changeQuantity(product.id, bigQuantity).then(data => {
            const newQuantity = product.quantity + quantity;
            editProductInState({...product, quantity: newQuantity});
            setModal(false);
        }).catch(err => {

            if (err.message === 'Quantity must not be less than 0') {
                alert('You are trying to remove more items than there are in the warehouse');
            } else {
                alert('Something went wrong');
            }
            console.log(err);
        });
    };

    return (
        <>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>

                    <Text style={styles.textStyle}>

                        {`Product: ${product.manufacturerName} - ${product.modelName}`}
                    </Text>
                    <Text style={styles.textStyle}>
                        {`Items in warehouse: ${product.quantity}`}
                    </Text>
                    <Text style={styles.textStyle}>
                        Set the amount
                    </Text>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            value={quantityState.toString()}
                            placeholder="Enter the Price"
                            keyboardType={"numeric"}
                            placeholderTextColor="#FFFFFF"
                            onChangeText={text => {
                                const numericValue = Number(text);
                                setQuantityState(numericValue);
                            }}
                        />
                    </View>


                    <TouchableOpacity style={styles.submitBtn} onPress={() => {
                        submitQuantity(quantityState);
                    }}>
                        <Text style={styles.submitText}>
                            Add items
                        </Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.submitBtn} onPress={() => {
                        submitQuantity(-quantityState);
                    }}>
                        <Text style={styles.submitText}>
                            Remove items
                        </Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </>
    )
};
