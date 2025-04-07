import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";

const CrudSQLite = () => {
  const [db, setDb] = useState(null);
  const [names, setNames] = useState([]);
  const [currentName, setCurrentName] = useState("");
  const [currentId, setCurrentId] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const addName = async (name) => {
    // if (!names == []) {
    //   Alert.alert("tdk boeh kosong");
    // } else {
    //   Alert.alert("Data berhasil ditambah");
    // }
    try {
      await db?.withTransactionAsync(async () => {
        await db?.runAsync("insert into names (name) values (?)", [name]);
      });
    } catch (error) {
      console.error("failed add data", error);
    }
    getNames();
  };

  const getNames = async () => {
    try {
      const result = await db?.getAllAsync("select * from names");
      if (result) {
        setNames(result);
        console.log("result", result);
      }
    } catch (error) {
      console.error("failed add data", error);
    }
  };

  const handleAddUpdate = () => {
    console.log("press button");
    addName(currentName);
  };

  useEffect(() => {
    const initDb = async () => {
      setDb(await SQLite.openDatabaseAsync("db.db"));

      db?.withTransactionAsync(async () => {
        await db?.execAsync(
          "create table if not exists names (id integer primary key not null, name text);"
        );
      });
    };
    initDb();
    getNames();
  }, []);

  useEffect(() => {
    if (db) {
      getNames();
    }
  }, [db]);

  return (
    <View className="flex-1 items-center p-4">
      <TextInput
        value={currentName}
        placeholder="Name"
        onChangeText={setCurrentName}
        className="w-full bg-white border border-slate-300 p-3 rounded-md my-1"
      />
      <TouchableOpacity
        onPress={handleAddUpdate}
        className="bg-green-500 px-3 py-2 rounded-md mt-5"
      >
        <Text className="text-white">{isUpdate ? "Update" : "Add Name"}</Text>
      </TouchableOpacity>

      <View className="w-full h-40 bg-red-300">
        {names?.map((item, index) => (
          <Text key={index} className="text-blue-500">
            {item.name}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default CrudSQLite;
