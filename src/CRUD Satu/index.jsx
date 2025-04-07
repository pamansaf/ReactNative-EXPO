import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";
import Product from "./Product";

const CrudSatu = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, "products");
    const q = query(collectionRef, orderBy("createAt", "desc"));
    const unsuscribe = onSnapshot(q, (querySnapshot) => {
      setProducts(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          emoji: doc.data().emoji,
          name: doc.data().name,
          price: doc.data().price,
          isSold: doc.data().isSold,
          createAt: doc.data().createAt,
        }))
      );
    });
    return unsuscribe;
  }, []);
  return (
    <View className="p-4">
      <View>
        <Text className="text-2xl font-bold pb-5">Products</Text>
        {products.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </View>
    </View>
  );
};

export default CrudSatu;
