import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";
import { useEffect, useState } from "react";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";

const LocationPicker = ({ onLocationPick }) => {
  const [locationPermissionInfo, requestPermission] = useForegroundPermissions();
  const [pickedLocation, setPickedLocation] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  
  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = { lat: route.params.lat, lng: route.params. lng };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    onLocationPick(pickedLocation);
  }, [pickedLocation]);

  const verifyPermissions = async () => {
    if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert("Insufficient Permissions", "You need to grant location permissions to use this app.");

      return false;
    }

    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (hasPermission) {
      const location = await getCurrentPositionAsync();
      setPickedLocation({ lat: location.coords.latitude, lng: location.coords.longitude });
    }
  };

  const pickOnMapHandler = () => {
    navigation.navigate("Map");
  };

  let locationPreview = <Text>No location picked yet.</Text>;

  if (pickedLocation) {
    locationPreview = (
      <MapView style={styles.map} scrollEnabled={false} region={{ latitude: pickedLocation.lat, longitude: pickedLocation.lng, latitudeDelta: 0.02, longitudeDelta: 0.02  }}>
        <Marker coordinate={{ latitude: pickedLocation.lat, longitude: pickedLocation.lng }} />
      </MapView>
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>
        {locationPreview}
      </View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>Locate User</OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>Pick on Map</OutlinedButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden"
  },
  map: {
    height: "100%",
    width: "100%"
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  image: {
    width: "100%",
    height: "100%",
  }
});

export default LocationPicker;