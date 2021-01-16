import {default as React, useCallback, useEffect, useState} from "react";
import {Text, View} from "../components/Themed";
import {Product} from "../api/models";
import {Modal, RefreshControl, ScrollView, ToastAndroid, TouchableOpacity} from "react-native";
import {AddProductView} from "../components/AddProductView";
import {styles} from "../constants/styles";
import {AuthContext} from "../context/context";
import {removeAccessToken} from "../storage/store";
import {sync} from "../network/sync";
import {isConnected} from "../network/utils";
import {fetchAllWarehouses} from "../api/v2/apis";
import {Warehouse} from "../api/v2/models";
import DropDownPicker from 'react-native-dropdown-picker';
import {ProductItem} from "../components/ProductItem";
import store from "../storage/reduxStore";
import {useDispatch} from "react-redux";
import {setWarehouses, setSelectedWarehouseId} from "../reducer/warehouseReducer";
import {isLoading} from "expo-font";


export interface WarehouseLabel {
  label: any,
  value: any
}

export default function MainScreen() {

  let controller;

  const dispatch = useDispatch();

  const warehouses = store.getState().warehouses;
  const selectedWarehouseId = store.getState().selectedWarehouseId;

  const [warehouseLabels, setWarehouseLabels] = useState<WarehouseLabel[]>();
  const [loading, setLoading] = useState(true);
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
          const warehouses = await fetchAllWarehouses();
          dispatch(setWarehouses(warehouses));
          const labels: WarehouseLabel[] = [];
          for (let warehouse of warehouses) {
            labels.push({label: warehouse.name, value: warehouse.id});
          }
          setWarehouseLabels(labels);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();

  }, [dispatch]);

  const refreshData = useCallback(async () => {

    const connected = await isConnected();

    if (connected) {
      setRefreshing(true);
      await sync();
      try {
        const warehouses = await fetchAllWarehouses();
        dispatch(setWarehouses(warehouses));
        const labels: WarehouseLabel[] = [];
        for (let warehouse of warehouses) {
          labels.push({label: warehouse.name, value: warehouse.id});
        }
        setWarehouseLabels(labels);
      } catch (err) {
        console.log(err);
      } finally {
        setRefreshing(false);
      }
    } else {
      ToastAndroid.show('No internet', ToastAndroid.SHORT)
    }

  }, [dispatch]);

  const addProductToState = (product: Product) => {
    triggerRefresh();
  };

  const deleteProductFromState = (productId: number) => {
    triggerRefresh();
  };

  const triggerRefresh = () => {
    setLoading(true);

    refreshData().then(() => {
      setLoading(false)
    }).catch(err => {
      setLoading(false);
    });

  };

  const editProductInState = (updatedProduct: Product) => {
    triggerRefresh();
  };

  const updateProductQuantityInState = (productId: number, warehouseId: number, newQuantity: number) => {
    triggerRefresh();
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

            <DropDownPicker
              items={warehouseLabels!!}
              controller={instance => controller = instance}
              onChangeList={(items, callback) => {
                new Promise((resolve, reject) => resolve(setWarehouseLabels(items)))
                  .then(() => callback())
                  .catch(() => {
                  });
              }}
              defaultValue={selectedWarehouseId}
              onChangeItem={item => {
                const warehouseId = item.value as number;
                dispatch(setSelectedWarehouseId(warehouseId));
                triggerRefresh();
              }}
            />

            {!loading && (

              warehouses.filter(it => it.id === selectedWarehouseId)[0].products.map((product, index) =>
                <ProductItem key={index}
                             product={product}
                             editProductInState={editProductInState}
                             deleteProductFromState={deleteProductFromState}
                             updateQuantityInState={updateProductQuantityInState}
                />)
            )}


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
