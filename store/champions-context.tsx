import { createContext, useState, useEffect, useCallback } from "react";
import { StyleSheet, Image } from "react-native";
import { useQuery } from "react-query";
import { fetchData } from "../util/http";
import { apiDomains, attributes, cardPropety, queryTag } from "../util/strings";

export const ChampionsContext = createContext<{
  championList: any[];
}>({
  championList: [],
});

const ChampionsContextProvider = ({ children }) => {
  const [championList, setChampionList] = useState<any[]>([]);
  useQuery(queryTag.champions, fetchData, {
    onSuccess: (result) => {
      addDataToList(result.data);
    },
  });

  const randomAttribute = () => {
    let randomArrayOfAttributes = attributes.attributeArray;
    let currentArrayOfAttributes: string[] = [];
    let rnd = Math.floor(Math.random() * (5 - 2 + 1) + 2);
    for (let i = 0; i < rnd; i++) {
      let randomIndex = Math.floor(
        Math.random() * randomArrayOfAttributes.length
      );
      let temp: string = randomArrayOfAttributes[randomIndex];
      if (currentArrayOfAttributes.includes(temp)) {
        rnd++;
      } else {
        currentArrayOfAttributes.push(temp);
      }
    }
    return currentArrayOfAttributes;
  };

  const addDataToList = (data: any) => {
    const API_DOMAIN_PICTURE = apiDomains.championPictureTemplet;
    const array2 = Object.values(data);
    const array = [
      array2[20],
      array2[21],
      array2[22],
      array2[23],
      array2[18],
      array2[25],
      array2[26],
    ];
    array.forEach((item: any) => {
      item[cardPropety.tags] = randomAttribute();
      item[cardPropety.age] = Math.floor(Math.random() * (60 - 20 + 1) + 20);
      item[cardPropety.imageArray] = [
        { uri: `${API_DOMAIN_PICTURE}${item.id}_0.jpg` },
        { uri: `${API_DOMAIN_PICTURE}${item.name}_1.jpg` },
        { uri: `${API_DOMAIN_PICTURE}${item.name}_2.jpg` },
      ];
    });

    setChampionList(array);
  };

  return (
    <ChampionsContext.Provider
      value={{
        championList,
      }}
    >
      {children}
    </ChampionsContext.Provider>
  );
};

export { ChampionsContextProvider };
export default ChampionsContext;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: "cover",
    borderRadius: 20,
    marginTop: 100,
  },
  cardLabelContainer: {
    position: "absolute",
    bottom: 0,
    left: 40,
    zIndex: 1000,
  },
  cardLabelContainerRight: {
    position: "absolute",
    bottom: 0,
    right: 40,
    zIndex: 1000,
  },
  cardText: {
    borderWidth: 1,
    borderColor: "green",
    color: "green",
    fontSize: 32,
    fontWeight: "800",
    padding: 10,
    marginTop: 100,
  },
  cardTextRight: {
    borderWidth: 1,
    borderColor: "red",
    color: "red",
    fontSize: 32,
    fontWeight: "800",
    padding: 10,
    marginTop: 100,
  },
  xIcon: {
    position: "absolute",
    width: 70,
    height: 70,
    bottom: 15,
    right: 220,
  },
  heartIcon: {
    position: "absolute",
    width: 70,
    height: 70,
    bottom: 15,
    left: 220,
  },
});
