import React, { useState } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {
  Modal,
  Portal,
  Button,
  Provider,
  Title,
  Dialog,
  Paragraph,
} from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';

interface props {
  /**
   * Callback sends the image on base64
   */
  callback: (image: string) => void;
}

const ImageChoiceModal = ({ callback }: props) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <Button
        style={tw`w-6/12 m-auto mt-5`}
        icon="camera"
        mode="contained"
        onPress={() => {
          setVisible(true);
        }}>
        Image
      </Button>
      <Provider>
        <Portal>
          <Dialog
            style={tw`flex items-center`}
            visible={visible}
            onDismiss={() => {
              setVisible(false);
            }}>
            <Dialog.Title>Sélectionner une option :</Dialog.Title>
            <Dialog.Actions>
              <Button
                style={tw`mx-1`}
                icon="camera"
                color="#69A2B0"
                mode="outlined"
                onPress={() => {
                  launchCamera(
                    {
                      mediaType: 'photo',
                      saveToPhotos: false,
                      includeBase64: true,
                    },
                    async (image) => {
                      if (
                        !image.assets ||
                        !image.assets[0].uri ||
                        !image.assets[0].base64
                      )
                        return;

                      callback(image.assets[0].base64);
                    },
                  );
                }}>
                Camera
              </Button>
              <Button
                style={tw`mx-1`}
                icon="image"
                color="#69A2B0"
                mode="outlined"
                onPress={() => {
                  launchImageLibrary(
                    {
                      mediaType: 'photo',
                      includeBase64: true,
                    },
                    async (image) => {
                      if (
                        !image.assets ||
                        !image.assets[0].uri ||
                        !image.assets[0].base64
                      )
                        return;

                      callback(image.assets[0].base64);
                    },
                  );
                }}>
                Gallerie
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Provider>
    </>
  );
};

export default ImageChoiceModal;
