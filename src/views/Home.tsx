import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {
  checkMultiple,
  PERMISSIONS,
  request,
  PermissionStatus,
  requestMultiple,
  check,
} from 'react-native-permissions';

import { Color } from 'global-styles';
import { ActionButton, LinearGradientButton } from 'components';
import { BottomSheetModal } from 'components/BottomSheetModal';

export const Home: React.FC = () => {
  const [isImageUploadModalVisible, setIsImageUploadModalVisible] = useState(
    false,
  );

  function handleLocationPermissionRequest(response: PermissionStatus) {
    switch (response) {
      case 'denied':
        // TODO - Show custom modal -> Ask user for permission again
        console.log('DENIED');
        break;

      case 'granted':
        break;

      case 'blocked':
        // TODO - Show custom modal -> Open phone settings
        break;
    }
  }

  function handleLocationPermissionStatus(permissionStatus: PermissionStatus) {
    switch (permissionStatus) {
      case 'unavailable' || 'limited':
        // TODO - Show custom modal -> "User can't use this app"
        break;

      case 'denied':
        request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
          handleLocationPermissionRequest(result);
        });
        break;

      case 'granted':
        break;

      case 'blocked':
        // TODO - Show custom modal -> Open phone settings
        break;
    }
  }

  function handleCameraPermissionRequest(response: PermissionStatus) {
    switch (response) {
      case 'denied':
        // TODO - Show custom modal -> Ask user for permission again
        console.log('DENIED');
        break;

      case 'granted':
        check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(
          (locationPermission) => {
            handleLocationPermissionStatus(locationPermission);
          },
        );
        break;

      case 'blocked':
        // TODO - Show custom modal -> Open phone settings
        break;
    }
  }

  function handleCameraPermissionStatus(permissionStatus: PermissionStatus) {
    switch (permissionStatus) {
      case 'unavailable' || 'limited':
        // TODO - Show custom modal that user can't use this app
        console.log(
          'This feature is not available (on this device / in this context)',
        );
        break;

      case 'denied':
        request(PERMISSIONS.ANDROID.CAMERA).then((result) => {
          handleCameraPermissionRequest(result);
        });
        break;

      case 'granted':
        check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(
          (locationPermission) => {
            handleLocationPermissionStatus(locationPermission);
          },
        );
        break;

      case 'blocked':
        // TODO - Custom modal -> Open phone settings
        break;
    }
  }

  function handlePermissions() {
    check(PERMISSIONS.ANDROID.CAMERA).then((cameraPermission) => {
      handleCameraPermissionStatus(cameraPermission);
    });
  }

  function onPress() {
    console.log('wtf');
  }

  function toggleImageUploadModal() {
    setIsImageUploadModalVisible(!isImageUploadModalVisible);
  }

  function openPicker() {
    console.log('OPEN PICKER');
  }

  function imageUploadModalContent() {
    return (
      <View style={styles.imageUploadModalContainer}>
        <View style={styles.modalHandle} />
        <View style={styles.imageUploadModalContent}>
          <LinearGradientButton
            placeholder={'otvori kameru'}
            onPress={openPicker}
            type={'primary'}
          />
          <LinearGradientButton
            placeholder={'izaberi iz galerije'}
            onPress={toggleImageUploadModal}
            type={'primary'}
          />
          <LinearGradientButton
            placeholder={'odustani'}
            onPress={toggleImageUploadModal}
            type={'cancel'}
          />
        </View>
      </View>
    );
  }

  useEffect(() => {
    handlePermissions();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={Color.Text} />
      <View style={styles.mainContainer}>
        <BottomSheetModal
          isVisible={isImageUploadModalVisible}
          swipeCallBack={toggleImageUploadModal}
          content={imageUploadModalContent()}
        />
        <LinearGradient
          colors={[Color.Primary, Color.Secondary]}
          useAngle={true}
          angle={90}
          style={styles.topContainerBack}
        >
          <View style={styles.topContainerFront}>
            <View style={styles.contentContainer}>
              <ActionButton
                buttonText={'dodaj fotografiju'}
                onPress={toggleImageUploadModal}
                buttonIcon={'camera'}
                isDisabled={isImageUploadModalVisible}
              />
              <ActionButton
                buttonText={'dodaj opis'}
                onPress={onPress}
                buttonIcon={'gallery'}
                isDisabled={true}
              />
              <ActionButton
                buttonText={'dodaj lokaciju'}
                onPress={onPress}
                buttonIcon={'location'}
                isDisabled={true}
              />
            </View>
          </View>
        </LinearGradient>
        <View style={styles.bottomContainerBack}>
          <LinearGradient
            colors={[Color.Primary, Color.Secondary]}
            useAngle={true}
            angle={90}
            style={styles.bottomContainerFront}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    backgroundColor: Color.Secondary,
  },
  topContainerBack: {
    flex: 7,
    backgroundColor: Color.Primary,
  },
  topContainerFront: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: Color.Background,
    borderBottomRightRadius: 55,
  },
  bottomContainerBack: {
    flex: 1,
    backgroundColor: Color.Background,
  },
  bottomContainerFront: {
    height: '100%',
    backgroundColor: Color.Primary,
  },
  contentContainer: {
    height: '95%',
    width: '95%',
    elevation: 3,
    borderBottomRightRadius: 55,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  imageUploadModalContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '40%',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: Color.Background,
    borderTopWidth: 0.3,
    borderTopColor: Color.Text,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    borderLeftColor: Color.Primary,
    borderRightColor: Color.Secondary,
    borderRightWidth: 4,
    borderLeftWidth: 4,
  },
  imageUploadModalContent: {
    justifyContent: 'center',
    backgroundColor: Color.Background,
    width: '70%',
    height: '80%',
  },
  modalHandle: {
    backgroundColor: Color.Text,
    opacity: 0.3,
    height: 5,
    width: '20%',
    marginTop: '2%',
    borderRadius: 50,
  },
});
