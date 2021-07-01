import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { Color } from 'global-styles';

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
      backdropColor={Color.Text}
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
        <TouchableOpacity style={styles.button} onPress={infoModalCallback}>
          <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    color: Color.Primary,
    fontSize: 22,
    fontWeight: 'bold',
  },
  message: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 16,
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
  button: {
    alignSelf: 'center',
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 0,
    paddingLeft: 0,
    borderTopColor: Color.Primary,
    borderBottomColor: Color.Primary,
    borderBottomWidth: 0.2,
    borderTopWidth: 0.2,
  },
  buttonText: {
    color: Color.Primary,
    fontSize: 16,
  },
});
