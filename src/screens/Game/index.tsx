import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "../../components/Background";
import { useRoute, useNavigation} from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import logoImg from '../../assets/logo-nlw-esports.png'

import { styles } from "./styles";
import { GameParams } from "../../@types/navigation";
import { View, TouchableOpacity, Image, FlatList, Text } from "react-native";
import { THEME } from "../../theme";
import { Heading } from "../../components/Heading";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";
import { useEffect, useState } from "react";

import { DuoMatch } from '../../components/DuoMatch';

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([])
  const [discordDuosSelected, setDiscordDuosSelected] = useState('')

  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;

  function handleGoBack(){
    navigation.goBack();
  } 

  async function getDiscordUser(adsId: string) {
    fetch(`http://192.168.0.105:3333/ads/${adsId}/discord`)
      .then((res) => res.json())
      .then((data) => setDiscordDuosSelected(data.discord));
  }

  useEffect(() => {
    fetch(`http://192.168.0.105:3333/games/${game.id}/ads`)
      .then((res) => res.json())
      .then((data) => setDuos(data));
  }, []);


  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Entypo name="chevron-thin-left" color={THEME.COLORS.CAPTION_300} size={20} onPress={handleGoBack}/>
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo}/>

          <View style={styles.right}/>
        </View>

        <Image source={{ uri: game.bannerUrl }} style={styles.cover} resizeMode="cover"/>

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!"/>
      
      <FlatList data={duos} keyExtractor={item => item.id} renderItem={({ item }) => (
        <DuoCard data={item} onConnect={() => {getDiscordUser(item.id)}}/>
      )} horizontal style={[styles.containerList]} contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]} showsHorizontalScrollIndicator={false} ListEmptyComponent={() => (
        <Text style={styles.emptyListText}>
          Nao ha auncios publicados ainda.
        </Text>
      )}/>

      <DuoMatch visible={discordDuosSelected.length > 0} discord={discordDuosSelected} onClose={() => setDiscordDuosSelected('')}/>
      </SafeAreaView>
    </Background>
  );
}