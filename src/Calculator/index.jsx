import { Text, View } from "react-native";
import React, { useState } from "react";
import Button from "./Button";

const Colors = {
  light: "#FBFBFB",
  dark: "#0c263b",
  btnLight: "#F6F5F2",
  btnDark: "#09122C",
  btnRight: "#7743DB",
  black: "#171617",
  white: "#fefeff",
  gray: "#f2f2f4",
};

const Calculator = () => {
  const [firstValue, setFirstValue] = useState("");
  const [displayValue, setDisplayValue] = useState("0");
  const [operator, setOperator] = useState("");

  const handleNumberInput = (num) => {
    if (displayValue == "0") {
      setDisplayValue(num);
    } else {
      setDisplayValue(displayValue + num);
    }
  };

  const handleOperatorInput = (operator) => {
    setOperator(operator);
    setFirstValue(displayValue);
    setDisplayValue("0");
  };

  const handleCalculation = () => {
    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(displayValue);

    if (operator === "+") {
      setDisplayValue((num1 + num2).toString());
    } else if (operator === "-") {
      setDisplayValue((num1 - num2).toString());
    } else if (operator === "*") {
      setDisplayValue((num1 * num2).toString());
    } else if (operator === "/") {
      setDisplayValue((num1 / num2).toString());
    } else if (operator === "%") {
      setDisplayValue((num1 % num2).toString());
    }

    setOperator("");
    setFirstValue("");
  };

  const handleClear = () => {
    setDisplayValue("0");
    setOperator("");
    setFirstValue("");
  };

  const handleDelete = () => {
    if (displayValue.length == 1) {
      setDisplayValue("0");
    } else {
      setDisplayValue(displayValue.slice(0, -1));
    }
  };

  return (
    <View className="flex-1">
      <View className="w-full h-1/3 justify-end items-end bg-slate-200 px-7 py-3">
        <Text style={{ fontSize: 30, fontWeight: "300" }}>
          {firstValue + operator}
        </Text>
        <Text style={{ fontSize: 70, fontWeight: "300" }}>{displayValue}</Text>
      </View>
      <View className="w-full h-2/3 flex-row flex-wrap justify-between p-4 bg-white">
        <Button title="C" type="top" onPress={handleClear} />
        <Button title="⌫" type="top" onPress={handleDelete} />
        <Button title="%" type="top" onPress={() => handleOperatorInput("%")} />
        <Button
          title="÷"
          type="right"
          onPress={() => handleOperatorInput("/")}
        />
        <Button
          title="7"
          type="number"
          onPress={() => handleNumberInput("7")}
        />
        <Button
          title="8"
          type="number"
          onPress={() => handleNumberInput("8")}
        />
        <Button
          title="9"
          type="number"
          onPress={() => handleNumberInput("9")}
        />
        <Button
          title="x"
          type="right"
          onPress={() => handleOperatorInput("*")}
        />
        <Button
          title="6"
          type="number"
          onPress={() => handleNumberInput("6")}
        />
        <Button
          title="5"
          type="number"
          onPress={() => handleNumberInput("5")}
        />
        <Button
          title="4"
          type="number"
          onPress={() => handleNumberInput("4")}
        />
        <Button
          title="-"
          type="right"
          onPress={() => handleOperatorInput("-")}
        />
        <Button
          title="1"
          type="number"
          onPress={() => handleNumberInput("1")}
        />
        <Button
          title="2"
          type="number"
          onPress={() => handleNumberInput("2")}
        />
        <Button
          title="3"
          type="number"
          onPress={() => handleNumberInput("3")}
        />
        <Button
          title="+"
          type="right"
          onPress={() => handleOperatorInput("+")}
        />
        <Button
          title="0"
          type="number"
          onPress={() => handleNumberInput("0")}
        />
        <Button
          title="00"
          type="number"
          onPress={() => handleNumberInput("00")}
        />
        <Button
          title="."
          type="number"
          onPress={() => handleNumberInput(".")}
        />
        <Button title="=" type="right" onPress={handleCalculation} />
      </View>
    </View>
  );
};

export default Calculator;
