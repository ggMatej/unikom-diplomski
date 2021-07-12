import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  NativeScrollEvent,
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { PERMISSIONS, check, openSettings } from 'react-native-permissions';
import { Color } from 'global-styles';
import { usePermissionRequest } from 'hooks';
import { Action, BottomSheetModal, InfoModal } from 'modules/shared';
import { Tab } from 'modules/shared/components/Tab';

const { width } = Dimensions.get('window');

const FIRST_ACTION_POSITION = 0;
const SECOND_ACTION_POSITION = width - 110;
const THIRD_ACTION_POSITION = (width - 110) * 2;

export const Home: React.FC = () => {
  const scrollViewRef = useRef<Animated.ScrollView | null>(null);

  const translateXValue = useSharedValue(0);
  const translateIconYValue = useSharedValue(0);
  const translateDotXValue = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateXValue.value = withSpring(event.contentOffset.x, {
      mass: 0.5,
      damping: 20,
      stiffness: 50,
    });
    translateIconYValue.value = event.contentOffset.x;
    translateDotXValue.value = withSpring(event.contentOffset.x, {
      mass: 0.3,
      damping: 20,
      stiffness: 100,
    });
  });

  const [isCameraPermissionModalVisible, setIsCameraPermissionModalVisible] =
    useState(false);

  const [actionIndex, setActionIndex] = useState(0);

  const [
    isLocationPermissionModalVisible,
    setIsLocationPermissionModalVisible,
  ] = useState(false);

  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);

  const [isImageUploadModalVisible, setIsImageUploadModalVisible] =
    useState(false);

  const leftNavigatorButtonAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateXValue.value,
      [FIRST_ACTION_POSITION, SECOND_ACTION_POSITION, THIRD_ACTION_POSITION],
      [0.5, 1, 1],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      translateXValue.value,
      [FIRST_ACTION_POSITION, SECOND_ACTION_POSITION, THIRD_ACTION_POSITION],
      [0.5, 1, 1],
      Extrapolate.CLAMP,
    );

    return {
      opacity: opacity,
      transform: [{ scale: scale }],
    };
  }, []);

  const rightNavigatorButtonAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateXValue.value,
      [FIRST_ACTION_POSITION, SECOND_ACTION_POSITION, THIRD_ACTION_POSITION],
      [1, 1, 0.5],
    );

    const opacity = interpolate(
      translateXValue.value,
      [FIRST_ACTION_POSITION, SECOND_ACTION_POSITION, THIRD_ACTION_POSITION],
      [1, 1, 0.5],
    );

    return {
      opacity: opacity,
      transform: [{ scale: scale }],
    };
  }, []);

  function onActionScrollEnd(event: NativeScrollEvent) {
    const index = Math.round(event.contentOffset.x / (width - 110));

    if (index !== actionIndex) {
      setActionIndex(index);
    }
  }

  function toggleCameraPermissionModal() {
    setIsCameraPermissionModalVisible(!isCameraPermissionModalVisible);
  }

  function toggleLocationPermissionModal() {
    setIsLocationPermissionModalVisible(!isLocationPermissionModalVisible);
  }

  function toggleSettingsModal() {
    setIsSettingsModalVisible(!isSettingsModalVisible);
  }

  function toggleImageUploadModal() {
    setIsImageUploadModalVisible(!isImageUploadModalVisible);
  }

  const requestCameraPermission = usePermissionRequest(
    'android.permission.CAMERA',
    toggleImageUploadModal,
    toggleCameraPermissionModal,
    toggleSettingsModal,
  );

  const requestLocationPermission = usePermissionRequest(
    'android.permission.ACCESS_FINE_LOCATION',
    toggleImageUploadModal,
    toggleLocationPermissionModal,
    toggleSettingsModal,
  );

  function onNavigateLeft() {
    switch (actionIndex) {
      case 2:
        {
          scrollViewRef?.current?.scrollTo({
            x: SECOND_ACTION_POSITION,
            y: 0,
            animated: true,
          });
          setActionIndex(1);
        }
        break;
      case 1:
        {
          scrollViewRef?.current?.scrollTo({
            x: FIRST_ACTION_POSITION,
            y: 0,
            animated: true,
          });
          setActionIndex(0);
        }
        break;
      default:
        break;
    }
  }

  function onNavigateRight() {
    switch (actionIndex) {
      case 0:
        {
          scrollViewRef?.current?.scrollTo({
            x: SECOND_ACTION_POSITION,
            y: 0,
            animated: true,
          });
          setActionIndex(1);
        }
        break;
      case 1:
        {
          scrollViewRef?.current?.scrollTo({
            x: THIRD_ACTION_POSITION,
            y: 0,
            animated: true,
          });
          setActionIndex(2);
        }
        break;
      default:
        break;
    }
  }

  function onAddPhoto() {
    check(PERMISSIONS.ANDROID.CAMERA).then((cameraPermission) => {
      if (cameraPermission === 'granted') {
        toggleImageUploadModal();
        return;
      }
      requestCameraPermission();
    });
  }

  function openAppSettings() {
    toggleSettingsModal();
    setTimeout(() => {
      openSettings();
    }, 500);
  }

  function onCameraPermissionModalClosed() {
    toggleCameraPermissionModal();
    requestCameraPermission();
  }

  function onLocationPermissionModalClosed() {
    toggleCameraPermissionModal();
    requestLocationPermission();
  }

  function openAppGallery() {
    return;
  }

  function openAppCamera() {
    return;
  }

  function onTabIconPress(index: 0 | 1 | 2) {
    switch (index) {
      case 0:
        {
          scrollViewRef?.current?.scrollTo({
            x: FIRST_ACTION_POSITION,
            y: 0,
            animated: true,
          });
          setActionIndex(0);
        }
        break;
      case 1:
        {
          scrollViewRef?.current?.scrollTo({
            x: SECOND_ACTION_POSITION,
            y: 0,
            animated: true,
          });
          setActionIndex(1);
        }
        break;
      case 2:
        {
          scrollViewRef?.current?.scrollTo({
            x: THIRD_ACTION_POSITION,
            y: 0,
            animated: true,
          });
          setActionIndex(2);
        }
        break;
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <BottomSheetModal
          isVisible={isImageUploadModalVisible}
          onCancel={toggleImageUploadModal}
          onOpenGallery={openAppGallery}
          onOpenCamera={openAppCamera}
        />

        <InfoModal
          title={'Info'}
          message={
            'Za korištenje aplikacije potrebno je dopuštenje za korištenje kamere.'
          }
          isVisible={isCameraPermissionModalVisible}
          infoModalCallback={onCameraPermissionModalClosed}
        />

        <InfoModal
          title={'Info'}
          message={`Korištenje kamere je blokirano.\nOmogučite korištenje kamere u postavkama.`}
          isVisible={isSettingsModalVisible}
          infoModalCallback={openAppSettings}
        />

        <InfoModal
          title={'Info'}
          message={
            'Za korištenje aplikacije potrebno je dopuštenje za korištenje lokacije.'
          }
          isVisible={isLocationPermissionModalVisible}
          infoModalCallback={onLocationPermissionModalClosed}
        />

        <LinearGradient
          colors={[Color.Primary, Color.Secondary]}
          useAngle={true}
          angle={90}
          style={styles.topContainerBack}
        >
          <View style={styles.topContainerFront}>
            <View style={styles.contentContainer}>
              <Animated.View
                style={[styles.navigator, leftNavigatorButtonAnimatedStyle]}
              >
                <TouchableOpacity
                  onPress={onNavigateLeft}
                  disabled={actionIndex === 0}
                >
                  <Image
                    style={[styles.navigatorIcon]}
                    source={require('assets/images/arrow-left.png')}
                  />
                </TouchableOpacity>
              </Animated.View>
              <Animated.ScrollView
                onScroll={scrollHandler}
                ref={scrollViewRef}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                horizontal
                onMomentumScrollEnd={(event) => {
                  onActionScrollEnd(event.nativeEvent);
                }}
              >
                <View style={[styles.scrollViewItemContainer]}>
                  <Action
                    index={0}
                    translateX={translateXValue}
                    buttonText={'Dodaj fotografiju'}
                    buttonIcon={'camera'}
                    onPress={onAddPhoto}
                  />
                </View>
                <View style={styles.scrollViewItemContainer}>
                  <Action
                    index={1}
                    translateX={translateXValue}
                    buttonText={'Dodaj opis'}
                    buttonIcon={'description'}
                    onPress={onAddPhoto}
                  />
                </View>
                <View style={styles.scrollViewItemContainer}>
                  <Action
                    index={2}
                    translateX={translateXValue}
                    buttonText={'Dodaj lokaciju'}
                    buttonIcon={'location'}
                    onPress={onAddPhoto}
                  />
                </View>
              </Animated.ScrollView>
              <Animated.View
                style={[styles.navigator, rightNavigatorButtonAnimatedStyle]}
              >
                <TouchableOpacity
                  disabled={actionIndex === 2}
                  onPress={onNavigateRight}
                >
                  <Image
                    style={styles.navigatorIcon}
                    source={require('assets/images/arrow-right.png')}
                  />
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        </LinearGradient>
        <View style={styles.bottomContainerBack}>
          <LinearGradient
            colors={[Color.Primary, Color.Secondary]}
            useAngle={true}
            angle={90}
            style={styles.bottomContainerFront}
          >
            <Tab
              onPress={onTabIconPress}
              translateDotX={translateDotXValue}
              translateIconY={translateIconYValue}
            />
          </LinearGradient>
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
  },
  bottomContainerFront: {
    height: '100%',
  },
  contentContainer: {
    flexDirection: 'row',
    padding: 5,
    height: '95%',
    width: '95%',
    elevation: 3,
    borderBottomRightRadius: 55,
  },
  scrollViewItemContainer: {
    width: width - 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigator: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  navigatorIcon: {
    width: 35,
    height: 35,
    tintColor: Color.TextDark,
  },
  navigatorDisabled: {
    opacity: 0.5,
    height: 20,
    tintColor: 'grey',
  },
});
