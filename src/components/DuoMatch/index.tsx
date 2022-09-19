import { useState } from 'react'
import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'
import { Activity, CheckCircle} from 'phosphor-react-native'
import * as Clipboard from 'expo-clipboard';

import { styles } from "./styles";
import { THEME } from "../../theme";

import { Heading } from "../Heading";

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
  const [isCopping, setCopping] = useState(false)
 
  async function hanldeCopyDiscordToClipboard() {
    setCopping(true);
    await Clipboard.setStringAsync(discord)

    Alert.alert('Discord Copiado!', 'Usuario copiado para voce colar no Discord.')
    setCopping(false);
  }
 
  return (
    <Modal animationType="fade" transparent statusBarTranslucent {...rest}>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons name="close" size={20} color={THEME.COLORS.CAPTION_500}/>
          </TouchableOpacity>

          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold"/>

          <Heading title="Let's play!" subtitle="Agora e so comecar a jogar!" style={{alignItems: 'center' , marginTop: 24}}/>

          <Text style={styles.label}>Adicione no Discord</Text>

          <TouchableOpacity disabled={isCopping} onPress={hanldeCopyDiscordToClipboard} style={styles.discorButton}>
            <Text style={styles.discord}>{isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY}/> : discord}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
