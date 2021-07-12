import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Color } from 'global-styles';

import { CustomButton } from './CustomButton';

interface OwnProps {
  isVisible: boolean;
  title: string;
  message: string;
  infoModalCallback?: () => void;
}

type Props = OwnProps;

export const InfoModal: React.FC<Props> = ({
  isVisible,
  title,
  message,
  infoModalCallback,
}) => {
  return (
    <Modal
      backdropColor={Color.TextDark}
      backdropOpacity={0.5}
      isVisible={isVisible}
      onSwipeComplete={infoModalCallback}
      swipeDirection={['down', 'left', 'right', 'up']}
      animationOutTiming={700}
      useNativeDriverForBackdrop={true}
      onBackdropPress={infoModalCallback}
    >
      <View style={styles.view}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
        <CustomButton
          placeholder={'ok'}
          onPress={infoModalCallback}
          type={'primary'}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    color: Color.Primary,
    fontSize: 22,
    fontFamily: 'Lato-Black',
  },
  message: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 16,
    fontFamily: 'Lato-Bold',
  },
  view: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '20%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Color.Background,
  },
});
