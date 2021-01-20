import {Text, View} from "./Themed";
import {styles} from "../constants/styles";
import {Button, ScrollView, TextInput, TouchableOpacity} from "react-native";
import * as React from "react";
import {ProductApi} from "../api/models";
import {useState} from "react";
import {addProduct} from "../api/apis";

export interface AddProductViewProps {
  addProductToState: any;
  setModal: any;
}

export const AddProductView = ({addProductToState, setModal}: AddProductViewProps) => {

  const [modelName, setModelName] = useState('');
  const [manufacturerName, setManufacturerName] = useState('');
  const [price, setPrice] = useState(0);
  const [priceInEUR, setPriceInEUR] = useState(0);

  const submitProduct = () => {

    const product = {
      modelName: modelName,
      manufacturerName: manufacturerName,
      price: price,
      priceInEur: priceInEUR,
    } as ProductApi;

    addProduct(product).then(product => {
      addProductToState(product);
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
              placeholder="Enter the model name"
              placeholderTextColor="#FFFFFF"
              onChangeText={text => setModelName(text)}
            />
          </View>
          <Text style={styles.textStyle}>
            Price in USD
          </Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Enter the Price"
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
          <Text style={styles.textStyle}>
            Price in EUR
          </Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Enter the Price"
              keyboardType={"numeric"}
              placeholderTextColor="#FFFFFF"
              onChangeText={text => {
                const numericValue: number = +text;
                if (numericValue < 0) {
                  alert('Price can\'t be less than 0');
                } else {
                  setPriceInEUR(numericValue);
                }
              }}
            />
          </View>
          <TouchableOpacity style={styles.submitBtn} onPress={submitProduct}>
            <Text style={styles.submitText}>
              Add Product
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  )
};
