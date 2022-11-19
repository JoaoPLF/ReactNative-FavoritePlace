import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";

const Map = ({ navigation, route }) => {
  const initialLocation = route.params ? { lat: route.params.initialLat, lng: route.params.initialLng } : null;
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const region = {
    latitude: initialLocation ? initialLocation.lat : 0,
    longitude: initialLocation ? initialLocation.lng : 0,
    latitudeDelta: initialLocation ? 0.03 : 100,
    longitudeDelta: initialLocation ? 0.03 : 100,
  }

  const selectLocationHandler = (event) => {
    if (!!!initialLocation) {
      const lat = event.nativeEvent.coordinate.latitude;
      const lng = event.nativeEvent.coordinate.longitude;
  
      setSelectedLocation({ lat, lng });
    }
  };

  const savePickedLocationHandler = useCallback(() => {
    if (selectedLocation) {
      navigation.navigate("AddPlace", { lat: selectedLocation.lat, lng: selectedLocation.lng });
    }
    else {
      Alert.alert("No location picked!", "You have to pick a location (by tapping on the map) first.");
    }
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (!!!initialLocation) {
      navigation.setOptions({
        headerRight: ({ tintColor }) => <IconButton icon="save" size={24} color={tintColor} onPress={savePickedLocationHandler} />
      });
    }
  }, [navigation, savePickedLocationHandler, initialLocation]);

  return (
    <MapView style={styles.map} initialRegion={region} onPress={selectLocationHandler}>
      {!!selectedLocation ?
        <Marker title="Picked Location" coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }} /> :
        null
      }
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
});

export default Map;