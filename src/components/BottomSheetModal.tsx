import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';

import { Color } from 'global-styles';

interface OwnProps {
  isVisible: boolean;
  content: JSX.Element;
  swipeCallBack: () => void;
}

type Props = OwnProps;

export const BottomSheetModal: React.FC<Props> = ({
  isVisible,
  content,
  swipeCallBack,
}) => {
  return (
    <Modal
      backdropColor={Color.Background}
      backdropOpacity={0.5}
      isVisible={isVisible}
      onSwipeComplete={swipeCallBack}
      swipeDirection={['down']}
      style={styles.view}
    >
      {content}
    </Modal>
  );
};

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});