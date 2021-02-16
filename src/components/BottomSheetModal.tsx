import React from 'react';
import { StyleSheet } from 'react-native';
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
      backdropColor={Color.Text}
      backdropOpacity={0.55}
      isVisible={isVisible}
      onSwipeComplete={swipeCallBack}
      swipeDirection={['down']}
      style={styles.view}
      animationOutTiming={1000}
      useNativeDriverForBackdrop={true}
      onBackdropPress={swipeCallBack}
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
