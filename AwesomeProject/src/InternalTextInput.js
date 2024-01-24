import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const InternalTextInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  style,
  required,
  keyboardType,
  editable,
  maxLength,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.label}>{label}</Text>
        {required ? (
          <Text style={{ color: "#d32f2f", marginLeft: 4 }}>*</Text>
        ) : (
          ""
        )}
      </View>

      <TextInput
        style={[
          styles.input,
          error && styles.errorInput,
          isFocused && styles.inputFocused,
          style,
        ]}
        value={value}
        editable={editable}
        onChangeText={onChangeText}
        placeholder={placeholder ? placeholder : `${label}`}
        error={error}
        maxLength={maxLength}
        placeholderTextColor="#888"
        onFocus={handleFocus}
        required={required}
        keyboardType={keyboardType}
      />
      {error ? (
        <Text
          style={{ paddingVertical: 4, paddingHorizontal: 2, color: "#d32f2f" }}
        >
          {label + error}
        </Text>
      ) : (
        ""
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    height: 40,
    borderColor: "#E5E5E5",
    fontFamily: "Poppins-Regular",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  errorInput: {
    borderColor: "#d32f2f",
  },
});

export default InternalTextInput;
