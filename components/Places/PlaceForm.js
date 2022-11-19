import { useCallback, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";
import { getAddress } from "../../util/location";
import Button from "../UI/Button";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Place from "../../models/place";

const PlaceForm = ({ onCreatePlace }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);

  const changeTitleHandler = (value) => {
    setTitle(value);
  };

  const imageTakenHandler = (imageUri) => {
    setImage(imageUri);
  };

  const locationPickedHandler = useCallback((pickedLocation) => {
    setLocation(pickedLocation);
  }, []);

  const savePlaceHandler = async () => {
    try {
      const address = await getAddress(location.lat, location.lng);
      const placeData = new Place(title, image, address, location);

      onCreatePlace(placeData);
    }
    catch (err) {
      Alert.alert("Network error", err.message);
    }
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} value={title} onChangeText={changeTitleHandler} />
      </View>
      <ImagePicker onImageTaken={imageTakenHandler} />
      <LocationPicker onLocationPick={locationPickedHandler} />
      <Button style={styles.button} onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100
  },
  button: {
    marginTop: 12
  }
});

export default PlaceForm;