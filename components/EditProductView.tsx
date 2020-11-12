import {Text, View} from "./Themed";
import {styles} from "../constants/styles";
import {Button, ScrollView, TextInput} from "react-native";
import * as React from "react";
import {Product, ProductApi} from "../api/models";
import {useState} from "react";
import {editProduct} from "../api/apis";

export interface EditProductViewProps {
    editProductState: any;
    setModal: any;
    oldProduct: Product;
}

export const EditProductView = ({editProductState, setModal, oldProduct}: EditProductViewProps) => {

    const [modelName, setModelName] = useState(oldProduct.modelName);
    const [manufacturerName, setManufacturerName] = useState(oldProduct.manufacturerName);
    const [price, setPrice] = useState(oldProduct.price);

    const submitProduct = () => {

        const product = {
            modelName: modelName,
            manufacturerName: manufacturerName,
            price: price
        } as ProductApi;

        editProduct(product, oldProduct.id).then(product => {
            editProductState(product);
            setModal(false);
        }).catch(err => {
            alert('Something went wrong');
            console.log(err);
        });
    };

    return (
        <>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>

                    <Text style={styles.textStyle}>
                        Manufacturer name
                    </Text>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            value={manufacturerName}
                            placeholder="Enter the manufacturer name"
                            placeholderTextColor="#FFFFFF"
                            onChangeText={text => setManufacturerName(text)}
                        />
                    </View>
                    <Text style={styles.textStyle}>
                        Model name
                    </Text>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            value={modelName}
                            placeholder="Enter the model name"
                            placeholderTextColor="#FFFFFF"
                            onChangeText={text => setModelName(text)}
                        />
                    </View>
                    <Text style={styles.textStyle}>
                        Price (in PLN)
                    </Text>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Enter the Price"
                            value={price.toString()}
                            keyboardType={"numeric"}
                            placeholderTextColor="#FFFFFF"
                            onChangeText={text => {
                                const numericValue: number = +text;
                                if (numericValue < 0) {
                                    alert('Price can\'t be less than 0');
                                } else {
                                    setPrice(numericValue);
                                }
                            }}
                        />
                    </View>
                    <Button title={'Submit'} onPress={submitProduct}/>
                </View>
            </ScrollView>
        </>
    )
};
