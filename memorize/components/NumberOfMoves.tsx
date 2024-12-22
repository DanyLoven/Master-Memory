import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon, {  } from 'react-native-vector-icons/AntDesign';


const NumberOfMoves = ({ itemCount, currentCount }: { itemCount: number; currentCount: number }) => {
  const renderIcons = () => {
    const icons = [];

    for (let i = 0; i < itemCount; i++) {
      const iconName = i >= currentCount ? 'closecircle' : 'pluscircle';
      const iconColor = i >= currentCount ? '#86112E' : '#72CC50';

      icons.push(
        <Icon key={i} name={iconName} size={20} color={iconColor} style={styles.icon} />
      );
    }

    return icons;
  };

  return <View style={styles.container}>{renderIcons()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  icon: {
    marginHorizontal: 2,
  },
});

export default NumberOfMoves;
